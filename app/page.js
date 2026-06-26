"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";
import styles from "./page.module.css";

const categories = [
  { slug: "living-room", label: "Living Room", img: "/2.png" },
  { slug: "bedroom", label: "Bedroom", img: "/3.png" },
  { slug: "bathroom", label: "Bathroom", img: "/new-bathroom.jpg" },
  { slug: "kitchen", label: "Kitchen", img: "/5.png" },
  { slug: "decor", label: "Decor", img: "/6.png" },
];

export default function HomePage() {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"), limit(6));
        const snap = await getDocs(q);
        setTrending(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.log("Firestore not configured yet:", e.message);
      }
      setLoading(false);
    }
    fetchTrending();
  }, []);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className={styles.hero}>
        <Image src="/1.png" alt="Dream room transformation" fill priority className={styles.heroImg} />
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <span className={`${styles.eyebrow} animate-fade-up`}>KANPUR · INDIA</span>
          <h1 className={`${styles.headline} animate-fade-up delay-1`}>Empty Room → Dream Room</h1>
          <p className={`${styles.subtext} animate-fade-up delay-2`}>
            A 19-year-old designer. One transformation every day.<br />
            Sage • Coastal • Minimal. All budget-friendly.
          </p>
          <div className={`${styles.heroCtas} animate-fade-up delay-3`}>
            <Link href="/shop" className="btn-primary">Shop the Look</Link>
            <a href="https://www.instagram.com/dream._home_designs?igsh=MWRoamdnOGNkdXYycw==" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}>
              Follow on Instagram ↗
            </a>
          </div>
        </div>
      </section>

      {/* ═══ SHOP BY ROOM ═══ */}
      <section className={`section ${styles.roomSection} animate-fade-up delay-1`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Shop by Room</h2>
          <div className={styles.roomGrid}>
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/shop?category=${cat.slug}`} className={styles.roomTile}>
                <div className={styles.roomImgWrap}>
                  <Image src={cat.img} alt={cat.label} fill sizes="(max-width:768px) 40vw, 20vw" className={styles.roomImg} loading="lazy" />
                </div>
                <span className={styles.roomLabel}>{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRENDING PICKS ═══ */}
      <section className={`section ${styles.trendingSection} animate-fade-up delay-2`}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Trending Picks</h2>
          {loading ? (
            <div className={styles.productGrid}>
              {[...Array(6)].map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : trending.length > 0 ? (
            <div className={styles.productGrid}>
              {trending.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <p className={styles.emptyHint}>Products coming soon! Configure Firebase and add products via <Link href="/adm" style={{ color: "var(--sage)" }}>/adm</Link></p>
          )}
        </div>
      </section>

      {/* ═══ WHY DREAM HOME ═══ */}
      <section className={styles.whySection}>
        <div className={styles.whyBg}>
          <Image src="/10.png" alt="" fill className={styles.whyBgImg} loading="lazy" />
        </div>
        <div className={`container ${styles.whyInner}`}>
          <h2 className={styles.sectionTitle}>Why Dream Home Designes</h2>
          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>🔧</div>
              <h3>No Damage</h3>
              <p>Rental-friendly ideas only — no permanent changes. Move out and everything goes back to normal.</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>💰</div>
              <h3>Real Budget</h3>
              <p>Every pick is genuinely affordable, not aspirational. Real prices, real products.</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}>🇮🇳</div>
              <h3>India-First</h3>
              <p>Everything is actually deliverable in India. No "US only" disappointment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ INSTAGRAM STRIP ═══ */}
      <section className={`section ${styles.igSection}`}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className={styles.sectionTitle}>As Seen on Instagram</h2>
          <p className={styles.igSub}>66K+ followers trust us for daily room inspiration ✨</p>
          <a href="https://www.instagram.com/dream._home_designs?igsh=MWRoamdnOGNkdXYycw==" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: 24 }}>
            Follow @dream._home_designs
          </a>
        </div>
      </section>
    </>
  );
}
