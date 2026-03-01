import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, ArrowRight, Check, ChevronRight, Leaf, Clock, Shield, Sparkles, MapPin, Phone, Car, Calendar, CheckCircle2, MessageCircle, User, Zap, Crown, Diamond, Star } from "lucide-react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import washHero from "@/assets/wash-hero.jpg";
import vehicleCitadine from "@/assets/vehicle-citadine.png";
import vehicleBerline from "@/assets/vehicle-berline.png";
import vehicleSuvMoyen from "@/assets/vehicle-suv-moyen.png";
import vehicleSuvGrand from "@/assets/vehicle-suv-grand.png";
import vehicleMoto from "@/assets/vehicle-moto.png";

import brandAudi from "@/assets/brands/audi.png";
import brandBmw from "@/assets/brands/bmw.png";
import brandCitroen from "@/assets/brands/citroen.png";
import brandDacia from "@/assets/brands/dacia.png";
import brandFiat from "@/assets/brands/fiat.png";
import brandFord from "@/assets/brands/ford.png";
import brandHonda from "@/assets/brands/honda.png";
import brandHyundai from "@/assets/brands/hyundai.png";
import brandJaguar from "@/assets/brands/jaguar.png";
import brandJeep from "@/assets/brands/jeep.png";
import brandKia from "@/assets/brands/kia.png";
import brandLandRover from "@/assets/brands/land-rover.png";
import brandLexus from "@/assets/brands/lexus.png";
import brandMazda from "@/assets/brands/mazda.png";
import brandMercedes from "@/assets/brands/mercedes-benz.png";
import brandMini from "@/assets/brands/mini.png";
import brandMitsubishi from "@/assets/brands/mitsubishi.png";
import brandNissan from "@/assets/brands/nissan.png";
import brandOpel from "@/assets/brands/opel.png";
import brandPeugeot from "@/assets/brands/peugeot.png";
import brandPorsche from "@/assets/brands/porsche.png";
import brandRenault from "@/assets/brands/renault.png";
import brandSeat from "@/assets/brands/seat.png";
import brandSkoda from "@/assets/brands/skoda.png";
import brandSuzuki from "@/assets/brands/suzuki.png";
import brandTesla from "@/assets/brands/tesla.png";
import brandToyota from "@/assets/brands/toyota.png";
import brandVolkswagen from "@/assets/brands/volkswagen.png";
import brandVolvo from "@/assets/brands/volvo.png";
import brandAlfaRomeo from "@/assets/brands/alfa-romeo.png";
import brandChevrolet from "@/assets/brands/chevrolet.png";
import brandMg from "@/assets/brands/mg.png";
import brandSubaru from "@/assets/brands/subaru.png";
import brandCupra from "@/assets/brands/cupra.png";
import brandDs from "@/assets/brands/ds.png";

type VehicleType = "citadine" | "berline" | "suv_moyen" | "suv_grand" | "moto_petite" | "moto_grande";

interface WashPack {
  name: string;
  price: number;
  services: string[];
  popular?: boolean;
}

const vehicleTypes = [
  { id: "citadine" as VehicleType, label: "Citadine", img: vehicleCitadine },
  { id: "berline" as VehicleType, label: "Berline", img: vehicleBerline },
  { id: "suv_moyen" as VehicleType, label: "SUV Moyen", img: vehicleSuvMoyen },
  { id: "suv_grand" as VehicleType, label: "Grand SUV", img: vehicleSuvGrand },
  { id: "moto_petite" as VehicleType, label: "Moto", img: vehicleMoto },
];

