import { toast } from "sonner";

export interface GeoResult {
  lat: number;
  lng: number;
  address: string;
}

// ── Environment detection ─────────────────────────────────────

const isIOS = (): boolean =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

const isInAppBrowser = (): boolean => {
  const ua = navigator.userAgent;
  return /FBAN|FBAV|Instagram|Line\/|Twitter|MicroMessenger|LinkedIn/i.test(ua);
};

const isSecureContext = (): boolean =>
  window.isSecureContext ?? location.protocol === "https:";

// ── Reverse geocoding (Google Maps) ───────────────────────────

const GOOGLE_MAPS_API_KEY = "AIzaSyAKvruUC1LBR5c_AVRXTsasLDRo5PxviFY";

async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}&language=fr`
    );
    const data = await res.json();
    if (data.status === "OK" && data.results?.length > 0) {
      return data.results[0].formatted_address;
    }
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  } catch {
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  }
}

// ── Core geolocation request (no async gating before call) ────

function requestPosition(highAccuracy: boolean, timeout: number): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: highAccuracy,
      timeout,
      maximumAge: 0,
    });
  });
}

// ── Public API ────────────────────────────────────────────────

export async function locateUser(): Promise<GeoResult | null> {
  // 1. Feature check
  if (!navigator.geolocation) {
    toast.error("Géolocalisation non supportée par votre navigateur.");
    return null;
  }

  // 2. Non-secure context (HTTP)
  if (!isSecureContext()) {
    toast.error("📍 La géolocalisation nécessite une connexion sécurisée (HTTPS).");
    return null;
  }

  // 3. In-app browser (Facebook, Instagram, etc.) — prompt to open in Safari/Chrome
  if (isInAppBrowser()) {
    if (isIOS()) {
      toast.error(
        "📍 Ce navigateur intégré bloque la localisation. Appuyez sur ⋯ puis « Ouvrir dans Safari ».",
        { duration: 8000 }
      );
    } else {
      toast.error(
        "📍 Ce navigateur intégré bloque la localisation. Ouvrez ce lien dans Chrome ou votre navigateur par défaut.",
        { duration: 8000 }
      );
    }
    return null;
  }

  // 4. Attempt GPS — IMMEDIATELY from user gesture, no pre-checks or delays
  try {
    const pos = await requestPosition(true, 20_000);
    const { latitude, longitude } = pos.coords;
    const address = await reverseGeocode(latitude, longitude);
    toast.success("📍 Position trouvée !", { duration: 2000 });
    return { lat: latitude, lng: longitude, address };
  } catch (err: any) {
    // PERMISSION_DENIED
    if (err?.code === 1) {
      toast.error(
        "📍 L'accès à la localisation a été refusé. Veuillez l'autoriser et réessayer.",
        { duration: 8000 }
      );
      return null;
    }

    // TIMEOUT or POSITION_UNAVAILABLE — fallback to network/cell
    try {
      toast.info("📍 GPS lent… tentative réseau.", { duration: 3000 });
      const pos = await requestPosition(false, 15_000);
      const { latitude, longitude } = pos.coords;
      const address = await reverseGeocode(latitude, longitude);
      toast.success("📍 Position trouvée !", { duration: 2000 });
      return { lat: latitude, lng: longitude, address };
    } catch (retryErr: any) {
      if (retryErr?.code === 1) {
        toast.error(
          "📍 L'accès à la localisation a été refusé. Veuillez l'autoriser et réessayer.",
          { duration: 8000 }
        );
      } else if (retryErr?.code === 2) {
        toast.error("📍 Position indisponible. Saisissez votre adresse manuellement.");
      } else {
        toast.error("📍 Délai dépassé. Vérifiez que le GPS est activé, puis réessayez.");
      }
      return null;
    }
  }
}
