"use client";

import React, { useState, useEffect } from "react";
import PhoneInput from "@/components/ui/phone-input";
import ReCaptcha from "@/components/ui/recaptcha";
import { useDownloadForm } from "@/services/forms/forms-hooks";
import { RECAPTCHA_CONFIG } from "@/lib/recaptcha";
import { useDownloadPopupStore } from "@/lib/store/download-popup-store";
import "@/styles/course.css";

export default function DownloadPopup() {
  const { isOpen, course, timing, closePopup } = useDownloadPopupStore();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company_name: "",
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [recaptchaToken, setRecaptchaToken] = useState<string>("");
  const [recaptchaError, setRecaptchaError] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [progress, setProgress] = useState(0);

  const { mutateAsync: submitDownload, isPending } = useDownloadForm();

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closePopup();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closePopup]);

  // Reset form when popup closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        phone: "",
        email: "",
        company_name: "",
      });
      setErrors({});
      setRecaptchaToken("");
      setRecaptchaError("");
      setIsPhoneValid(false);
      setIsGeneratingPDF(false);
      setProgress(0);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handlePhoneChange = (value: string) => {
    handleInputChange("phone", value);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<typeof formData> = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!isPhoneValid) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.company_name.trim()) {
      newErrors.company_name = "Company is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!course || !timing) return;

    if (!validateForm()) return;

    // Validate reCAPTCHA
    if (!recaptchaToken) {
      setRecaptchaError("Please complete the reCAPTCHA verification");
      return;
    }

    // Prepare data for API
    const apiData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company_name: formData.company_name,
      timing_id: timing.id,
      recaptcha_token: recaptchaToken,
    };

    let progressInterval: NodeJS.Timeout | null = null;

    try {
      // Submit form first - only proceed if successful
      await submitDownload(apiData);

      // Start PDF generation process only after successful form submission
      setIsGeneratingPDF(true);
      setProgress(0);

      const cityName = timing.city?.title || "Unknown";
      const filename = `${course.title.replace(
        /[^a-zA-Z0-9]/g,
        "_"
      )}_${cityName.replace(/[^a-zA-Z0-9]/g, "_")}_brochure.pdf`;

      // Simulate progress updates
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            if (progressInterval) {
              clearInterval(progressInterval);
            }
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      // Generate PDF using server-side API
      const response = await fetch("/api/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course: {
            ...course,
            description: course.description || "",
            content: course.content || "",
            image: course.image || "",
            code: course.code || "",
            duration: course.duration || timing.duration,
            category: course.category || null,
          },
          timing: {
            ...timing,
            city: timing.city || {
              id: timing.city_id,
              title: cityName,
              slug: "",
            },
          },
          filename,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      // Download the PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Complete progress
      if (progressInterval) {
        clearInterval(progressInterval);
      }
      setProgress(100);

      // Wait a moment then close popup
      setTimeout(() => {
        setIsGeneratingPDF(false);
        closePopup();
      }, 500);
    } catch (error) {
      // Clean up progress interval if it exists
      if (progressInterval) {
        clearInterval(progressInterval);
      }
      setIsGeneratingPDF(false);
      setProgress(0);
      console.error("Error:", error);
      // Error toast is already shown by the hook
      // Don't close popup on error - let user see the error and try again
    }
  };

  if (!isOpen || !course || !timing) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  return (
    <>
      {/* Popup Background */}
      <div
        className="popup-bg"
        style={{ display: isOpen ? "block" : "none" }}
        onClick={handleOverlayClick}
      />

      {/* Popup Content */}
      <div
        id="popup-3"
        className="form-popup popup"
        style={{ display: isOpen ? "block" : "none" }}
      >
        {/* Progress Bar */}
        {isGeneratingPDF && (
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-[#253a7b] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              Preparing brochure for download... {Math.round(progress)}%
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Hidden fields for course and timing data */}
          <input type="hidden" id="Course_Name" value={course.title} />
          <input type="hidden" id="Start_Date" value={timing.start_date} />
          <input type="hidden" id="End_Date" value={timing.end_date} />
          <input
            type="hidden"
            id="City"
            value={timing.city?.title || "Unknown"}
          />
          <input type="hidden" name="timing_id" id="timing_id" value={timing.id} />

          <div>
            <div className="form-title">
              <h2>تحميل بروشورالدورة</h2>
            </div>
            <div className="form-inputs">
              {/* Full Name */}
              <div className="input-container">
                <label htmlFor="name">الاسم الكامل</label>
                <input
                  type="text"
                  placeholder="الاسم الكامل"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
                {errors.name && (
                  <span className="text-red-500 text-xs" style={{ display: "block", marginTop: "4px" }}>
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Mobile Number */}
              <div className="input-container">
                <label htmlFor="mobile_number">رقم الجوال</label>
                <PhoneInput
                  id="mobile_number"
                  name="phone"
                  placeholder="e.g. +971501234567"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  onValidationChange={setIsPhoneValid}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  required
                  defaultCountry="AE"
                />
              </div>

              {/* Email */}
              <div className="input-container">
                <label htmlFor="email">البريد الإلكتروني</label>
                <input
                  type="email"
                  placeholder="يرجى تقديم عنوان بريد إلكتروني صالح"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
                {errors.email && (
                  <span className="text-red-500 text-xs" style={{ display: "block", marginTop: "4px" }}>
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Company */}
              <div className="input-container">
                <label htmlFor="company">الشركة</label>
                <input
                  type="text"
                  placeholder="الشركة"
                  id="company"
                  name="company_name"
                  value={formData.company_name}
                  onChange={(e) =>
                    handleInputChange("company_name", e.target.value)
                  }
                  required
                />
                {errors.company_name && (
                  <span className="text-red-500 text-xs" style={{ display: "block", marginTop: "4px" }}>
                    {errors.company_name}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              id="downloadPDF"
              type="submit"
              disabled={
                !recaptchaToken ||
                isPending ||
                isGeneratingPDF ||
                !isPhoneValid
              }
            >
              {isPending
                ? "جاري المعالجة..."
                : isGeneratingPDF
                ? "جاري إنشاء PDF..."
                : "تحميل PDF"}
            </button>
            <ReCaptcha
              onVerify={(token) => {
                setRecaptchaToken(token);
                setRecaptchaError("");
              }}
              onExpire={() => {
                setRecaptchaToken("");
                setRecaptchaError("reCAPTCHA expired. Please verify again.");
              }}
              onError={() => {
                setRecaptchaToken("");
                setRecaptchaError("reCAPTCHA error. Please try again.");
              }}
              action={RECAPTCHA_CONFIG.actions.download}
            />
            {recaptchaError && (
              <p
                className="recaptcha-error"
                style={{ color: "red", fontSize: "14px", marginTop: "8px" }}
              >
                {recaptchaError}
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

