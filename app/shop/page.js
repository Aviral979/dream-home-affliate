"use client";
import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";
import BackButton from "@/components/BackButton";
import styles from "./shop.module.css";

const CATEGORIES = [
  { slug: "", label: "All" },
  { slug: "living-room", label: "Living Room" },
  { slug: "bedroom", label: "Bedroom" },
  { slug: "bathroom", label: "Bathroom" },
  { slug: "kitchen", label: "Kitchen" },
  { slug: "decor", label: "Decor" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get("category") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let unsub = () => {};
    const timeout = setTimeout(() => setLoading(false), 3000);
    try {
      const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
      unsub = onSnapshot(
        q,
        (snap) => {
          clearTimeout(timeout);
          setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
          setLoading(false);
        },
        (err) => {
          clearTimeout(timeout);
          console.log("Firestore not configured yet:", err.message);
          setLoading(false);
        }
      );
    } catch (e) {
      clearTimeout(timeout);
      setLoading(false);
    }
    return () => { unsub(); clearTimeout(timeout); };
  }, []);

  const setCategory = useCallback(
    (slug) => {
      const params = new URLSearchParams();
      if (slug) params.set("category", slug);
      router.push(`/shop${slug ? `?${params}` : ""}`, { scroll: false });
    },
    [router]
  );

  const filtered = products.filter((p) => {
    // Convert legacy formats like "Living Room" to "living-room" for matching
    const catFormatted = p.category ? p.category.toLowerCase().replace(/\s+/g, "-") : "";
    const matchCat = !activeCategory || catFormatted === activeCategory;
    const matchSearch =
      !searchTerm ||
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className={styles.page}>
      <div className="container">
        <BackButton />
        <h1 className={styles.title}>Shop</h1>
        <p className={styles.disclosure}>
          Dream Home Designes uses affiliate links — we may earn a small commission on some purchases at no extra cost to you.
        </p>

        {/* Filters */}
        <div className={styles.filterBar}>
          <div className={styles.chips}>
            {CATEGORIES.map((c) => (
              <button
                key={c.slug}
                className={`${styles.chip} ${activeCategory === c.slug ? styles.chipActive : ""}`}
                onClick={() => setCategory(c.slug)}
              >
                {c.label}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.search}
          />
        </div>

        {/* Grid */}
        {loading ? (
          <div className={styles.grid}>
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <div className={styles.emptyImg}>
              <Image src="/9.png" alt="No products yet" width={200} height={200} />
            </div>
            <p className={styles.emptyText}>New products are being added, coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className={styles.page}>
        <div className="container">
          <h1 className={styles.title}>Shop</h1>
          <div className={styles.grid}>
            {[...Array(8)].map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
