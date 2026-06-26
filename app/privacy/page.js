import BackButton from "@/components/BackButton";
import styles from "../legal.module.css";

export const metadata = {
  title: "Privacy Policy — Dream Home Designes",
  description: "Privacy Policy for Dream Home Designes. Learn how we handle your data.",
};

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <BackButton />
        <h1>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: June 2026</p>

        <section className={styles.section}>
          <h2>Information We Collect</h2>
          <p>Dream Home Designes does not require user accounts or collect personal information for browsing or shopping. When you click an affiliate link, you are redirected to a third-party retailer whose own privacy policy applies.</p>
        </section>

        <section className={styles.section}>
          <h2>Cookies & Analytics</h2>
          <p>We may use basic analytics tools (such as Google Analytics or Firebase Analytics) to understand how visitors use our site. These tools may use cookies to collect anonymized data such as page views, session duration, and device type. No personally identifiable information is collected through these tools.</p>
        </section>

        <section className={styles.section}>
          <h2>Affiliate Links</h2>
          <p>Our website contains affiliate links. When you click on these links and make a purchase, we may earn a small commission at no additional cost to you. The third-party retailer handles all transaction data — we do not have access to your payment information.</p>
        </section>

        <section className={styles.section}>
          <h2>Third-Party Services</h2>
          <p>Our site may link to external websites (Instagram, YouTube, Pinterest, retailer sites). These sites have their own privacy policies, and we encourage you to review them. We are not responsible for the privacy practices of third-party websites.</p>
        </section>

        <section className={styles.section}>
          <h2>Data Security</h2>
          <p>We take reasonable measures to protect the information collected through our website. However, no method of transmission over the internet is 100% secure.</p>
        </section>

        <section className={styles.section}>
          <h2>Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at <a href="mailto:aviralkumar9793@gmail.com" style={{ color: "var(--sage)" }}>aviralkumar9793@gmail.com</a>.</p>
        </section>
      </div>
    </div>
  );
}
