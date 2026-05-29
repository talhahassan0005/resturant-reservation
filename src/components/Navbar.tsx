"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="rrs-nav">
      <div className="rrs-nav-inner">
        <span className="rrs-logo" onClick={() => router.push("/")} title="Go to Home">
          Table<span>Now</span>
        </span>

        <div className="rrs-nav-right">
          <button
            className={`rrs-nav-link${isActive("/my-bookings") ? " rrs-nav-link--active" : ""}`}
            type="button"
            onClick={() => router.push("/my-bookings")}
          >
            My Bookings
          </button>
          <button
            className={`rrs-nav-link${isActive("/profile") ? " rrs-nav-link--active" : ""}`}
            type="button"
            onClick={() => router.push("/profile")}
          >
            Profile
          </button>

          <div className="rrs-nav-divider" />

          <button
            className={`rrs-nav-signin${isActive("/login") ? " rrs-nav-signin--active" : ""}`}
            type="button"
            onClick={() => router.push("/login")}
          >
            Sign In
          </button>
          <button
            className="rrs-nav-register"
            type="button"
            onClick={() => router.push("/register")}
          >
            Register
          </button>
        </div>
      </div>

      {/* Admin access — hidden from UI, accessible via direct URL /admin only */}
      <Link
        href="/admin"
        aria-hidden="true"
        tabIndex={-1}
        style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", opacity: 0, pointerEvents: "none" }}
      >
        admin
      </Link>
    </nav>
  );
}
