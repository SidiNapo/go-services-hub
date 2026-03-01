import { motion } from "framer-motion";
import { SprayCan, ArrowRight, Check, Star, Clock, Shield, Sparkles, Home } from "lucide-react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import cleanHero from "@/assets/clean-hero.jpg";

const services = [
  { title: "Nettoyage après check-out", desc: "Nettoyage complet de l'appartement après le départ des voyageurs. Draps, serviettes, cuisine, salle de bain.", icon: Home, emoji: "🏠" },
  { title: "Remise en état rapide", desc: "Intervention express pour préparer votre logement entre deux réservations. Service en moins de 2 heures.", icon: Clock, emoji: "⚡" },
  { title: "Désinfection complète", desc: "Protocole sanitaire renforcé pour garantir la sécurité de vos prochains voyageurs.", icon: Shield, emoji: "🛡️" },
  { title: "Nettoyage en profondeur", desc: "Nettoyage complet incluant moquettes, rideaux, appareils électroménagers et surfaces difficiles.", icon: Sparkles, emoji: "✨" },
];

const GoCleanPage = () => (
  <Layout>
    {/* Hero */}
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={cleanHero} alt="GoClean" className="w-full h-full object-cover" loading="eager" />
        <div className="hero-overlay absolute inset-0" />
      </div>
      <div className="container mx-auto px-4 relative z-10 pt-24">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-foreground text-sm font-medium mb-6">
            <SprayCan className="h-4 w-4" /> GoClean
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-primary-foreground leading-[0.9] mb-6">
            Nettoyage <span className="text-gradient">Airbnb</span> professionnel
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/80 max-w-xl mb-8">
            Service dédié aux conciergeries et particuliers. Nettoyage complet après check-out, désinfection et préparation pour vos voyageurs.
          </p>
          <motion.a href="https://wa.me/212660880110" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="gradient-go px-8 py-4 rounded-2xl font-display font-semibold text-primary-foreground shadow-go inline-flex items-center gap-2">
            Demander un devis <ArrowRight className="h-5 w-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>

    {/* Services - creative grid */}
    <AnimatedSection className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-primary font-display font-semibold text-sm uppercase tracking-widest">Nos prestations</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">Un logement impeccable, à chaque fois</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {services.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group glass-card p-6 md:p-8 rounded-3xl hover:border-primary/30 transition-all duration-300 hover:shadow-go relative overflow-hidden cursor-default"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl">{s.emoji}</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg md:text-xl mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>

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
              {[
                "Équipes formées aux standards hôteliers",
                "Produits écologiques et hypoallergéniques",
                "Disponible 7j/7, même en urgence",
                "Checklist complète envoyée après chaque intervention",
                "Tarifs adaptés aux conciergeries avec abonnement",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <div className="flex-shrink-0 p-1 rounded-full gradient-go mt-0.5">
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <span className="text-sm">{t}</span>
                </li>
              ))}
            </ul>
            <motion.a href="https://wa.me/212660880110" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="mt-8 gradient-go px-8 py-4 rounded-2xl font-display font-semibold text-primary-foreground shadow-go inline-flex items-center gap-2">
              Contactez-nous <ArrowRight className="h-5 w-5" />
            </motion.a>
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
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-go" />
      <motion.div className="absolute top-10 right-[10%] w-40 h-40 rounded-full bg-white/10 blur-2xl"
        animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6">Un logement propre, des voyageurs heureux</h2>
          <p className="text-primary-foreground/80 text-base md:text-lg max-w-xl mx-auto mb-8">
            Contactez-nous pour un devis personnalisé. Tarifs dégressifs pour les conciergeries.
          </p>
          <motion.a href="https://wa.me/212660880110" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-2xl font-display font-semibold bg-primary-foreground text-primary hover:opacity-90 transition-opacity inline-flex items-center gap-2 shadow-elevated">
            Demander un devis <ArrowRight className="h-5 w-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default GoCleanPage;
