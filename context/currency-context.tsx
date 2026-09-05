"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import pricingData from "@/data/pricing-data.json";

export type CurrencyCode = "INR" | "USD" | "EUR" | "GBP" | "AED";

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateVsINR: number;
  formatLocale: string;
}

interface CurrencyContextType {
  currency: CurrencyCode;
  currencyInfo: CurrencyInfo;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (priceINR: number, priceUSD?: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("INR");

  // Auto-detect country/currency on client mount
  useEffect(() => {
    try {
      const savedCurrency = localStorage.getItem("redwolf_currency") as CurrencyCode;
      if (savedCurrency && pricingData.currencies[savedCurrency]) {
        setCurrencyState(savedCurrency);
        return;
      }

      // Detect browser language / timezone as fast offline fallback
      const userLocale = typeof navigator !== "undefined" ? navigator.language : "en-IN";
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      if (userLocale.includes("IN") || timeZone.includes("Kolkata") || timeZone.includes("Calcutta")) {
        setCurrencyState("INR");
      } else if (userLocale.includes("GB") || timeZone.includes("London")) {
        setCurrencyState("GBP");
      } else if (userLocale.includes("AE") || timeZone.includes("Dubai")) {
        setCurrencyState("AED");
      } else if (
        userLocale.includes("DE") ||
        userLocale.includes("FR") ||
        userLocale.includes("ES") ||
        userLocale.includes("IT") ||
        timeZone.includes("Berlin") ||
        timeZone.includes("Paris")
      ) {
        setCurrencyState("EUR");
      } else {
        // Attempt IP API lookup (silently fallback to USD/INR)
        fetch("https://ipapi.co/json/")
          .then((res) => res.json())
          .then((data) => {
            const country = data?.country_code;
            if (country === "IN") setCurrencyState("INR");
            else if (country === "GB") setCurrencyState("GBP");
            else if (country === "AE") setCurrencyState("AED");
            else if (["DE", "FR", "ES", "IT", "NL", "BE"].includes(country)) setCurrencyState("EUR");
            else setCurrencyState("USD");
          })
          .catch(() => {
            // Default to USD for global visitors outside India
            setCurrencyState("USD");
          });
      }
    } catch {
      setCurrencyState("INR");
    }
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      localStorage.setItem("redwolf_currency", code);
    } catch {
      // ignore localstorage errors
    }
  };

  const currencyInfo = (pricingData.currencies[currency] || pricingData.currencies.INR) as CurrencyInfo;

  const formatPrice = (priceINR: number, priceUSD?: number): string => {
    if (currency === "INR") {
      return `₹${priceINR.toLocaleString("en-IN")}`;
    }

    if (currency === "USD" && priceUSD) {
      return `$${priceUSD.toLocaleString("en-US")}`;
    }

    // Convert via exchange rate vs INR
    const rate = currencyInfo.rateVsINR;
    const symbol = currencyInfo.symbol;
    const converted = Math.round(priceINR * rate);

    if (currency === "USD") return `$${converted.toLocaleString("en-US")}`;
    if (currency === "EUR") return `€${converted.toLocaleString("de-DE")}`;
    if (currency === "GBP") return `£${converted.toLocaleString("en-GB")}`;
    if (currency === "AED") return `AED ${converted.toLocaleString("en-US")}`;

    return `${symbol}${converted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        currencyInfo,
        setCurrency,
        formatPrice
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