const packsByVehicle: Record<string, WashPack[]> = {
  citadine: [
    { name: "Essentiel", price: 60, services: ["Lavage extérieur sans eau", "Nettoyage jantes", "Vitres intérieures/extérieures"] },
    { name: "Extra", price: 110, services: ["Lavage extérieur sans eau", "Aspiration complète", "Nettoyage jantes & pneus", "Vitres", "Plastiques intérieurs", "Parfum"], popular: true },
    { name: "Premium", price: 150, services: ["Lavage extérieur sans eau", "Aspiration complète", "Nettoyage jantes & pneus", "Vitres", "Plastiques intérieurs", "Parfum", "Cire de protection", "Nettoyage moteur"] },
  ],
  berline: [
    { name: "Essentiel", price: 60, services: ["Lavage extérieur sans eau", "Nettoyage jantes", "Vitres intérieures/extérieures"] },
    { name: "Extra", price: 110, services: ["Lavage extérieur sans eau", "Aspiration complète", "Nettoyage jantes & pneus", "Vitres", "Plastiques intérieurs", "Parfum"], popular: true },
    { name: "Premium", price: 150, services: ["Lavage extérieur sans eau", "Aspiration complète", "Nettoyage jantes & pneus", "Vitres", "Plastiques intérieurs", "Parfum", "Cire de protection", "Nettoyage moteur"] },
  ],
  suv_moyen: [
    { name: "Essentiel", price: 70, services: ["Lavage extérieur sans eau", "Nettoyage jantes", "Vitres intérieures/extérieures"] },
    { name: "Extra", price: 120, services: ["Lavage extérieur sans eau", "Aspiration complète", "Nettoyage jantes & pneus", "Vitres", "Plastiques intérieurs", "Parfum"], popular: true },
    { name: "Premium", price: 160, services: ["Lavage extérieur sans eau", "Aspiration complète", "Nettoyage jantes & pneus", "Vitres", "Plastiques intérieurs", "Parfum", "Cire de protection", "Nettoyage moteur"] },
  ],
  suv_grand: [
    { name: "Essentiel", price: 80, services: ["Lavage extérieur sans eau", "Nettoyage jantes", "Vitres intérieures/extérieures"] },
    { name: "Extra", price: 130, services: ["Lavage extérieur sans eau", "Aspiration complète", "Nettoyage jantes & pneus", "Vitres", "Plastiques intérieurs", "Parfum"], popular: true },
    { name: "Premium", price: 170, services: ["Lavage extérieur sans eau", "Aspiration complète", "Nettoyage jantes & pneus", "Vitres", "Plastiques intérieurs", "Parfum", "Cire de protection", "Nettoyage moteur"] },
  ],
  moto_petite: [
    { name: "Lavage Complet", price: 35, services: ["Lavage complet sans eau", "Nettoyage jantes", "Polish carrosserie"], popular: true },
  ],
  moto_grande: [
    { name: "Lavage Complet", price: 45, services: ["Lavage complet sans eau", "Nettoyage jantes", "Polish carrosserie", "Protection cire"], popular: true },
  ],
};

const carBrands: { name: string; logo: string }[] = [
  { name: "Audi", logo: brandAudi },
  { name: "BMW", logo: brandBmw },
  { name: "Citroën", logo: brandCitroen },
  { name: "Dacia", logo: brandDacia },
  { name: "Fiat", logo: brandFiat },
  { name: "Ford", logo: brandFord },
  { name: "Honda", logo: brandHonda },
  { name: "Hyundai", logo: brandHyundai },
  { name: "Jaguar", logo: brandJaguar },
  { name: "Jeep", logo: brandJeep },
  { name: "Kia", logo: brandKia },
  { name: "Land Rover", logo: brandLandRover },
  { name: "Lexus", logo: brandLexus },
  { name: "Mazda", logo: brandMazda },
  { name: "Mercedes", logo: brandMercedes },
  { name: "Mini", logo: brandMini },
  { name: "Mitsubishi", logo: brandMitsubishi },
  { name: "Nissan", logo: brandNissan },
  { name: "Opel", logo: brandOpel },
  { name: "Peugeot", logo: brandPeugeot },
  { name: "Porsche", logo: brandPorsche },
  { name: "Renault", logo: brandRenault },
  { name: "Seat", logo: brandSeat },
  { name: "Škoda", logo: brandSkoda },
  { name: "Suzuki", logo: brandSuzuki },
  { name: "Tesla", logo: brandTesla },
  { name: "Toyota", logo: brandToyota },
  { name: "Volkswagen", logo: brandVolkswagen },
  { name: "Volvo", logo: brandVolvo },
  { name: "Alfa Romeo", logo: brandAlfaRomeo },
  { name: "Chevrolet", logo: brandChevrolet },
  { name: "MG", logo: brandMg },
  { name: "Subaru", logo: brandSubaru },
  { name: "Cupra", logo: brandCupra },
  { name: "DS", logo: brandDs },
];

