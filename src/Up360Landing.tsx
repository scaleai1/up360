import { useEffect, useState } from 'react';

/**
 * Up360Landing — public marketing site for the Up360 insurance & finance agency.
 * Hebrew, RTL, fully self-contained (own colors/fonts) so it is unaffected by the
 * app's global theme. Mounted as the default public view in App.tsx.
 *
 * Deep "logo" theme: navy base + teal→green accents sampled from the Up360 logo.
 */

// ── Brand palette (deep tones from the Up360 logo) ────────────────────────────
const C = {
  navyDeepest: '#071726', // page base
  navyDeep: '#0A2034',    // contact / footer panels
  card: '#10304B',        // cards
  cardElv: '#163C5C',     // elevated / hover
  blue: '#1C6E9E',
  teal: '#1FA6C9',
  green: '#5FB134',
  greenDeep: '#4FA02A',
  heading: '#EAF3F9',     // headings on dark
  body: '#9FBBCF',        // paragraph on dark
  muted: '#6E89A0',
  navyInk: '#0B2236',     // dark text for use ON light buttons
  line: 'rgba(255,255,255,0.10)',
  lineSoft: 'rgba(255,255,255,0.06)',
};
const SURFACE = '#0E2A42'; // alternate section background
const GRAD = `linear-gradient(135deg, ${C.blue} 0%, ${C.teal} 48%, ${C.green} 100%)`;
const GRAD_TG = `linear-gradient(135deg, ${C.teal}, ${C.green})`;
const PHONE = '054-6588651';
const PHONE_TEL = '+972546588651';
const EMAIL = 'Info@ra-ins.co.il';
const WHATSAPP = `https://wa.me/972546588651?text=${encodeURIComponent(
  'שלום, הגעתי דרך האתר ואשמח לבדיקת תיק ביטוח ללא עלות',
)}`;

// ── Small presentational helpers ──────────────────────────────────────────────
// Real logo image sits on a clean white chip so it stays legible on the dark theme.
// Falls back to the SVG wordmark until /up360-logo.png is added to public/.
function Logo({ size = 40 }: { size?: number }) {
  const [imgOk, setImgOk] = useState(true);
  if (imgOk) {
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: '#fff',
          borderRadius: 12,
          padding: '7px 13px',
          boxShadow: '0 6px 18px rgba(0,0,0,0.20)',
        }}
      >
        <img
          src="/up360-logo.png"
          alt="Up360 — ביטוח ופיננסים"
          onError={() => setImgOk(false)}
          style={{ height: size, width: 'auto', display: 'block' }}
        />
      </span>
    );
  }
  return <LogoWordmark size={size} />;
}

function LogoWordmark({ size = 40 }: { size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
        <defs>
          <linearGradient id="up360g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={C.teal} />
            <stop offset="1" stopColor={C.green} />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="44" fill="url(#up360g)" opacity="0.20" />
        <path
          d="M22 64 C30 40 54 28 78 30 L70 22 M78 30 L70 38"
          fill="none"
          stroke="url(#up360g)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div style={{ lineHeight: 1, fontFamily: 'Heebo, sans-serif' }}>
        <div style={{ fontSize: size * 0.62, fontWeight: 900, letterSpacing: '-0.02em' }}>
          <span style={{ color: C.heading }}>UP</span>
          <span
            style={{
              background: GRAD_TG,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            360
          </span>
        </div>
        <div style={{ fontSize: size * 0.2, color: C.muted, fontWeight: 600, marginTop: 2 }}>
          ביטוח ופיננסים
        </div>
      </div>
    </div>
  );
}

function CTAButtons({ compact = false }: { compact?: boolean }) {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <a href="#lead" className="u360-cta" style={{ ...btn(GRAD, '#fff'), padding: compact ? '10px 18px' : '15px 28px' }}>
        בדיקת תיק ביטוח — חינם
      </a>
      <a
        href={`tel:${PHONE_TEL}`}
        className="u360-cta"
        style={{
          ...btn('transparent', C.heading),
          border: `1.5px solid ${C.line}`,
          padding: compact ? '10px 18px' : '15px 28px',
          boxShadow: 'none',
        }}
      >
        התקשרו עכשיו
      </a>
    </div>
  );
}

function btn(bg: string, color: string): React.CSSProperties {
  const isAccent = bg !== 'transparent' && bg !== '#fff';
  return {
    background: bg,
    color,
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 16,
    textDecoration: 'none',
    display: 'inline-block',
    boxShadow: isAccent ? '0 10px 28px rgba(31,166,201,0.32)' : 'none',
    transition: 'transform .15s ease, box-shadow .15s ease',
  };
}

function Section({
  children,
  bg = 'transparent',
  id,
}: {
  children: React.ReactNode;
  bg?: string;
  id?: string;
}) {
  return (
    <section id={id} style={{ background: bg, padding: '72px 20px' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>{children}</div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        color: C.teal,
        fontWeight: 800,
        fontSize: 14,
        letterSpacing: '0.04em',
        marginBottom: 12,
      }}
    >
      {children}
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 900, color: C.heading, lineHeight: 1.2 }}>
      {children}
    </h2>
  );
}

