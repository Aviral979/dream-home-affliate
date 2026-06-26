import BackButton from "@/components/BackButton";
import styles from "../legal.module.css";

export const metadata = {
  title: "Affiliate Disclosure — Dream Home Designes",
  description: "Affiliate Disclosure for Dream Home Designes. Transparency about how we earn.",
};

export default function AffiliateDisclosurePage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <BackButton />
        <h1>Affiliate Disclosure</h1>
        <p className={styles.updated}>Last updated: June 2026</p>

        <section className={styles.section}>
          <h2>How We Earn</h2>
          <p>Dream Home Designes is a participant in various affiliate marketing programs. This means that when you click on product links on our website and make a purchase from the retailer, we may earn a small commission.</p>
        </section>

        <section className={styles.section}>
          <h2>No Extra Cost to You</h2>
          <p>Using our affiliate links does not cost you anything extra. The price you pay is exactly the same as if you had visited the retailer directly. Our commission comes from the retailer, not from your pocket.</p>
        </section>

        <section className={styles.section}>
          <h2>Our Promise</h2>
          <p>We only recommend products that we genuinely believe will help you create a beautiful home on a budget. Our recommendations are based on design merit, affordability, and availability in India — not on commission rates. We will never recommend a product solely because it pays a higher commission.</p>
        </section>

        <section className={styles.section}>
          <h2>Transparency</h2>
          <p>We believe in full transparency. Every product link on this website is an affiliate link unless explicitly stated otherwise. We display this disclosure on our Shop page and in our website footer so you are always informed.</p>
        </section>

        <section className={styles.section}>
          <h2>Questions?</h2>
          <p>If you have any questions about our affiliate partnerships, feel free to reach out at <a href="mailto:aviralkumar9793@gmail.com" style={{ color: "var(--sage)" }}>aviralkumar9793@gmail.com</a>.</p>
        </section>
      </div>
    </div>
  );
}
