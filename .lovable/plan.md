

## Fix Car Brand Logos - Use Reliable Logo Source

### Problem
The current Wikipedia/Wikimedia SVG URLs are blocked by CORS and hotlinking restrictions, causing most logos to fail loading and display only the brand's first initial letter as a fallback.

### Solution
Replace all Wikipedia logo URLs with a reliable, free logo CDN that allows hotlinking. The best option is **logo.clearbit.com** (e.g., `https://logo.clearbit.com/audi.com`) or **cdn.imagin.studio** car brand logos. As a more reliable alternative, I will use **SVG-based logos from a CDN** that consistently works.

### Implementation

**File: `src/pages/GoWashPage.tsx`**

1. Replace all 36 `carBrands` logo URLs with working URLs from `https://www.carlogos.org/car-logos/` or use inline SVG text-based fallbacks that always render
2. The most reliable approach: use `https://logo.clearbit.com/{brand-domain}` which is a free API that serves real company logos without CORS issues. For example:
   - Audi: `https://logo.clearbit.com/audi.com`
   - BMW: `https://logo.clearbit.com/bmw.com`
   - Mercedes: `https://logo.clearbit.com/mercedes-benz.com`
   - Tesla: `https://logo.clearbit.com/tesla.com`
   - etc.

3. Update all 36 brand entries with their correct company domain URLs

4. Keep the existing fallback mechanism (initial letter display) but it should rarely trigger with this reliable source

### Brands and their domains (all 36):
Audi (audi.com), BMW (bmw.com), Citroen (citroen.com), Dacia (dacia.com), Fiat (fiat.com), Ford (ford.com), Honda (honda.com), Hyundai (hyundai.com), Jaguar (jaguar.com), Jeep (jeep.com), Kia (kia.com), Land Rover (landrover.com), Lexus (lexus.com), Mazda (mazda.com), Mercedes (mercedes-benz.com), Mini (mini.com), Mitsubishi (mitsubishi-motors.com), Nissan (nissan.com), Opel (opel.com), Peugeot (peugeot.com), Porsche (porsche.com), Renault (renault.com), Seat (seat.com), Skoda (skoda.com), Suzuki (suzuki.com), Tesla (tesla.com), Toyota (toyota.com), Volkswagen (volkswagen.com), Volvo (volvocars.com), Alfa Romeo (alfaromeo.com), Chevrolet (chevrolet.com), MG (mgmotor.com), Subaru (subaru.com), Cupra (cupraofficial.com), DS (dsautomobiles.com)

### No other files need changes - this is a URL-only fix in one file.

