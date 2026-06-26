import Link from "next/link";
import styles from "./Footer.module.css";

const InstaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const PinterestIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.15 2.53 7.71 6.18 9.25-.08-.78-.15-1.98.03-2.84.16-.77 1.05-4.46 1.05-4.46s-.27-.54-.27-1.34c0-1.25.73-2.19 1.63-2.19.77 0 1.14.58 1.14 1.27 0 .77-.49 1.93-.75 3-.21.9.45 1.63 1.34 1.63 1.61 0 2.85-1.7 2.85-4.15 0-2.17-1.56-3.69-3.79-3.69-2.57 0-4.08 1.93-4.08 3.92 0 .77.3 1.6.67 2.05.07.09.08.17.06.26-.06.27-.22.9-.25 1.03-.04.17-.13.21-.3.13-1.12-.52-1.82-2.16-1.82-3.48 0-2.83 2.06-5.43 5.93-5.43 3.12 0 5.54 2.22 5.54 5.19 0 3.1-1.95 5.59-4.67 5.59-.91 0-1.77-.47-2.06-1.03l-.56 2.14c-.2.77-.75 1.74-1.12 2.33C9.9 21.84 10.93 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"></path>
  </svg>
);

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/dream._home_designs?igsh=MWRoamdnOGNkdXYycw==", icon: <InstaIcon /> },
  { label: "YouTube", href: "https://www.youtube.com/@DreamHomeDesigns-1", icon: <YoutubeIcon /> },
  { label: "Pinterest", href: "https://pin.it/7j29dzOmQ", icon: <PinterestIcon /> },
  { label: "Email", href: "mailto:aviralkumar9793@gmail.com", icon: <EmailIcon /> },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <span className={styles.logo}>🏡 Dream Home Designes</span>
            <p className={styles.tagline}>From empty rooms to dream spaces. Budget-friendly, rental-friendly, made for India.</p>
            <div className={styles.socials}>
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target={s.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className={styles.socialIcon} title={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <Link href="/shop" className={styles.footLink}>Shop</Link>
            <Link href="/blog" className={styles.footLink}>Blog</Link>
            <Link href="/about" className={styles.footLink}>About</Link>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Legal</h4>
            <Link href="/privacy" className={styles.footLink}>Privacy Policy</Link>
            <Link href="/terms" className={styles.footLink}>Terms of Service</Link>
            <Link href="/affiliate-disclosure" className={styles.footLink}>Affiliate Disclosure</Link>
          </div>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Connect</h4>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target={s.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className={styles.footLink}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} Dream Home Designes{" "}
            <Link href="/adm" style={{ opacity: 0.3, fontSize: "0.8rem", marginLeft: "8px" }}>🔒</Link>
          </p>
          <p className={styles.disclosure}>
            Dream Home Designes uses affiliate links — we may earn a small commission on some purchases at no extra cost to you.
          </p>
        </div>
      </div>
    </footer>
  );
}
