
Goal: make iPhone geolocation prompt and capture flow reliable across the whole app, while hardening API-key usage and modernizing the UX.

What I found in the current codebase
- Geolocation is centralized in `src/lib/geolocation.ts` and used by all 4 pages (`GoRide`, `GoWash`, `GoClean`, `GoFix`) via `locateUser()`.
- `locateUser()` currently does an async permission pre-check (`navigator.permissions.query`) and then waits 600ms before calling `getCurrentPosition`.
- On iOS Safari, `navigator.permissions` behavior is inconsistent, and delaying the actual geolocation call can cause prompt reliability issues.
- The Google Maps key is hardcoded in `src/lib/geolocation.ts` and has already been exposed in code/chat.
- The app is currently not published; testing inside embedded contexts can block geolocation depending on permissions policy.

Do I know what the issue is?
- Yes. The permission prompt flow is fragile on iPhone because it depends on an unreliable pre-check and delayed call path before requesting geolocation, plus iOS/browser-context constraints (iframe/in-app browser/denied state).

Implementation plan

1) Rebuild geolocation request flow in `src/lib/geolocation.ts` (core fix)
- Remove iOS-fragile gating logic before permission prompt (`permissions.query` dependency and pre-call delay).
- Trigger `navigator.geolocation.getCurrentPosition` immediately in the call path initiated by the user click.
- Keep dual-attempt strategy:
  - Attempt 1: high accuracy (GPS, 20s timeout)
  - Attempt 2: lower accuracy fallback (network, 15s timeout)
- Add strict `try/finally` and normalized error mapping (`permission_denied`, `timeout`, `unavailable`, `blocked_context`, `unsupported`, `unknown`) so UI responses are consistent.
- Keep reverse geocoding with Google Maps API and coordinate fallback if geocode fails.

2) Add modern iPhone/browser-context guards (reliability)
- Before requesting GPS, detect non-recoverable contexts:
  - non-secure context
  - embedded context where geolocation may be policy-blocked
  - common in-app browsers known to block/alter permission behavior
- Return actionable user guidance when blocked (open directly in Safari, enable location in iOS settings).
- Keep denied-permission instructions, but make them concise and step-based for iPhone.

3) Standardize UI behavior on all 4 service pages
Files:
- `src/pages/GoRidePage.tsx`
- `src/pages/GoWashPage.tsx`
- `src/pages/GoCleanPage.tsx`
- `src/pages/GoFixPage.tsx`

Changes:
- Ensure `handleLocateMe` uses `try/finally` so loading state always resets.
- Keep button disabled/loading state and consistent French status labels.
- Show success state only when coords/address are actually resolved.
- Keep manual address entry as first-class fallback when location is denied or unavailable.

4) Security hardening for Google Maps usage (critical)
- Immediate operational action: rotate the currently exposed key in Google Cloud.
- Apply API restrictions:
  - allow only Geocoding API
  - enforce HTTP referrer allowlist for your exact domains (preview + production)
- Apply abuse controls:
  - quotas and budget alerts
  - monitoring for abnormal usage
- In code, avoid spreading key usage beyond one utility module.

5) iPhone-first verification checklist (acceptance criteria)
- First-time user on iPhone Safari (Ask): native permission prompt appears and successful address fills.
- User previously denied: no silent failure; clear steps to re-enable in iOS settings.
- GPS timeout: automatic fallback returns best available network location.
- Embedded/in-app browser: user gets explicit “open in Safari” guidance.
- All 4 flows (`GoRide`, `GoWash`, `GoClean`, `GoFix`) behave identically and include Maps link in WhatsApp summary when coordinates exist.

Important reality check
- No web app can force iOS to show the native permission popup every time after a denial; that is controlled by iOS/Safari. The rebuild will make the request path robust, remove silent failures, and provide deterministic fallback/instructions so users can complete the flow reliably.
