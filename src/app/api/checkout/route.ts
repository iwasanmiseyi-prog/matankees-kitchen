import { NextResponse } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2024-12-18.acacia", // Adjust to actual api version
// });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, method, address } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    /* 
    // REAL STRIPE IMPLEMENTATION:
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "gbp",
        product_data: {
          name: item.name,
          description: `Size: ${item.size}`,
        },
        unit_amount: Math.round(item.price * 100), // convert to pence
      },
      quantity: item.quantity,
    }));

    if (method === "delivery") {
      lineItems.push({
        price_data: {
          currency: "gbp",
          product_data: { name: "Delivery Fee" },
          unit_amount: 300, // £3.00
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      metadata: {
        method,
        address: method === "delivery" ? address : "pickup",
        items_json: JSON.stringify(items.map((i: any) => ({ id: i.id, q: i.quantity })))
      }
    });

    return NextResponse.json({ url: session.url });
    */

    // MOCK RESPONSE FOR NOW:
    return NextResponse.json({ 
      url: "/success" // Simulating a redirect to a success page
    });
  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 }
    );
  }
}
