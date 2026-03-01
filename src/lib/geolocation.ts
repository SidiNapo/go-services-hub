import { toast } from "sonner";

interface GeoResult {
  lat: number;
  lng: number;
  address: string;
}

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

export async function locateUser(): Promise<GeoResult | null> {
  if (!navigator.geolocation) {
    toast.error("Géolocalisation non supportée par votre navigateur.");
    return null;
  }

  // Try high accuracy first (GPS)
  try {
    const pos = await getPosition(true, 20000);
    const { latitude, longitude } = pos.coords;
    const address = await reverseGeocode(latitude, longitude);
    return { lat: latitude, lng: longitude, address };
  } catch (err: any) {
    if (err?.code === 1) {
      // PERMISSION_DENIED
      toast.error(
        "Localisation refusée. Sur iPhone : Réglages → Safari → Service de localisation → Autoriser.",
        { duration: 8000 }
      );
      return null;
    }

    // TIMEOUT or POSITION_UNAVAILABLE → retry with low accuracy
    try {
      const pos = await getPosition(false, 15000);
      const { latitude, longitude } = pos.coords;
      const address = await reverseGeocode(latitude, longitude);
      return { lat: latitude, lng: longitude, address };
    } catch (retryErr: any) {
      if (retryErr?.code === 1) {
        toast.error(
          "Localisation refusée. Sur iPhone : Réglages → Safari → Service de localisation → Autoriser.",
          { duration: 8000 }
        );
      } else if (retryErr?.code === 2) {
        toast.error("Position indisponible. Veuillez saisir votre adresse manuellement.");
      } else {
        toast.error("Délai dépassé. Veuillez réessayer ou saisir votre adresse manuellement.");
      }
      return null;
    }
  }
}
