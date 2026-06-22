"use client";

import { useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";
import gsap from "gsap";

// ─── Types ────────────────────────────────────────────────────────────────────
interface NotificationContent {
  badge: string;
  headline: string;
  subtext: string;
  offer: string;
  primaryBtn: { label: string; href: string };
  secondaryBtn?: { label: string; href: string };
}

// ─── Content config ───────────────────────────────────────────────────────────
const GUEST_CONTENT: NotificationContent = {
  badge: "LIMITED OFFER",
  headline: "Get 10% off\non register.",
  subtext: "Free shipping on every order over $500.",
  offer: "No code needed — discount applied at checkout.",
  primaryBtn: { label: "Create Account", href: "/auth/signup" },
  secondaryBtn: { label: "Sign In", href: "/auth/signin" },
};

const USER_CONTENT: NotificationContent = {
  badge: "MEMBER PERKS",
  headline: "Welcome\nback.",
  subtext: "You have early access to new arrivals.",
  offer: "Free express shipping on your next order.",
  primaryBtn: { label: "Shop New Arrivals", href: "/shop" },
  secondaryBtn: { label: "View My Orders", href: "/contact" },
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function EntranceNotification() {
  const [mounted, setMounted] = useState(false);

  // Refs for GSAP targets
  const backdropRef  = useRef<HTMLDivElement>(null);
  const panelRef     = useRef<HTMLDivElement>(null);
  const badgeRef     = useRef<HTMLSpanElement>(null);
  const headlineRef  = useRef<HTMLHeadingElement>(null);
  const dividerRef   = useRef<HTMLDivElement>(null);
  const subtextRef   = useRef<HTMLParagraphElement>(null);
  const offertextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  const imageColRef  = useRef<HTMLDivElement>(null);
  const imageTagRef  = useRef<HTMLDivElement>(null);
  const closeBtnRef  = useRef<HTMLButtonElement>(null);

  const { data: session } = authClient.useSession();
  const isLoggedIn = !!session?.user;
  const content = isLoggedIn ? USER_CONTENT : GUEST_CONTENT;

  // ── Mount after delay then run entrance timeline ──────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 4500); // longer delay
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const isMobile = window.innerWidth <= 600;

    // Set initial hidden states
    gsap.set(backdropRef.current, { opacity: 0 });
    gsap.set(panelRef.current, {
      y: isMobile ? "100%" : 80,
      opacity: 0,
      scale: isMobile ? 1 : 0.96,
    });
    gsap.set(
      [
        badgeRef.current,
        headlineRef.current,
        dividerRef.current,
        subtextRef.current,
        offertextRef.current,
        ctaRef.current,
        imageTagRef.current,
        closeBtnRef.current,
      ],
      { opacity: 0, y: 18 }
    );
    gsap.set(imageColRef.current, { clipPath: "inset(0 100% 0 0)" });

    // Master entrance timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl
      // 1. Backdrop fades in
      .to(backdropRef.current, { opacity: 1, duration: 0.55, ease: "power2.out" })

      // 2. Panel lifts up with slight spring overshoot
      .to(
        panelRef.current,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.75,
          ease: "back.out(1.4)",
        },
        "-=0.25"
      )

      // 3. Image wipes in from left
      .to(
        imageColRef.current,
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.9,
          ease: "power4.inOut",
        },
        "-=0.4"
      )

      // 4. Stagger in copy elements
      .to(
        badgeRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.55"
      )
      .to(
        headlineRef.current,
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
        "-=0.25"
      )
      .to(
        dividerRef.current,
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        "-=0.3"
      )
      .to(
        subtextRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.2"
      )
      .to(
        offertextRef.current,
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        "-=0.25"
      )
      .to(
        ctaRef.current,
        { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.8)" },
        "-=0.2"
      )
      .to(
        imageTagRef.current,
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        "-=0.3"
      )
      .to(
        closeBtnRef.current,
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
        "-=0.5"
      );
  }, [mounted]);

  // ── Dismiss with GSAP exit timeline ──────────────────────────────────────
  const dismiss = () => {
    const isMobile = window.innerWidth <= 600;

    const tl = gsap.timeline({
      onComplete: () => setMounted(false),
      defaults: { ease: "power3.in" },
    });

    tl
      // Stagger content out upward
      .to(
        [
          closeBtnRef.current,
          ctaRef.current,
          offertextRef.current,
          subtextRef.current,
          dividerRef.current,
          headlineRef.current,
          badgeRef.current,
        ],
        {
          opacity: 0,
          y: -14,
          duration: 0.22,
          stagger: 0.045,
          ease: "power2.in",
        }
      )
      // Image wipes out to the right
      .to(
        imageColRef.current,
        {
          clipPath: "inset(0 0% 0 100%)",
          duration: 0.55,
          ease: "power4.inOut",
        },
        "-=0.2"
      )
      // Panel drops away
      .to(
        panelRef.current,
        {
          y: isMobile ? "100%" : 60,
          opacity: 0,
          scale: isMobile ? 1 : 0.97,
          duration: 0.5,
          ease: "power3.in",
        },
        "-=0.3"
      )
      // Backdrop fades
      .to(
        backdropRef.current,
        { opacity: 0, duration: 0.4, ease: "power2.in" },
        "-=0.35"
      );
  };

  if (!mounted) return null;

  return (
    <>
      {/* ── Backdrop ─────────────────────────────────────────────────────── */}
      <div
        ref={backdropRef}
        onClick={dismiss}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.38)",
          zIndex: 9998,
        }}
      />

      {/* ── Panel ────────────────────────────────────────────────────────── */}
      <div
        ref={panelRef}
        style={{
          position: "fixed",
          bottom: "3%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          width: "min(900px, 96vw)",
          maxHeight: "94vh",
          display: "flex",
          background: "#EDEEE7",
          overflow: "hidden",
          boxShadow:
            "0 40px 100px rgba(0,0,0,0.28), 0 12px 32px rgba(0,0,0,0.12)",
        }}
        className="entrance-panel"
      >
        {/* ── LEFT: Copy ───────────────────────────────────────────────── */}
        <div
          className="entrance-content-col"
          style={{
            flex: "1 1 55%",
            padding: "clamp(28px, 4vw, 56px) clamp(24px, 4vw, 52px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 20,
            position: "relative",
            overflowY: "auto",
          }}
        >
          {/* Badge */}
          <span
            ref={badgeRef}
            style={{
              display: "inline-block",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#EDEEE7",
              background: "#111",
              padding: "5px 12px",
              alignSelf: "flex-start",
            }}
          >
            {content.badge}
          </span>

          {/* Headline + body copy */}
          <div style={{ flex: 1 }}>
            <h2
              ref={headlineRef}
              style={{
                fontSize: "clamp(30px, 4.2vw, 52px)",
                fontWeight: 800,
                lineHeight: 1.05,
                color: "#111",
                margin: "14px 0 10px",
                whiteSpace: "pre-line",
                fontFamily: "'Georgia', 'Times New Roman', serif",
                letterSpacing: "-0.025em",
              }}
            >
              {content.headline}
            </h2>

            <div
              ref={dividerRef}
              style={{
                width: 40,
                height: 2,
                background: "#111",
                margin: "18px 0",
              }}
            />

            <p
              ref={subtextRef}
              style={{
                fontSize: "clamp(13px, 1.5vw, 15px)",
                color: "#111",
                margin: 0,
                fontWeight: 600,
                letterSpacing: "0.01em",
                lineHeight: 1.55,
              }}
            >
              {content.subtext}
            </p>

            <p
              ref={offertextRef}
              style={{
                fontSize: 11,
                color: "#666",
                margin: "8px 0 0",
                letterSpacing: "0.04em",
                lineHeight: 1.6,
              }}
            >
              {content.offer}
            </p>
          </div>

          {/* CTA row */}
          <div
            ref={ctaRef}
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginTop: 4,
            }}
          >
            <a
              href={content.primaryBtn.href}
              style={{
                display: "inline-block",
                padding: "13px 28px",
                background: "#111",
                color: "#EDEEE7",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textDecoration: "none",
                transition: "background 0.22s",
                flex: "1 1 auto",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.background = "#333")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.background = "#111")
              }
            >
              {content.primaryBtn.label}
            </a>

            {content.secondaryBtn && (
              <a
                href={content.secondaryBtn.href}
                style={{
                  display: "inline-block",
                  padding: "13px 28px",
                  background: "transparent",
                  color: "#111",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textDecoration: "none",
                  border: "1.5px solid #111",
                  transition: "background 0.22s, color 0.22s",
                  flex: "1 1 auto",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "#111";
                  el.style.color = "#EDEEE7";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.background = "transparent";
                  el.style.color = "#111";
                }}
              >
                {content.secondaryBtn.label}
              </a>
            )}
          </div>
        </div>

        {/* ── RIGHT: Image ──────────────────────────────────────────────── */}
        <div
          ref={imageColRef}
          className="entrance-image-col"
          style={{
            flex: "1 1 45%",
            position: "relative",
            minHeight: 320,
            overflow: "hidden",
          }}
        >
          {/* Left-edge depth gradient */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 36,
              background:
                "linear-gradient(to right, rgba(0,0,0,0.12), transparent)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />

          <img
            src="https://i.pinimg.com/1200x/a8/2a/cf/a82acf55c8434591dfbd75c0fe9807da.jpg"
            alt="Style your moment"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />

          {/* Image label tag */}
          <div
            ref={imageTagRef}
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,
              zIndex: 2,
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "#EDEEE7",
                background: "rgba(0,0,0,0.58)",
                padding: "5px 11px",
                backdropFilter: "blur(6px)",
              }}
            >
              NEW SEASON
            </span>
          </div>
        </div>

        {/* ── Close button ─────────────────────────────────────────────── */}
        <button
          ref={closeBtnRef}
          onClick={dismiss}
          aria-label="Close notification"
          className="entrance-close-btn"
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 30,
            height: 30,
            background: "#111",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            transition: "background 0.18s, transform 0.18s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.background = "#3a3a3a";
            el.style.transform = "rotate(90deg)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLButtonElement;
            el.style.background = "#111";
            el.style.transform = "rotate(0deg)";
          }}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="1" y1="1" x2="11" y2="11" stroke="#EDEEE7" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="11" y1="1" x2="1" y2="11" stroke="#EDEEE7" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* ── Responsive styles ─────────────────────────────────────────────── */}
      <style>{`
        @media (max-width: 600px) {
          .entrance-panel {
            flex-direction: column !important;
            justify-content: flex-start !important;
            bottom: 50% !important;
            top: auto !important;
            left: 50% !important;
            transform: translate(-50%, 50%) !important;
            width: 94vw !important;
            max-width: 94vw !important;
            height: 88vh !important;
            max-height: 88vh !important;
          }
          .entrance-content-col {
            flex: 1 1 50% !important;
            max-height: 50% !important;
            min-height: 0 !important;
            overflow-y: auto !important;
            padding: 20px 18px 18px !important;
            gap: 12px !important;
          }
          .entrance-image-col {
            flex: 1 1 50% !important;
            min-height: 0 !important;
            max-height: 50% !important;
            order: -1;
          }
          .entrance-close-btn {
            top: 10px !important;
            right: 10px !important;
            width: 30px !important;
            height: 30px !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .entrance-panel * { transition: none !important; }
        }
      `}</style>
    </>
  );
}
