"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  parsePhoneNumber,
  isValidPhoneNumber,
  getCountryCallingCode,
  getCountries,
  CountryCode,
  AsYouType,
} from "libphonenumber-js";
import { IoChevronDown, IoSearch } from "react-icons/io5";

// Simple cn utility function for className merging
function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

// Country names MapPinIcong for better display
const countryNames: Record<string, string> = {
  AE: "الإمارات العربية المتحدة",
  SA: "المملكة العربية السعودية",
  KW: "الكويت",
  QA: "قطر",
  BH: "البحرين",
  OM: "عُمان",
  JO: "الأردن",
  LB: "لبنان",
  SY: "سوريا",
  IQ: "العراق",
  YE: "اليمن",
  PS: "فلسطين",
  EG: "مصر",
  MA: "المغرب",
  TN: "تونس",
  DZ: "الجزائر",
  LY: "ليبيا",
  SD: "السودان",
  US: "الولايات المتحدة",
  CA: "كندا",
  GB: "المملكة المتحدة",
  DE: "ألمانيا",
  FR: "فرنسا",
  IT: "إيطاليا",
  ES: "إسبانيا",
  NL: "هولندا",
  BE: "بلجيكا",
  CH: "سويسرا",
  AT: "النمسا",
  SE: "السويد",
  NO: "النرويج",
  DK: "الدنمارك",
  FI: "فنلندا",
  PL: "بولندا",
  CZ: "جمهورية التشيك",
  HU: "المجر",
  RO: "رومانيا",
  BG: "بلغاريا",
  GR: "اليونان",
  PT: "البرتغال",
  IE: "أيرلندا",
  SK: "سلوفاكيا",
  IN: "الهند",
  PK: "باكستان",
  BD: "بنغلاديش",
  LK: "سريلانكا",
  NP: "نيبال",
  CN: "الصين",
  JP: "اليابان",
  KR: "كوريا الجنوبية",
  SG: "سنغافورة",
  MY: "ماليزيا",
  TH: "تايلاند",
  VN: "فيتنام",
  PH: "الفلبين",
  ID: "إندونيسيا",
  AF: "أفغانستان",
  IR: "إيران",
  AU: "أستراليا",
  BR: "البرازيل",
  AR: "الأرجنتين",
  CL: "تشيلي",
  CO: "كولومبيا",
  PE: "بيرو",
  MX: "المكسيك",
  ZA: "جنوب أفريقيا",
  NG: "نيجيريا",
  KE: "كينيا",
  GH: "غانا",
  ET: "إثيوبيا",
  UG: "أوغندا",
  TZ: "تنزانيا",
  RU: "روسيا",
  UA: "أوكرانيا",
  BY: "بيلاروس",
  KZ: "كازاخستان",
  UZ: "أوزبكستان",
  KG: "قيرغيزستان",
  TJ: "طاجيكستان",
  TM: "تركمانستان",
  AZ: "أذربيجان",
  GE: "جورجيا",
  AM: "أرمينيا",
  TR: "تركيا",
};

// Generate countries list using libphonenumber-js
const generateCountries = (): Country[] => {
  const supportedCountries = getCountries();
  return supportedCountries
    .map((code) => ({
      code,
      name: countryNames[code] || code,
      flag: `https://flagcdn.com/${code.toLowerCase()}.svg`,
      dialCode: `+${getCountryCallingCode(code as CountryCode)}`,
    }))
    .sort((a, b) => {
      // Prioritize common countries
      const priority = [
        "SY",
        "AE",
        "SA",
        "KW",
        "QA",
        "BH",
        "OM",
        "JO",
        "LB",
        "IQ",
        "YE",
        "PS",
        "EG",
        "MA",
        "TN",
        "DZ",
        "LY",
        "SD",
        "US",
        "CA",
        "GB",
        "DE",
        "FR",
        "IT",
        "ES",
        "NL",
        "BE",
        "CH",
        "AT",
        "SE",
        "NO",
        "DK",
        "FI",
        "PL",
        "IN",
        "PK",
        "BD",
        "CN",
        "JP",
        "KR",
        "AU",
        "BR",
        "RU",
        "TR",
      ];
      const aIndex = priority.indexOf(a.code);
      const bIndex = priority.indexOf(b.code);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return a.name.localeCompare(b.name);
    });
};

