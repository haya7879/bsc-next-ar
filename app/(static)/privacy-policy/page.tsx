import { Metadata } from "next";
import Breadcrumb from "@/components/ui/breadcrumb";
import "@/styles/privacy.css";
import { getSeoData } from "@/services/seo/seo-services";
import PrivacySchema from "@/components/schema/privacy-schema";

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  try {
    const seoData = await getSeoData("privacy-policy");
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
      title: "Privacy Policy | Balanced Score Training Center",
      description:
        "Learn how Balanced Score Training Center protects your privacy and handles your personal data.",
      keywords: "privacy policy, data protection, GDPR",
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
      title: "Privacy Policy | Balanced Score Training Center",
      description:
        "Learn how Balanced Score Training Center protects your privacy and handles your personal data.",
      keywords: "privacy policy, data protection, GDPR",
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

export default function PrivacyPolicyPage() {
  return (
    <>
      <PrivacySchema />
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Privacy policy" }]}
      />
      <section className="privacy">
        <div className="privacy-main container-main">
          <h1>
            <strong>Privacy Policy</strong>
          </h1>

          <p>
            We respect your privacy and are committed to protecting it through
            our compliance with this privacy policy ("Policy"). This Policy
            describes the types of information we may collect from you or that
            you may provide ("Personal Information") on the{" "}
            <strong>www.bscenter.org</strong> website ("Website" or "Service")
            and any of its related products and services (collectively,
            "Services"), and our practices for collecting, using, maintaining,
            protecting, and disclosing that Personal Information. It also
            describes the choices available to you regarding our use of your
            Personal Information and how you can access and update it. This
            Policy is a legally binding agreement between you ("User," "you," or
            "your") and <strong>Balanced Score Training Center</strong>{" "}
            ("Balanced Score Training Center," "we," "us," or "our"). By
            accessing and using the Website and Services, you acknowledge that
            you have read, understood, and agree to be bound by the terms of
            this Policy. This Policy complies with{" "}
            <strong>
              UAE Federal Decree-Law No. 45 of 2021 on the Protection of
              Personal Data (PDPL)
            </strong>
            , the <strong>EU General Data Protection Regulation (GDPR)</strong>{" "}
            for users in the European Economic Area (EEA), and other applicable
            global privacy regulations.
          </p>

          <div className="privacy-items">
            <div className="privacy-item">
              <h2>
                <strong>Scope of the Policy</strong>
              </h2>
              <p>
                This Policy applies to all users globally who access or use our
                Website and Services. It outlines how we collect, use, and
                manage Personal Information, ensuring compliance with local and
                international privacy laws.
              </p>
            </div>

            <div className="privacy-item">
              <h2>
                <strong>Collection of Personal Information</strong>
              </h2>
              <p>We may collect the following types of Personal Information:</p>
              <ul>
                <li>
                  <strong>Contact Information</strong> (e.g., name, email
                  address, phone number).
                </li>
                <li>
                  <strong>Demographic Information</strong> (e.g., country of
                  residence).
                </li>
                <li>
                  <strong>Transaction Information</strong> (e.g., payment
                  details, billing address).
                </li>
                <li>
                  <strong>Technical Information</strong> (e.g., IP address,
                  browser type).
                </li>
              </ul>
            </div>

            <div className="privacy-item">
              <h2>
                <strong>Use and Processing of Personal Information</strong>
              </h2>
              <p>
                Your Personal Information may be used for the following
                purposes:
              </p>
              <ol>
                <li>Provide and manage access to our Services.</li>
                <li>Process transactions and payments.</li>
                <li>Respond to inquiries and provide support.</li>
                <li>
                  Send promotional and marketing materials (with consent).
                </li>
                <li>Comply with legal and regulatory obligations.</li>
                <li>Improve and customize user experience.</li>
              </ol>
            </div>

            <div className="privacy-item">
              <h2>
                <strong>Contact Us</strong>
              </h2>
              <p>
                For any questions or to exercise your privacy rights, please
                contact:
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
