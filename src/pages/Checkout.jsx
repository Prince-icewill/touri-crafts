import { useState } from "react";
import { useCart } from "../context/CartContext";
import { PICKUP_LOCATIONS } from "../data/products";
import "./Checkout.css";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

const PAYSTACK_PUBLIC_KEY = "pk_test_REPLACE_WITH_CLIENT_PUBLIC_KEY";
const TIP_OPTIONS = [0, 10, 15, 20];

export default function Checkout() {
  const { items, total, updateQty, removeItem, clearCart } = useCart();
  const [deliveryType, setDeliveryType] = useState("pickup");
  const [pickupLocation, setPickupLocation] = useState(PICKUP_LOCATIONS[0].id);
  const [tipPercent, setTipPercent] = useState(0);
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", address: "" });
  const [paying, setPaying] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);
  const [paymentError, setPaymentError] = useState("");

  const tipAmount = Math.round((total * tipPercent) / 100);
  const grandTotal = total + tipAmount;

  function handleChange(e) {
    setCustomer((c) => ({ ...c, [e.target.name]: e.target.value }));
  }

  async function verifyAndSaveOrder(reference) {
  setVerifying(true);
  setPaymentError("");

  try {
    const res = await fetch("/api/verify-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference }),
    });
    const result = await res.json();

    if (!result.verified) {
      setPaymentError(
        "We couldn't confirm this payment. If money left your account, please contact us on WhatsApp with your reference: " + reference
      );
      setVerifying(false);
      return;
    }

    const orderData = {
      reference,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      deliveryType,
      deliveryLocation: deliveryType === "pickup" ? pickupLocation : customer.address,
      items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
      subtotal: total,
      tipPercent,
      tipAmount,
      total: grandTotal,
      status: "paid",
      createdAt: serverTimestamp(),
    };

    await addDoc(collection(db, "orders"), orderData);
    setOrderConfirmed({ reference, total: grandTotal });
    clearCart();
  } catch (err) {
    console.error(err);
    setPaymentError(
      "Payment verification failed to reach our server. If money left your account, please contact us on WhatsApp with your reference: " + reference
    );
  }
  setVerifying(false);
}

  function payWithPaystack() {
    if (!customer.email || !customer.name || !customer.phone) {
      alert("Please fill in your name, email, and phone before paying.");
      return;
    }
    if (deliveryType === "delivery" && !customer.address) {
      alert("Please enter a delivery address.");
      return;
    }
    if (!window.PaystackPop) {
      alert("Payment system is still loading, please try again in a moment.");
      return;
    }

    setPaying(true);

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: customer.email,
      amount: grandTotal * 100,
      currency: "NGN",
      metadata: {
        custom_fields: [
          { display_name: "Customer Name", variable_name: "customer_name", value: customer.name },
          { display_name: "Phone", variable_name: "phone", value: customer.phone },
          { display_name: "Delivery Type", variable_name: "delivery_type", value: deliveryType },
          { display_name: deliveryType === "pickup" ? "Pickup Location" : "Delivery Address", variable_name: "location", value: deliveryType === "pickup" ? pickupLocation : customer.address },
          { display_name: "Tip", variable_name: "tip", value: `${tipPercent}% (₦${tipAmount})` },
          { display_name: "Items", variable_name: "items", value: items.map((i) => `${i.name} x${i.qty}`).join(", ") },
        ],
      },
    callback: function (response) {
     setPaying(false);
     verifyAndSaveOrder(response.reference);
      },
      onClose: function () {
        setPaying(false);
      },
    });

    handler.openIframe();
  }

  if (orderConfirmed) {
  return (
    <div className="container checkout-empty">
      <h2 className="order-success-title">Order Confirmed ✓</h2>
      <p>Thank you — your payment of ₦{orderConfirmed.total.toLocaleString()} was successful.</p>
      <p className="order-success-ref">Reference: {orderConfirmed.reference}</p>
      <p>We'll be in touch shortly to arrange {deliveryType === "pickup" ? "pickup" : "delivery"}.</p>
    </div>
  );
}

  if (items.length === 0) {
    return <div className="container checkout-empty"><p>Your cart is empty.</p></div>;
  }

  return (
    <div className="checkout-page container">
      <h1 className="section-title">Checkout</h1>

      {paymentError && <div className="checkout-payment-error">{paymentError}</div>}

      <div className="checkout-grid">
        <div className="checkout-main">
          <div className="checkout-block">
            <h3>Your Details</h3>
            <input name="name" placeholder="Full name" value={customer.name} onChange={handleChange} />
            <input name="email" type="email" placeholder="Email" value={customer.email} onChange={handleChange} />
            <input name="phone" placeholder="Phone number" value={customer.phone} onChange={handleChange} />
          </div>

          <div className="checkout-block">
            <h3>Delivery</h3>
            <div className="delivery-toggle">
              <button className={deliveryType === "pickup" ? "active" : ""} onClick={() => setDeliveryType("pickup")}>Pickup</button>
              <button className={deliveryType === "delivery" ? "active" : ""} onClick={() => setDeliveryType("delivery")}>Delivery</button>
            </div>

            {deliveryType === "pickup" ? (
              <div className="pickup-options">
                {PICKUP_LOCATIONS.map((loc) => (
                  <label key={loc.id} className="pickup-option">
                    <input type="radio" name="pickup" checked={pickupLocation === loc.id} onChange={() => setPickupLocation(loc.id)} />
                    {loc.label}
                  </label>
                ))}
              </div>
            ) : (
              <textarea name="address" placeholder="Enter your delivery address" value={customer.address} onChange={handleChange} rows={3} />
            )}
          </div>

          <div className="checkout-block">
            <h3>Add a Tip</h3>
            <p className="tip-note">Show your support for the Touri Crafts team</p>
            <div className="tip-options">
              {TIP_OPTIONS.map((pct) => (
                <button key={pct} className={tipPercent === pct ? "active" : ""} onClick={() => setTipPercent(pct)}>{pct === 0 ? "No tip" : `${pct}%`}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          {items.map((item) => (
            <div key={item.id} className="summary-item">
              <div>
                <p className="summary-item-name">{item.name}</p>
                <div className="summary-qty">
                  <button onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  <button className="summary-remove" onClick={() => removeItem(item.id)}>Remove</button>
                </div>
              </div>
              <p>₦{(item.price * item.qty).toLocaleString()}</p>
            </div>
          ))}

          <div className="summary-row"><span>Subtotal</span><span>₦{total.toLocaleString()}</span></div>
          {tipAmount > 0 && <div className="summary-row"><span>Tip ({tipPercent}%)</span><span>₦{tipAmount.toLocaleString()}</span></div>}
          <div className="summary-row summary-total"><span>Total</span><span>₦{grandTotal.toLocaleString()}</span></div>

          <button className="btn checkout-pay-btn" onClick={payWithPaystack} disabled={paying ||        verifying}>
           {paying ? "Processing..." : verifying ? "Confirming payment..." : "Pay with Paystack"}
          </button>
        </div>
      </div>
    </div>
  );
}
