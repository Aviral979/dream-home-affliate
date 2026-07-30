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
    let unsub1 = () => {};
    let unsub2 = () => {};
    const timeout = setTimeout(() => setLoading(false), 5000);
    try {
      unsub1 = onSnapshot(
        collection(db, "products"),
        (snap) => {
          if (snap.docs.length > 0) {
            clearTimeout(timeout);
            const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            docs.sort((a, b) => {
              const tA = a.createdAt?.seconds ? a.createdAt.seconds : (a.createdAt || 0);
              const tB = b.createdAt?.seconds ? b.createdAt.seconds : (b.createdAt || 0);
              return tB - tA;
            });
            setProducts(docs);
            setLoading(false);
          } else {
            unsub2 = onSnapshot(
              collection(db, "Products"),
              (snap2) => {
                clearTimeout(timeout);
                const docs = snap2.docs.map((d) => ({ id: d.id, ...d.data() }));
                docs.sort((a, b) => {
                  const tA = a.createdAt?.seconds ? a.createdAt.seconds : (a.createdAt || 0);
                  const tB = b.createdAt?.seconds ? b.createdAt.seconds : (b.createdAt || 0);
                  return tB - tA;
                });
                setProducts(docs);
                setLoading(false);
              },
              (err2) => {
                clearTimeout(timeout);
                setLoading(false);
              }
            );
          }
        },
        (err) => {
          clearTimeout(timeout);
          console.error("Firestore shop error:", err.message);
          setLoading(false);
        }
      );
    } catch (e) {
      clearTimeout(timeout);
      setLoading(false);
    }
    return () => { unsub1(); unsub2(); clearTimeout(timeout); };
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
    const rawCat = (p.category || p.Category || p.room || "").toLowerCase().trim();
    const catFormatted = rawCat.replace(/[\s_]+/g, "-");
    const targetCat = activeCategory.toLowerCase().trim().replace(/[\s_]+/g, "-");
    const matchCat = !targetCat || catFormatted === targetCat || catFormatted.includes(targetCat) || targetCat.includes(catFormatted);
    const nameOrTitle = (p.name || p.title || "").toLowerCase();
    const descText = (p.description || "").toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    const matchSearch = !searchTerm || nameOrTitle.includes(searchLower) || descText.includes(searchLower);
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
