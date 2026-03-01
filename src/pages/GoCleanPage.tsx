import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SprayCan, ArrowRight, Check, Star, Clock, Shield, Sparkles, Home, MapPin, Phone, User, Calendar, ChevronLeft, Navigation, Camera, Bed, Coffee, X } from "lucide-react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import cleanHero from "@/assets/clean-hero.jpg";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// ── Types & Data ──────────────────────────────────────────────

type LocalType = "studio" | "t2" | "t3" | "t4" | "villa";

const localTypes: { id: LocalType; label: string; desc: string; price: number; emoji: string }[] = [
  { id: "studio", label: "Studio", desc: "Jusqu'à 30m²", price: 150, emoji: "🏠" },
  { id: "t2", label: "T2 / 2 pièces", desc: "30–50m²", price: 200, emoji: "🏡" },
  { id: "t3", label: "T3 / 3 pièces", desc: "50–80m²", price: 280, emoji: "🏘️" },
  { id: "t4", label: "T4+ / 4 pièces+", desc: "80–120m²", price: 350, emoji: "🏢" },
  { id: "villa", label: "Villa", desc: "120m²+", price: 450, emoji: "🏰" },
];

const extras = [
  { id: "linge", label: "Linge de maison", desc: "Changement des draps, serviettes et mise en place complète", icon: Bed, price: 50 },
  { id: "produits", label: "Produits d'accueil", desc: "Kit de bienvenue : savon, shampoing, gel douche, café/thé", icon: Coffee, price: 30 },
  { id: "etat", label: "État des lieux", desc: "Rapport photo détaillé de l'état du logement après le nettoyage", icon: Camera, price: 40 },
];

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00",
];

const services = [
  { title: "Nettoyage après check-out", desc: "Nettoyage complet de l'appartement après le départ des voyageurs.", icon: Home, emoji: "🏠" },
  { title: "Remise en état rapide", desc: "Intervention express pour préparer votre logement entre deux réservations.", icon: Clock, emoji: "⚡" },
  { title: "Désinfection complète", desc: "Protocole sanitaire renforcé pour garantir la sécurité de vos voyageurs.", icon: Shield, emoji: "🛡️" },
  { title: "Nettoyage en profondeur", desc: "Nettoyage incluant moquettes, rideaux, appareils et surfaces difficiles.", icon: Sparkles, emoji: "✨" },
];

// ── Component ─────────────────────────────────────────────────