const countries: Country[] = generateCountries();

export interface PhoneInputProps {
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onCountryChange?: (country: Country) => void;
  onValidationChange?: (isValid: boolean) => void; // New prop to notify parent about validation status
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  defaultCountry?: string; // Country code like 'SY', 'AE', etc.
  enableAutoDetect?: boolean; // Enable automatic country detection from phone number
}

export default function PhoneInput({
  id,
  name,
  label,
  placeholder = "Enter phone number",
  value = "",
  onChange,
  onCountryChange,
  onValidationChange,
  error = false,
  helperText,
  required = false,
  disabled = false,
  className,
  defaultCountry = "AE", // Default to UAE
  enableAutoDetect = true,
}: PhoneInputProps) {
  // Find default country or fallback to first country
  const initialCountry =
    countries.find((c) => c.code === defaultCountry) || countries[0];

  const [selectedCountry, setSelectedCountry] =
    useState<Country>(initialCountry);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const [isDetectingCountry, setIsDetectingCountry] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);

  // Filter countries based on search query
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return countries;

    const query = searchQuery.toLowerCase().trim();
    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(query) ||
        country.code.toLowerCase().includes(query) ||
        country.dialCode.replace("+", "").includes(query.replace("+", "")) ||
        country.dialCode.includes(query)
    );
  }, [searchQuery]);

  // Function to validate phone number using libphonenumber-js
  const validatePhoneNumber = (
    phoneNumber: string,
    countryCode: string
  ): boolean => {
    try {
      return isValidPhoneNumber(phoneNumber, countryCode as CountryCode);
    } catch (error) {
      return false;
    }
  };

  // Auto-detect country from IP address
  const detectCountryFromIP = async (): Promise<Country | null> => {
    try {
      // Try multiple free IP geolocation services
      const services = [
        "https://ipapi.co/json/",
        "https://ip-api.com/json/?fields=status,countryCode",
        "https://api.country.is/",
      ];

      for (const service of services) {
        try {
          const response = await fetch(service, {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          });

          if (!response.ok) continue;

          const data = await response.json();
          let countryCode: string | null = null;

          // Parse response based on service
          if (service.includes("ipapi.co")) {
            countryCode = data.country_code;
          } else if (service.includes("ip-api.com")) {
            if (data.status === "success") {
              countryCode = data.countryCode;
            }
          } else if (service.includes("country.is")) {
            countryCode = data.country;
          }

          if (countryCode) {
            const country = countries.find(
              (c) => c.code === countryCode?.toUpperCase()
            );
            if (country) {
              return country;
            }
          }
        } catch (error) {
          // Try next service if current one fails
          continue;
        }
      }
    } catch (error) {
      console.error("Failed to detect country from IP:", error);
    }
    return null;
  };

  // Auto-detect country from phone number using libphonenumber-js
  const detectCountryFromPhone = (phoneNumber: string): Country | null => {
    try {
      const parsedNumber = parsePhoneNumber(phoneNumber);
      if (parsedNumber && parsedNumber.country) {
        const country = countries.find((c) => c.code === parsedNumber.country);
        return country || null;
      }
    } catch (error) {
      // Fallback to manual detection if parsing fails
      const country = countries.find((c) => phoneNumber.startsWith(c.dialCode));
      return country || null;
    }
    return null;
  };

  // Detect country from IP address on mount
  useEffect(() => {
    // Only detect if defaultCountry is not explicitly provided or is the default value
    // Skip detection if a specific country is provided via props
    if (!defaultCountry || defaultCountry === "SY") {
      setIsDetectingCountry(true);
      detectCountryFromIP()
        .then((detectedCountry) => {
          if (detectedCountry) {
            setSelectedCountry(detectedCountry);
            onCountryChange?.(detectedCountry);
          }
        })
        .catch((error) => {
          console.error("Error detecting country from IP:", error);
        })
        .finally(() => {
          setIsDetectingCountry(false);
        });
    } else {
      setIsDetectingCountry(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setIsSearching(false);
        setSearchQuery("");
        setHighlightedIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle country selection
  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    setIsSearching(false);
    setSearchQuery("");
    setHighlightedIndex(-1);
    onCountryChange?.(country);

    // Update the full phone number
    const fullNumber = `${country.dialCode}${phoneInput}`;
    onChange?.(fullNumber);

    // Focus back to phone input
    setTimeout(() => {
      phoneInputRef.current?.focus();
    }, 100);
  };

  // Handle phone number input change with auto-detection and formatting
  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value;

    // Auto-detect country if enabled and user types a full international number
    if (
      enableAutoDetect &&
      newPhoneNumber.startsWith("+") &&
      newPhoneNumber.length > 4
    ) {
      const detectedCountry = detectCountryFromPhone(newPhoneNumber);
      if (detectedCountry && detectedCountry.code !== selectedCountry.code) {
        setSelectedCountry(detectedCountry);
        onCountryChange?.(detectedCountry);

        // Use AsYouType for formatting
        const asYouType = new AsYouType(detectedCountry.code as CountryCode);
        const formatted = asYouType.input(newPhoneNumber);
        const nationalNumber = asYouType.getNationalNumber();

        setPhoneInput(nationalNumber || "");
        onChange?.(newPhoneNumber);
        return;
      }
    }

    // Format the phone number using AsYouType
    const asYouType = new AsYouType(selectedCountry.code as CountryCode);
    const formatted = asYouType.input(
      `${selectedCountry.dialCode}${newPhoneNumber}`
    );
    const nationalNumber = asYouType.getNationalNumber();

    setPhoneInput(nationalNumber || newPhoneNumber);

    // Update the full phone number
    const fullNumber = `${selectedCountry.dialCode}${newPhoneNumber}`;
    onChange?.(fullNumber);
  };

  // Handle keyboard navigation in dropdown
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isDropdownOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredCountries.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCountries.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredCountries[highlightedIndex]) {
          handleCountrySelect(filteredCountries[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsDropdownOpen(false);
        setIsSearching(false);
        setSearchQuery("");
        setHighlightedIndex(-1);
        phoneInputRef.current?.focus();
        break;
      case "Tab":
        setIsDropdownOpen(false);
        setIsSearching(false);
        setSearchQuery("");
        setHighlightedIndex(-1);
        break;
    }
  };

  // Handle search input keyboard events
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (filteredCountries.length > 0) {
          setHighlightedIndex(0);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsDropdownOpen(false);
        setIsSearching(false);
        setSearchQuery("");
        setHighlightedIndex(-1);
        phoneInputRef.current?.focus();
        break;
      case "Enter":
        e.preventDefault();
        if (filteredCountries.length > 0) {
          const countryToSelect = highlightedIndex >= 0 && filteredCountries[highlightedIndex]
            ? filteredCountries[highlightedIndex]
            : filteredCountries[0];
          handleCountrySelect(countryToSelect);
        }
        break;
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    // Reset highlighted index when searching
    setHighlightedIndex(-1);
  };

  // Handle country selector click
  const handleCountrySelectorClick = () => {
    if (disabled) return;

    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      setSearchQuery("");
      setHighlightedIndex(-1);
      setIsSearching(true);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  // Parse existing value to extract phone number without country code
  useEffect(() => {
    if (value && value.startsWith(selectedCountry.dialCode)) {
      const phoneWithoutCode = value.replace(selectedCountry.dialCode, "");
      setPhoneInput(phoneWithoutCode);
    } else if (!value) {
      setPhoneInput("");
    }
  }, [value, selectedCountry.dialCode]);

  // Notify parent component about validation status
  useEffect(() => {
    if (onValidationChange && phoneInput) {
      const isValid = validatePhoneNumber(
        `${selectedCountry.dialCode}${phoneInput}`,
        selectedCountry.code
      );
      onValidationChange(isValid);
    }
  }, [phoneInput, selectedCountry, onValidationChange]);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-[13px] text-[#333] mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative" ref={dropdownRef}>
        <div
          className={cn(
            "flex items-center h-10 pr-4! border border-[#ccc] rounded-sm outline-none max-md:h-10",
            error && "border-red-500 focus-within:border-red-500",
            disabled && "opacity-50 cursor-not-allowed bg-gray-50",
            className
          )}
        >
          {/* Country Selector */}
          <div className="country-code-selector min-w-[85px] max-md:min-w-[100px] border-l border-[#E5E7EB]  cursor-pointer transition-colors duration-300">
            <div
              className="country-code-display flex items-center gap-2! px-1.5 py-3 max-md:px-3 text-[13px] text-[#374151]"
              onClick={handleCountrySelectorClick}
            >
              <img
                src={selectedCountry.flag}
                alt={selectedCountry.name}
                className="country-flag w-[16px] h-[12px] object-cover"
              />
              <span className="country-code-text font-medium">
                {selectedCountry.dialCode}
              </span>
              <IoChevronDown
                className={cn(
                  "ml-auto text-[#6B7280] transition-transform duration-300 w-3 h-3",
                  isDropdownOpen && "rotate-180"
                )}
              />
            </div>

            {/* Dropdown */}
            {isDropdownOpen && !disabled && (
              <div className="absolute top-full left-0 bg-white border border-[#E5E7EB] rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.1)] z-1000 max-h-[300px] w-[300px] overflow-hidden">
                {/* Search Input */}
                <div className="border-b border-[#E5E7EB] p-3">
                  <div className="relative">
                    <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="ابحث عن بلد..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onKeyDown={handleSearchKeyDown}
                      className="w-full pl-9! pr-3! py-2! border-none! rounded-sm text-sm"
                      autoComplete="off"
                    />
                  </div>
                </div>

                {/* Country List */}
                <div className="country-list max-h-[200px] overflow-y-auto">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((country, index) => (
                      <button
                        key={country.code}
                        type="button"
                        className={cn(
                          "country-option flex items-center gap-3 px-2! py-1.5! cursor-pointer transition-colors duration-200 hover:bg-[#fafafa] border-none bg-none w-full text-right text-xs! text-[#374151]",
                          selectedCountry.code === country.code &&
                            "bg-blue-50 text-[#3E5EC0]",
                          highlightedIndex === index && "bg-blue-100"
                        )}
                        onClick={() => handleCountrySelect(country)}
                        onMouseEnter={() => setHighlightedIndex(index)}
                      >
                        <img
                          src={country.flag}
                          alt={country.name}
                          className="flag w-4 h-[12px] object-cover"
                        />
                        <span className="name flex-1 font-medium">
                          {country.name}
                        </span>
                        <span className="code text-[#6B7280] text-xs">
                          {country.dialCode}
                        </span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-[#6B7280] text-center">
                      لا يوجد بلدان
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Phone Number Input */}
          <input
            ref={phoneInputRef}
            type="tel"
            id={id}
            name={name}
            className="flex-1 border-none! outline-none p-0! mr-3! py-0! text-sm bg-transparent rounded-none! max-md:px-3 max-md:text-[13px] disabled:cursor-not-allowed text-right"
            placeholder={placeholder}
            value={phoneInput}
            onChange={handlePhoneInputChange}
            onKeyDown={handleKeyDown}
            required={required}
            disabled={disabled}
            dir="ltr"
            suppressHydrationWarning
          />
        </div>
      </div>

      {(helperText || (enableAutoDetect && phoneInput && selectedCountry)) && (
        <p
          className={cn(
            "mt-1 text-xs",
            error ? "text-red-500" : "text-gray-500"
          )}
        >
          {error
            ? helperText
            : enableAutoDetect &&
              phoneInput &&
              selectedCountry &&
              !validatePhoneNumber(
                `${selectedCountry.dialCode}${phoneInput}`,
                selectedCountry.code
              )
            ? `تنسيق رقم الهاتف غير صحيح`
            : helperText}
        </p>
      )}
    </div>
  );
}
