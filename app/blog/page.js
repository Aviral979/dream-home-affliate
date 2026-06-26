"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import BackButton from "@/components/BackButton";
import styles from "./blog.module.css";

function BlogCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={`${styles.cardImg} skeleton`} />
      <div className={styles.cardBody}>
        <div className="skeleton" style={{ height: 20, width: "80%", marginBottom: 10 }} />
        <div className="skeleton" style={{ height: 14, width: "100%", marginBottom: 6 }} />
        <div className="skeleton" style={{ height: 14, width: "60%" }} />
      </div>
    </div>
  );
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub = () => {};
    const timeout = setTimeout(() => setLoading(false), 3000);
    try {
      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      unsub = onSnapshot(
        q,
        (snap) => {
          clearTimeout(timeout);
          setBlogs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
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

  return (
    <div className={styles.page}>
      <div className="container">
        <BackButton />
        <h1 className={styles.title}>Blog</h1>
        <p className={styles.subtitle}>Design tips, room transformation ideas, and home decor inspiration.</p>

        {loading ? (
          <div className={styles.grid}>
            {[...Array(6)].map((_, i) => <BlogCardSkeleton key={i} />)}
          </div>
        ) : blogs.length > 0 ? (
          <div className={styles.grid}>
            {blogs.map((blog) => (
              <a
                key={blog.id}
                href={blog.bloggerLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
              >
                <div className={styles.cardImg}>
                  {blog.imageUrl && (
                    <Image
                      src={blog.imageUrl}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={styles.img}
                      loading="lazy"
                    />
                  )}
                </div>
                <div className={styles.cardBody}>
                  <h2 className={styles.cardTitle}>{blog.title}</h2>
                  {blog.excerpt && <p className={styles.cardExcerpt}>{blog.excerpt}</p>}
                  <span className={styles.readMore}>Read Full Article →</span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <Image src="/9.png" alt="No blogs yet" width={180} height={180} />
            <p>Blog posts are coming soon! Stay tuned.</p>
          </div>
        )}
      </div>
    </div>
  );
}
