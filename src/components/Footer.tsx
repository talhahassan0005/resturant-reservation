"use client";

const links = {
  Discover: ["Lahore", "Karachi", "Islamabad", "New Openings", "Top Rated"],
  Company:  ["About Us", "Careers", "Press", "Blog", "Contact"],
  Support:  ["Help Center", "Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function Footer() {
  return (
    <footer className="rrs-footer">
      <div className="rrs-footer-inner">
        <div className="rrs-footer-grid">
          {/* Brand */}
          <div>
            <div className="rrs-footer-brand-name">
              Table<span>Now</span>
            </div>
            <p className="rrs-footer-brand-desc">
              Pakistan&apos;s fastest-growing restaurant reservation platform.
              Book instantly at thousands of top-rated venues.
            </p>
            <div className="rrs-footer-apps">
              <button className="rrs-footer-app-btn" type="button">
                 App Store
              </button>
              <button className="rrs-footer-app-btn" type="button">
                 Google Play
              </button>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([col, items]) => (
            <div key={col}>
              <div className="rrs-footer-col-title">{col}</div>
              {items.map((item) => (
                <span key={item} className="rrs-footer-link">{item}</span>
              ))}
            </div>
          ))}
        </div>

        <div className="rrs-footer-bottom">
          <span>© {new Date().getFullYear()} TableNow. All rights reserved.</span>
          <div className="rrs-footer-flags">
            <span className="rrs-footer-flag" title="Pakistan">🇵🇰</span>
            <span className="rrs-footer-flag" title="English">🌐</span>
            <span style={{ fontSize: 13 }}>PKR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
