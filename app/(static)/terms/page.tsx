import { Metadata } from "next";
import Breadcrumb from "@/components/ui/breadcrumb";
import "@/styles/privacy.css";
import { getSeoData } from "@/services/seo/seo-services";
import TermSchema from "@/components/schema/term-schema";

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await getSeoData("terms");
    if (seoData && seoData.seo) {
      const seo = seoData.seo;

      return {
        title: seo.meta_title,
        description: seo.meta_description,
        keywords: seo.meta_keywords,
        robots: {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
        openGraph: {
          title: seo.meta_title,
          description: seo.meta_description,
          images: [
            {
              url: seo.meta_image,
              width: 1200,
              height: 630,
              alt: seo.meta_title,
            },
          ],
          type: "website",
          url: seo.canonical,
        },
        twitter: {
          card: "summary_large_image",
          title: seo.meta_title,
          description: seo.meta_description,
          images: [seo.meta_image],
        },
        alternates: {
          canonical: seo.canonical,
        },
      };
    }
    // Fallback metadata
    return {
      title: "Terms & Conditions | Balanced Score Training Center",
      description:
        "Read our terms and conditions for using Balanced Score Training Center services.",
      keywords: "terms, conditions, legal",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);

    // Fallback metadata
    return {
      title: "Terms & Conditions | Balanced Score Training Center",
      description:
        "Read our terms and conditions for using Balanced Score Training Center services.",
      keywords: "terms, conditions, legal",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  }
}

