# Summit Roofing Co. — Whop Website template

A responsive, reusable roofing-company sales website built with Vite + React and Whop Elements. It includes services, service area, financing disclosure, review placeholders, three Whop checkout entry points, an estimate form, and custom pixel events.

## Important: what is and is not complete

This is the **source template**, not a deployed Whop website. It cannot truthfully be submitted as a completed bounty until you:
1. Create a Whop business and verify it is eligible to sell real-world roofing services.
2. Create the three one-time plans in that Whop business:
   - Roof Inspection — $149
   - Project Deposit — $500
   - Roof Tune-Up — $399
3. Put the real plan IDs in the Vite environment variables.
4. Configure the Whop Website / Whop CLI deployment and publish to a `*.whop.app` address.
5. Add the Whop Pixel snippet in the Whop Website settings and verify the three custom events.
6. Wire the Estimate form to the current Whop Leads API schema and verify the lead appears in the account.
7. Configure and test the saved payment method / setup-intent and final invoice workflow. Do not auto-charge a customer without clear written authorization for the amount and timing.
8. Replace sample reviews, placeholder phone number, and service-area details with truthful company information.
9. Complete a sandbox checkout and record the requested 3–5 minute demo.

## Install locally

```bash
npm install
cp .env.example .env
npm run dev
```

Set these Vite variables in `.env` (Vite-exposed variables are public, so only plan IDs and sandbox toggle belong here):
```env
VITE_WHOP_SANDBOX=true
VITE_WHOP_INSPECTION_PLAN_ID=plan_...
VITE_WHOP_DEPOSIT_PLAN_ID=plan_...
VITE_WHOP_FLAT_RATE_PLAN_ID=plan_...
```

The `WHOP_API_KEY` and `WHOP_COMPANY_ID` must stay server-side. Do not add them with a `VITE_` prefix or commit `.env`.

## Whop Elements

The checkout component uses `@whop/elements` and `@whop/elements-react`, with `CheckoutElement`, `ExpressCheckoutElement`, and the required `BrandingElement`. Confirm the exact props and account eligibility in the current docs before production. Apple Pay / Google Pay visibility depends on device, browser, seller settings and merchant approval.

Official references:
- https://docs.whop.com/elements/latest
- https://docs.whop.com/elements/upcoming/checkout/checkout
- https://docs.whop.com/elements/upcoming/payments/overview
- https://docs.whop.com/developer/cli
- https://whop.sh

## Custom tracking

`src/whop.js` calls:
- `whop.track("service_viewed", { service_name })`
- `whop.track("estimate_requested", { service })`
- `whop.track("deposit_started", { plan_type, plan_name })`

The Whop Pixel must be installed on the published site. Check the browser console and Whop Pixel / analytics tooling to verify actual events; the local fallback log is not proof of delivery to Whop.

## Estimate leads and final invoice

The browser form posts to `/api/leads`. Implement this endpoint server-side using the current Whop Leads API schema and the company API key. The final balance must be created server-side with the Whop Invoices API after the completed job is reconciled. Store the Whop member/customer ID and the payment-method/setup-intent ID securely. Prefer sending a manual invoice until the customer has explicitly authorized off-session charging. The exact API request body and permissions must be taken from the current official API reference:
- https://docs.whop.com/api-reference/leads/create-lead
- https://docs.whop.com/api-reference/invoices/create-invoice
- https://docs.whop.com/api-reference/setup-intents/create-setup-intent

## Rebranding

Edit the brand name, phone, city, service-area list, services, and pricing in `src/App.jsx`. The layout is data-driven for service cards and plan cards, so basic rebranding does not require restructuring the page.

## Bounty submission checklist

- [ ] Live `whop.app` URL
- [ ] GitHub repository or ZIP source
- [ ] Test checkout completed in Whop sandbox using Payment Elements, Express Checkout and BrandingElement
- [ ] Estimate form creates a Lead visible in Whop
- [ ] Setup intent / stored payment method saved with customer consent
- [ ] Final invoice created and manual/authorized collection demonstrated
- [ ] `service_viewed`, `estimate_requested`, `deposit_started` verified in Whop Pixel
- [ ] 3–5 minute recording of the above
- [ ] Replace all fictional testimonials and demo contact details
