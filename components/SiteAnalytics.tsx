"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";

// Visit any page with ?notrack to stop counting your own visits in this
// browser, or ?track to turn counting back on.
const OPT_OUT_KEY = "va-opt-out";

function beforeSend(event: BeforeSendEvent) {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.has("notrack")) localStorage.setItem(OPT_OUT_KEY, "1");
    if (params.has("track")) localStorage.removeItem(OPT_OUT_KEY);
    if (localStorage.getItem(OPT_OUT_KEY)) return null;
  } catch {}
  return event;
}

export default function SiteAnalytics() {
  return <Analytics beforeSend={beforeSend} />;
}
