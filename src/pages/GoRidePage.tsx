import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Battery, Clock, Shield, Leaf, ArrowRight, X, User, Phone, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import motoFlow from "@/assets/moto-flow.jpg";

const pricing = [
  { id: "hour", duration: "1 Heure", price: "30", unit: "DH", popular: false },
  { id: "day", duration: "1 Jour", price: "160", unit: "DH", popular: true },
  { id: "week", duration: "1 Semaine", price: "800", unit: "DH", popular: false },
  { id: "month", duration: "1 Mois", price: "2 300", unit: "DH", popular: false },
];

const features = [
  { icon: Zap, title: "100% Électrique", desc: "Zéro émission, zéro bruit.", emoji: "⚡" },
  { icon: Battery, title: "Autonomie illimitée", desc: "Swap batterie instantané.", emoji: "🔋" },
  { icon: Clock, title: "Disponible 24h/24", desc: "Réservez à tout moment.", emoji: "🕐" },
  { icon: Shield, title: "Assurance incluse", desc: "Roulez l'esprit tranquille.", emoji: "🛡️" },
  { icon: Leaf, title: "Écologique", desc: "Zéro empreinte carbone.", emoji: "🌱" },
];

const GoRidePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedPlan, setSelectedPlan] = useState("day");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = () => {
    const plan = pricing.find((p) => p.id === selectedPlan);
    const msg = `Bonjour, je souhaite réserver une moto Flow :\n• Durée: ${plan?.duration}\n• Prix: ${plan?.price} ${plan?.unit}\n• Nom: ${name}\n• Tél: ${phone}\n• Adresse: ${address}`;
    window.open(`https://wa.me/212660880110?text=${encodeURIComponent(msg)}`, "_blank");
    setModalOpen(false);
  };

  return (
    <Layout>
      {/* Moto showcase */}
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="max-w-sm mx-auto">
            <div
              onClick={() => { setModalOpen(true); setStep(1); }}
              className="group cursor-pointer rounded-3xl overflow-hidden shadow-elevated hover:shadow-go transition-all duration-500 bg-card border border-border/50"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={motoFlow} alt="Flow 2026" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-go-dark/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full gradient-go text-primary-foreground text-xs font-semibold flex items-center gap-1.5 shadow-go">
                  <Zap className="h-3 w-3" /> 100% Électrique
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm text-xs font-display font-bold border border-border/50">
                  2026
                </div>
              </div>
              <div className="p-6">
                <h2 className="font-display text-2xl font-bold mb-1">Flow</h2>
                <p className="text-sm text-muted-foreground mb-4">2 places · Swap batterie · Autonomie illimitée</p>
                <div className="flex items-baseline gap-1 mb-5">
                  <span className="font-display text-3xl font-bold text-primary">30</span>
                  <span className="text-sm text-muted-foreground">DH / heure</span>
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="gradient-go w-full py-3.5 rounded-2xl text-center font-display font-semibold text-primary-foreground text-sm shadow-go flex items-center justify-center gap-2"
                >
                  Réserver <ArrowRight className="h-4 w-4" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features - glassmorphism style */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-go" />
        <motion.div className="absolute top-10 left-[10%] w-40 h-40 rounded-full bg-white/10 blur-2xl"
          animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute bottom-5 right-[15%] w-56 h-56 rounded-full bg-white/5 blur-2xl"
          animate={{ y: [0, 15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">Pourquoi GoRide ?</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 max-w-4xl mx-auto">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl md:rounded-3xl bg-white/15 backdrop-blur-md border border-white/20 p-4 md:p-6 text-center transition-all duration-300 hover:bg-white/25 hover:border-white/35 cursor-default overflow-hidden relative"
              >
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
      <section className="py-16 md:py-20 bg-go-surface">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Roulez électrique dès aujourd'hui</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8 text-sm md:text-base">
              À partir de 30 DH/heure. Réservez et recevez votre moto en moins de 15 minutes.
            </p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => { setModalOpen(true); setStep(1); }}
              className="px-8 py-4 rounded-2xl font-display font-semibold gradient-go text-primary-foreground shadow-go hover:opacity-90 transition-opacity inline-flex items-center gap-2">
              Réserver maintenant <ArrowRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Reservation Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setModalOpen(false)}>
            <div className="absolute inset-0 bg-go-dark/60 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-card rounded-t-3xl sm:rounded-3xl shadow-elevated w-full max-w-md overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between p-6 pb-0 sticky top-0 bg-card z-10">
                <div>
                  <h3 className="font-display text-xl font-bold">Réserver le Flow</h3>
                  <p className="text-sm text-muted-foreground">Étape {step}/2</p>
                </div>
                <button onClick={() => setModalOpen(false)} className="p-2 rounded-xl hover:bg-muted transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Progress */}
              <div className="px-6 pt-4">
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div className="h-full gradient-go rounded-full" animate={{ width: step === 1 ? "50%" : "100%" }} transition={{ type: "spring", stiffness: 100 }} />
                </div>
              </div>

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6">
                    <p className="font-display font-semibold mb-4">Choisissez votre durée</p>
                    <div className="space-y-2.5">
                      {pricing.map((p) => (
                        <motion.button key={p.id} onClick={() => setSelectedPlan(p.id)}
                          whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                          className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                            selectedPlan === p.id ? "border-primary bg-accent shadow-go" : "border-border hover:border-primary/30"
                          }`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                              selectedPlan === p.id ? "border-primary bg-primary" : "border-muted-foreground/30"
                            }`}>
                              {selectedPlan === p.id && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                            </div>
                            <span className="font-display font-semibold text-sm">{p.duration}</span>
                            {p.popular && <span className="px-2 py-0.5 rounded-full gradient-go text-primary-foreground text-[10px] font-semibold">Populaire</span>}
                          </div>
                          <span className="font-display font-bold">{p.price} <span className="text-xs font-normal text-muted-foreground">{p.unit}</span></span>
                        </motion.button>
                      ))}
                    </div>
                    <motion.button onClick={() => setStep(2)}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="w-full mt-6 gradient-go py-3.5 rounded-2xl font-display font-semibold text-primary-foreground shadow-go flex items-center justify-center gap-2">
                      Continuer <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="p-6">
                    <button onClick={() => setStep(1)} className="text-xs text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1">← Modifier la durée</button>
                    <div className="space-y-3">
                      {[
                        { label: "Nom complet", icon: User, value: name, set: setName, placeholder: "Votre nom", type: "text" },
                        { label: "Téléphone", icon: Phone, value: phone, set: setPhone, placeholder: "+212 6 XX XX XX XX", type: "tel" },
                        { label: "Adresse de livraison", icon: MapPin, value: address, set: setAddress, placeholder: "Votre adresse", type: "text" },
                      ].map((field) => (
                        <div key={field.label}>
                          <label className="text-xs font-medium mb-1.5 block text-muted-foreground">{field.label}</label>
                          <div className="relative">
                            <field.icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input value={field.value} onChange={(e) => field.set(e.target.value)} placeholder={field.placeholder} type={field.type}
                              className="w-full pl-10 pr-4 py-3.5 rounded-xl border-2 border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Summary */}
                    <div className="mt-5 p-4 rounded-2xl bg-accent/50 border border-border">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Flow · {pricing.find(p => p.id === selectedPlan)?.duration}</span>
                        <span className="font-display font-bold text-primary">{pricing.find(p => p.id === selectedPlan)?.price} DH</span>
                      </div>
                    </div>

                    <motion.button onClick={handleSubmit} disabled={!name || !phone || !address}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="w-full mt-5 gradient-go py-3.5 rounded-2xl font-display font-semibold text-primary-foreground shadow-go transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                      Confirmer via WhatsApp <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default GoRidePage;