// ── Content data ──────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: '🛡️', t: 'ביטוח חיים', d: 'הגנה על המשפחה והעתיד הכלכלי שלה' },
  { icon: '🏥', t: 'ביטוח בריאות', d: 'כיסוי רפואי פרטי מקיף ומותאם' },
  { icon: '🤝', t: 'ביטוח סיעודי', d: 'שקט נפשי לימים שבהם צריך תמיכה' },
  { icon: '📈', t: 'ביטוחי מנהלים', d: 'תכנון חיסכון והגנה לעצמאים ושכירים' },
  { icon: '🏛️', t: 'פנסיה', d: 'תכנון פנסיוני חכם לטווח ארוך' },
  { icon: '💰', t: 'קרנות השתלמות', d: 'מקסום חיסכון עם הטבות מס' },
  { icon: '🏢', t: 'ביטוחי עסקים', d: 'הגנה מלאה על העסק והפעילות שלו' },
  { icon: '🚗', t: 'ביטוח אלמנטרי', d: 'רכב, דירה ורכוש — תחת קורת גג אחת' },
];

const CORE = [
  'ייעוץ ביטוחי ופיננסי מקיף',
  'בדיקת תיק ביטוח קיים והתאמתו מחדש',
  'תכנון פנסיוני וחיסכון לטווח ארוך',
  'ליווי תביעות מול חברות הביטוח',
  'ליווי אישי צמוד בתקופות מחלה ומשבר',
  'שירות מהיר, זמין ואמין',
];

