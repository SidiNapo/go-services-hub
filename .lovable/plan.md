

# Switch Reverse Geocoding to Google Maps API

## What Changes
Replace the free Nominatim reverse geocoding with **Google Maps Geocoding API** for more accurate, reliable address results -- especially on iPhone where Nominatim can return vague addresses.

## What Stays the Same
- The browser's native `navigator.geolocation` for GPS coordinates (this is NOT a Google Maps feature -- it's built into every browser)
- All iOS permission handling, fallback logic, and toast messages
- The WhatsApp Google Maps link generation

## Changes

### 1. Update `src/lib/geolocation.ts`
- Replace the `reverseGeocode` function to call `https://maps.googleapis.com/maps/api/geocode/json?latlng=...&key=API_KEY&language=fr`
- Store the API key as a constant in the file (Google Maps API keys are publishable/public keys restricted by domain)
- Parse the Google response to get `formatted_address` instead of Nominatim's `display_name`

### Technical Detail

```text
Current flow:
  GPS coords --> Nominatim (free, less accurate) --> address string

New flow:
  GPS coords --> Google Maps Geocoding API (accurate, reliable) --> address string
```

Only ONE file changes: `src/lib/geolocation.ts` -- the `reverseGeocode` function (lines 24-34). All 4 service pages already import from this file so they automatically benefit.

## Next Step
After approval, I'll ask you to provide the Google Maps API key.

