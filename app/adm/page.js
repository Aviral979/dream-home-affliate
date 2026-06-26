"use client";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection, query, orderBy, onSnapshot,
  addDoc, updateDoc, deleteDoc, doc, serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import styles from "./adm.module.css";

const BADGE_OPTIONS = ["Bestseller", "New", "Editor's Pick", "Budget Pick", "Custom"];
const CAT_OPTIONS = [
  { value: "living-room", label: "Living Room" },
  { value: "bedroom", label: "Bedroom" },
  { value: "bathroom", label: "Bathroom" },
  { value: "kitchen", label: "Kitchen" },
  { value: "decor", label: "Decor" },
];

const emptyProductForm = { name: "", imageUrl: "", description: "", badge: "", customBadge: "", affiliateLink: "", category: "living-room" };
const emptyBlogForm = { title: "", imageUrl: "", excerpt: "", bloggerLink: "" };

export default function AdmPage() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState("products");

  // Products state
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState(emptyProductForm);
  const [editProductId, setEditProductId] = useState(null);

  // Blogs state
  const [blogs, setBlogs] = useState([]);
  const [blogForm, setBlogForm] = useState(emptyBlogForm);
  const [editBlogId, setEditBlogId] = useState(null);

  const [toast, setToast] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [deleteType, setDeleteType] = useState("");

  // Custom Auth listener (Bypass Firebase Auth)
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("dream_admin_auth");
    if (isLoggedIn === "true") {
      setUser({ id: "admin" });
    }
    setAuthLoading(false);
  }, []);

  // Products listener
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [user]);

  // Blogs listener
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setBlogs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [user]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");
    if (username === "bcp25398" && password === "Aviral@2007") {
      localStorage.setItem("dream_admin_auth", "true");
      setUser({ id: "admin" });
    } else {
      setLoginError("Invalid ID or Password.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("dream_admin_auth");
    setUser(null);
  };

  // ─── PRODUCT CRUD ───
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const badge = productForm.badge === "Custom" ? productForm.customBadge : productForm.badge || null;
    const data = {
      name: productForm.name, imageUrl: productForm.imageUrl,
      description: productForm.description, badge,
      affiliateLink: productForm.affiliateLink,
      category: productForm.category, updatedAt: serverTimestamp(),
    };
    try {
      if (editProductId) {
        await updateDoc(doc(db, "products", editProductId), data);
        showToast("Product updated! ✅");
      } else {
        await addDoc(collection(db, "products"), { ...data, createdAt: serverTimestamp() });
        showToast("Product added! 🎉");
      }
      setProductForm(emptyProductForm);
      setEditProductId(null);
    } catch (err) { showToast("Error: " + err.message); }
  };

  const startEditProduct = (p) => {
    const isCustom = p.badge && !["Bestseller", "New", "Editor's Pick", "Budget Pick"].includes(p.badge);
    setProductForm({
      name: p.name, imageUrl: p.imageUrl, description: p.description,
      badge: isCustom ? "Custom" : (p.badge || ""), customBadge: isCustom ? p.badge : "",
      affiliateLink: p.affiliateLink, category: p.category,
    });
    setEditProductId(p.id);
    setActiveTab("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ─── BLOG CRUD ───
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: blogForm.title, imageUrl: blogForm.imageUrl,
      excerpt: blogForm.excerpt, bloggerLink: blogForm.bloggerLink,
      updatedAt: serverTimestamp(),
    };
    try {
      if (editBlogId) {
        await updateDoc(doc(db, "blogs", editBlogId), data);
        showToast("Blog updated! ✅");
      } else {
        await addDoc(collection(db, "blogs"), { ...data, createdAt: serverTimestamp() });
        showToast("Blog published! 🎉");
      }
      setBlogForm(emptyBlogForm);
      setEditBlogId(null);
    } catch (err) { showToast("Error: " + err.message); }
  };

  const startEditBlog = (b) => {
    setBlogForm({ title: b.title, imageUrl: b.imageUrl, excerpt: b.excerpt || "", bloggerLink: b.bloggerLink });
    setEditBlogId(b.id);
    setActiveTab("blogs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ─── DELETE ───
  const handleDelete = async (id, type) => {
    try {
      await deleteDoc(doc(db, type, id));
      showToast(`${type === "products" ? "Product" : "Blog"} deleted 🗑️`);
    } catch (err) { showToast("Error: " + err.message); }
    setConfirmDelete(null);
    setDeleteType("");
  };

  const updateProductField = (field, value) => setProductForm((f) => ({ ...f, [field]: value }));
  const updateBlogField = (field, value) => setBlogForm((f) => ({ ...f, [field]: value }));

  if (authLoading) return <div className={styles.page}><p style={{ textAlign: "center", padding: 100 }}>Loading...</p></div>;

  // ─── LOGIN ───
  if (!user) {
    return (
      <div className={styles.page}>
        <div className={styles.loginCard}>
          <h1 className={styles.loginTitle}>🔒 Admin Login</h1>
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <input type="text" placeholder="Admin ID" value={username} onChange={(e) => setUsername(e.target.value)} required className={styles.input} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className={styles.input} />
            {loginError && <p className={styles.error}>{loginError}</p>}
            <button type="submit" className="btn-primary" style={{ width: "100%" }}>Sign In</button>
          </form>
        </div>
      </div>
    );
  }

  // ─── DASHBOARD ───
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.topBar}>
          <h1>Admin Dashboard</h1>
          <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${activeTab === "products" ? styles.tabActive : ""}`} onClick={() => setActiveTab("products")}>
            Products ({products.length})
          </button>
          <button className={`${styles.tab} ${activeTab === "blogs" ? styles.tabActive : ""}`} onClick={() => setActiveTab("blogs")}>
            Blogs ({blogs.length})
          </button>
        </div>

        {/* ═══ PRODUCTS TAB ═══ */}
        {activeTab === "products" && (
          <>
            <div className={styles.formCard}>
              <h2>{editProductId ? "Edit Product" : "Add Product"}</h2>
              <form onSubmit={handleProductSubmit} className={styles.form}>
                <label className={styles.label}>Product Name *
                  <input type="text" value={productForm.name} onChange={(e) => updateProductField("name", e.target.value)} required className={styles.input} placeholder="e.g. Sage Green Cushion Cover" />
                </label>
                <label className={styles.label}>Image URL *
                  <input type="url" value={productForm.imageUrl} onChange={(e) => updateProductField("imageUrl", e.target.value)} required className={styles.input} placeholder="https://..." />
                </label>
                {productForm.imageUrl && <div className={styles.preview}><img src={productForm.imageUrl} alt="Preview" onError={(e) => (e.target.style.display = "none")} /></div>}
                <label className={styles.label}>Description *
                  <textarea value={productForm.description} onChange={(e) => updateProductField("description", e.target.value)} required className={styles.textarea} placeholder="Short product description..." rows={3} />
                </label>
                <label className={styles.label}>Badge (optional)
                  <select value={productForm.badge} onChange={(e) => updateProductField("badge", e.target.value)} className={styles.select}>
                    <option value="">None</option>
                    {BADGE_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </label>
                {productForm.badge === "Custom" && <input type="text" placeholder="Custom badge text" value={productForm.customBadge} onChange={(e) => updateProductField("customBadge", e.target.value)} className={styles.input} />}
                <label className={styles.label}>Affiliate Link *
                  <input type="url" value={productForm.affiliateLink} onChange={(e) => updateProductField("affiliateLink", e.target.value)} required className={styles.input} placeholder="https://..." />
                </label>
                <label className={styles.label}>Category *
                  <select value={productForm.category} onChange={(e) => updateProductField("category", e.target.value)} className={styles.select}>
                    {CAT_OPTIONS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                  </select>
                </label>
                <div className={styles.formActions}>
                  <button type="submit" className="btn-primary">{editProductId ? "Update Product" : "Add Product"}</button>
                  {editProductId && <button type="button" className="btn-secondary" onClick={() => { setProductForm(emptyProductForm); setEditProductId(null); }}>Cancel</button>}
                </div>
              </form>
            </div>

            <div className={styles.tableCard}>
              <h2>All Products</h2>
              {products.length === 0 ? (
                <p className={styles.emptyTable}>No products yet. Add your first product above!</p>
              ) : (
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Badge</th><th>Actions</th></tr></thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p.id}>
                          <td><img src={p.imageUrl || p.image || p.img} alt={p.name || p.title} className={styles.thumb} /></td>
                          <td className={styles.nameCell}>{p.name || p.title}</td>
                          <td>{p.category?.replace("-", " ")}</td>
                          <td>{p.badge || "—"}</td>
                          <td>
                            <div className={styles.actions}>
                              <button onClick={() => startEditProduct(p)} className={styles.editBtn}>✏️</button>
                              <button onClick={() => { setConfirmDelete(p.id); setDeleteType("products"); }} className={styles.deleteBtn}>🗑️</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* ═══ BLOGS TAB ═══ */}
        {activeTab === "blogs" && (
          <>
            <div className={styles.formCard}>
              <h2>{editBlogId ? "Edit Blog Post" : "Add Blog Post"}</h2>
              <form onSubmit={handleBlogSubmit} className={styles.form}>
                <label className={styles.label}>Blog Title *
                  <input type="text" value={blogForm.title} onChange={(e) => updateBlogField("title", e.target.value)} required className={styles.input} placeholder="e.g. 5 Budget Living Room Ideas" />
                </label>
                <label className={styles.label}>Cover Image URL *
                  <input type="url" value={blogForm.imageUrl} onChange={(e) => updateBlogField("imageUrl", e.target.value)} required className={styles.input} placeholder="https://..." />
                </label>
                {blogForm.imageUrl && <div className={styles.preview}><img src={blogForm.imageUrl} alt="Preview" onError={(e) => (e.target.style.display = "none")} /></div>}
                <label className={styles.label}>Excerpt (optional short description)
                  <textarea value={blogForm.excerpt} onChange={(e) => updateBlogField("excerpt", e.target.value)} className={styles.textarea} placeholder="A brief summary of the blog post..." rows={2} />
                </label>
                <label className={styles.label}>Blogger Article Link *
                  <input type="url" value={blogForm.bloggerLink} onChange={(e) => updateBlogField("bloggerLink", e.target.value)} required className={styles.input} placeholder="https://yourblog.blogspot.com/..." />
                </label>
                <div className={styles.formActions}>
                  <button type="submit" className="btn-primary">{editBlogId ? "Update Blog" : "Publish Blog"}</button>
                  {editBlogId && <button type="button" className="btn-secondary" onClick={() => { setBlogForm(emptyBlogForm); setEditBlogId(null); }}>Cancel</button>}
                </div>
              </form>
            </div>

            <div className={styles.tableCard}>
              <h2>All Blog Posts</h2>
              {blogs.length === 0 ? (
                <p className={styles.emptyTable}>No blog posts yet. Publish your first blog above!</p>
              ) : (
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead><tr><th>Image</th><th>Title</th><th>Link</th><th>Actions</th></tr></thead>
                    <tbody>
                      {blogs.map((b) => (
                        <tr key={b.id}>
                          <td><img src={b.imageUrl} alt={b.title} className={styles.thumb} /></td>
                          <td className={styles.nameCell}>{b.title}</td>
                          <td><a href={b.bloggerLink} target="_blank" rel="noopener noreferrer" style={{ color: "var(--sage)", fontSize: "0.8rem" }}>View ↗</a></td>
                          <td>
                            <div className={styles.actions}>
                              <button onClick={() => startEditBlog(b)} className={styles.editBtn}>✏️</button>
                              <button onClick={() => { setConfirmDelete(b.id); setDeleteType("blogs"); }} className={styles.deleteBtn}>🗑️</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className={styles.modalOverlay} onClick={() => { setConfirmDelete(null); setDeleteType(""); }}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Delete</h3>
            <p>This item will be permanently deleted. Are you sure?</p>
            <div className={styles.modalActions}>
              <button onClick={() => handleDelete(confirmDelete, deleteType)} className={styles.deleteBtnConfirm}>Delete</button>
              <button onClick={() => { setConfirmDelete(null); setDeleteType(""); }} className="btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