const VALUES = [
  { t: 'אמינות ושקיפות', d: 'אני לא מוכר פוליסות — אני בונה איתך את ההגנה שמתאימה לך באמת.' },
  { t: 'ליווי בתביעות', d: 'ההצלחות הגדולות שלי נמדדות מול חברות הביטוח, ברגעים שבאמת חשובים.' },
  { t: 'זמינות מלאה', d: 'כשפונים אליי — מקבלים תשובה, מקבלים שירות, ומקבלים מישהו שנלחם לצידך.' },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Up360Landing() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      dir="rtl"
      style={{
        fontFamily: 'Heebo, Assistant, system-ui, sans-serif',
        background: C.navyDeepest,
        color: C.body,
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <style>{`
        @keyframes u360-rise { from { opacity:0; transform: translateY(16px) } to { opacity:1; transform:none } }
        .u360-rise { animation: u360-rise .6s ease both }
        .u360-card { transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease }
        .u360-card:hover { transform: translateY(-4px); box-shadow: 0 18px 44px rgba(0,0,0,.45); border-color: ${C.teal} !important }
        a:hover.u360-cta { transform: translateY(-2px) }
        .u360-link:hover { color: ${C.teal} }
      `}</style>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: scrolled ? 'rgba(7,23,38,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? `1px solid ${C.line}` : '1px solid transparent',
          transition: 'all .25s ease',
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: '0 auto',
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Logo size={52} />
          <nav style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <a href="#services" className="u360-link" style={navLink}>תחומי התמחות</a>
            <a href="#about" className="u360-link" style={navLink}>אודות</a>
            <a href="#contact" className="u360-link" style={navLink}>צור קשר</a>
            <a href="#lead" className="u360-cta" style={{ ...btn(GRAD, '#fff'), padding: '10px 20px', fontSize: 15 }}>
              בדיקת תיק — חינם
            </a>
          </nav>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', padding: '80px 20px 90px' }}>
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              `radial-gradient(55% 55% at 88% 8%, rgba(95,177,52,0.18), transparent 70%),` +
              `radial-gradient(55% 60% at 8% 18%, rgba(31,166,201,0.20), transparent 70%)`,
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: 1080, margin: '0 auto', position: 'relative' }}>
          <div className="u360-rise" style={{ maxWidth: 720 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255,255,255,0.05)',
                border: `1px solid ${C.line}`,
                borderRadius: 999,
                padding: '7px 16px',
                fontSize: 14,
                fontWeight: 700,
                color: C.heading,
                marginBottom: 22,
              }}
            >
              20 שנות ניסיון · רישיון סוכן ביטוח ויועץ פנסיוני
            </div>
            <h1
              style={{
                fontSize: 'clamp(38px, 6vw, 62px)',
                fontWeight: 900,
                color: C.heading,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
              }}
            >
              ביטוח שמותאם לך אישית.{' '}
              <span style={{ color: C.green }}>תמיד כן.</span>
            </h1>
            <p style={{ fontSize: 'clamp(17px, 2.2vw, 21px)', color: C.body, lineHeight: 1.6, margin: '22px 0 30px', maxWidth: 600 }}>
              ביטוח טוב הוא לא עוד פוליסה בתיק — הוא שקט נפשי אמיתי. אני מקשיב, מבין את הצרכים שלך,
              ובונה איתך הגנה פיננסית מדויקת. כשצריך אותי, אני תמיד כאן.
            </p>
            <CTAButtons />
            <div style={{ display: 'flex', gap: 28, marginTop: 40, flexWrap: 'wrap' }}>
              {[
                ['20+', 'שנות ניסיון'],
                ['אלפי', 'לקוחות מלווים'],
                ['360°', 'כיסוי מלא'],
              ].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontSize: 30, fontWeight: 900, color: C.teal }}>{n}</div>
                  <div style={{ fontSize: 14, color: C.muted }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ───────────────────────────────────────────────────────── */}
      <Section bg={SURFACE} id="services">
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <Eyebrow>תחומי התמחות</Eyebrow>
          <H2>כל הביטוח והפיננסים — תחת קורת גג אחת</H2>
          <p style={{ color: C.body, fontSize: 18, marginTop: 12, maxWidth: 620, marginInline: 'auto' }}>
            לקוח שמגיע אליי מקבל מענה מלא: ביטוח, חיסכון ופנסיה — הכול במקום אחד, מותאם אישית.
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: 18,
          }}
        >
          {SERVICES.map((s) => (
            <div
              key={s.t}
              className="u360-card"
              style={{
                background: C.card,
                border: `1px solid ${C.line}`,
                borderRadius: 18,
                padding: '24px 22px',
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 14,
                  background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${C.line}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  marginBottom: 14,
                }}
              >
                {s.icon}
              </div>
              <div style={{ fontWeight: 800, fontSize: 18, color: C.heading, marginBottom: 6 }}>{s.t}</div>
              <div style={{ fontSize: 15, color: C.body, lineHeight: 1.5 }}>{s.d}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── About ──────────────────────────────────────────────────────────── */}
      <Section id="about">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>
          <div>
            <Eyebrow>הגישה שלי</Eyebrow>
            <H2>אני לא מוכר פוליסות — אני בונה הגנה</H2>
            <p style={{ color: C.body, fontSize: 18, lineHeight: 1.7, margin: '18px 0' }}>
              לאורך הדרך ליוויתי אלפי לקוחות — משפחות, עצמאים, בעלי עסקים וחברות — ועזרתי להם
              לבנות הגנה אמיתית, מותאמת אישית לחייהם. כל פתרון מותאם אישית, כל שאלה מקבלת מענה,
              וכל לקוח יודע שיש מישהו שעומד לצידו גם ברגעים הקשים ביותר.
            </p>
            <p style={{ color: C.body, fontSize: 18, lineHeight: 1.7 }}>
              ההצלחות הגדולות ביותר שלי הן בליווי תביעות מול חברות הביטוח ובסיוע ללקוחות שנקלעו
              לתקופות מחלה — שם נמדדת העבודה האמיתית.
            </p>
          </div>
          <div style={{ display: 'grid', gap: 14 }}>
            {VALUES.map((v) => (
              <div
                key={v.t}
                className="u360-card"
                style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: '20px 22px' }}
              >
                <div style={{ fontWeight: 800, fontSize: 18, color: C.teal, marginBottom: 6 }}>{v.t}</div>
                <div style={{ fontSize: 15, color: C.body, lineHeight: 1.6 }}>{v.d}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 48 }}>
          <div style={{ fontWeight: 800, fontSize: 20, color: C.heading, marginBottom: 18 }}>מה אני עושה בשבילך</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
            {CORE.map((c) => (
              <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 16, color: C.heading }}>
                <span
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 999,
                    background: GRAD_TG,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  ✓
                </span>
                {c}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Lead-gen ───────────────────────────────────────────────────────── */}
      <Section id="lead">
        <div
          style={{
            background: GRAD,
            borderRadius: 28,
            padding: 'clamp(32px, 5vw, 56px)',
            color: '#fff',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 30px 70px rgba(7,23,38,0.6)',
          }}
        >
          <div style={{ position: 'relative', maxWidth: 640 }}>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 900, lineHeight: 1.2 }}>
              רוצה לדעת אם הביטוח שלך באמת מגן עליך?
            </h2>
            <p style={{ fontSize: 18, opacity: 0.95, margin: '16px 0 26px', lineHeight: 1.6 }}>
              בדיקת תיק ביטוח מקיפה — ללא עלות וללא מחויבות. נבדוק יחד:
            </p>
            <div style={{ display: 'grid', gap: 12, marginBottom: 32 }}>
              {['האם אתה מבוטח נכון?', 'האם אתה משלם יותר ממה שצריך?', 'מה חסר לך בתיק הביטוח?'].map((q) => (
                <div key={q} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 18, fontWeight: 600 }}>
                  <span style={{ fontSize: 22 }}>✅</span> {q}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="u360-cta"
                style={{ ...btn('#fff', C.navyInk), padding: '15px 30px', boxShadow: '0 12px 30px rgba(0,0,0,.28)' }}
              >
                שלח הודעה בוואטסאפ — תשובה תוך שעה
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                className="u360-cta"
                style={{ ...btn('rgba(255,255,255,0.14)', '#fff'), padding: '15px 30px', border: '1.5px solid rgba(255,255,255,0.5)' }}
              >
                חייגו {PHONE}
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Contact ────────────────────────────────────────────────────────── */}
      <Section id="contact">
        <div
          style={{
            background: C.navyDeep,
            border: `1px solid ${C.line}`,
            borderRadius: 28,
            padding: 'clamp(34px, 5vw, 60px)',
            color: '#fff',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 40,
            alignItems: 'center',
          }}
        >
          <div>
            <Eyebrow>צור קשר</Eyebrow>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 900, lineHeight: 1.2, color: C.heading }}>
              כשצריך אותנו, אנחנו תמיד כאן
            </h2>
            <p style={{ color: C.body, fontSize: 18, marginTop: 14, lineHeight: 1.6 }}>
              שלח הודעה, התקשר, או בקש בדיקת תיק — אחזור אליך אישית.
            </p>
          </div>
          <div style={{ display: 'grid', gap: 14 }}>
            <a href={`tel:${PHONE_TEL}`} style={contactRow}>
              <span style={contactIcon}>📞</span>
              <span><div style={contactLabel}>טלפון</div><div style={contactValue}>{PHONE}</div></span>
            </a>
            <a href={`mailto:${EMAIL}`} style={contactRow}>
              <span style={contactIcon}>📧</span>
              <span><div style={contactLabel}>אימייל</div><div style={contactValue}>{EMAIL}</div></span>
            </a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={contactRow}>
              <span style={contactIcon}>💬</span>
              <span><div style={contactLabel}>וואטסאפ</div><div style={contactValue}>שליחת הודעה מהירה</div></span>
            </a>
          </div>
        </div>
      </Section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer style={{ background: C.navyDeep, borderTop: `1px solid ${C.line}`, padding: '34px 20px' }}>
        <div
          style={{
            maxWidth: 1080,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <Logo size={34} />
          <div style={{ fontSize: 14, color: C.body }}>
            סוכן ביטוח ויועץ פנסיוני · “תמיד כן”
          </div>
          <div style={{ fontSize: 13, color: C.muted }}>
            © {2026} Up360. כל הזכויות שמורות.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="וואטסאפ"
        style={{
          position: 'fixed',
          bottom: 24,
          insetInlineStart: 24,
          width: 58,
          height: 58,
          borderRadius: '50%',
          background: '#25D366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 28,
          boxShadow: '0 10px 28px rgba(37,211,102,0.45)',
          textDecoration: 'none',
          zIndex: 60,
        }}
      >
        💬
      </a>
    </div>
  );
}

// ── Inline style fragments ────────────────────────────────────────────────────
const navLink: React.CSSProperties = {
  color: C.body,
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: 15,
  transition: 'color .15s ease',
};
const contactRow: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 14,
  padding: '14px 18px',
  textDecoration: 'none',
  color: '#fff',
};
const contactIcon: React.CSSProperties = {
  width: 42,
  height: 42,
  borderRadius: 12,
  background: 'rgba(255,255,255,0.08)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 20,
  flexShrink: 0,
};
const contactLabel: React.CSSProperties = { fontSize: 13, color: 'rgba(255,255,255,0.55)' };
const contactValue: React.CSSProperties = { fontSize: 17, fontWeight: 700, color: '#fff' };
