"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CartItem {
  name: string;
  size: "2L" | "4L" | "6L";
  quantity: number;
  unitPrice: number;
}

// ─── Demo cart (replace with your real cart context / store) ──────────────────

const DEMO_CART: CartItem[] = [
  { name: "Clever Kitchen Soup", size: "2L", quantity: 2, unitPrice: 9.99 },
  { name: "Hearty Stew", size: "4L", quantity: 1, unitPrice: 17.99 },
  { name: "Family Curry", size: "6L", quantity: 1, unitPrice: 24.99 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(amount: number) {
  return `£${amount.toFixed(2)}`;
}

function buildWhatsAppMessage(
  cart: CartItem[],
  form: FormState,
  total: number
): string {
  const itemLines = cart
    .map(
      (item) =>
        `• ${item.name} (${item.size}) x${item.quantity} — ${formatCurrency(
          item.unitPrice * item.quantity
        )}`
    )
    .join("\n");

  const delivery =
    form.deliveryType === "delivery"
      ? `Delivery to: ${form.address}`
      : "Collection / Pickup";

  const lines = [
    "Hello! I'd like to place an order 🛒",
    "",
    "━━━ ORDER SUMMARY ━━━",
    itemLines,
    "",
    `TOTAL: ${formatCurrency(total)}`,
    "",
    "━━━ MY DETAILS ━━━",
    `Name: ${form.firstName} ${form.lastName}`,
    `Phone: ${form.phone}`,
    `Email: ${form.email}`,
    delivery,
    form.instructions ? `Special instructions: ${form.instructions}` : "",
  ].filter((l) => l !== undefined);

  return encodeURIComponent(lines.join("\n").trim());
}

// ─── Form state ───────────────────────────────────────────────────────────────

interface FormState {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  deliveryType: "delivery" | "pickup";
  instructions: string;
}

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  deliveryType: "delivery",
  instructions: "",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const cart = DEMO_CART; // 🔁 swap with useCart() or your real source
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {}
  );

  const subtotal = cart.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
  const deliveryFee = form.deliveryType === "delivery" ? 3.99 : 0;
  const total = subtotal + deliveryFee;

  // ── Field helpers ──────────────────────────────────────────────────────────

  function set(field: keyof FormState) {
    return (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  // ── Validation ─────────────────────────────────────────────────────────────

  function validate(): boolean {
    const next: typeof errors = {};
    if (!form.firstName.trim()) next.firstName = "Required";
    if (!form.lastName.trim()) next.lastName = "Required";
    if (!form.phone.trim()) next.phone = "Required";
    if (!form.email.trim()) next.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = "Invalid email";
    if (form.deliveryType === "delivery" && !form.address.trim())
      next.address = "Required for delivery";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  // ── Submit ─────────────────────────────────────────────────────────────────

  function handleWhatsApp() {
    if (!validate()) return;
    const msg = buildWhatsAppMessage(cart, form, total);
    window.open(`https://wa.me/447466705927?text=${msg}`, "_blank");
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Global styles injected inline so no external CSS is needed ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Lato:wght@300;400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold:       #D4A017;
          --gold-light: #F0C040;
          --gold-dark:  #A07810;
          --wood:       #1A1008;
          --wood-mid:   #2C1F0E;
          --wood-light: #3D2B14;
          --wood-border:#4E3820;
          --cream:      #F5EDD8;
          --cream-dim:  #C8B98A;
          --text:       #F5EDD8;
          --text-muted: #9E8B6A;
          --error:      #E05252;
          --radius:     10px;
          --shadow:     0 8px 32px rgba(0,0,0,.55);
        }

        body {
          background: var(--wood);
          color: var(--text);
          font-family: 'Lato', sans-serif;
          font-weight: 400;
          min-height: 100vh;
        }

        /* Wood-grain texture overlay via pseudo bg */
        .ck-checkout-root {
          min-height: 100vh;
          background:
            repeating-linear-gradient(
              92deg,
              transparent 0px,
              transparent 18px,
              rgba(255,255,255,.012) 18px,
              rgba(255,255,255,.012) 19px
            ),
            repeating-linear-gradient(
              180deg,
              transparent 0px,
              transparent 40px,
              rgba(0,0,0,.06) 40px,
              rgba(0,0,0,.06) 41px
            ),
            var(--wood);
        }

        /* ── Layout ── */
        .ck-wrapper {
          max-width: 980px;
          margin: 0 auto;
          padding: 40px 20px 80px;
        }

        .ck-header {
          text-align: center;
          margin-bottom: 44px;
        }
        .ck-header h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 5vw, 2.8rem);
          color: var(--gold);
          letter-spacing: .04em;
        }
        .ck-header p {
          color: var(--cream-dim);
          margin-top: 8px;
          font-size: .95rem;
          font-weight: 300;
        }
        .ck-divider {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          margin: 14px auto 0;
        }

        .ck-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          align-items: start;
        }
        @media (max-width: 680px) {
          .ck-grid { grid-template-columns: 1fr; }
        }

        /* ── Card ── */
        .ck-card {
          background: var(--wood-mid);
          border: 1px solid var(--wood-border);
          border-radius: var(--radius);
          padding: 28px 24px;
          box-shadow: var(--shadow);
        }
        .ck-card h2 {
          font-family: 'Playfair Display', serif;
          font-size: 1.25rem;
          color: var(--gold);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ck-card h2 .icon {
          font-size: 1.1rem;
        }

        /* ── Cart items ── */
        .ck-cart-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 12px 0;
          border-bottom: 1px solid var(--wood-border);
          gap: 12px;
        }
        .ck-cart-item:last-child { border-bottom: none; }
        .ck-item-info { flex: 1; }
        .ck-item-name {
          font-weight: 700;
          color: var(--cream);
          font-size: .95rem;
        }
        .ck-item-meta {
          font-size: .82rem;
          color: var(--text-muted);
          margin-top: 3px;
        }
        .ck-item-price {
          font-family: 'Playfair Display', serif;
          color: var(--gold);
          white-space: nowrap;
          font-size: .95rem;
        }

        .ck-totals {
          margin-top: 20px;
          border-top: 1px solid var(--wood-border);
          padding-top: 16px;
        }
        .ck-totals-row {
          display: flex;
          justify-content: space-between;
          font-size: .88rem;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .ck-totals-row.total {
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem;
          color: var(--cream);
          margin-top: 10px;
        }
        .ck-totals-row.total span:last-child {
          color: var(--gold);
        }

        /* ── Form ── */
        .ck-fields {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .ck-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 420px) {
          .ck-row { grid-template-columns: 1fr; }
        }

        .ck-field {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .ck-field label {
          font-size: .8rem;
          color: var(--cream-dim);
          text-transform: uppercase;
          letter-spacing: .07em;
          font-weight: 700;
        }
        .ck-field input,
        .ck-field select,
        .ck-field textarea {
          background: var(--wood-light);
          border: 1px solid var(--wood-border);
          border-radius: 6px;
          color: var(--cream);
          font-family: 'Lato', sans-serif;
          font-size: .93rem;
          padding: 10px 12px;
          outline: none;
          transition: border-color .2s;
          width: 100%;
          -webkit-appearance: none;
        }
        .ck-field input::placeholder,
        .ck-field textarea::placeholder { color: var(--text-muted); }
        .ck-field input:focus,
        .ck-field select:focus,
        .ck-field textarea:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 2px rgba(212,160,23,.18);
        }
        .ck-field select option { background: var(--wood-mid); }
        .ck-field textarea { resize: vertical; min-height: 80px; }
        .ck-error {
          font-size: .76rem;
          color: var(--error);
          margin-top: 2px;
        }

        /* ── Delivery toggle ── */
        .ck-toggle {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: var(--wood-light);
          border: 1px solid var(--wood-border);
          border-radius: 8px;
          overflow: hidden;
        }
        .ck-toggle button {
          padding: 10px 6px;
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: 'Lato', sans-serif;
          font-size: .88rem;
          font-weight: 700;
          color: var(--text-muted);
          transition: background .2s, color .2s;
          letter-spacing: .04em;
        }
        .ck-toggle button.active {
          background: var(--gold-dark);
          color: var(--cream);
        }

        /* ── WhatsApp button ── */
        .ck-wa-wrap {
          margin-top: 32px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .ck-wa-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          padding: 18px 28px;
          border: none;
          border-radius: var(--radius);
          cursor: pointer;
          font-family: 'Playfair Display', serif;
          font-size: clamp(1rem, 3vw, 1.2rem);
          font-weight: 700;
          letter-spacing: .03em;
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold-dark) 100%);
          background-size: 200% 200%;
          color: var(--wood);
          box-shadow:
            0 4px 20px rgba(212,160,23,.45),
            inset 0 1px 0 rgba(255,255,255,.2);
          transition: transform .15s, box-shadow .15s, background-position .4s;
          animation: shimmer 4s ease infinite;
        }
        .ck-wa-btn:hover {
          transform: translateY(-2px);
          box-shadow:
            0 8px 32px rgba(212,160,23,.6),
            inset 0 1px 0 rgba(255,255,255,.25);
          background-position: right center;
        }
        .ck-wa-btn:active {
          transform: translateY(0);
        }
        @keyframes shimmer {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .ck-wa-icon {
          width: 28px;
          height: 28px;
          flex-shrink: 0;
        }

        .ck-note {
          text-align: center;
          font-size: .78rem;
          color: var(--text-muted);
          line-height: 1.5;
        }
        .ck-note a {
          color: var(--gold);
          text-decoration: none;
        }

        /* ── Empty cart ── */
        .ck-empty {
          text-align: center;
          padding: 48px 24px;
          color: var(--text-muted);
        }
        .ck-empty .icon { font-size: 3rem; margin-bottom: 12px; }
      `}</style>

      <div className="ck-checkout-root">
        <div className="ck-wrapper">

          {/* Header */}
          <header className="ck-header">
            <h1>Checkout</h1>
            <p>Review your order and send it through WhatsApp — we'll confirm everything with you directly.</p>
            <div className="ck-divider" />
          </header>

          {cart.length === 0 ? (
            <div className="ck-card">
              <div className="ck-empty">
                <div className="icon">🛒</div>
                <p>Your cart is empty.</p>
              </div>
            </div>
          ) : (
            <div className="ck-grid">

              {/* ── Left: Order Summary ── */}
              <div className="ck-card">
                <h2><span className="icon">🧾</span> Your Order</h2>

                {cart.map((item, i) => (
                  <div className="ck-cart-item" key={i}>
                    <div className="ck-item-info">
                      <div className="ck-item-name">{item.name}</div>
                      <div className="ck-item-meta">
                        Size: {item.size} &nbsp;·&nbsp; Qty: {item.quantity}
                        &nbsp;·&nbsp; {formatCurrency(item.unitPrice)} each
                      </div>
                    </div>
                    <div className="ck-item-price">
                      {formatCurrency(item.unitPrice * item.quantity)}
                    </div>
                  </div>
                ))}

                <div className="ck-totals">
                  <div className="ck-totals-row">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="ck-totals-row">
                    <span>Delivery</span>
                    <span>
                      {form.deliveryType === "pickup"
                        ? "Free (Pickup)"
                        : formatCurrency(deliveryFee)}
                    </span>
                  </div>
                  <div className="ck-totals-row total">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>

              {/* ── Right: Billing Form ── */}
              <div className="ck-card">
                <h2><span className="icon">📋</span> Your Details</h2>

                <div className="ck-fields">

                  {/* Name row */}
                  <div className="ck-row">
                    <div className="ck-field">
                      <label>First Name</label>
                      <input
                        type="text"
                        placeholder="Jane"
                        value={form.firstName}
                        onChange={set("firstName")}
                      />
                      {errors.firstName && <span className="ck-error">{errors.firstName}</span>}
                    </div>
                    <div className="ck-field">
                      <label>Last Name</label>
                      <input
                        type="text"
                        placeholder="Smith"
                        value={form.lastName}
                        onChange={set("lastName")}
                      />
                      {errors.lastName && <span className="ck-error">{errors.lastName}</span>}
                    </div>
                  </div>

                  {/* Contact row */}
                  <div className="ck-row">
                    <div className="ck-field">
                      <label>Phone</label>
                      <input
                        type="tel"
                        placeholder="+44 7000 000000"
                        value={form.phone}
                        onChange={set("phone")}
                      />
                      {errors.phone && <span className="ck-error">{errors.phone}</span>}
                    </div>
                    <div className="ck-field">
                      <label>Email</label>
                      <input
                        type="email"
                        placeholder="jane@example.com"
                        value={form.email}
                        onChange={set("email")}
                      />
                      {errors.email && <span className="ck-error">{errors.email}</span>}
                    </div>
                  </div>

                  {/* Delivery / Pickup toggle */}
                  <div className="ck-field">
                    <label>Fulfilment</label>
                    <div className="ck-toggle">
                      <button
                        type="button"
                        className={form.deliveryType === "delivery" ? "active" : ""}
                        onClick={() =>
                          setForm((p) => ({ ...p, deliveryType: "delivery" }))
                        }
                      >
                        🚚 Delivery
                      </button>
                      <button
                        type="button"
                        className={form.deliveryType === "pickup" ? "active" : ""}
                        onClick={() =>
                          setForm((p) => ({ ...p, deliveryType: "pickup" }))
                        }
                      >
                        🏪 Pickup
                      </button>
                    </div>
                  </div>

                  {/* Address (only when delivery) */}
                  {form.deliveryType === "delivery" && (
                    <div className="ck-field">
                      <label>Delivery Address</label>
                      <input
                        type="text"
                        placeholder="123 High Street, London, SW1A 1AA"
                        value={form.address}
                        onChange={set("address")}
                      />
                      {errors.address && <span className="ck-error">{errors.address}</span>}
                    </div>
                  )}

                  {/* Special instructions */}
                  <div className="ck-field">
                    <label>Special Instructions <span style={{ fontWeight: 300, textTransform: "none" }}>(optional)</span></label>
                    <textarea
                      placeholder="Allergies, dietary notes, preferred delivery time…"
                      value={form.instructions}
                      onChange={set("instructions")}
                    />
                  </div>

                </div>

                {/* WhatsApp CTA */}
                <div className="ck-wa-wrap">
                  <button className="ck-wa-btn" onClick={handleWhatsApp}>
                    {/* WhatsApp SVG icon */}
                    <svg className="ck-wa-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.15)" />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M24 10C16.268 10 10 16.268 10 24c0 2.934.858 5.667 2.337 7.964L10 38l6.22-2.305A13.933 13.933 0 0024 38c7.732 0 14-6.268 14-14S31.732 10 24 10zm-4.23 8.7c-.34-.017-.717.007-1.06.18-.3.153-.73.54-1.25 1.14-.47.55-.88 1.35-.88 2.37 0 1.01.56 2.05 1.15 2.86a14.01 14.01 0 005.3 4.86c.82.41 1.62.66 2.27.73.7.07 1.22-.05 1.57-.28.48-.31.83-.79 1.03-1.27.16-.39.3-1.05.2-1.44-.08-.33-.42-.57-.79-.77l-2.17-1.09c-.35-.18-.62-.18-.86.02-.26.22-.5.5-.69.73-.18.21-.31.27-.51.17a9.23 9.23 0 01-3.49-3.04c-.12-.2-.08-.34.07-.5.2-.21.44-.47.6-.68.17-.22.28-.36.33-.6.06-.25-.03-.5-.18-.74l-.98-1.88c-.15-.3-.4-.52-.67-.54z"
                        fill="#1A1008"
                      />
                    </svg>
                    Continue to WhatsApp to Finalise Order 📲
                  </button>

                  <p className="ck-note">
                    Tapping the button above opens WhatsApp with your order pre-filled.
                    We'll confirm availability, payment, and dispatch time directly with you.<br />
                    Questions? <a href="https://wa.me/447466705927" target="_blank" rel="noopener noreferrer">Message us directly</a>.
                  </p>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
