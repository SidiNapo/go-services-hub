import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, ArrowRight, Check, ChevronRight, Leaf, Clock, Shield, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import washHero from "@/assets/wash-hero.jpg";
import vehicleCitadine from "@/assets/vehicle-citadine.png";
import vehicleBerline from "@/assets/vehicle-berline.png";
import vehicleSuvMoyen from "@/assets/vehicle-suv-moyen.png";
import vehicleSuvGrand from "@/assets/vehicle-suv-grand.png";
import vehicleMoto from "@/assets/vehicle-moto.png";

type VehicleType = "citadine" | "berline" | "suv_moyen" | "suv_grand" | "moto_petite" | "moto_grande";

interface WashPack {
  name: string;
  price: number;
  services: string[];
  popular?: boolean;
}

const vehicleTypes: { id: VehicleType; label: string; img: string }[] = [
  { id: "citadine", label: "Citadine", img: vehicleCitadine },
  { id: "berline", label: "Berline", img: vehicleBerline },
  { id: "suv_moyen", label: "SUV Moyen", img: vehicleSuvMoyen },
  { id: "suv_grand", label: "Grand SUV", img: vehicleSuvGrand },
  { id: "moto_petite", label: "Petite Moto", img: vehicleMoto },
  { id: "moto_grande", label: "Grande Moto", img: vehicleMoto },
];

const packsByVehicle: Record<VehicleType, WashPack[]> = {
  citadine: [
    { name: "Complet", price: 60, services: ["Lavage intérieur & extérieur", "Aspirateur habitacle/coffre", "Nettoyage vitres", "Nettoyage jantes", "Lustrage pneus"] },
    { name: "Spécial", price: 80, services: ["Décontamination carrosserie", "Aspirateur habitacle/coffre", "Rénovation plastiques", "Nettoyage vitres & jantes", "Lustrage pneus"], popular: true },
    { name: "Extra", price: 200, services: ["Traitement taches sièges/tapis", "Lavage carrosserie", "Rénovation plastiques", "Nettoyage vitres", "Lustrage pneus"] },
    { name: "Premium", price: 300, services: ["Traitement sièges/tapis/plafond", "Rénovation plastiques", "Nettoyage vitres", "Récurage jantes", "Lustrage pneus"] },
  ],
  berline: [
    { name: "Complet", price: 70, services: ["Lavage carrosserie", "Nettoyage intérieur", "Aspirateur", "Nettoyage vitres", "Lustrage pneus"] },
    { name: "Spécial", price: 90, services: ["Décontamination carrosserie", "Aspirateur", "Rénovation plastiques", "Nettoyage vitres & jantes", "Lustrage pneus"], popular: true },
    { name: "Extra", price: 200, services: ["Traitement taches sièges/tapis", "Lavage carrosserie", "Rénovation plastiques", "Nettoyage vitres", "Lustrage pneus"] },
    { name: "Premium", price: 300, services: ["Traitement sièges/tapis/plafond", "Cirage carrosserie", "Rénovation plastiques", "Nettoyage vitres & jantes", "Lustrage pneus"] },
  ],
  suv_moyen: [
    { name: "Complet", price: 80, services: ["Lavage carrosserie", "Nettoyage intérieur", "Aspirateur", "Nettoyage vitres", "Lustrage pneus"] },
    { name: "Spécial", price: 100, services: ["Décontamination carrosserie", "Aspirateur", "Rénovation plastiques", "Nettoyage vitres & jantes", "Lustrage pneus"], popular: true },
    { name: "Extra", price: 250, services: ["Traitement taches sièges/tapis", "Lavage carrosserie", "Rénovation plastiques", "Nettoyage vitres", "Lustrage pneus"] },
    { name: "Premium", price: 400, services: ["Traitement sièges/tapis/plafond", "Cirage carrosserie", "Rénovation plastiques", "Nettoyage vitres & jantes", "Lustrage pneus"] },
  ],
  suv_grand: [
    { name: "Complet", price: 100, services: ["Lavage carrosserie", "Nettoyage intérieur", "Aspirateur", "Nettoyage vitres", "Lustrage pneus"] },
    { name: "Spécial", price: 120, services: ["Décontamination carrosserie", "Aspirateur", "Rénovation plastiques", "Nettoyage vitres & jantes", "Lustrage pneus"], popular: true },
    { name: "Extra", price: 250, services: ["Traitement taches sièges/tapis", "Lavage carrosserie", "Rénovation plastiques", "Nettoyage vitres", "Lustrage pneus"] },
    { name: "Premium", price: 400, services: ["Traitement sièges/tapis/plafond", "Cirage carrosserie", "Rénovation plastiques", "Nettoyage vitres & jantes", "Lustrage pneus"] },
  ],
  moto_petite: [
    { name: "Extérieur", price: 50, services: ["Lavage carrosserie", "Nettoyage intérieur basique", "Nettoyage pare-brise", "Nettoyage roues", "Lustrage pneus"], popular: true },
  ],
  moto_grande: [
    { name: "Extérieur + Intérieur", price: 80, services: ["Lavage carrosserie", "Nettoyage intérieur", "Nettoyage vitres", "Nettoyage roues", "Lustrage pneus"], popular: true },
  ],
};

