import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Battery, Clock, Shield, Leaf, ArrowRight, User, Phone, MapPin, ChevronLeft, Navigation, Calendar, Truck, Building2, CheckCircle2, Loader2 } from "lucide-react";
import { locateUser } from "@/lib/geolocation";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import motoFlow from "@/assets/goswap-station.jpg";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, differenceInDays } from "date-fns";
import { fr } from "date-fns/locale";

type DurationType = "hour" | "day" | "week" | "month";
type DeliveryMode = "delivery" | "pickup";

const pickupLocations = [
  { id: "oulfa", name: "Agence Oulfa", address: "Lotissement Smara, N°77 Rue 09, Rond-point Chahdia, Oulfa", area: "Oulfa" },
  { id: "bourgogne", name: "Agence Bourgogne", address: "611, Rue Goulmima, Bourgogne", area: "Bourgogne" },
];

const pricing: { id: DurationType; duration: string; price: string; unit: string; popular: boolean; emoji: string; perUnit: string }[] = [
  { id: "hour", duration: "1 Heure", price: "30", unit: "DH", popular: false, emoji: "⏱️", perUnit: "/heure" },
  { id: "day", duration: "1 Jour", price: "160", unit: "DH", popular: true, emoji: "☀️", perUnit: "/jour" },
  { id: "week", duration: "1 Semaine", price: "800", unit: "DH", popular: false, emoji: "📅", perUnit: "/semaine" },
  { id: "month", duration: "1 Mois", price: "2 300", unit: "DH", popular: false, emoji: "🗓️", perUnit: "/mois" },
];

const features = [
  { icon: Zap, title: "100% Électrique", desc: "Zéro émission, zéro bruit.", emoji: "⚡" },
  { icon: Battery, title: "Autonomie illimitée", desc: "Swap batterie instantané.", emoji: "🔋" },
  { icon: Clock, title: "Disponible 24h/24", desc: "Réservez à tout moment.", emoji: "🕐" },
  { icon: Shield, title: "Assurance incluse", desc: "Roulez l'esprit tranquille.", emoji: "🛡️" },
  { icon: Leaf, title: "Écologique", desc: "Zéro empreinte carbone.", emoji: "🌱" },
];

const timeSlots = [
  "00:00", "01:00", "02:00", "03:00", "04:00", "05:00",
  "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
];

