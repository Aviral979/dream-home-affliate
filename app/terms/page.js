import BackButton from "@/components/BackButton";
import styles from "../legal.module.css";

export const metadata = {
  title: "Terms of Service — Dream Home Designes",
  description: "Terms of Service for Dream Home Designes.",
};

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <BackButton />
        <h1>Terms of Service</h1>
        <p className={styles.updated}>Last updated: June 2026</p>

        <section className={styles.section}>
          <h2>Acceptance of Terms</h2>
          <p>By accessing and using the Dream Home Designes website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.</p>
        </section>

        <section className={styles.section}>
          <h2>Nature of Service</h2>
          <p>Dream Home Designes is a home decor inspiration and product curation platform. We provide affiliate links to products sold by third-party retailers. We do not sell products directly, process payments, or handle shipping. All purchases are made through and governed by the respective retailer's terms.</p>
        </section>

        <section className={styles.section}>
          <h2>Affiliate Links</h2>
          <p>Product links on our site are affiliate links. We may earn a commission when you make a purchase through these links at no extra cost to you. Product availability, pricing, and shipping are determined by the third-party retailer and may change without notice.</p>
        </section>

        <section className={styles.section}>
          <h2>Intellectual Property</h2>
          <p>All content on this website — including text, images, graphics, and design — is the property of Dream Home Designes unless otherwise stated. You may not reproduce, distribute, or use our content without prior written permission.</p>
        </section>

        <section className={styles.section}>
          <h2>Disclaimer</h2>
          <p>The content on this website is provided "as is" without warranties of any kind. We strive to keep product information accurate, but we cannot guarantee that all details (prices, availability, descriptions) are current at all times. Always verify details on the retailer's website before purchasing.</p>
        </section>

        <section className={styles.section}>
          <h2>Limitation of Liability</h2>
          <p>Dream Home Designes shall not be liable for any direct, indirect, or consequential damages arising from the use of our website or the products linked from it. Any disputes regarding purchases should be directed to the respective retailer.</p>
        </section>

        <section className={styles.section}>
          <h2>Contact</h2>
          <p>For questions regarding these terms, contact us at <a href="mailto:aviralkumar9793@gmail.com" style={{ color: "var(--sage)" }}>aviralkumar9793@gmail.com</a>.</p>
        </section>
      </div>
    </div>
  );
}