const GoWashPage = () => {
  const [step, setStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(null);
  const [selectedPack, setSelectedPack] = useState<WashPack | null>(null);
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");

  const [showMotoChoice, setShowMotoChoice] = useState(false);
  const bookingRef = useRef<HTMLDivElement>(null);
  const infoFormRef = useRef<HTMLDivElement>(null);
  const totalSteps = 4;

  const scrollToBooking = () => {
    setTimeout(() => {
      bookingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };
  const isMoto = selectedVehicle === "moto_petite" || selectedVehicle === "moto_grande";

  const handleVehicleSelect = (v: VehicleType) => {
    if (v === "moto_petite") {
      // "moto_petite" is the generic moto card id – show sub-choice
      setShowMotoChoice(true);
      return;
    }
    setShowMotoChoice(false);
    setSelectedVehicle(v);
    setSelectedPack(null);
    setBrand("");
    setStep(2);
    scrollToBooking();
  };

  const handleMotoSelect = (v: VehicleType) => {
    setShowMotoChoice(false);
    setSelectedVehicle(v);
    setSelectedPack(null);
    setBrand("");
    setStep(2);
    scrollToBooking();
  };

  const handlePackSelect = (p: WashPack) => {
    setSelectedPack(p);
    setStep(3);
    scrollToBooking();
  };

  const handlePlaceOrder = () => {
    setStep(4);
    scrollToBooking();
  };

  const handleConfirmWhatsApp = () => {
    const vehicleLabel = selectedVehicle === "moto_petite" ? "Petite Moto" : selectedVehicle === "moto_grande" ? "Grande Moto" : vehicleTypes.find(v => v.id === selectedVehicle)?.label;
    const brandLine = isMoto ? "" : `\n🏷️ Marque: ${brand} (${year})`;
    const msg = `Bonjour, je confirme ma commande GoWash :\n\n🚗 Véhicule: ${vehicleLabel}${brandLine}\n✨ Formule: ${selectedPack?.name}\n💰 Prix: ${selectedPack?.price} DH\n\n👤 ${name}\n📞 ${phone}\n🏙️ Ville: ${city}\n📍 ${address}\n📅 Date: ${date}\n🕐 Heure: ${hour}`;
    window.open(`https://wa.me/212660880110?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <Layout>
      <div className="pt-24" />

      {/* Booking Flow */}
      <AnimatedSection className="py-24">
        <div ref={bookingRef} className="container mx-auto px-4 max-w-4xl scroll-mt-24">
          {/* Progress bar */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm transition-colors ${
                  step >= s ? "gradient-go text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {step > s ? <Check className="h-4 w-4" /> : s}
                </div>
                {s < 4 && <div className={`w-8 h-0.5 transition-colors ${step > s ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Vehicle type */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="font-display text-3xl font-bold text-center mb-8">Quel est votre type de véhicule ?</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                  {vehicleTypes.map((v, i) => (
                    <motion.button key={v.id} onClick={() => handleVehicleSelect(v.id)}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                      className={`glass-card p-5 rounded-2xl text-center hover:border-primary/50 hover:shadow-go transition-all group cursor-pointer ${
                        selectedVehicle === v.id ? "border-primary ring-2 ring-primary/20" : ""
                      }`}>
                      <div className="h-24 flex items-center justify-center mb-3">
                        <img src={v.img} alt={v.label} className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <span className="font-display font-semibold text-sm">{v.label}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Moto sub-choice overlay */}
                <AnimatePresence>
                  {showMotoChoice && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="mt-8"
                    >
                      <h3 className="font-display text-xl font-bold text-center mb-4">Quel type de moto ?</h3>
                      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                        <motion.button
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          onClick={() => handleMotoSelect("moto_petite")}
                          className="glass-card p-5 rounded-2xl text-center hover:border-primary/50 hover:shadow-go transition-all group cursor-pointer"
                        >
                          <div className="h-24 flex items-center justify-center mb-3">
                            <img src={vehicleMoto} alt="Petite Moto" className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-300 opacity-80" />
                          </div>
                          <span className="font-display font-semibold text-sm">Petite Moto</span>
                        </motion.button>
                        <motion.button
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          onClick={() => handleMotoSelect("moto_grande")}
                          className="glass-card p-5 rounded-2xl text-center hover:border-primary/50 hover:shadow-go transition-all group cursor-pointer"
                        >
                          <div className="h-24 flex items-center justify-center mb-3">
                            <img src={vehicleMoto} alt="Grande Moto" className="h-full w-auto object-contain group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          <span className="font-display font-semibold text-sm">Grande Moto</span>
                        </motion.button>
                      </div>
                      <button onClick={() => setShowMotoChoice(false)} className="block mx-auto mt-4 text-sm text-muted-foreground hover:text-foreground">
                        ← Annuler
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Step 2: Pack selection */}
            {step === 2 && selectedVehicle && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <button onClick={() => { setStep(1); setShowMotoChoice(false); }} className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1">
                  ← Changer de véhicule
                </button>
                <h2 className="font-display text-3xl font-bold text-center mb-8">Choisissez votre formule</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {packsByVehicle[selectedVehicle].map((p) => (
                    <button key={p.name} onClick={() => handlePackSelect(p)}
                      className={`glass-card p-6 rounded-2xl text-left hover:border-primary/50 transition-all relative ${
                        p.popular ? "border-primary ring-2 ring-primary/20" : ""
                      }`}>
                      {p.popular && (
                        <span className="absolute -top-3 right-4 px-3 py-1 rounded-full gradient-go text-primary-foreground text-xs font-semibold">
                          Populaire
                        </span>
                      )}
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display text-xl font-bold">{p.name}</h3>
                        <span className="font-display text-2xl font-bold">{p.price} <span className="text-sm font-normal text-muted-foreground">DH</span></span>
                      </div>
                      <ul className="space-y-2">
                        {p.services.map((s) => (
                          <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Creative info form with brand logos */}
            {step === 3 && selectedPack && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <button onClick={() => setStep(2)} className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1">
                  ← Changer de formule
                </button>
                <h2 className="font-display text-3xl font-bold text-center mb-2">Détails de votre véhicule</h2>
                <p className="text-center text-muted-foreground mb-8">
                  {vehicleTypes.find(v => v.id === selectedVehicle)?.label} · {selectedPack.name} · <span className="text-primary font-semibold">{selectedPack.price} DH</span>
                </p>

                <div className="max-w-2xl mx-auto">
                  {/* Brand selection with logos - only for cars */}
                  {!isMoto && (
                    <div className="mb-8">
                      <label className="text-sm font-display font-semibold mb-4 flex items-center gap-2">
                        <Car className="h-4 w-4 text-primary" /> Sélectionnez la marque
                      </label>

                      {/* Selected brand chip */}
                      <AnimatePresence>
                        {brand && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                            className="mb-4 inline-flex items-center gap-3 px-5 py-3 rounded-2xl border-2 border-primary bg-primary/5 shadow-go"
                          >
                            <img
                              src={carBrands.find(b => b.name === brand)?.logo}
                              alt={brand}
                              className="w-8 h-8 object-contain"
                            />
                            <span className="font-display font-semibold text-sm">{brand}</span>
                            <button
                              onClick={() => setBrand("")}
                              className="ml-1 p-1 rounded-full hover:bg-primary/10 transition-colors text-muted-foreground hover:text-foreground text-xs"
                            >
                              ✕
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Brand grid - collapses when brand is selected */}
                      <AnimatePresence>
                        {!brand && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                              {carBrands.map((b, i) => (
                                <motion.button
                                  key={b.name}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: i * 0.015 }}
                                  onClick={() => {
                                    setBrand(b.name);
                                    setTimeout(() => {
                                      infoFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                                    }, 450);
                                  }}
                                  className="relative p-4 rounded-2xl flex flex-col items-center justify-center gap-2.5 border-2 transition-all duration-200 cursor-pointer group border-border/60 bg-card hover:border-primary/40 hover:bg-accent/30 hover:shadow-md"
                                >
                                  <div className="w-12 h-12 flex items-center justify-center">
                                    <img
                                      src={b.logo}
                                      alt={b.name}
                                      className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-200"
                                    />
                                  </div>
                                  <span className="text-xs font-medium text-foreground/80 leading-tight text-center truncate w-full">{b.name}</span>
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Year + personal info in a sleek card */}
                  <motion.div
                    ref={infoFormRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card rounded-2xl p-6 space-y-4 scroll-mt-28"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 flex items-center gap-2">
                          <User className="h-3.5 w-3.5 text-primary" /> Nom complet
                        </label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre nom"
                          className="w-full p-3.5 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 text-primary" /> Téléphone
                        </label>
                        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+212 6 XX XX XX XX"
                          className="w-full p-3.5 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-primary" /> Ville
                        </label>
                        <select value={city} onChange={(e) => setCity(e.target.value)}
                          className="w-full p-3.5 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
                          <option value="">-- Ville --</option>
                          <option value="Casablanca">Casablanca</option>
                          <option value="Rabat">Rabat</option>
                          <option value="Tanger">Tanger</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-primary" /> Adresse complète
                        </label>
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Votre adresse complète"
                          className="w-full p-3.5 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1.5 flex items-center gap-2">
                          <Calendar className="h-3.5 w-3.5 text-primary" /> Date
                        </label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                          className="w-full p-3.5 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1.5 flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 text-primary" /> Heure
                        </label>
                        <input type="time" value={hour} onChange={(e) => setHour(e.target.value)}
                          className="w-full p-3.5 rounded-xl border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                      </div>
                    </div>

                    <button onClick={handlePlaceOrder} disabled={(!isMoto && !brand) || !phone || !address || !name || !city || !date || !hour}
                      className="w-full gradient-go px-8 py-4 rounded-2xl font-display font-semibold text-primary-foreground shadow-go hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 mt-2">
                      Passer la commande <ArrowRight className="h-5 w-5" />
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Order confirmation */}
            {step === 4 && selectedPack && (
              <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-lg mx-auto">
                <div className="text-center mb-8">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}
                    className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
                    <CheckCircle2 className="h-12 w-12 text-primary" />
                  </motion.div>
                  <h2 className="font-display text-3xl font-bold mb-2">Récapitulatif</h2>
                  <p className="text-muted-foreground">Vérifiez vos informations avant de confirmer</p>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                  className="glass-card rounded-2xl p-6 space-y-4 mb-6">
                  {/* Vehicle image */}
                  <div className="flex items-center gap-4 pb-4 border-b border-border">
                    <div className="h-16 w-20 flex-shrink-0">
                      <img src={isMoto ? vehicleMoto : vehicleTypes.find(v => v.id === selectedVehicle)?.img} alt="" className="h-full w-auto object-contain" />
                    </div>
                    <div>
                      <p className="font-display font-bold">{selectedVehicle === "moto_petite" ? "Petite Moto" : selectedVehicle === "moto_grande" ? "Grande Moto" : vehicleTypes.find(v => v.id === selectedVehicle)?.label}</p>
                      {!isMoto && <p className="text-sm text-muted-foreground">{brand} · {year}</p>}
                    </div>
                  </div>

                  {/* Order details */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-2"><Check className="h-3.5 w-3.5" /> Formule</span>
                      <span className="font-display font-semibold">{selectedPack.name}</span>
                    </div>
                    {!isMoto && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-2"><Car className="h-3.5 w-3.5" /> Marque</span>
                      <span className="font-medium">{brand}</span>
                    </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-2"><User className="h-3.5 w-3.5" /> Client</span>
                      <span className="font-medium">{name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> Téléphone</span>
                      <span className="font-medium">{phone}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> Ville</span>
                      <span className="font-medium">{city}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-2"><MapPin className="h-3.5 w-3.5" /> Adresse</span>
                      <span className="font-medium text-right max-w-[200px] truncate">{address}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-2"><Calendar className="h-3.5 w-3.5" /> Date</span>
                      <span className="font-medium">{date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> Heure</span>
                      <span className="font-medium">{hour}</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <span className="font-display font-bold text-lg">Total</span>
                    <span className="font-display font-bold text-2xl text-primary">{selectedPack.price} DH</span>
                  </div>
                </motion.div>

                <div className="space-y-3">
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={handleConfirmWhatsApp}
                    className="w-full bg-[#25D366] hover:bg-[#1fb855] px-8 py-4 rounded-2xl font-display font-semibold text-white shadow-lg hover:shadow-xl transition-all inline-flex items-center justify-center gap-3"
                  >
                    <MessageCircle className="h-5 w-5" /> Confirmer via WhatsApp
                  </motion.button>
                  <button onClick={() => setStep(3)}
                    className="w-full px-8 py-3 rounded-2xl font-medium text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
                    ← Modifier mes informations
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </AnimatedSection>

      {/* Go 212 Special Packs */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-display font-semibold mb-4">Offre Spéciale</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-3">
              Go <span className="text-primary">212</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">Des packs complets pour un véhicule impeccable, intérieur comme extérieur.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                name: "Lavage Complet",
                price: 60,
                badge: null as string | null,
                icon: Droplets,
                accent: "from-sky-400 to-blue-500",
                accentBg: "bg-sky-500/10",
                accentText: "text-sky-600",
                services: ["Lavage carrosserie", "Nettoyage Intérieurs", "Aspiration Habitacle / Coffre", "Nettoyage Vitres", "Nettoyage Jantes", "Cirage Pneus"],
              },
              {
                name: "Lavage Spécial",
                price: 80,
                badge: null as string | null,
                icon: Zap,
                accent: "from-amber-400 to-orange-500",
                accentBg: "bg-amber-500/10",
                accentText: "text-amber-600",
                services: ["Lavage / Démoustication Carrosserie"],
              },
              {
                name: "Lavage Extra",
                price: 200,
                badge: "Populaire",
                icon: Star,
                accent: "from-emerald-400 to-green-600",
                accentBg: "bg-emerald-500/10",
                accentText: "text-emerald-600",
                services: ["Traitement taches Sièges / Tapis", "Lavage Carrosserie", "Aspiration Habitacle / Coffre", "Rénovation Plastique", "Nettoyage Vitres", "Décrassage Jantes", "Cirage Pneus"],
              },
              {
                name: "Lavage Premium",
                price: 300,
                badge: "Premium",
                icon: Crown,
                accent: "from-violet-400 to-purple-600",
                accentBg: "bg-violet-500/10",
                accentText: "text-violet-600",
                services: ["Traitement taches Sièges / Tapis", "Traitement taches toit", "Rénovation Plastique", "Nettoyage Vitres", "Décrassage Jantes", "Cirage Pneus"],
              },
            ].map((pack, i) => {
              const IconComp = pack.icon;
              return (
              <motion.div
                key={pack.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, type: "spring", damping: 18 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`relative group rounded-3xl border bg-card overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl ${
                  pack.badge === "Populaire"
                    ? "border-primary ring-2 ring-primary/20 shadow-go"
                    : pack.badge === "Premium"
                    ? "border-primary/50 shadow-lg"
                    : "border-border hover:border-primary/30"
                }`}
              >
                {/* Gradient header strip */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${pack.accent}`} />

                {/* Decorative background glow */}
                <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${pack.accent} opacity-[0.07] blur-2xl group-hover:opacity-[0.15] transition-opacity duration-500`} />

                {/* Shine sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

                {pack.badge && (
                  <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-display font-bold uppercase tracking-wider ${
                    pack.badge === "Premium"
                      ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white"
                      : "gradient-go text-primary-foreground"
                  }`}>
                    {pack.badge}
                  </span>
                )}

                <div className="p-6 pb-0">
                  {/* Icon badge */}
                  <motion.div
                    whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`w-14 h-14 rounded-2xl ${pack.accentBg} flex items-center justify-center mb-4 border border-border/50`}
                  >
                    <IconComp className={`h-7 w-7 ${pack.accentText}`} strokeWidth={1.5} />
                  </motion.div>

                  <h3 className="font-display text-lg font-bold mb-0.5">{pack.name}</h3>
                  <p className="text-xs text-muted-foreground mb-4">Intérieur + Extérieur</p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-5">
                    <span className={`font-display text-4xl font-extrabold bg-gradient-to-r ${pack.accent} bg-clip-text text-transparent`}>{pack.price}</span>
                    <span className="text-sm font-medium text-muted-foreground">DH</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="mx-6 h-px bg-border/60" />

                <div className="p-6 pt-4 flex-1 flex flex-col">
                  <ul className="space-y-2.5 flex-1 mb-6">
                    {pack.services.map((s) => (
                      <li key={s} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <div className={`w-5 h-5 rounded-full ${pack.accentBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <Check className={`h-3 w-3 ${pack.accentText}`} strokeWidth={2.5} />
                        </div>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.a
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    href={`https://wa.me/212660880110?text=${encodeURIComponent(`Bonjour, je souhaite réserver le pack Go 212 "${pack.name}" à ${pack.price} DH.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3.5 rounded-2xl font-display font-semibold text-sm text-center inline-flex items-center justify-center gap-2 transition-all ${
                      pack.badge
                        ? `bg-gradient-to-r ${pack.accent} text-white shadow-lg hover:shadow-xl`
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    }`}
                  >
                    <MessageCircle className="h-4 w-4" /> Réserver
                  </motion.a>
                </div>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-go" />
        <motion.div className="absolute top-10 left-[10%] w-40 h-40 rounded-full bg-white/10 blur-2xl"
          animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-5 right-[15%] w-56 h-56 rounded-full bg-white/5 blur-2xl"
          animate={{ y: [0, 15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground">Pourquoi GoWash ?</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              { emoji: "🌱", title: "Écologique", desc: "150 litres d'eau économisés par lavage grâce à notre technologie sans eau." },
              { emoji: "⚡", title: "Rapide", desc: "Service en 30-60 minutes directement chez vous." },
              { emoji: "🛡️", title: "Sûr", desc: "Produits certifiés, adaptés à tous les véhicules y compris électriques." },
              { emoji: "✨", title: "Impeccable", desc: "Résultats professionnels garantis à chaque lavage." },
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl md:rounded-3xl bg-white/15 backdrop-blur-md border border-white/20 p-4 md:p-8 text-center transition-all duration-300 hover:bg-white/25 hover:border-white/35 cursor-default relative overflow-hidden"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <motion.span className="text-2xl md:text-3xl block mb-2 md:mb-4" whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}>{f.emoji}</motion.span>
                <h3 className="font-display font-bold text-sm md:text-lg mb-1 md:mb-2 text-primary-foreground">{f.title}</h3>
                <p className="text-[10px] md:text-sm text-primary-foreground/70">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GoWashPage;
