import React from "react";
import { loadWhop } from "@whop/elements";
import {
  WhopElements, Checkout, CheckoutElement,
  ExpressCheckoutElement, BrandingElement
} from "@whop/elements-react";

const elements = loadWhop();

export default function CheckoutPanel({ planId, title, onClose }) {
  if (!planId || planId.includes("replace_me")) {
    return <div className="checkout-placeholder">
      <strong>Connect your Whop plan</strong>
      <p>Set the real plan ID in your Whop environment variables before testing checkout.</p>
      <button className="btn btn-dark" onClick={onClose}>Close</button>
    </div>;
  }
  return <div className="checkout-modal" role="dialog" aria-modal="true">
    <div className="checkout-top"><div><small>SECURE WHOP CHECKOUT</small><h3>{title}</h3></div><button onClick={onClose} aria-label="Close checkout">×</button></div>
    <WhopElements elements={elements} environment={import.meta.env.VITE_WHOP_SANDBOX === "true" ? "sandbox" : "production"}>
      <Checkout plan={planId} returnUrl={window.location.href}>
        <ExpressCheckoutElement />
        <CheckoutElement />
        <BrandingElement />
      </Checkout>
    </WhopElements>
  </div>;
}