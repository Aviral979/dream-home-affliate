"use client";
import Image from "next/image";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
  const imgSource = product.imageUrl || product.image || product.img || "/9.png";
  const titleText = product.name || product.title || "Dream Home Pick";

  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={imgSource}
          alt={titleText}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className={styles.image}
          loading="lazy"
        />
        {product.badge && <span className={styles.badge}>{product.badge}</span>}
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{titleText}</h3>
        <p className={styles.desc}>{product.description}</p>
        <span className={styles.category}>{product.category?.replace("-", " ")}</span>
        <a
          href={product.affiliateLink}
          target="_blank"
          rel="nofollow sponsored noopener"
          className={styles.buyBtn}
        >
          Buy Now →
        </a>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={`${styles.imageWrap} skeleton`} />
      <div className={styles.info}>
        <div className="skeleton" style={{ height: 18, width: "70%", marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 14, width: "100%", marginBottom: 6 }} />
        <div className="skeleton" style={{ height: 14, width: "50%", marginBottom: 12 }} />
        <div className="skeleton" style={{ height: 44, width: "100%", borderRadius: 14 }} />
      </div>
    </div>
  );
}
