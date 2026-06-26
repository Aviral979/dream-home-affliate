import Image from "next/image";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import styles from "./about.module.css";

export const metadata = {
  title: "About — Dream Home Designes",
  description: "From Kanpur, for India. A 19-year-old designer transforming rooms every day with sage, coastal, and minimalist design — all budget-friendly.",
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <BackButton />

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerImg}>
            <Image src="/7.png" alt="Designer workspace" fill className={styles.img} priority />
          </div>
          <div className={styles.headerText}>
            <span className={styles.eyebrow}>OUR STORY</span>
            <h1>From Kanpur, for India</h1>
            <p className={styles.intro}>
              I am a 19-year-old interior design enthusiast from Kanpur. My dream is simple:
              to make every Indian room beautiful on a budget. No expensive renovations,
              no permanent changes — just smart picks and creative ideas.
            </p>
          </div>
        </div>

        {/* Promise */}
        <section className={styles.promise}>
          <h2>The Dream Home Promise</h2>
          <p>
            Dream Home Designes started on Instagram — daily room transformations, sage green palettes,
            coastal vibes, Scandinavian minimalism. 66K+ followers trusted us, and now we are here —
            one place where you can actually buy everything you see in our Reels.
          </p>
          <p>
            Every product is personally curated. Every recommendation is actually available in India.
            And every pick is rental-friendly — move out and everything goes back to normal, no damage at all.
          </p>
        </section>

        {/* What you get */}
        <section className={styles.features}>
          <h2>What You Get Here</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>🎨</span>
              <h3>Daily Room Ideas</h3>
              <p>Fresh inspiration every day — from living rooms to bathrooms, for every corner of your home.</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>🔗</span>
              <h3>Paint + Furniture Links</h3>
              <p>We show it, we link it. No guessing, direct purchase from trusted Indian sellers.</p>
            </div>
            <div className={styles.featureCard}>
              <span className={styles.featureIcon}>🏠</span>
              <h3>Small-Home Tips</h3>
              <p>Real tips for Indian apartments — making small rooms look bigger, storage hacks, and more.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <h2>Ready to Transform Your Room?</h2>
          <p>Browse our curated picks and build your dream room 👇</p>
          <Link href="/shop" className="btn-primary" style={{ marginTop: 20 }}>
            Shop Now →
          </Link>
        </section>
      </div>
    </div>
  );
}
