"use client";
import "@/styles/forms.css";
import React, { useState, useRef, useEffect } from "react";
import Breadcrumb from "@/components/ui/breadcrumb";
import PhoneInput from "@/components/ui/phone-input";
import ReCaptcha from "@/components/ui/recaptcha";
import { hero } from "@/constants";
import { useJoinTeamForm } from "@/services/forms/forms-hooks";
import { RECAPTCHA_CONFIG } from "@/lib/recaptcha";
import { toast } from "sonner";
import { FaChevronDown } from "react-icons/fa6";
import HeroBanner from "@/components/ui/hero-banner";
import JoinSchema from "@/components/schema/join-schema";

interface Category {
  id: number;
  title: string;
}

interface JoinTeamPageProps {
  categories?: Category[];
}

// Dummy data for categories
const dummyCategories: Category[] = [
  { id: 1, title: "القيادة والإدارة" },
  { id: 2, title: "إدارة المشاريع" },
  { id: 3, title: "الموارد البشرية" },
  { id: 4, title: "المالية والمحاسبة" },
  { id: 5, title: "المبيعات والتسويق" },
  { id: 6, title: "إدارة الجودة" },
];

export default function JoinTeamPage({
  categories = dummyCategories,
}: JoinTeamPageProps) {
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    country: "",
    category_id: "",
    category_name: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvFileName, setCvFileName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string>("");
  const [recaptchaError, setRecaptchaError] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: submitJoinTeam, isPending } = useJoinTeamForm();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
      setCvFileName(file.name);
    }
  };

  const handleCategorySelect = (category: Category) => {
    setFormData((prev) => ({
      ...prev,
      category_id: category.id.toString(),
      category_name: category.title,
    }));
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecaptchaError("");

    if (!cvFile) {
      toast.error("خطأ", {
        description: "يرجى رفع سيرتك الذاتية",
      });
      return;
    }

    if (!formData.category_id) {
      toast.error("خطأ", {
        description: "يرجى اختيار فئة",
      });
      return;
    }

    // Validate reCAPTCHA
    if (!recaptchaToken) {
      setRecaptchaError("يرجى إكمال التحقق من reCAPTCHA");
      toast.error("خطأ", {
        description: "يرجى إكمال التحقق من reCAPTCHA",
      });
      return;
    }

    submitJoinTeam(
      {
        ...formData,
        cv: cvFile,
        recaptcha_token: recaptchaToken,
      },
      {
        onSuccess: () => {
          // Reset form after successful submission
          setFormData({
            full_name: "",
            phone_number: "",
            email: "",
            country: "",
            category_id: "",
            category_name: "",
          });
          setCvFile(null);
          setCvFileName("");
          setRecaptchaToken("");
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        },
        onError: () => {
          setRecaptchaToken("");
        },
      }
    );
  };

  return (
    <>
      <JoinSchema />
      <Breadcrumb currentPage="انضم إلى فريقنا" />
      <HeroBanner
        title={hero.join.title}
        description={hero.join.description}
        image={hero.join.image}
        imageAlt={hero.join.imageAlt}
        imageTitle={hero.join.imageTitle}
        type="form"
      />
      <section className="form-container">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          id="join-team-form"
        >
          <div>
            <div className="form-title">
              <h2>معلومات التواصل</h2>
            </div>
            <div className="form-inputs">
              <div className="input-container">
                <label htmlFor="name">الاسم الكامل</label>
                <input
                  required
                  type="text"
                  placeholder="الاسم الكامل"
                  id="name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  suppressHydrationWarning
                />
              </div>

              <div className="input-container">
                <PhoneInput
                  id="tel"
                  name="phone_number"
                  label="رقم الهاتف"
                  placeholder="أدخل رقم الهاتف"
                  value={formData.phone_number}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, phone_number: value }))
                  }
                  required
                />
              </div>

              <div className="input-container">
                <label htmlFor="email">البريد الإلكتروني</label>
                <input
                  required
                  type="email"
                  placeholder="hello@bscenter.org"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  suppressHydrationWarning
                />
              </div>

              <div className="input-container">
                <label htmlFor="cv">رفع السيرة الذاتية</label>
                <input
                  required
                  type="file"
                  id="cv"
                  name="cv"
                  className="input-file cursor-pointer"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  suppressHydrationWarning
                />
                <div className="upload-file" onClick={handleFileButtonClick}>
                  <img src="/icons/arrow-down-white.svg" alt="" />
                </div>
              </div>

              <div className="input-container">
                <label htmlFor="country">الدولة</label>
                <input
                  required
                  type="text"
                  placeholder="الدولة"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  suppressHydrationWarning
                />
              </div>

              <div
                className="input-container"
                style={{ position: "relative" }}
                ref={dropdownRef}
              >
                <label htmlFor="category">التخصص</label>
                <input
                  type="text"
                  placeholder="التخصص"
                  id="category-name"
                  readOnly
                  required
                  value={formData.category_name}
                  onClick={toggleDropdown}
                  suppressHydrationWarning
                />
                <input
                  type="hidden"
                  name="category_id"
                  id="category-id"
                  value={formData.category_id}
                />

                <div className="drop-down" onClick={toggleDropdown}>
                  <FaChevronDown color="#666" fontSize={14} />
                </div>
                <ul
                  className={`drop-list ${isDropdownOpen ? "show-list" : ""}`}
                >
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      data-id={category.id}
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={isPending || !recaptchaToken}>
              {isPending ? "جاري الإرسال..." : "إرسال"}
            </button>
            <ReCaptcha
              onVerify={(token) => {
                setRecaptchaToken(token);
                setRecaptchaError("");
              }}
              onExpire={() => {
                setRecaptchaToken("");
                setRecaptchaError(
                  "انتهت صلاحية reCAPTCHA. يرجى التحقق مرة أخرى."
                );
              }}
              onError={() => {
                setRecaptchaToken("");
                setRecaptchaError("خطأ في reCAPTCHA. يرجى المحاولة مرة أخرى.");
              }}
              action={RECAPTCHA_CONFIG.actions.join}
            />
            {recaptchaError && (
              <p
                className="recaptcha-error"
              >
                {recaptchaError}
              </p>
            )}
          </div>
        </form>
      </section>
    </>
  );
}