const carBrands = [
  "Audi", "BMW", "Citroën", "Dacia", "Fiat", "Ford", "Honda", "Hyundai", "Kia", "Mercedes", "Nissan", "Opel", "Peugeot", "Renault", "Seat", "Škoda", "Toyota", "Volkswagen", "Volvo",
];

const GoWashPage = () => {
  const [step, setStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(null);
  const [selectedPack, setSelectedPack] = useState<WashPack | null>(null);
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleVehicleSelect = (v: VehicleType) => {
    setSelectedVehicle(v);
    setSelectedPack(null);
    setStep(2);
  };

  const handlePackSelect = (p: WashPack) => {
    setSelectedPack(p);
    setStep(3);
  };

  const handleSubmit = () => {
    const msg = `Bonjour, je souhaite réserver un lavage GoWash :\n• Véhicule: ${vehicleTypes.find(v => v.id === selectedVehicle)?.label}\n• Pack: ${selectedPack?.name} (${selectedPack?.price} DH)\n• Marque: ${brand}\n• Année: ${year}\n• Adresse: ${address}`;
    window.open(`https://wa.me/212600000000?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={washHero} alt="GoWash" className="w-full h-full object-cover" />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="container mx-auto px-4 relative z-10 pt-24">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-md text-primary-foreground text-sm font-medium mb-6">
              <Droplets className="h-4 w-4" /> GoWash
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground leading-[0.9] mb-6">
              Lavage auto <span className="text-gradient">écologique</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-xl">
              Service de lavage sans eau à domicile. Économisez 150 litres d'eau par lavage. Disponible 7j/7 de 9h à 22h.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Flow */}
      <AnimatedSection className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Progress bar */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm transition-colors ${
                  step >= s ? "gradient-go text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>{s}</div>
                {s < 3 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
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
              </motion.div>
            )}

            {/* Step 2: Pack selection */}
            {step === 2 && selectedVehicle && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <button onClick={() => setStep(1)} className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1">
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

            {/* Step 3: Info form */}
            {step === 3 && selectedPack && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <button onClick={() => setStep(2)} className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1">
                  ← Changer de formule
                </button>
                <h2 className="font-display text-3xl font-bold text-center mb-2">Vos informations</h2>
                <p className="text-center text-muted-foreground mb-8">
                  {vehicleTypes.find(v => v.id === selectedVehicle)?.label} · {selectedPack.name} · {selectedPack.price} DH
                </p>
                <div className="max-w-lg mx-auto space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Marque du véhicule</label>
                    <select value={brand} onChange={(e) => setBrand(e.target.value)}
                      className="w-full p-3 rounded-xl border bg-card text-foreground">
                      <option value="">Sélectionnez une marque</option>
                      {carBrands.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Année</label>
                    <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="2024"
                      className="w-full p-3 rounded-xl border bg-card text-foreground" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Téléphone</label>
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+212 6 XX XX XX XX"
                      className="w-full p-3 rounded-xl border bg-card text-foreground" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Adresse</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Votre adresse complète"
                      className="w-full p-3 rounded-xl border bg-card text-foreground" />
                  </div>
                  <button onClick={handleSubmit} disabled={!brand || !year || !phone || !address}
                    className="w-full gradient-go px-8 py-4 rounded-2xl font-display font-semibold text-primary-foreground shadow-go hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 mt-4">
                    Réserver via WhatsApp <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </AnimatedSection>

      {/* Features */}
      <AnimatedSection className="py-24 bg-go-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold">Pourquoi GoWash ?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: Leaf, title: "Écologique", desc: "150 litres d'eau économisés par lavage grâce à notre technologie sans eau." },
              { icon: Clock, title: "Rapide", desc: "Service en 30-60 minutes directement chez vous." },
              { icon: Shield, title: "Sûr", desc: "Produits certifiés, adaptés à tous les véhicules y compris électriques." },
              { icon: Sparkles, title: "Impeccable", desc: "Résultats professionnels garantis à chaque lavage." },
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="glass-card p-8 rounded-2xl text-center">
                <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </Layout>
  );
};

export default GoWashPage;
