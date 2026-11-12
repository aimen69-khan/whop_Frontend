// Custom conversion events. Whop's pixel snippet must be installed in the Whop Website
// settings / site head. These calls are safe when the pixel has not loaded yet.
export function trackWhop(event, payload = {}) {
  try {
    if (typeof window !== "undefined" && window.whop?.track) {
      window.whop.track(event, payload);
      console.info("[Whop pixel]", event, payload);
    } else {
      console.info("[Whop pixel pending]", event, payload);
    }
  } catch (error) {
    console.warn("Whop tracking failed:", error);
  }
}