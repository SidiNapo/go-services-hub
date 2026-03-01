import { motion } from "framer-motion";
import { SprayCan, ArrowRight, Check, Star, Clock, Shield, Sparkles, Home } from "lucide-react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import cleanHero from "@/assets/clean-hero.jpg";

const services = [
  { title: "Nettoyage après check-out", desc: "Nettoyage complet de l'appartement après le départ des voyageurs. Draps, serviettes, cuisine, salle de bain.", icon: Home },
  { title: "Remise en état rapide", desc: "Intervention express pour préparer votre logement entre deux réservations. Service en moins de 2 heures.", icon: Clock },
  { title: "Désinfection complète", desc: "Protocole sanitaire renforcé pour garantir la sécurité de vos prochains voyageurs.", icon: Shield },
  { title: "Nettoyage en profondeur", desc: "Nettoyage complet incluant moquettes, rideaux, appareils électroménagers et surfaces difficiles.", icon: Sparkles },
];

const GoCleanPage = () => (
  <Layout>
    {/* Header */}
    <section className="pt-28 pb-12">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <span className="text-primary font-display font-semibold text-sm uppercase tracking-widest">GoClean</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-3">Nettoyage Airbnb professionnel</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Service dédié aux conciergeries et particuliers. Nettoyage complet après check-out.</p>
        </motion.div>
      </div>
    </section>

    {/* Services */}
    <AnimatedSection className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-display font-semibold text-sm uppercase tracking-widest">Nos prestations</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">Un logement impeccable, à chaque fois</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl hover:border-primary/30 transition-colors">
              <div className="p-3 rounded-2xl bg-primary/10 w-fit mb-4">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>

    {/* Why us */}
    <AnimatedSection className="py-24 bg-go-surface">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden aspect-[4/3]">
            <img src={cleanHero} alt="Intérieur propre" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-primary font-display font-semibold text-sm uppercase tracking-widest">Pourquoi GoClean ?</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-6">Des avis 5 étoiles garantis</h2>
            <ul className="space-y-4">
              {[
                "Équipes formées aux standards hôteliers",
                "Produits écologiques et hypoallergéniques",
                "Disponible 7j/7, même en urgence",
                "Checklist complète envoyée après chaque intervention",
                "Tarifs adaptés aux conciergeries avec abonnement",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{t}</span>
                </li>
              ))}
            </ul>
            <a href="https://wa.me/212660880110" className="mt-8 gradient-go px-8 py-4 rounded-2xl font-display font-semibold text-primary-foreground shadow-go hover:opacity-90 transition-all inline-flex items-center gap-2">
              Contactez-nous <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </AnimatedSection>

    {/* Testimonial */}
    <AnimatedSection className="py-24">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <div className="flex justify-center gap-1 mb-6">
          {[1,2,3,4,5].map(n => <Star key={n} className="h-5 w-5 fill-primary text-primary" />)}
        </div>
        <blockquote className="text-xl md:text-2xl font-display italic text-foreground/80 mb-6">
          "Depuis que j'utilise GoClean, mes notes Airbnb sont passées de 4.2 à 4.9. Un service irréprochable."
        </blockquote>
        <p className="font-display font-semibold">Mehdi R.</p>
        <p className="text-sm text-muted-foreground">Propriétaire de 8 appartements — Casablanca</p>
      </div>
    </AnimatedSection>

    {/* CTA */}
    <section className="py-24 gradient-go">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Un logement propre, des voyageurs heureux</h2>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
            Contactez-nous pour un devis personnalisé. Tarifs dégressifs pour les conciergeries.
          </p>
          <a href="https://wa.me/212660880110" className="px-8 py-4 rounded-2xl font-display font-semibold bg-primary-foreground text-primary hover:opacity-90 transition-opacity inline-flex items-center gap-2">
            Demander un devis <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default GoCleanPage;
