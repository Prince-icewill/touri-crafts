export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { reference } = req.body || {};
  if (!reference) {
    return res.status(400).json({ error: "Missing payment reference" });
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({
      error: "PAYSTACK_SECRET_KEY is not set in Vercel environment variables yet.",
    });
  }

  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      { method: "GET", headers: { Authorization: `Bearer ${secretKey}` } }
    );
    const result = await response.json();

    if (!result.status || result.data?.status !== "success") {
      return res.status(200).json({ verified: false, reason: result.data?.gateway_response || "Payment not successful" });
    }

    return res.status(200).json({
      verified: true,
      amount: result.data.amount / 100,
      currency: result.data.currency,
      paidAt: result.data.paid_at,
      customerEmail: result.data.customer?.email,
      reference: result.data.reference,
    });
  } catch (err) {
    console.error("Paystack verification error:", err);
    return res.status(500).json({ error: "Verification request failed" });
  }
}