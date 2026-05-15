"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(amount: number) {
  return `£${amount.toFixed(2)}`;
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

// ─── WhatsApp message builder ─────────────────────────────────────────────────
// Uses the real CartItem fields from CartProvider:
//   id, name, size, price (number | "on request"), image, quantity

import type { CartItem } from "@/components/CartProvider";

function buildWhatsAppMessage(
  items: CartItem[],
  form: FormState,
  totalPrice: number,
  deliveryFee: number
): string {
  const itemLines = items
    .map((item) => {
      if (typeof item.price === "number") {
        const lineTotal = formatCurrency(item.price * item.quantity);
        return `- ${item.name} - ${item.size} × ${item.quantity} = ${lineTotal}`;
      }
      // price === "on request"
      return `- ${item.name} - ${item.size} × ${item.quantity} (price on request)`;
    })
    .join("\n");

  const grandTotal = totalPrice + deliveryFee;

  // Improved & Clean WhatsApp Message
const lines = [
  "Hi MATANKEES Kitchen 👋",
  "",
  "I would like to place an order:",
  "",
  ...cartItems.map(item => 
    `- ${item.name} - ${item.size} × ${item.quantity} = £${(Number(item.price) * item.quantity).toFixed(2)}`
  ),
  "",
  `Subtotal: £${totalPrice.toFixed(2)}`,
  deliveryFee > 0 
    ? `Delivery Fee: £${deliveryFee.toFixed(2)}` 
    : "Pickup: Free",
  `*Total: £${grandTotal.toFixed(2)}*`,
  "",
  `👤 Name: ${form.firstName} ${form.lastName}`,
  `📞 Phone: ${form.phone}`,
  `📧 Email: ${form.email}`,
  form.deliveryType === "delivery"
    ? `📍 Delivery to: ${form.address}`
    : "📍 Pickup in Baldock",
  ...(form.instructions?.trim() 
    ? [`📝 Special instructions: ${form.instructions.trim()}`] 
    : []),
  "",
  "Thank you! 🙏 Please confirm availability and time.",
];

  return encodeURIComponent(lines.join("\n"));
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CheckoutPage() {
  // ✅ Real cart from CartProvider — reads items, incrementItem, decrementItem,
  //    removeFromCart, totalPrice directly from context.
  const { items, incrementItem, decrementItem, removeFromCart, totalPrice } = useCart();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const deliveryFee = form.deliveryType === "delivery" ? 3.99 : 0;
  const grandTotal = totalPrice + deliveryFee;

  // Field change helper
  function field(key: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((p) => ({ ...p, [key]: e.target.value }));
      setErrors((p) => ({ ...p, [key]: undefined }));
    };
  }

  // Validation
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

  // Open WhatsApp
  function handleWhatsApp() {
    if (!validate()) return;
    const msg = buildWhatsAppMessage(items, form, totalPrice, deliveryFee);
    window.open(`https://wa.me/447466705927?text=${msg}`, "_blank");
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Lato:wght@300;400;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --gold:        #D4A017;
          --gold-light:  #F0C040;
          --gold-dark:   #A07810;
          --wood:        #1A1008;
          --wood-mid:    #2C1F0E;
          --wood-light:  #3D2B14;
          --wood-border: #4E3820;
          --cream:       #F5EDD8;
          --cream-dim:   #C8B98A;
          --text:        #F5EDD8;
          --text-muted:  #9E8B6A;
          --error:       #E05252;
          --radius:      10px;
          --shadow:      0 8px 32px rgba(0,0,0,.55);
        }

        body {
          background: var(--wood);
          color: var(--text);
          font-family: 'Lato', sans-serif;
          font-weight: 400;
          min-height: 100vh;
        }

        .ck-root {
          min-height: 100vh;
          background:
            repeating-linear-gradient(92deg,
              transparent 0, transparent 18px,
              rgba(255,255,255,.012) 18px, rgba(255,255,255,.012) 19px),
            repeating-linear-gradient(180deg,
              transparent 0, transparent 40px,
              rgba(0,0,0,.06) 40px, rgba(0,0,0,.06) 41px),
            var(--wood);
        }

        .ck-wrap {
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 20px 80px;
        }

        /* ── Header ── */
        .ck-header { text-align: center; margin-bottom: 44px; }
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
          width: 60px; height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          margin: 14px auto 0;
        }

        /* ── Grid ── */
        .ck-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          align-items: start;
        }
        @media (max-width: 700px) { .ck-grid { grid-template-columns: 1fr; } }

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
          font-size: 1.2rem;
          color: var(--gold);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* ── Cart item row ── */
        .ck-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 0;
          border-bottom: 1px solid var(--wood-border);
        }
        .ck-item:last-of-type { border-bottom: none; }

        .ck-item-thumb {
          width: 44px;
          height: 44px;
          border-radius: 6px;
          object-fit: cover;
          flex-shrink: 0;
          border: 1px solid var(--wood-border);
          background: var(--wood-light);
        }

        .ck-item-info { flex: 1; min-width: 0; }
        .ck-item-name {
          font-weight: 700;
          color: var(--cream);
          font-size: .92rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ck-item-meta {
          font-size: .79rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        /* ── Qty controls ── */
        .ck-qty {
          display: flex;
          align-items: stretch;
          background: var(--wood-light);
          border: 1px solid var(--wood-border);
          border-radius: 6px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .ck-qty button {
          width: 28px; height: 28px;
          background: transparent;
          border: none;
          color: var(--gold);
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background .15s;
          flex-shrink: 0;
        }
        .ck-qty button:hover { background: rgba(212,160,23,.15); }
        .ck-qty-num {
          min-width: 26px;
          text-align: center;
          font-size: .85rem;
          font-weight: 700;
          color: var(--cream);
          border-left: 1px solid var(--wood-border);
          border-right: 1px solid var(--wood-border);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
          user-select: none;
        }

        .ck-item-price {
          font-family: 'Playfair Display', serif;
          color: var(--gold);
          font-size: .88rem;
          white-space: nowrap;
          min-width: 52px;
          text-align: right;
          flex-shrink: 0;
        }
        .ck-item-price.on-request {
          font-family: 'Lato', sans-serif;
          font-size: .75rem;
          color: var(--text-muted);
          font-style: italic;
        }

        .ck-remove {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: .9rem;
          cursor: pointer;
          padding: 4px;
          line-height: 1;
          flex-shrink: 0;
          transition: color .15s;
        }
        .ck-remove:hover { color: var(--error); }

        /* ── Totals ── */
        .ck-totals {
          margin-top: 16px;
          border-top: 1px solid var(--wood-border);
          padding-top: 14px;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .ck-totals-row {
          display: flex;
          justify-content: space-between;
          font-size: .87rem;
          color: var(--text-muted);
        }
        .ck-totals-row.grand {
          font-family: 'Playfair Display', serif;
          font-size: 1.08rem;
          color: var(--cream);
          padding-top: 8px;
          margin-top: 4px;
          border-top: 1px solid var(--wood-border);
        }
        .ck-totals-row.grand span:last-child { color: var(--gold); }

        /* ── Form ── */
        .ck-fields { display: flex; flex-direction: column; gap: 14px; }
        .ck-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 440px) { .ck-row { grid-template-columns: 1fr; } }

        .ck-field { display: flex; flex-direction: column; gap: 5px; }
        .ck-field label {
          font-size: .78rem;
          color: var(--cream-dim);
          text-transform: uppercase;
          letter-spacing: .07em;
          font-weight: 700;
        }
        .ck-field input,
        .ck-field textarea {
          background: var(--wood-light);
          border: 1px solid var(--wood-border);
          border-radius: 6px;
          color: var(--cream);
          font-family: 'Lato', sans-serif;
          font-size: .92rem;
          padding: 10px 12px;
          outline: none;
          width: 100%;
          transition: border-color .2s, box-shadow .2s;
          -webkit-appearance: none;
        }
        .ck-field input::placeholder,
        .ck-field textarea::placeholder { color: var(--text-muted); }
        .ck-field input:focus,
        .ck-field textarea:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 2px rgba(212,160,23,.18);
        }
        .ck-field textarea { resize: vertical; min-height: 78px; }
        .ck-err { font-size: .75rem; color: var(--error); margin-top: 1px; }

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
          font-size: .86rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: .03em;
          transition: background .2s, color .2s;
        }
        .ck-toggle button.active {
          background: var(--gold-dark);
          color: var(--cream);
        }

        /* ── WhatsApp button ── */
        .ck-wa-wrap { margin-top: 28px; display: flex; flex-direction: column; gap: 12px; }
        .ck-wa-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          padding: 17px 20px;
          border: none;
          border-radius: var(--radius);
          cursor: pointer;
          font-family: 'Playfair Display', serif;
          font-size: clamp(.92rem, 2.5vw, 1.12rem);
          font-weight: 700;
          letter-spacing: .03em;
          color: var(--wood);
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold-dark) 100%);
          background-size: 200% 200%;
          box-shadow: 0 4px 20px rgba(212,160,23,.45), inset 0 1px 0 rgba(255,255,255,.2);
          transition: transform .15s, box-shadow .15s, background-position .4s;
          animation: ck-shimmer 4s ease infinite;
        }
        .ck-wa-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(212,160,23,.6), inset 0 1px 0 rgba(255,255,255,.25);
          background-position: right center;
        }
        .ck-wa-btn:active { transform: translateY(0); }
        @keyframes ck-shimmer {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .ck-wa-icon { width: 26px; height: 26px; flex-shrink: 0; }

        .ck-note {
          text-align: center;
          font-size: .77rem;
          color: var(--text-muted);
          line-height: 1.55;
        }
        .ck-note a { color: var(--gold); text-decoration: none; }

        /* ── Empty state ── */
        .ck-empty { text-align: center; padding: 56px 24px; color: var(--text-muted); }
        .ck-empty-icon { font-size: 3.5rem; margin-bottom: 14px; }
        .ck-empty p { font-size: 1rem; margin-bottom: 18px; }
        .ck-back {
          display: inline-block;
          padding: 10px 24px;
          border: 1px solid var(--wood-border);
          border-radius: 8px;
          color: var(--gold);
          font-family: 'Lato', sans-serif;
          font-size: .9rem;
          background: var(--wood-light);
          text-decoration: none;
          transition: background .2s;
        }
        .ck-back:hover { background: var(--wood-border); }
      `}</style>

      <div className="ck-root">
        <div className="ck-wrap">

          {/* ── Header ── */}
          <header className="ck-header">
            <h1>Checkout</h1>
            <p>Review your order and finalise it via WhatsApp — we'll confirm everything directly.</p>
            <div className="ck-divider" />
          </header>

          {items.length === 0 ? (

            /* ── Empty state ── */
            <div className="ck-card">
              <div className="ck-empty">
                <div className="ck-empty-icon">🛒</div>
                <p>Your cart is empty.</p>
                <a href="/menu" className="ck-back">← Back to Menu</a>
              </div>
            </div>

          ) : (
            <div className="ck-grid">

              {/* ══ LEFT: Order Summary ══ */}
              <div className="ck-card">
                <h2>🧾 Your Order</h2>

                {items.map((item) => (
                  <div className="ck-item" key={item.id}>

                    {/* Thumbnail */}
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="ck-item-thumb"
                      />
                    )}

                    {/* Name + meta */}
                    <div className="ck-item-info">
                      <div className="ck-item-name">{item.name}</div>
                      <div className="ck-item-meta">
                        {item.size}
                        {typeof item.price === "number" && (
                          <> &nbsp;·&nbsp; {formatCurrency(item.price)} each</>
                        )}
                      </div>
                    </div>

                    {/* Quantity +/- — uses incrementItem / decrementItem by item.id */}
                    <div className="ck-qty">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => decrementItem(item.id)}
                      >−</button>
                      <div className="ck-qty-num">{item.quantity}</div>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => incrementItem(item.id)}
                      >+</button>
                    </div>

                    {/* Line total */}
                    {typeof item.price === "number" ? (
                      <div className="ck-item-price">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    ) : (
                      <div className="ck-item-price on-request">on request</div>
                    )}

                    {/* Remove */}
                    <button
                      type="button"
                      className="ck-remove"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => removeFromCart(item.id)}
                    >✕</button>

                  </div>
                ))}

                {/* Totals — uses totalPrice from context directly */}
                <div className="ck-totals">
                  <div className="ck-totals-row">
                    <span>Subtotal</span>
                    <span>{formatCurrency(totalPrice)}</span>
                  </div>
                  <div className="ck-totals-row">
                    <span>Delivery</span>
                    <span>
                      {form.deliveryType === "pickup"
                        ? "Free (Pickup)"
                        : formatCurrency(deliveryFee)}
                    </span>
                  </div>
                  <div className="ck-totals-row grand">
                    <span>Total</span>
                    <span>{formatCurrency(grandTotal)}</span>
                  </div>
                </div>
              </div>

              {/* ══ RIGHT: Billing Form ══ */}
              <div className="ck-card">
                <h2>📋 Your Details</h2>

                <div className="ck-fields">

                  <div className="ck-row">
                    <div className="ck-field">
                      <label>First Name</label>
                      <input type="text" placeholder="Jane" value={form.firstName} onChange={field("firstName")} />
                      {errors.firstName && <span className="ck-err">{errors.firstName}</span>}
                    </div>
                    <div className="ck-field">
                      <label>Last Name</label>
                      <input type="text" placeholder="Smith" value={form.lastName} onChange={field("lastName")} />
                      {errors.lastName && <span className="ck-err">{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className="ck-row">
                    <div className="ck-field">
                      <label>Phone</label>
                      <input type="tel" placeholder="+44 7000 000000" value={form.phone} onChange={field("phone")} />
                      {errors.phone && <span className="ck-err">{errors.phone}</span>}
                    </div>
                    <div className="ck-field">
                      <label>Email</label>
                      <input type="email" placeholder="jane@example.com" value={form.email} onChange={field("email")} />
                      {errors.email && <span className="ck-err">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="ck-field">
                    <label>Fulfilment</label>
                    <div className="ck-toggle">
                      <button
                        type="button"
                        className={form.deliveryType === "delivery" ? "active" : ""}
                        onClick={() => setForm((p) => ({ ...p, deliveryType: "delivery" }))}
                      >🚚 Delivery</button>
                      <button
                        type="button"
                        className={form.deliveryType === "pickup" ? "active" : ""}
                        onClick={() => setForm((p) => ({ ...p, deliveryType: "pickup" }))}
                      >🏪 Pickup</button>
                    </div>
                  </div>

                  {form.deliveryType === "delivery" && (
                    <div className="ck-field">
                      <label>Delivery Address</label>
                      <input
                        type="text"
                        placeholder="123 High Street, London, SW1A 1AA"
                        value={form.address}
                        onChange={field("address")}
                      />
                      {errors.address && <span className="ck-err">{errors.address}</span>}
                    </div>
                  )}

                  <div className="ck-field">
                    <label>
                      Special Instructions&nbsp;
                      <span style={{ fontWeight: 300, textTransform: "none", fontSize: ".82em" }}>(optional)</span>
                    </label>
                    <textarea
                      placeholder="Allergies, dietary needs, preferred delivery time…"
                      value={form.instructions}
                      onChange={field("instructions")}
                    />
                  </div>

                </div>

                {/* ── WhatsApp CTA ── */}
                <div className="ck-wa-wrap">
                  <button className="ck-wa-btn" onClick={handleWhatsApp}>
                    <svg className="ck-wa-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd" clipRule="evenodd"
                        d="M24 4C12.954 4 4 12.954 4 24c0 3.734 1.009 7.236 2.773 10.24L4 44l10.02-2.628A19.914 19.914 0 0024 44c11.046 0 20-8.954 20-20S35.046 4 24 4zm-5.19 11.05c-.44-.02-.93.008-1.38.23-.39.198-.95.7-1.625 1.48-.61.715-1.755-1.145 3.08 0 1.313.728 2.665 1.495 3.718a18.21 18.21 0 006.89 6.314c1.066.533 2.104.858 2.95.95.91.091 1.586-.065 2.04-.364.624-.403 1.079-1.027 1.339-1.651.208-.507.39-1.365.26-1.872-.104-.43-.546-.741-1.027-1l-2.82-1.417c-.455-.234-.806-.234-1.118.026-.338.286-.65.65-.897.949-.234.273-.403.351-.663.221a11.993 11.993 0 01-4.537-3.952c-.156-.26-.104-.442.091-.65.26-.273.572-.611.78-.897.221-.286.364-.468.429-.78.078-.325-.039-.65-.234-.962l-1.274-2.444c-.195-.39-.52-.676-.871-.702z"
                        fill="#1A1008"
                      />
                    </svg>
                    Continue to WhatsApp to Finalise Order 📲
                  </button>

                  <p className="ck-note">
                    Tapping opens WhatsApp with your full order pre-filled.<br />
                    We'll confirm availability &amp; delivery time directly with you.<br />
                    Questions?{" "}
                    <a href="https://wa.me/447466705927" target="_blank" rel="noopener noreferrer">
                      Message us directly
                    </a>.
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
