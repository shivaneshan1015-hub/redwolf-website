"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import pricingData from "@/data/pricing-data.json";

export type CountryCode = "IN" | "US" | "GB" | "EU" | "AE" | "CA" | "AU" | "SG";
export type CurrencyCode = "INR" | "USD" | "GBP" | "EUR" | "AED" | "CAD" | "AUD" | "SGD";

export interface CountryInfo {
  countryCode: CountryCode;
  countryName: string;
  flag: string;
  currency: CurrencyCode;
  symbol: string;
  rateVsINR: number;
  formatLocale: string;
}

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateVsINR: number;
  formatLocale: string;
}

interface CurrencyContextType {
  country: CountryCode;
  countryInfo: CountryInfo;
  currency: CurrencyCode;
  currencyInfo: CurrencyInfo;
  setCountry: (code: CountryCode) => void;
  formatPrice: (priceINR: number, priceUSD?: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const countriesMap = pricingData.countries as Record<string, CountryInfo>;
const currenciesMap = pricingData.currencies as Record<string, CurrencyInfo>;

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [country, setCountryState] = useState<CountryCode>("IN");

  // Auto-detect country/currency on client mount
  useEffect(() => {
    try {
      const savedCountry = localStorage.getItem("redwolf_country") as CountryCode;
      if (savedCountry && countriesMap[savedCountry]) {
        setCountryState(savedCountry);
        return;
      }

      // Fast offline detection via browser locale & timeZone
      const userLocale = typeof navigator !== "undefined" ? navigator.language : "en-IN";
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";

      if (userLocale.includes("IN") || timeZone.includes("Kolkata") || timeZone.includes("Calcutta")) {
        setCountryState("IN");
      } else if (userLocale.includes("GB") || timeZone.includes("London")) {
        setCountryState("GB");
      } else if (userLocale.includes("AE") || timeZone.includes("Dubai")) {
        setCountryState("AE");
      } else if (userLocale.includes("CA") || timeZone.includes("Toronto") || timeZone.includes("Vancouver")) {
        setCountryState("CA");
      } else if (userLocale.includes("AU") || timeZone.includes("Sydney") || timeZone.includes("Melbourne")) {
        setCountryState("AU");
      } else if (userLocale.includes("SG") || timeZone.includes("Singapore")) {
        setCountryState("SG");
      } else if (
        userLocale.includes("DE") ||
        userLocale.includes("FR") ||
        userLocale.includes("ES") ||
        userLocale.includes("IT") ||
        userLocale.includes("NL") ||
        timeZone.includes("Berlin") ||
        timeZone.includes("Paris")
      ) {
        setCountryState("EU");
      } else if (userLocale.includes("US") || timeZone.includes("New_York") || timeZone.includes("Los_Angeles")) {
        setCountryState("US");
      } else {
        // Attempt IP API lookup (silently fallback to US / IN)
        fetch("https://ipapi.co/json/")
          .then((res) => res.json())
          .then((data) => {
            const code = data?.country_code;
            if (code && countriesMap[code]) {
              setCountryState(code as CountryCode);
            } else if (["DE", "FR", "ES", "IT", "NL", "BE", "AT", "IE", "PT", "FI"].includes(code)) {
              setCountryState("EU");
            } else if (code === "IN") {
              setCountryState("IN");
            } else {
              setCountryState("US");
            }
          })
          .catch(() => {
            setCountryState("US");
          });
      }
    } catch {
      setCountryState("IN");
    }
  }, []);

  const setCountry = (code: CountryCode) => {
    if (!countriesMap[code]) return;
    setCountryState(code);
    try {
      localStorage.setItem("redwolf_country", code);
    } catch {
      // ignore storage errors
    }
  };

  const countryInfo = (countriesMap[country] || countriesMap.IN) as CountryInfo;
  const currency = countryInfo.currency;
  const currencyInfo = (currenciesMap[currency] || currenciesMap.INR) as CurrencyInfo;

  const formatPrice = (priceINR: number, priceUSD?: number): string => {
    if (currency === "INR") {
      return `₹${priceINR.toLocaleString("en-IN")}`;
    }

    if (currency === "USD" && priceUSD) {
      return `$${priceUSD.toLocaleString("en-US")}`;
    }

    // Convert via exchange rate vs INR
    const rate = countryInfo.rateVsINR;
    const symbol = countryInfo.symbol;
    const converted = Math.round(priceINR * rate);

    if (currency === "USD") return `$${converted.toLocaleString("en-US")}`;
    if (currency === "EUR") return `€${converted.toLocaleString("de-DE")}`;
    if (currency === "GBP") return `£${converted.toLocaleString("en-GB")}`;
    if (currency === "AED") return `AED ${converted.toLocaleString("en-US")}`;
    if (currency === "CAD") return `CA$${converted.toLocaleString("en-CA")}`;
    if (currency === "AUD") return `A$${converted.toLocaleString("en-AU")}`;
    if (currency === "SGD") return `S$${converted.toLocaleString("en-SG")}`;

    return `${symbol}${converted.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        country,
        countryInfo,
        currency,
        currencyInfo,
        setCountry,
        formatPrice,
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
