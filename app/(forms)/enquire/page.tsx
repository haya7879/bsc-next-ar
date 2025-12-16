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
import { useEnquireForm } from "@/services/forms/forms-hooks";
import { useCourseDetails } from "@/services/courses/courses-hooks";
import { RECAPTCHA_CONFIG } from "@/lib/recaptcha";
import HeroBanner from "@/components/ui/hero-banner";
import LoadingState from "@/components/ui/loading-state";

function EnquirePageContent() {
  const searchParams = useSearchParams();
  const courseSlug = searchParams?.get("course_slug") || "";
  const timingId = searchParams?.get("timing_id") || "";

  // Fetch course details if course_slug is provided
  const { data: courseData } = useCourseDetails(courseSlug || "");

  const [formData, setFormData] = useState({
    full_name: "",
    mobile: "",
    email: "",
    company: "",
    country: "",
    city: "",
    message: "",
  });
  const [recaptchaToken, setRecaptchaToken] = useState<string>("");
  const [recaptchaError, setRecaptchaError] = useState("");

  const { mutate: submitEnquire, isPending } = useEnquireForm();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

    submitEnquire(
      {
        ...formData,
        timing_id: timingId,
        course_slug: courseSlug || undefined,
        recaptcha_token: recaptchaToken,
      },
      {
        onSuccess: () => {
          // Reset form after successful submission
          setFormData({
            full_name: "",
            mobile: "",
            email: "",
            company: "",
            country: "",
            city: "",
            message: "",
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
  const breadcrumbItems = courseData?.course
    ? [
        { label: "الدورات التدريبية", href: "/training-courses" },
        { label: courseData.course.title },
        { label: "استفسار" },
      ]
    : [{ label: "استفسار" }];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <HeroBanner
        title={hero.enquire.title}
        description={hero.enquire.description}
        image={hero.enquire.image}
        imageAlt={hero.enquire.imageAlt}
        imageTitle={hero.enquire.imageTitle}
        type="form"
      />
      <section className="form-container">
        <form onSubmit={handleSubmit} action="#" method="POST">
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
                />
              </div>

              <div className="input-container">
                <PhoneInput
                  id="mobile_number"
                  name="mobile_number"
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
                  required
                  type="email"
                  placeholder="يرجى تقديم عنوان بريد إلكتروني صالح"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-container" style={{ position: "relative" }}>
                <label htmlFor="course">الدورة</label>
                <input
                  required
                  type="text"
                  value={courseSlug}
                  id="course"
                  readOnly
                />
              </div>

              <div className="input-container">
                <label htmlFor="company">الشركة</label>
                <input
                  required
                  type="text"
                  placeholder="الشركة"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-container" style={{ position: "relative" }}>
                <label htmlFor="country">الدولة</label>
                <input
                  required
                  type="text"
                  placeholder="الدولة"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-container">
                <label htmlFor="city">المدينة</label>
                <input
                  required
                  type="text"
                  placeholder="المدينة"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="textarea">
            <label htmlFor="message">كيف يمكننا مساعدتك؟</label>
            <textarea
              required
              id="message"
              name="message"
              placeholder="يرجى إدخال استفسارك هنا"
              value={formData.message}
              onChange={handleInputChange}
            />
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
              action={RECAPTCHA_CONFIG.actions.inquire}
            />
            {recaptchaError && (
              <p className="recaptcha-error" style={{ color: "red", fontSize: "14px", marginTop: "8px" }}>
                {recaptchaError}
              </p>
            )}
          </div>

          <input
            required
            type="hidden"
            value={timingId}
            id="timing_id"
            name="timing_id"
          />
        </form>
      </section>
    </>
  );
}

export default function EnquirePage() {
  return (
    <Suspense fallback={<LoadingState title="جاري التحميل..." message="يرجى الانتظار..." />}>
      <EnquirePageContent />
    </Suspense>
  );
}
