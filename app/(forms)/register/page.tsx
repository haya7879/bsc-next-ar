"use client";
import "@/styles/forms.css";
import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Force dynamic rendering to prevent static generation errors
export const dynamic = 'force-dynamic';
import Breadcrumb from "@/components/ui/breadcrumb";
import PhoneInput from "@/components/ui/phone-input";
import ReCaptcha from "@/components/ui/recaptcha";
import { hero } from "@/constants";
import { useRegisterForm } from "@/services/forms/forms-hooks";
import { useCourseDetails } from "@/services/courses/courses-hooks";
import { RECAPTCHA_CONFIG } from "@/lib/recaptcha";
import HeroBanner from "@/components/ui/hero-banner";
import LoadingState from "@/components/ui/loading-state";

function RegisterPageContent() {
  const searchParams = useSearchParams();
  const courseSlug = searchParams?.get("course_slug") || "";
  const timingId = searchParams?.get("timing_id") || "";

  // Fetch course details if course_slug is provided
  const { data: courseData } = useCourseDetails(courseSlug || "");

  const [formData, setFormData] = useState({
    full_name: "",
    mobile: "",
    email: "",
    job_title: "",
    company_name: "",
    country: "",
    city: "",
    responsible_name: "",
    responsible_mobile_display: "",
    responsible_mobile: "",
    responsible_email: "",
    responsible_position: "",
  });
  const [recaptchaToken, setRecaptchaToken] = useState<string>("");
  const [recaptchaError, setRecaptchaError] = useState("");

  const { mutate: submitRegister, isPending } = useRegisterForm();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecaptchaError("");

    // Validate reCAPTCHA
    if (!recaptchaToken) {
      setRecaptchaError("يرجى إكمال التحقق من reCAPTCHA");
      return;
    }

    submitRegister(
      {
        ...formData,
        timing_id: timingId,
        recaptcha_token: recaptchaToken,
      },
      {
        onSuccess: () => {
          // Reset form after successful submission
          setFormData({
            full_name: "",
            mobile: "",
            email: "",
            job_title: "",
            company_name: "",
            country: "",
            city: "",
            responsible_name: "",
            responsible_mobile_display: "",
            responsible_mobile: "",
            responsible_email: "",
            responsible_position: "",
          });
          setRecaptchaToken("");
        },
        onError: () => {
          setRecaptchaToken("");
        },
      }
    );
  };
  // Build breadcrumb items
  const breadcrumbItems = courseData?.course.title
    ? [
        { label: "الدورات التدريبية", href: "/training-courses" },
        { label: courseData?.course?.title || "" },
        { label: "التسجيل" },
      ]
    : [{ label: "التسجيل" }];
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <HeroBanner
        title={hero.register.title}
        description={hero.register.description}
        image={hero.register.image}
        imageAlt={hero.register.imageAlt}
        imageTitle={hero.register.imageTitle}
        type="form"
      />
      <section className="form-container">
        <form onSubmit={handleSubmit} id="registration-form">
          <div>
            <div className="form-title">
              <h2>معلومات المشترك</h2>
            </div>
            <div className="form-inputs">
              <div className="input-container">
                <label htmlFor="name">الاسم الكامل</label>
                <input
                  type="text"
                  placeholder="الاسم الكامل للمشارك"
                  id="name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-container">
                <PhoneInput
                  id="tel"
                  name="mobile"
                  label="رقم الجوال"
                  placeholder="أدخل رقم الهاتف"
                  value={formData.mobile}
                  onChange={(value) => setFormData((prev) => ({ ...prev, mobile: value }))}
                  required
                />
              </div>

              <div className="input-container">
                <label htmlFor="email">البريد الإلكتروني</label>
                <input
                  type="email"
                  placeholder="بريد إلكتروني عمل صالح"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-container">
                <label htmlFor="position">المسمى الوظيفي</label>
                <input
                  type="text"
                  placeholder="المسمى الوظيفي للمشارك"
                  id="position"
                  name="job_title"
                  value={formData.job_title}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <div className="form-title">
              <h2>معلومات الشركة</h2>
            </div>
            <div className="form-inputs">
              <div className="input-container">
                <label htmlFor="company">اسم الشركة</label>
                <input
                  type="text"
                  placeholder="اسم الشركة"
                  id="company"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-container">
                <label htmlFor="country">الدولة</label>
                <input
                  type="text"
                  placeholder="الدولة"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-container">
                <label htmlFor="city">المدينة</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="المدينة"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <div className="form-title">
              <h3>
                الشخص المسؤول عن التدريب والتطوير في الشركة
              </h3>
            </div>
            <div className="form-inputs">
              <div className="input-container">
                <label htmlFor="name2">الاسم الكامل</label>
                <input
                  type="text"
                  placeholder="الاسم الكامل للمسؤول"
                  id="name2"
                  name="responsible_name"
                  value={formData.responsible_name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-container">
                <PhoneInput
                  id="number2"
                  name="responsible_mobile"
                  label="رقم الجوال"
                  placeholder="أدخل رقم الهاتف"
                  value={formData.responsible_mobile_display || formData.responsible_mobile}
                  onChange={(value) => setFormData((prev) => ({ 
                    ...prev, 
                    responsible_mobile: value,
                    responsible_mobile_display: value 
                  }))}
                  required
                />
              </div>

              <div className="input-container">
                <label htmlFor="email2">البريد الإلكتروني</label>
                <input
                  type="email"
                  placeholder="بريد إلكتروني عمل صالح للمسؤول"
                  name="responsible_email"
                  id="email2"
                  value={formData.responsible_email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="input-container">
                <label htmlFor="position2">المنصب</label>
                <input
                  type="text"
                  placeholder="مثال: مدير التدريب، مسؤول الموارد البشرية، أخصائي التطوير والتعلم"
                  name="responsible_position"
                  id="position2"
                  value={formData.responsible_position}
                  onChange={handleInputChange}
                  required
                />
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
                setRecaptchaError("انتهت صلاحية reCAPTCHA. يرجى التحقق مرة أخرى.");
              }}
              onError={() => {
                setRecaptchaToken("");
                setRecaptchaError("خطأ في reCAPTCHA. يرجى المحاولة مرة أخرى.");
              }}
              action={RECAPTCHA_CONFIG.actions.register}
            />
            {recaptchaError && (
              <p className="recaptcha-error" style={{ color: "red", fontSize: "14px", marginTop: "8px" }}>
                {recaptchaError}
              </p>
            )}
          </div>

          <input
            type="hidden"
            id="timing_id"
            name="timing_id"
            value={timingId}
          />
        </form>
      </section>
    </>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<LoadingState title="جاري التحميل..." message="يرجى الانتظار..." />}>
      <RegisterPageContent />
    </Suspense>
  );
}
