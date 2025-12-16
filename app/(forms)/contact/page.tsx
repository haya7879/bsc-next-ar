"use client";
import React, { useState } from "react";
import "@/styles/contact.css";
import "@/styles/forms.css";
import Breadcrumb from "@/components/ui/breadcrumb";
import PhoneInput from "@/components/ui/phone-input";
import ReCaptcha from "@/components/ui/recaptcha";
import { useContactForm } from "@/services/forms/forms-hooks";
import { RECAPTCHA_CONFIG } from "@/lib/recaptcha";
import ContactSchema from "@/components/schema/contact-schema";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email: "",
    country: "",
    company: "",
    subject: "",
    message: "",
  });
  const [recaptchaToken, setRecaptchaToken] = useState<string>("");
  const [recaptchaError, setRecaptchaError] = useState("");
  const { mutate: submitContact, isPending } = useContactForm();

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

    submitContact(
      {
        ...formData,
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
            company: "",
            subject: "",
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

  return (
    <>
      <ContactSchema />
      <Breadcrumb items={[{ label: "اتصل بنا", href: "/contact" }]} />
      <section className="contact">
        <div className="map-desktop">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.4640475424376!2d55.26369492548013!3d25.1875686320922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6951762f80a1%3A0xdaa86de290ca47b3!2zQmFsYW5jZWQgU2NvcmUgVHJhaW5pbmcgQ2VudGVyIC0g2YXYsdmD2LIg2KfZhNij2K_Yp9ihINin2YTZhdiq2YjYp9iy2YYg2YTZhNiq2K_YsdmK2Kg!5e0!3m2!1sar!2s!4v1753010150877!5m2!1sar!2s"
            width="100%"
            height="880"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <section className="contact-form">
          <form onSubmit={handleSubmit} id="contact-form">
            <div>
              <div className="form-title">
                <h1>اتصل بنا</h1>
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
                    id="phone_number"
                    name="phone_number"
                    label="رقم الجوال"
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
                    placeholder="يرجى تقديم عنوان بريد إلكتروني صالح"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
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
                <div className="input-container">
                  <label htmlFor="subject">الموضوع</label>
                  <input
                    required
                    type="text"
                    placeholder="الموضوع"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="textarea">
                <label htmlFor="message">كيف يمكننا مساعدتك؟</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="يرجى إدخال استفسارك هنا"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
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
                action={RECAPTCHA_CONFIG.actions.contact}
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
        </section>
      </section>

      <div className="map-mobile">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28883.73386784415!2d55.261109!3d25.187478!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69d0d69e8d93%3A0x8f0fe5aa20493ae4!2sThe%20Prism!5e0!3m2!1sen!2sse!4v1723002947827!5m2!1sen!2sse"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </>
  );
}