const GoRidePage = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  // Step 1: Duration
  const [selectedPlan, setSelectedPlan] = useState<DurationType>("day");

  // Step 2: Date & Time
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [dropoffDate, setDropoffDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState("");
  const [numberOfHours, setNumberOfHours] = useState(1);

  // Step 3: Delivery mode
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode | "">("");
  const [selectedPickup, setSelectedPickup] = useState("");

  // Step 4: Location (for delivery mode)
  const [city, setCity] = useState("Casablanca");
  const [address, setAddress] = useState("");
  const [locating, setLocating] = useState(false);
  const [locationCoords, setLocationCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Step 5: Personal info
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const openModal = () => { setStep(1); setOpen(true); };

  const handleLocateMe = async () => {
    setLocating(true);
    try {
      const result = await locateUser();
      if (result) {
        setLocationCoords({ lat: result.lat, lng: result.lng });
        setAddress(result.address);
      }
    } finally {
      setLocating(false);
    }
  };

  const selectedPricing = pricing.find(p => p.id === selectedPlan)!;

  const getQuantity = () => {
    if (selectedPlan === "hour") return numberOfHours;
    if (selectedPlan === "day" && date && dropoffDate) {
      const days = differenceInDays(dropoffDate, date);
      return days > 0 ? days : 1;
    }
    return 1;
  };

  const quantity = getQuantity();
  const basePrice = parseInt(selectedPricing.price.replace(/\s/g, ""));
  const deliveryFee = deliveryMode === "delivery" ? 20 : 0;
  const totalPrice = basePrice * quantity + deliveryFee;
  const displayDuration = selectedPlan === "hour" && numberOfHours > 1
    ? `${numberOfHours} Heures`
    : selectedPlan === "day" && quantity > 1
    ? `${quantity} Jours`
    : selectedPricing.duration;
  const formattedTotalPrice = totalPrice.toLocaleString("fr-FR");

  const canNext = () => {
    switch (step) {
      case 1: return !!selectedPlan;
      case 2: return !!date && !!hour && (selectedPlan !== "day" || !!dropoffDate);
      case 3: return deliveryMode === "pickup" ? !!selectedPickup : deliveryMode === "delivery";
      case 4: return deliveryMode === "pickup" || address.trim().length > 0;
      case 5: return name.trim().length > 0 && phone.trim().length > 0;
      default: return false;
    }
  };

  const handleNext = () => {
    if (!canNext()) return;
    // Skip address step if pickup
    if (step === 3 && deliveryMode === "pickup") {
      setStep(5);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    // If on info step and pickup, go back to step 3
    if (step === 5 && deliveryMode === "pickup") {
      setStep(3);
    } else {
      setStep(step - 1);
    }
  };

  const getLocationText = () => {
    if (deliveryMode === "pickup") {
      const loc = pickupLocations.find(l => l.id === selectedPickup);
      return loc ? `Récupération · ${loc.name}` : "";
    }
    return `Livraison · ${address}`;
  };

  const handleConfirm = () => {
    const mapsLink = locationCoords ? `\n📌 Google Maps: https://www.google.com/maps?q=${locationCoords.lat},${locationCoords.lng}` : "";
    const locationInfo = deliveryMode === "pickup"
      ? `📍 Récupération: ${pickupLocations.find(l => l.id === selectedPickup)?.name}\n📌 ${pickupLocations.find(l => l.id === selectedPickup)?.address}`
      : `🚚 Livraison à domicile\n🏙️ Ville: ${city}\n📍 Adresse: ${address}${mapsLink}`;
    const dateInfo = selectedPlan === "day"
      ? `📅 Récupération: ${date ? format(date, "dd/MM/yyyy") : ""}\n📅 Retour: ${dropoffDate ? format(dropoffDate, "dd/MM/yyyy") : ""}`
      : `📅 Date: ${date ? format(date, "dd/MM/yyyy") : ""}`;
    const deliveryFeeInfo = deliveryMode === "delivery" ? `\n🚚 Frais de livraison: 20 DH` : "";
    const msg = `Bonjour, je souhaite réserver une moto GoRide Flow :\n\n🏍️ Durée: ${displayDuration}\n💰 Prix total: ${formattedTotalPrice} ${selectedPricing.unit}${deliveryFeeInfo}\n${dateInfo}\n🕐 Heure: ${hour}\n\n${locationInfo}\n\n👤 ${name}\n📞 ${phone}${notes ? `\n📝 Notes: ${notes}` : ""}`;
    window.open(`https://wa.me/212660880110?text=${encodeURIComponent(msg)}`, "_blank");
    setOpen(false);
  };

  const stepLabels = deliveryMode === "pickup"
    ? ["Durée", "Date", "Mode", "—", "Infos"]
    : ["Durée", "Date", "Mode", "Adresse", "Infos"];
  const visibleSteps = deliveryMode === "pickup"
    ? [{ label: "Durée", idx: 1 }, { label: "Date", idx: 2 }, { label: "Mode", idx: 3 }, { label: "Infos", idx: 5 }]
    : [{ label: "Durée", idx: 1 }, { label: "Date", idx: 2 }, { label: "Mode", idx: 3 }, { label: "Adresse", idx: 4 }, { label: "Infos", idx: 5 }];

  return (
    <Layout>
      <SEO 
        title="GoRide - Location de motos électriques à Casablanca | Transport Maroc"
        description="Réservez votre moto électrique avec GoRide ! Autonomie illimitée, assurance incluse et swap de batterie instantané, la solution idéale de transport à Casablanca."
        canonical="https://go212.ma/goride"
        schema={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Location de moto électrique GoRide",
          "description": "Location de motos électriques à Casablanca avec autonomie illimitée et swap batterie.",
          "brand": {
            "@type": "Brand",
            "name": "GO212"
          }
        }}
      />
      {/* Hero - immersive moto showcase */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}>
          <img src={motoFlow} alt="Flow 2026" className="w-full h-full object-cover" loading="eager" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(160_20%_5%/0.5)] via-[hsl(160_20%_8%/0.3)] to-[hsl(160_20%_5%/0.85)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(160_20%_5%/0.6)] via-transparent to-transparent" />

        <div className="absolute top-[15%] right-[10%] w-72 h-72 rounded-full bg-primary/10 blur-[100px] opacity-40" />
        <div className="absolute bottom-[20%] left-[5%] w-56 h-56 rounded-full bg-primary/8 blur-[80px] opacity-30" />

        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, hsl(var(--primary-foreground)) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="container mx-auto px-4 relative z-10 pt-24">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/15 border border-primary/20 text-primary-foreground text-sm font-medium mb-8">
              <Zap className="h-4 w-4" />
              100% Électrique · Flow 2026
            </motion.div>

            <div className="overflow-hidden mb-3">
              <motion.h1 initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
                className="font-display text-4xl sm:text-6xl md:text-8xl font-bold text-primary-foreground leading-[0.85] tracking-tight">
                Roulez
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h1 initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.35 }}
                className="font-display text-4xl sm:text-6xl md:text-8xl font-bold leading-[0.85] tracking-tight">
                <span className="text-gradient">électrique</span>{" "}
                <span className="text-primary-foreground/60 font-light">dès maintenant</span>
              </motion.h1>
            </div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base md:text-xl text-primary-foreground/70 max-w-xl mb-10 leading-relaxed">
              2 places · Swap batterie instantané · Autonomie illimitée. À partir de 30 DH/heure.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <motion.button onClick={openModal} whileTap={{ scale: 0.95 }}
                className="gradient-go px-8 py-4 rounded-2xl font-display font-semibold text-primary-foreground shadow-go inline-flex items-center gap-3 text-base">
                <span>Réserver maintenant</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>

              <div className="flex items-center gap-6 px-6 py-4 rounded-2xl bg-black/40 border border-white/20 shadow-lg">
                <div className="text-center">
                  <div className="font-display text-2xl font-bold text-white drop-shadow-md">30<span className="text-sm font-normal text-white/70">DH</span></div>
                  <div className="text-xs text-white/90 uppercase tracking-wider font-medium">/ heure</div>
                </div>
                <div className="w-px h-8 bg-white/40" />
                <div className="text-center">
                  <div className="font-display text-2xl font-bold text-white drop-shadow-md">15min</div>
                  <div className="text-xs text-white/90 uppercase tracking-wider font-medium">Livraison</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-go" />
        <div className="absolute top-10 left-[10%] w-40 h-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-5 right-[15%] w-56 h-56 rounded-full bg-white/5 blur-2xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">Pourquoi GoRide ?</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 max-w-4xl mx-auto">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl md:rounded-3xl bg-white/15 backdrop-blur-md border border-white/20 p-4 md:p-6 text-center transition-all duration-300 hover:bg-white/25 hover:border-white/35 cursor-default overflow-hidden relative">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <motion.span className="text-2xl md:text-3xl block mb-2 md:mb-3"
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }} transition={{ duration: 0.4 }}>
                  {f.emoji}
                </motion.span>
                <h3 className="font-display font-semibold text-xs md:text-sm mb-1 text-primary-foreground">{f.title}</h3>
                <p className="text-[10px] md:text-xs text-primary-foreground/70">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 md:py-14 relative overflow-hidden">
        <div className="absolute inset-0 bg-go-surface" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <h3 className="font-display text-xl md:text-2xl font-bold text-center sm:text-left">
              Roulez électrique dès aujourd'hui
            </h3>
            <motion.button onClick={openModal} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl font-display font-semibold gradient-go text-primary-foreground shadow-go inline-flex items-center gap-2 text-sm whitespace-nowrap">
              Réserver <ArrowRight className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── Reservation Modal ─────────────────────────── */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 rounded-3xl border-border/50 gap-0">
          <DialogTitle className="sr-only">Réserver GoRide Flow</DialogTitle>

          {/* Header */}
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border/50 p-4 md:p-6 pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="font-display font-bold text-lg">GoRide · Flow</span>
              </div>
              <span className="text-sm font-semibold text-primary">{formattedTotalPrice} DH</span>
            </div>
            <div className="flex items-center gap-1">
              {visibleSteps.map((vs, i) => (
                <div key={vs.label} className="flex-1 flex flex-col items-center gap-1">
                  <div className={cn(
                    "w-full h-1.5 rounded-full transition-all duration-300",
                    step > vs.idx ? "bg-primary" : step === vs.idx ? "bg-primary/60" : "bg-muted"
                  )} />
                  <span className={cn(
                    "text-[10px] font-medium transition-colors",
                    step >= vs.idx ? "text-primary" : "text-muted-foreground"
                  )}>{vs.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 md:p-6">
            <AnimatePresence mode="wait">
              {/* Step 1: Duration selection */}
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                  <h3 className="font-display text-xl font-bold mb-1">Choisissez votre durée</h3>
                  <p className="text-sm text-muted-foreground mb-6">Sélectionnez la formule qui vous convient</p>

                  <div className="grid grid-cols-2 gap-3">
                    {pricing.map((p) => (
                      <button key={p.id} onClick={() => setSelectedPlan(p.id)}
                        className={cn(
                          "relative flex flex-col items-center p-5 rounded-2xl border-2 text-center transition-all duration-200",
                          selectedPlan === p.id
                            ? "border-primary bg-primary/5 shadow-go"
                            : "border-border hover:border-primary/30 hover:bg-muted/30"
                        )}>
                        {p.popular && (
                          <span className="absolute -top-2.5 right-3 px-2.5 py-0.5 rounded-full gradient-go text-primary-foreground text-[10px] font-semibold">
                            Populaire
                          </span>
                        )}
                        <span className="text-2xl mb-2">{p.emoji}</span>
                        <span className="font-display font-semibold text-sm mb-1">{p.duration}</span>
                        <div className="flex items-baseline gap-0.5">
                          <span className="font-display text-2xl font-bold text-primary">{p.price}</span>
                          <span className="text-xs text-muted-foreground">{p.unit}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                  <h3 className="font-display text-xl font-bold mb-1">Date & Heure</h3>
                  <p className="text-sm text-muted-foreground mb-5">Quand voulez-vous votre moto ?</p>

                  {selectedPlan === "day" ? (
                    <>
                      {/* Pickup date */}
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">📅 Date de récupération *</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-sm transition-all mb-4",
                            date ? "border-primary bg-primary/5" : "border-input hover:border-primary/30"
                          )}>
                            <Calendar className="h-4 w-4 text-primary" />
                            {date ? format(date, "EEEE d MMMM yyyy", { locale: fr }) : "Sélectionner la date de récupération"}
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarUI mode="single" selected={date} onSelect={(d) => { setDate(d); if (dropoffDate && d && dropoffDate <= d) setDropoffDate(undefined); }}
                            disabled={(d) => d < new Date()}
                            className={cn("p-3 pointer-events-auto")} />
                        </PopoverContent>
                      </Popover>

                      {/* Dropoff date */}
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">📅 Date de retour *</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-sm transition-all mb-5",
                            dropoffDate ? "border-primary bg-primary/5" : "border-input hover:border-primary/30"
                          )}>
                            <Calendar className="h-4 w-4 text-primary" />
                            {dropoffDate ? format(dropoffDate, "EEEE d MMMM yyyy", { locale: fr }) : "Sélectionner la date de retour"}
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarUI mode="single" selected={dropoffDate} onSelect={setDropoffDate}
                            disabled={(d) => d < new Date() || (date ? d <= date : false)}
                            className={cn("p-3 pointer-events-auto")} />
                        </PopoverContent>
                      </Popover>
                    </>
                  ) : (
                    <>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Date de début *</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <button className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-sm transition-all mb-5",
                            date ? "border-primary bg-primary/5" : "border-input hover:border-primary/30"
                          )}>
                            <Calendar className="h-4 w-4 text-primary" />
                            {date ? format(date, "EEEE d MMMM yyyy", { locale: fr }) : "Sélectionner une date"}
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarUI mode="single" selected={date} onSelect={setDate}
                            disabled={(d) => d < new Date()}
                            className={cn("p-3 pointer-events-auto")} />
                        </PopoverContent>
                      </Popover>
                    </>
                  )}

                  {/* Number of hours selector */}
                  {selectedPlan === "hour" && (
                    <>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">⏱️ Nombre d'heures *</label>
                      <div className="flex items-center gap-3 mb-5">
                        <button
                          onClick={() => setNumberOfHours(Math.max(1, numberOfHours - 1))}
                          className="w-10 h-10 rounded-xl border border-border hover:border-primary/30 flex items-center justify-center font-bold text-lg transition-all"
                        >−</button>
                        <span className="font-display text-2xl font-bold text-primary w-12 text-center">{numberOfHours}</span>
                        <button
                          onClick={() => setNumberOfHours(numberOfHours + 1)}
                          className="w-10 h-10 rounded-xl border border-border hover:border-primary/30 flex items-center justify-center font-bold text-lg transition-all"
                        >+</button>
                        <span className="text-sm text-muted-foreground">= {(30 * numberOfHours).toLocaleString("fr-FR")} DH</span>
                      </div>
                    </>
                  )}

                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Heure *</label>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {timeSlots.map(t => (
                      <button key={t} onClick={() => setHour(t)}
                        className={cn(
                          "py-2.5 rounded-lg text-xs font-medium transition-all",
                          hour === t
                            ? "gradient-go text-primary-foreground shadow-go"
                            : "border border-border hover:border-primary/30 text-foreground"
                        )}>{t}</button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Delivery mode */}
              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                  <h3 className="font-display text-xl font-bold mb-1">Mode de récupération</h3>
                  <p className="text-sm text-muted-foreground mb-6">Comment souhaitez-vous récupérer votre moto ?</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {/* Delivery option */}
                    <button onClick={() => { setDeliveryMode("delivery"); setSelectedPickup(""); }}
                      className={cn(
                        "relative flex flex-col items-center p-6 rounded-2xl border-2 text-center transition-all duration-300 group overflow-hidden",
                        deliveryMode === "delivery"
                          ? "border-primary bg-primary/5 shadow-go"
                          : "border-border hover:border-primary/30 hover:bg-muted/30"
                      )}>
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-all",
                        deliveryMode === "delivery" ? "bg-primary/15" : "bg-muted"
                      )}>
                        <Truck className={cn("h-6 w-6 transition-colors", deliveryMode === "delivery" ? "text-primary" : "text-muted-foreground")} />
                      </div>
                      <span className="font-display font-bold text-base mb-1">Livraison</span>
                      <span className="text-xs text-muted-foreground">On vous livre la moto à domicile</span>
                      <span className="text-xs font-semibold text-primary mt-1">+20 DH</span>
                      {deliveryMode === "delivery" && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-3 right-3">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        </motion.div>
                      )}
                    </button>

                    {/* Pickup option */}
                    <button onClick={() => { setDeliveryMode("pickup"); setAddress(""); }}
                      className={cn(
                        "relative flex flex-col items-center p-6 rounded-2xl border-2 text-center transition-all duration-300 group overflow-hidden",
                        deliveryMode === "pickup"
                          ? "border-primary bg-primary/5 shadow-go"
                          : "border-border hover:border-primary/30 hover:bg-muted/30"
                      )}>
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-all",
                        deliveryMode === "pickup" ? "bg-primary/15" : "bg-muted"
                      )}>
                        <Building2 className={cn("h-6 w-6 transition-colors", deliveryMode === "pickup" ? "text-primary" : "text-muted-foreground")} />
                      </div>
                      <span className="font-display font-bold text-base mb-1">Récupération en agence</span>
                      <span className="text-xs text-muted-foreground">Venez chercher votre moto dans l'une de nos agences</span>
                      {deliveryMode === "pickup" && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-3 right-3">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        </motion.div>
                      )}
                    </button>
                  </div>

                  {/* Pickup locations */}
                  <AnimatePresence>
                    {deliveryMode === "pickup" && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 block">Choisissez votre agence *</label>
                        <div className="space-y-3">
                          {pickupLocations.map((loc) => (
                            <button key={loc.id} onClick={() => setSelectedPickup(loc.id)}
                              className={cn(
                                "w-full flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 group relative overflow-hidden",
                                selectedPickup === loc.id
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/30 hover:bg-muted/20"
                              )}>
                              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
                              <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all",
                                selectedPickup === loc.id ? "bg-primary/15" : "bg-muted"
                              )}>
                                <MapPin className={cn("h-5 w-5 transition-colors", selectedPickup === loc.id ? "text-primary" : "text-muted-foreground")} />
                              </div>
                              <div className="flex-1 min-w-0 relative z-10">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-display font-bold text-sm">{loc.name}</span>
                                  {selectedPickup === loc.id && (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                      <CheckCircle2 className="h-4 w-4 text-primary" />
                                    </motion.div>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed">{loc.address}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Step 4: Delivery address (only for delivery mode) */}
              {step === 4 && (
                <motion.div key="s4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                  <h3 className="font-display text-xl font-bold mb-1">Adresse de livraison</h3>
                  <p className="text-sm text-muted-foreground mb-5">Où livrer votre moto ?</p>

                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Ville</label>
                  <div className="flex gap-2 mb-5">
                    {[
                      { name: "Casablanca", active: true },
                      { name: "Rabat", active: false },
                      { name: "Marrakech", active: false },
                    ].map(c => (
                      <button key={c.name} type="button" disabled={!c.active}
                        onClick={() => c.active && setCity(c.name)}
                        className={cn(
                          "flex-1 py-3 rounded-xl text-sm font-semibold transition-all",
                          c.active && city === c.name
                            ? "border-2 border-primary bg-primary/5 text-foreground"
                            : c.active
                              ? "border border-border text-foreground hover:border-primary/30"
                              : "border border-border bg-muted/30 text-muted-foreground opacity-60 cursor-not-allowed"
                        )}>
                        {c.name}
                        {!c.active && <span className="block text-[10px] text-primary/60 font-medium mt-0.5">Bientôt</span>}
                      </button>
                    ))}
                  </div>

                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Adresse complète *</label>
                  <div className="relative mb-2">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input value={address} onChange={e => setAddress(e.target.value)}
                      placeholder="Ex: 123 Rue Mohammed V, Maarif"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                  </div>
                  <button type="button" onClick={handleLocateMe} disabled={locating}
                    className="inline-flex items-center gap-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                    <Navigation className={cn("h-3.5 w-3.5", locating && "animate-spin")} />
                    {locating ? "Localisation en cours..." : "📍 Me localiser automatiquement"}
                  </button>
                </motion.div>
              )}

              {/* Step 5: Personal info */}
              {step === 5 && (
                <motion.div key="s5" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                  <h3 className="font-display text-xl font-bold mb-1">Vos informations</h3>
                  <p className="text-sm text-muted-foreground mb-5">Pour confirmer votre réservation</p>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Nom complet *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input value={name} onChange={e => setName(e.target.value)} placeholder="Votre nom"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Téléphone *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="06 XX XX XX XX" type="tel"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Notes (optionnel)</label>
                      <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Instructions spéciales..."
                        rows={2} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none" />
                    </div>

                    {/* Summary */}
                    <div className="glass-card rounded-2xl p-4 mt-2">
                      <h4 className="font-display font-semibold text-sm mb-3">Récapitulatif</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Moto Flow · {displayDuration}</span>
                          <span className="font-medium">{(totalPrice - deliveryFee).toLocaleString("fr-FR")} DH</span>
                        </div>
                        {deliveryMode === "delivery" && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Frais de livraison</span>
                            <span className="font-medium">+20 DH</span>
                          </div>
                        )}
                        <div className="border-t border-border/50 pt-2 flex justify-between">
                          <span className="font-semibold">Total</span>
                          <span className="font-bold text-primary">{formattedTotalPrice} DH</span>
                        </div>
                        {selectedPlan === "day" ? (
                          <>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Récupération</span>
                              <span className="font-medium">{date ? format(date, "dd/MM/yyyy") : "-"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Retour</span>
                              <span className="font-medium">{dropoffDate ? format(dropoffDate, "dd/MM/yyyy") : "-"}</span>
                            </div>
                          </>
                        ) : (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Date</span>
                            <span className="font-medium">{date ? format(date, "dd/MM/yyyy") : "-"}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Heure</span>
                          <span className="font-medium">{hour}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{deliveryMode === "pickup" ? "Agence" : "Livraison"}</span>
                          <span className="font-medium text-right max-w-[60%]">{getLocationText()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-background/95 backdrop-blur-md border-t border-border/50 p-4 md:p-6 pt-4 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button onClick={handleBack}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="h-4 w-4" /> Retour
              </button>
            ) : <div />}

            {step < totalSteps ? (
              <button onClick={handleNext} disabled={!canNext()}
                className={cn(
                  "gradient-go px-6 py-3 rounded-xl font-display font-semibold text-sm text-primary-foreground inline-flex items-center gap-2 transition-all",
                  !canNext() && "opacity-40 cursor-not-allowed"
                )}>
                Continuer <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={handleConfirm} disabled={!canNext()}
                className={cn(
                  "gradient-go px-6 py-3 rounded-xl font-display font-semibold text-sm text-primary-foreground inline-flex items-center gap-2 transition-all",
                  !canNext() && "opacity-40 cursor-not-allowed"
                )}>
                Confirmer sur WhatsApp <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default GoRidePage;
