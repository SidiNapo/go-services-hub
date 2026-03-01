

# Fix Geolocation for iPhone -- All 4 Services

## Problem
On iPhone (iOS Safari), the "Me localiser" button can fail silently because:
1. No user feedback when geolocation permission is denied or times out
2. No guidance to enable Location Services in iOS Settings
3. Error callbacks just silently stop the spinner with no message
4. GoWash has a slightly different (non-async) implementation pattern vs the other 3 pages
5. iOS Safari requires HTTPS and explicit permission -- users need clear instructions if blocked

## Solution
Update all 4 service pages (GoRide, GoWash, GoClean, GoFix) with robust, iPhone-compatible geolocation:

### Changes per page

**1. Add error handling with user-facing toast messages**
- On `PERMISSION_DENIED`: show a toast explaining how to enable location in iOS Settings (Settings > Safari > Location)
- On `POSITION_UNAVAILABLE`: show "Location unavailable, please enter manually"
- On `TIMEOUT`: show "Location timed out, please try again"
- Use the existing `sonner` toast system already installed

**2. Standardize all 4 implementations**
- Make GoWash use the same async/await pattern as the other 3 pages
- Add `accept-language=fr` to GoWash's Nominatim call (missing vs other pages)
- Ensure consistent error messages in French across all services

**3. Add iOS-specific geolocation improvements**
- Increase timeout from 15s to 20s (iOS can be slower on first prompt)
- Add a fallback: if high-accuracy fails, retry once without `enableHighAccuracy` (Wi-Fi/cell tower positioning as backup)
- Show a loading state with clear text: "Recherche GPS..." during locate

### Files to modify
- `src/pages/GoRidePage.tsx` -- update `handleLocateMe` with error toasts + fallback
- `src/pages/GoWashPage.tsx` -- rewrite `handleLocateMe` to async pattern + error toasts + fallback
- `src/pages/GoCleanPage.tsx` -- update `handleLocateMe` with error toasts + fallback
- `src/pages/GoFixPage.tsx` -- update `handleLocateMe` with error toasts + fallback

### Technical Details

Each `handleLocateMe` will follow this pattern:

```text
handleLocateMe()
  |-- Check navigator.geolocation exists
  |     (if not: toast "Geolocation non supportée")
  |-- Try HIGH ACCURACY (enableHighAccuracy: true, timeout: 20s)
  |     |-- Success: save coords, reverse geocode, done
  |     |-- Fail: 
  |           |-- PERMISSION_DENIED: toast with iOS instructions
  |           |-- TIMEOUT/UNAVAILABLE: retry LOW ACCURACY once
  |                 |-- Success: save coords, reverse geocode
  |                 |-- Fail: toast error message
```

Import `toast` from `sonner` in each page (already available in the project).