export default function TermsPage() {
  return (
    <>
      <TermSchema />
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Terms & conditions" }]}
      />
      <section className="privacy">
        <div className="privacy-main container-main">
          <h1>
            <strong>Terms & Conditions</strong>
          </h1>

          <p>
            Welcome to the Balanced Score Training Center. By accessing or using
            our website www.bscenter.org ("Website"), services, or any related
            products (collectively referred to as "Services"), you agree to
            comply with and be bound by these Terms and Conditions ("Terms"). If
            you do not agree to these Terms, please do not use our Services.
            These Terms constitute a legally binding agreement between you
            ("User," "you," or "your") and Balanced Score Training Center
            ("Balanced Score Training Center," "we," "us," or "our"),
            headquartered in the United Arab Emirates with global operations.
          </p>

          <div className="privacy-items">
            <div className="privacy-item">
              <h2>
                <strong>Acceptance of Terms</strong>
              </h2>
              <p>
                By accessing or using our Services, you confirm that you have
                read, understood, and agree to these Terms. You also agree to
                comply with all applicable local, national, and international
                laws and regulations. If you do not agree to these Terms, you
                are not authorized to use our Services.
              </p>
            </div>

            <div className="privacy-item">
              <h2>
                <strong>Eligibility</strong>
              </h2>
              <p>To access and use our Services, you must:</p>
              <p>
                1. Be at least 18 years old or the age of majority in your
                jurisdiction.
              </p>
              <p>
                2. Have the legal capacity to enter into a binding agreement.
              </p>
              <p>
                3. Ensure that your use of our Services does not violate any
                applicable laws in your jurisdiction.
              </p>
            </div>

            <div className="privacy-item">
              <h2>
                <strong>Changes to the Terms</strong>
              </h2>
              <p>
                We reserve the right to update these Terms at any time. Changes
                will be effective immediately upon posting to our Website unless
                otherwise specified. You are encouraged to review these Terms
                periodically. Continued use of our Services after changes have
                been made signifies your acceptance of the revised Terms.
              </p>
            </div>

            <div className="privacy-item">
              <h2>
                <strong>Global Service Scope</strong>
              </h2>
              <p>
                We operate globally, providing training and professional
                development services to users worldwide. While our headquarters
                are based in the United Arab Emirates, our Services comply with
                relevant international laws, including:
              </p>
              <ul>
                <li>UAE Federal Laws.</li>
                <li>
                  General Data Protection Regulation (GDPR) for users in the
                  European Union (EU).
                </li>
                <li>
                  California Consumer Privacy Act (CCPA) for California
                  residents.
                </li>
              </ul>
            </div>

            <div className="privacy-item">
              <h2>
                <strong>Account Registration</strong>
              </h2>
              <p>
                To access certain features of our Services, you may need to
                create an account. By registering, you agree to:
              </p>
              <p>1. Provide accurate, up-to-date, and complete information.</p>
              <p>2. Keep your account credentials confidential.</p>
              <p>
                3. Notify us immediately of any unauthorized access or misuse of
                your account.
              </p>
              <p>
                You are responsible for all activities that occur under your
                account. We reserve the right to suspend or terminate accounts
                that violate these Terms or applicable laws.
              </p>
            </div>

            <div className="privacy-item">
              <h2>
                <strong>Fees and Payments</strong>
              </h2>
              <p>
                1. Pricing: All fees for our Services are displayed on our
                Website or provided in separate agreements. Fees may vary based
                on customization, location, or additional features.
              </p>
              <p>
                2. Payment Terms: Payment must be made in full via approved
                methods (credit card, bank transfer, or online payment
                gateways).
              </p>
              <p>
                3. Refund Policy: Refunds will be processed according to our
                refund policy, detailed on our Website. Refund eligibility may
                vary based on the nature of the Services purchased.
              </p>
              <p>
                4. Taxes: Users are responsible for any applicable taxes in
                their jurisdiction.
              </p>
            </div>

            <div className="privacy-item">
              <h2>
                <strong>Intellectual Property</strong>
              </h2>
              <p>
                All materials, content, and intellectual property available on
                our Website and through our Services are owned by or licensed to
                Balanced Score Training Center. These include, but are not
                limited to, training materials, course content, videos, images,
                and branding elements. You are granted a limited, non-exclusive,
                non-transferable license to use these materials for personal or
                organizational purposes. Unauthorized use, reproduction, or
                distribution is strictly prohibited.
              </p>
            </div>

            <div className="privacy-item">
              <h2>
                <strong>User Obligations</strong>
              </h2>
              <p>By using our Services, you agree not to:</p>
              <p>
                1. Engage in any activities that are unlawful, fraudulent, or
                harmful to others.
              </p>
              <p>
                2. Violate the intellectual property rights of Balanced Score
                Training Center or third parties.
              </p>
              <p>
                3. Disrupt the security or functionality of the Website or
                Services.
              </p>
              <p>4. Provide false or misleading information.</p>
              <p>
                5. Attempt to access our systems or data without authorization.
              </p>
            </div>

            <div className="privacy-item">
              <h2>
                <strong>Data Protection and Privacy</strong>
              </h2>
              <p>
                Your use of our Services is subject to our Privacy Policy, which
                outlines how we collect, use, and protect your data. We comply
                with global data protection regulations, including:
              </p>
              <ul>
                <li>
                  GDPR (EU residents) for transparency, user rights, and secure
                  data processing.
                </li>
                <li>
                  CCPA (California residents) for disclosures and user control
                  over personal data.
                </li>
                <li>
                  UAE Federal Data Protection Law (PDPL) for local and regional
                  compliance.
                </li>
              </ul>
            </div>

            <div className="privacy-item">
              <h2>
                <strong>Disclaimer of Warranties</strong>
              </h2>
              <p>
                Our Services are provided on an "as is" and "as available"
                basis. While we strive to deliver high-quality services, we do
                not guarantee:
              </p>
              <p>
                1. Uninterrupted or error-free operation of the Website or
                Services.
              </p>
              <p>2. That the Services will meet your specific requirements.</p>
              <p>
                3. The accuracy or reliability of any content or information.
              </p>
              <p>
                To the maximum extent permitted by law, we disclaim all
                warranties, express or implied.
              </p>
            </div>

            <div className="privacy-item">
              <h2>
                <strong>Limitation of Liability</strong>
              </h2>
              <p>
                To the fullest extent permitted by law, Balanced Score Training
                Center shall not be liable for any:
              </p>
              <p>1. Indirect, incidental, special, or consequential damages.</p>
              <p>2. Loss of revenue, profits, or data.</p>
              <p>
                3. Damages arising from the use or inability to use our
                Services.
              </p>
              <p>
                Our total liability shall not exceed the fees you paid for the
                specific Services in question.
              </p>
            </div>

            <div className="privacy-item">
              <h2>
                <strong>Indemnification</strong>
              </h2>
              <p>
                You agree to indemnify and hold Balanced Score Training Center,
                its affiliates, officers, and employees harmless from any
                claims, liabilities, damages, or expenses arising from your use
                of our Services or breach of these Terms.
              </p>
            </div>

            <div className="privacy-item">
              <h2>
                <strong>Termination of Services</strong>
              </h2>
              <p>
                We reserve the right to suspend or terminate your access to the
                Services at any time, without notice, if you violate these
                Terms, applicable laws, or engage in conduct that harms our
                business or other users.
              </p>
            </div>

            <div className="privacy-item">
              <h2>
                <strong>Governing Law and Jurisdiction</strong>
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance
                with the laws of the United Arab Emirates. For disputes arising
                from these Terms, the courts of the UAE shall have exclusive
                jurisdiction. For global users, we aim to comply with applicable
                local laws. In cases of conflict, mandatory local regulations
                will prevail.
              </p>
            </div>

            <div className="privacy-item">
              <h2>
                <strong>Third-Party Links</strong>
              </h2>
              <p>
                Our Website may include links to external websites or services.
                These links are provided for convenience, and we do not endorse
                or take responsibility for the content, policies, or practices
                of third-party sites.
              </p>
            </div>

            <div className="privacy-item">
              <h2>
                <strong>Contact Information</strong>
              </h2>
              <p>
                If you have any questions or concerns regarding these Terms,
                please contact us:
              </p>
              <p>
                <strong>Balanced Score Training Center</strong>
              </p>
              <p>
                Email: <a href="mailto:info@bscenter.org">info@bscenter.org</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
