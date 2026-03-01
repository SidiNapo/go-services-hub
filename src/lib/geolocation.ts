import { toast } from "sonner";

interface GeoResult {
  lat: number;
  lng: number;
  address: string;
}

const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
};

function getPosition(highAccuracy: boolean, timeout: number): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: highAccuracy,
      timeout,
      maximumAge: 0,
    });
  });
}

async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=fr`
    );
    const data = await res.json();
    return data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  } catch {
    return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
  }
}

async function checkPermissionState(): Promise<"granted" | "denied" | "prompt" | "unknown"> {
  try {
    if (navigator.permissions && navigator.permissions.query) {
      const result = await navigator.permissions.query({ name: "geolocation" as PermissionName });
      return result.state as "granted" | "denied" | "prompt";
    }
  } catch {
    // Safari doesn't support permissions.query for geolocation
  }
  return "unknown";
}

function showIOSDeniedInstructions() {
  toast.error(
    "📍 Localisation bloquée sur votre iPhone. Pour l'activer :\n\n1. Ouvrez Réglages → Confidentialité → Service de localisation → Activé\n2. Descendez jusqu'à Safari → sélectionnez « Lors de l'utilisation »\n3. Revenez ici et réessayez",
    { duration: 12000 }
  );
}

function showGenericDeniedInstructions() {
  toast.error(
    "📍 Localisation refusée. Veuillez autoriser l'accès à votre position dans les paramètres de votre navigateur, puis réessayez.",
    { duration: 8000 }
  );
}

export async function locateUser(): Promise<GeoResult | null> {
  if (!navigator.geolocation) {
    toast.error("Géolocalisation non supportée par votre navigateur.");
    return null;
  }

  // Pre-check: if already denied, show instructions immediately
  const permState = await checkPermissionState();
  if (permState === "denied") {
    if (isIOS()) {
      showIOSDeniedInstructions();
    } else {
      showGenericDeniedInstructions();
    }
    return null;
  }

  // On iOS first prompt: show a helpful toast so user knows to tap "Allow"
  if (isIOS() && permState !== "granted") {
    toast.info("📍 Autorisez l'accès à votre position dans la fenêtre qui va apparaître.", {
      duration: 5000,
    });
    // Small delay to let the toast render before the browser prompt covers it
    await new Promise((r) => setTimeout(r, 600));
  }

  // Try high accuracy first (GPS)
  try {
    const pos = await getPosition(true, 20000);
    const { latitude, longitude } = pos.coords;
    const address = await reverseGeocode(latitude, longitude);
    toast.success("📍 Position trouvée !", { duration: 2000 });
    return { lat: latitude, lng: longitude, address };
  } catch (err: any) {
    if (err?.code === 1) {
      // PERMISSION_DENIED
      if (isIOS()) {
        showIOSDeniedInstructions();
      } else {
        showGenericDeniedInstructions();
      }
      return null;
    }

    // TIMEOUT or POSITION_UNAVAILABLE → retry with low accuracy (Wi-Fi/cell)
    toast.info("Recherche GPS en cours… tentative réseau.", { duration: 3000 });
    try {
      const pos = await getPosition(false, 15000);
      const { latitude, longitude } = pos.coords;
      const address = await reverseGeocode(latitude, longitude);
      toast.success("📍 Position trouvée !", { duration: 2000 });
      return { lat: latitude, lng: longitude, address };
    } catch (retryErr: any) {
      if (retryErr?.code === 1) {
        if (isIOS()) {
          showIOSDeniedInstructions();
        } else {
          showGenericDeniedInstructions();
        }
      } else if (retryErr?.code === 2) {
        toast.error("Position indisponible. Veuillez saisir votre adresse manuellement.");
      } else {
        toast.error("Délai dépassé. Vérifiez que le GPS est activé, puis réessayez.");
      }
      return null;
    }
  }
}
