import { motion } from "framer-motion";
import { Zap, Battery, Clock, Shield, Leaf, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import motoHero from "@/assets/moto-hero.jpg";
import motoFlow from "@/assets/moto-flow.jpg";

const pricing = [
  { duration: "1 Heure", price: "30", unit: "DH", popular: false },
  { duration: "1 Jour", price: "160", unit: "DH", popular: true },
  { duration: "1 Semaine", price: "800", unit: "DH", popular: false },
  { duration: "1 Mois", price: "2 300", unit: "DH", popular: false },
];

const features = [
  { icon: Zap, title: "100% Électrique", desc: "Zéro émission, zéro bruit. Roulez propre dans toute la ville." },
  { icon: Battery, title: "Autonomie illimitée", desc: "Système de swap batterie instantané. Jamais en panne." },
  { icon: Clock, title: "Disponible 24h/24", desc: "Réservez et déverrouillez votre moto à tout moment." },
  { icon: Shield, title: "Assurance incluse", desc: "Roulez l'esprit tranquille, vous êtes couvert." },
  { icon: Leaf, title: "Écologique", desc: "Réduisez votre empreinte carbone au quotidien." },
];

const GoRidePage = () => (
  <Layout>
    {/* Hero */}
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={motoHero} alt="GoRide" className="w-full h-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
      </div>
      <div className="container mx-auto px-4 relative z-10 pt-24">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-md text-primary-foreground text-sm font-medium mb-6">
            <Zap className="h-4 w-4" /> GoRide
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground leading-[0.9] mb-6">
            La mobilité <span className="text-gradient">électrique</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-xl mb-8">
            Louez une moto électrique à autonomie illimitée grâce à notre système de swap batterie. Solution économique et écologique.
          </p>
          <a href="https://wa.me/212600000000" className="gradient-go px-8 py-4 rounded-2xl font-display font-semibold text-primary-foreground shadow-go hover:opacity-90 transition-all inline-flex items-center gap-2">
            Réserver maintenant <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>

    {/* Moto Card */}
    <AnimatedSection className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto glass-card rounded-[2rem] overflow-hidden shadow-elevated">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative aspect-square lg:aspect-auto">
              <img src={motoFlow} alt="Flow 2026" className="w-full h-full object-cover" />
              <div className="absolute top-6 left-6 px-4 py-2 rounded-full gradient-go text-primary-foreground text-sm font-semibold">
                100% Électrique
              </div>
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span className="text-primary font-display font-semibold text-sm uppercase tracking-widest">Notre Moto</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-2">Flow</h2>
              <p className="text-muted-foreground mb-1">Modèle 2026 · 2 places</p>
              <p className="text-muted-foreground text-sm mb-8">Batterie swappable · Autonomie illimitée · Design futuriste</p>

              <div className="space-y-3">
                {pricing.map((p) => (
                  <div key={p.duration} className={`flex items-center justify-between p-4 rounded-2xl border transition-colors ${p.popular ? "border-primary bg-accent" : "border-border hover:border-primary/30"}`}>
                    <div className="flex items-center gap-3">
                      {p.popular && <span className="px-2 py-0.5 rounded-full gradient-go text-primary-foreground text-xs font-semibold">Populaire</span>}
                      <span className="font-display font-semibold">{p.duration}</span>
                    </div>
                    <div className="font-display text-2xl font-bold">{p.price} <span className="text-sm font-normal text-muted-foreground">{p.unit}</span></div>
                  </div>
                ))}
              </div>

              <a href="https://wa.me/212600000000" className="mt-8 gradient-go px-8 py-4 rounded-2xl font-display font-semibold text-primary-foreground shadow-go hover:opacity-90 transition-all text-center">
                Réserver le Flow
              </a>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>

    {/* Features */}
    <AnimatedSection className="py-24 bg-go-surface">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold">Pourquoi choisir GoRide ?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card p-6 rounded-2xl text-center">
              <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>

    {/* CTA */}
    <section className="py-24 gradient-go">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Roulez électrique dès aujourd'hui</h2>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
            À partir de 30 DH/heure. Réservez via WhatsApp et recevez votre moto en moins de 15 minutes.
          </p>
          <a href="https://wa.me/212600000000" className="px-8 py-4 rounded-2xl font-display font-semibold bg-primary-foreground text-primary hover:opacity-90 transition-opacity inline-flex items-center gap-2">
            Réserver via WhatsApp <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default GoRidePage;