const GoCleanPage = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  // Step 1: Local type
  const [localType, setLocalType] = useState<LocalType | null>(null);

  // Step 2: City + Address
  const [city, setCity] = useState("Casablanca");
  const [address, setAddress] = useState("");
  const [accessInstructions, setAccessInstructions] = useState("");
  const [locating, setLocating] = useState(false);

  // Step 3: Date & Time
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [checkoutTime, setCheckoutTime] = useState("");
  const [checkinTime, setCheckinTime] = useState("");

  // Step 4: Extras
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  // Step 5: Personal info
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [locationCoords, setLocationCoords] = useState<{ lat: number; lng: number } | null>(null);

  const openModal = () => {
    setStep(1);
    setOpen(true);
  };

  const toggleExtra = (id: string) => {
    setSelectedExtras(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocationCoords({ lat: latitude, lng: longitude });
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=fr`);
          const data = await res.json();
          if (data.display_name) {
            setAddress(data.display_name);
          }
        } catch {
          setAddress(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        }
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const selectedLocal = localTypes.find(l => l.id === localType);
  const extrasTotal = extras.filter(e => selectedExtras.includes(e.id)).reduce((sum, e) => sum + e.price, 0);
  const total = (selectedLocal?.price ?? 0) + extrasTotal;

  const canNext = () => {
    switch (step) {
      case 1: return !!localType;
      case 2: return address.trim().length > 0;
      case 3: return !!date && !!checkoutTime && !!checkinTime;
      case 4: return true;
      case 5: return name.trim().length > 0 && phone.trim().length > 0;
      default: return false;
    }
  };

  const handleConfirm = () => {
    const extrasText = selectedExtras.length > 0
      ? `\n🔧 Options: ${extras.filter(e => selectedExtras.includes(e.id)).map(e => e.label).join(", ")}`
      : "";
    const mapsLink = locationCoords ? `\n📌 Google Maps: https://www.google.com/maps?q=${locationCoords.lat},${locationCoords.lng}` : "";
    const msg = `Bonjour, je souhaite réserver GoClean :\n\n🏠 Type: ${selectedLocal?.label}\n🏙️ Ville: ${city}\n📍 Adresse: ${address}${mapsLink}${accessInstructions ? `\n🔑 Accès: ${accessInstructions}` : ""}\n📅 Date: ${date ? format(date, "dd/MM/yyyy") : ""}\n🕐 Check-out: ${checkoutTime}\n🕐 Check-in: ${checkinTime}${extrasText}\n\n💰 Total: ${total} DH\n\n👤 ${name}\n📞 ${phone}${email ? `\n📧 ${email}` : ""}${notes ? `\n📝 ${notes}` : ""}`;
    window.open(`https://wa.me/212660880110?text=${encodeURIComponent(msg)}`, "_blank");
    setOpen(false);
  };

  const stepLabels = ["Type", "Adresse", "Date", "Options", "Infos"];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
        {/* Background image with parallax-like scale */}
        <motion.div className="absolute inset-0" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}>
          <img src={cleanHero} alt="GoClean" className="w-full h-full object-cover" loading="eager" />
        </motion.div>
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(160_20%_5%/0.6)] via-[hsl(160_20%_8%/0.4)] to-[hsl(160_20%_5%/0.85)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(160_20%_5%/0.5)] via-transparent to-transparent" />

        {/* Animated ambient orbs */}
        <motion.div className="absolute top-[15%] right-[10%] w-72 h-72 rounded-full bg-primary/10 blur-[100px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-[20%] left-[5%] w-56 h-56 rounded-full bg-primary/8 blur-[80px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
        <motion.div className="absolute top-[40%] right-[30%] w-40 h-40 rounded-full bg-primary/5 blur-[60px]"
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, hsl(var(--primary-foreground)) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="container mx-auto px-4 relative z-10 pt-24">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/15 backdrop-blur-xl border border-primary/20 text-primary-foreground text-sm font-medium mb-8">
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                <SprayCan className="h-4 w-4" />
              </motion.div>
              Service professionnel de nettoyage
            </motion.div>

            {/* Title with staggered reveal */}
            <div className="overflow-hidden mb-3">
              <motion.h1 initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
                className="font-display text-4xl sm:text-6xl md:text-8xl font-bold text-primary-foreground leading-[0.85] tracking-tight">
                Nettoyage
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h1 initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.35 }}
                className="font-display text-4xl sm:text-6xl md:text-8xl font-bold leading-[0.85] tracking-tight">
                <span className="text-gradient">Airbnb</span>{" "}
                <span className="text-primary-foreground/60 font-light">pro</span>
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base md:text-xl text-primary-foreground/70 max-w-xl mb-10 leading-relaxed">
              Service dédié aux conciergeries et particuliers. Nettoyage complet après check-out, désinfection et préparation pour vos voyageurs.
            </motion.p>

            {/* CTA + Stats row */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <motion.button onClick={openModal} whileHover={{ scale: 1.05, boxShadow: "0 0 40px hsl(142 72% 42% / 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="gradient-go px-8 py-4 rounded-2xl font-display font-semibold text-primary-foreground shadow-go inline-flex items-center gap-3 text-base relative overflow-hidden group">
                <span className="relative z-10">Réserver maintenant</span>
                <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              </motion.button>

              {/* Floating stats */}
              <div className="flex items-center gap-6 px-6 py-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/20 shadow-lg">
                <div className="text-center">
                  <div className="font-display text-2xl font-bold text-white drop-shadow-md">500+</div>
                  <div className="text-xs text-white/90 uppercase tracking-wider font-medium drop-shadow-sm">Nettoyages</div>
                </div>
                <div className="w-px h-8 bg-white/40" />
                <div className="text-center">
                  <div className="font-display text-2xl font-bold text-white drop-shadow-md">4.9<span className="text-green-400 text-lg ml-1">★</span></div>
                  <div className="text-xs text-white/90 uppercase tracking-wider font-medium drop-shadow-sm">Satisfaction</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom fade for seamless transition */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Services */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        {/* Background ambient effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/20 to-background" />
        <motion.div className="absolute top-20 left-[10%] w-80 h-80 rounded-full bg-primary/5 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-20 right-[10%] w-60 h-60 rounded-full bg-primary/8 blur-[100px]"
          animate={{ scale: [1.1, 0.9, 1.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }} />

        <div className="container mx-auto px-4 relative z-10">
          {/* Section header */}
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
              <Sparkles className="h-3.5 w-3.5" /> Nos prestations
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Un logement <span className="text-gradient">impeccable</span>,<br className="hidden sm:block" /> à chaque fois
            </motion.h2>
          </div>

          {/* Service cards - staggered bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
            {services.map((s, i) => (
              <motion.div key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className={cn(
                  "group relative rounded-3xl p-7 md:p-9 transition-all duration-500 cursor-default overflow-hidden border",
                  i === 0 ? "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 hover:border-primary/40 hover:shadow-go" :
                  "glass-card border-border/50 hover:border-primary/30 hover:shadow-go"
                )}>
                {/* Animated gradient background on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-primary/3" />
                
                {/* Shine sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-primary/8 to-transparent" />

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="text-3xl mb-6">{s.emoji}</div>

                  <h3 className="font-display font-bold text-xl md:text-2xl mb-3 group-hover:text-primary transition-colors duration-300">{s.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{s.desc}</p>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <AnimatedSection className="py-16 md:py-24 bg-go-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-elevated">
              <img src={cleanHero} alt="Intérieur propre" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div>
              <span className="text-primary font-display font-semibold text-sm uppercase tracking-widest">Pourquoi GoClean ?</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-6">Des avis 5 étoiles garantis</h2>
              <ul className="space-y-3 md:space-y-4">
                {["Équipes formées aux standards hôteliers", "Produits écologiques et hypoallergéniques", "Disponible 7j/7, même en urgence", "Checklist complète envoyée après chaque intervention", "Tarifs adaptés aux conciergeries avec abonnement"].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <div className="flex-shrink-0 p-1 rounded-full gradient-go mt-0.5">
                      <Check className="h-3 w-3 text-primary-foreground" />
                    </div>
                    <span className="text-sm">{t}</span>
                  </li>
                ))}
              </ul>
              <motion.button onClick={openModal} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="mt-8 gradient-go px-8 py-4 rounded-2xl font-display font-semibold text-primary-foreground shadow-go inline-flex items-center gap-2">
                Réserver maintenant <ArrowRight className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonial */}
      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 gradient-go" />
            <div className="flex justify-center gap-1 mb-6">
              {[1,2,3,4,5].map(n => <Star key={n} className="h-5 w-5 fill-primary text-primary" />)}
            </div>
            <blockquote className="text-lg md:text-xl font-display italic text-foreground/80 mb-6">
              "Depuis que j'utilise GoClean, mes notes Airbnb sont passées de 4.2 à 4.9. Un service irréprochable."
            </blockquote>
            <p className="font-display font-semibold">Mehdi R.</p>
            <p className="text-sm text-muted-foreground">Propriétaire de 8 appartements — Casablanca</p>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <section className="py-10 md:py-14 relative overflow-hidden">
        <div className="absolute inset-0 gradient-go" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground text-center sm:text-left">
              Un logement propre, des voyageurs heureux
            </h3>
            <motion.button onClick={openModal} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl font-display font-semibold bg-primary-foreground text-primary hover:opacity-90 transition-opacity inline-flex items-center gap-2 text-sm shadow-elevated whitespace-nowrap">
              Réserver <ArrowRight className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── Reservation Modal ─────────────────────────── */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 rounded-3xl border-border/50 gap-0">
          <DialogTitle className="sr-only">Réserver GoClean</DialogTitle>

          {/* Header with progress */}
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border/50 p-4 md:p-6 pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <SprayCan className="h-5 w-5 text-primary" />
                <span className="font-display font-bold text-lg">GoClean</span>
              </div>
              {selectedLocal && (
                <span className="text-sm font-semibold text-primary">{total} DH</span>
              )}
            </div>
            {/* Step indicators */}
            <div className="flex items-center gap-1">
              {stepLabels.map((label, i) => (
                <div key={label} className="flex-1 flex flex-col items-center gap-1">
                  <div className={cn(
                    "w-full h-1.5 rounded-full transition-all duration-300",
                    step > i + 1 ? "bg-primary" : step === i + 1 ? "bg-primary/60" : "bg-muted"
                  )} />
                  <span className={cn(
                    "text-[10px] font-medium transition-colors",
                    step >= i + 1 ? "text-primary" : "text-muted-foreground"
                  )}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 md:p-6">
            <AnimatePresence mode="wait">
              {/* Step 1: Type de logement */}
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                  <h3 className="font-display text-xl font-bold mb-1">Type de logement</h3>
                  <p className="text-sm text-muted-foreground mb-5">Sélectionnez le type de logement à nettoyer</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {localTypes.map((l) => (
                      <button key={l.id} onClick={() => setLocalType(l.id)}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200",
                          localType === l.id
                            ? "border-primary bg-primary/5 shadow-go"
                            : "border-border hover:border-primary/30 hover:bg-muted/30"
                        )}>
                        <span className="text-3xl">{l.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-display font-semibold text-sm">{l.label}</div>
                          <div className="text-xs text-muted-foreground">{l.desc}</div>
                        </div>
                        <div className="font-display font-bold text-primary text-sm whitespace-nowrap">{l.price} DH</div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Ville & Adresse */}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                  <h3 className="font-display text-xl font-bold mb-1">Localisation</h3>
                  <p className="text-sm text-muted-foreground mb-5">Où se trouve votre logement ?</p>

                  {/* City */}
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

                  {/* Address */}
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Adresse complète *</label>
                  <div className="relative mb-2">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      placeholder="Ex: 123 Rue Mohammed V, Maarif"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                  <button type="button" onClick={handleLocateMe} disabled={locating}
                    className="inline-flex items-center gap-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors mb-5">
                    <Navigation className={cn("h-3.5 w-3.5", locating && "animate-spin")} />
                    {locating ? "Localisation en cours..." : "📍 Me localiser automatiquement"}
                  </button>

                  {/* Access instructions */}
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Instructions d'accès (optionnel)</label>
                  <textarea
                    value={accessInstructions}
                    onChange={e => setAccessInstructions(e.target.value)}
                    placeholder="Code d'entrée, étage, numéro d'appartement..."
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                  />
                </motion.div>
              )}

              {/* Step 3: Date & Horaires */}
              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                  <h3 className="font-display text-xl font-bold mb-1">Date & Horaires</h3>
                  <p className="text-sm text-muted-foreground mb-5">Planifiez votre nettoyage</p>

                  {/* Date picker */}
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Date du nettoyage *</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-sm transition-all",
                        date ? "border-primary bg-primary/5" : "border-input hover:border-primary/30"
                      )}>
                        <Calendar className="h-4 w-4 text-primary" />
                        {date ? format(date, "EEEE d MMMM yyyy", { locale: fr }) : "Sélectionner une date"}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarUI
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(d) => d < new Date()}
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>

                  {/* Checkout time */}
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-5 mb-2 block">Heure de check-out (début du ménage) *</label>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-5">
                    {timeSlots.map(t => (
                      <button key={`co-${t}`} onClick={() => setCheckoutTime(t)}
                        className={cn(
                          "py-2 rounded-lg text-xs font-medium transition-all",
                          checkoutTime === t
                            ? "gradient-go text-primary-foreground shadow-go"
                            : "border border-border hover:border-primary/30 text-foreground"
                        )}>{t}</button>
                    ))}
                  </div>

                  {/* Checkin deadline */}
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Heure du prochain check-in (deadline) *</label>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {timeSlots.map(t => (
                      <button key={`ci-${t}`} onClick={() => setCheckinTime(t)}
                        className={cn(
                          "py-2 rounded-lg text-xs font-medium transition-all",
                          checkinTime === t
                            ? "gradient-go text-primary-foreground shadow-go"
                            : "border border-border hover:border-primary/30 text-foreground"
                        )}>{t}</button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Options supplémentaires */}
              {step === 4 && (
                <motion.div key="s4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                  <h3 className="font-display text-xl font-bold mb-1">Options supplémentaires</h3>
                  <p className="text-sm text-muted-foreground mb-5">Sélectionnez les services additionnels souhaités (optionnel)</p>

                  <div className="space-y-3">
                    {extras.map(e => {
                      const active = selectedExtras.includes(e.id);
                      return (
                        <button key={e.id} onClick={() => toggleExtra(e.id)}
                          className={cn(
                            "w-full flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200",
                            active ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                          )}>
                          <div className={cn(
                            "flex-shrink-0 p-2.5 rounded-xl transition-colors",
                            active ? "bg-primary/20" : "bg-muted"
                          )}>
                            <e.icon className={cn("h-5 w-5", active ? "text-primary" : "text-muted-foreground")} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-display font-semibold text-sm">{e.label}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{e.desc}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-display font-bold text-sm text-primary whitespace-nowrap">+{e.price} DH</span>
                            <div className={cn(
                              "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                              active ? "border-primary bg-primary" : "border-muted-foreground/30"
                            )}>
                              {active && <Check className="h-3 w-3 text-primary-foreground" />}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 5: Informations personnelles */}
              {step === 5 && (
                <motion.div key="s5" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                  <h3 className="font-display text-xl font-bold mb-1">Vos informations</h3>
                  <p className="text-sm text-muted-foreground mb-5">Pour vous contacter et confirmer la réservation</p>

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
                      <div className="space-y-1.5 text-sm">
                        <div className="flex justify-between"><span className="text-muted-foreground">{selectedLocal?.label}</span><span>{selectedLocal?.price} DH</span></div>
                        {extras.filter(e => selectedExtras.includes(e.id)).map(e => (
                          <div key={e.id} className="flex justify-between"><span className="text-muted-foreground">{e.label}</span><span>+{e.price} DH</span></div>
                        ))}
                        <div className="border-t border-border pt-2 flex justify-between font-display font-bold">
                          <span>Total</span><span className="text-primary">{total} DH</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer navigation */}
          <div className="sticky bottom-0 bg-background/95 backdrop-blur-md border-t border-border/50 p-4 md:p-6 pt-4 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="h-4 w-4" /> Retour
              </button>
            ) : <div />}

            {step < totalSteps ? (
              <button onClick={() => canNext() && setStep(step + 1)} disabled={!canNext()}
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

export default GoCleanPage;
