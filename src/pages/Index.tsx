import { motion } from "framer-motion";
import { ArrowRight, Leaf, Clock, MapPin, Star, Zap, Shield, Users } from "lucide-react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import ServiceCard from "@/components/ServiceCard";
import cityCasablanca from "@/assets/city-casablanca.jpg";
import cityRabat from "@/assets/city-rabat.jpg";
import cityTanger from "@/assets/city-tanger.jpg";
import motoHero from "@/assets/moto-flow.jpg";
import washHero from "@/assets/wash-hero.jpg";
import cleanHero from "@/assets/clean-hero.jpg";
import fixHero from "@/assets/fix-hero.jpg";

const services = [
  { title: "GoRide", description: "Location de motos électriques à autonomie illimitée. Swap batterie inclus.", image: motoHero, path: "/goride" },
  { title: "GoWash", description: "Lavage auto écologique à domicile. Sans eau, sans compromis.", image: washHero, path: "/gowash" },
  { title: "GoClean", description: "Nettoyage professionnel d'appartements & studios Airbnb.", image: cleanHero, path: "/goclean" },
  { title: "GoFix", description: "Plomberie, électricité, réparations & maintenance à domicile.", image: fixHero, path: "/gofix" },
];

const stats = [
  { icon: Users, value: "15 000+", label: "Clients satisfaits" },
  { icon: Leaf, value: "500K+", label: "Litres d'eau économisés" },
  { icon: MapPin, value: "3", label: "Villes desservies" },
  { icon: Star, value: "4.9/5", label: "Note moyenne" },
];

const features = [
  { icon: Zap, title: "Rapide & efficace", desc: "Nos équipes interviennent en moins de 30 minutes dans votre zone." },
  { icon: Leaf, title: "100% écologique", desc: "Produits écoresponsables, motos électriques, zéro émission." },
  { icon: Shield, title: "Fiable & sécurisé", desc: "Techniciens certifiés, paiement sécurisé, satisfaction garantie." },
  { icon: Clock, title: "Disponible 7j/7", desc: "De 9h à 22h, tous les jours, même les jours fériés." },
];

const testimonials = [
  { name: "Yasmine B.", city: "Casablanca", text: "GoWash a transformé mon rapport au lavage auto. Rapide, écologique et un résultat impeccable à chaque fois !", rating: 5 },
  { name: "Karim M.", city: "Rabat", text: "J'utilise GoRide chaque jour pour mes déplacements. Plus de problème de stationnement, et c'est 100% électrique !", rating: 5 },
  { name: "Salma A.", city: "Tanger", text: "GoClean est un vrai game-changer pour ma conciergerie Airbnb. Mes invités sont toujours ravis.", rating: 5 },
];

const Index = () => (
  <Layout>
    {/* Services - First thing users see */}
    <section className="pt-28 pb-24">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-primary font-display font-semibold text-sm uppercase tracking-widest">Nos Services</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">Tout pour votre quotidien</h1>
          <p className="text-muted-foreground text-lg">Quatre services pensés pour simplifier votre vie, avec une touche d'innovation et de responsabilité écologique.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>

    {/* Stats */}
    <AnimatedSection className="py-20 bg-go-surface">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <div className="inline-flex p-3 rounded-2xl bg-primary/10 mb-4">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="font-display text-3xl md:text-4xl font-bold text-foreground">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>

    {/* Why Go 212 */}
    <section className="py-24 gradient-dark">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-go-green-light font-display font-semibold text-sm uppercase tracking-widest">Pourquoi Go 212 ?</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mt-3 mb-4">L'excellence au service de votre confort</h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl border border-primary-foreground/10 hover:border-primary/30 transition-colors group">
              <div className="p-3 rounded-2xl bg-primary/20 w-fit mb-6 group-hover:bg-primary/30 transition-colors">
                <f.icon className="h-6 w-6 text-go-green-light" />
              </div>
              <h3 className="font-display font-bold text-xl text-primary-foreground mb-2">{f.title}</h3>
              <p className="text-primary-foreground/60 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <AnimatedSection className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-display font-semibold text-sm uppercase tracking-widest">Témoignages</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">Ce que disent nos clients</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground/80 mb-6 leading-relaxed">"{t.text}"</p>
              <div>
                <div className="font-display font-semibold">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.city}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>

    {/* How it works */}
    <AnimatedSection className="py-24 bg-go-surface">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-display font-semibold text-sm uppercase tracking-widest">Comment ça marche ?</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">Simple comme 1, 2, 3</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { step: "01", title: "Choisissez votre service", desc: "Sélectionnez parmi GoRide, GoWash, GoClean ou GoFix selon vos besoins." },
            { step: "02", title: "Réservez en ligne", desc: "Choisissez votre date, heure et lieu. Paiement sécurisé en quelques clics." },
            { step: "03", title: "Profitez du service", desc: "Nos experts se déplacent chez vous. Détendez-vous, on s'occupe de tout." },
          ].map((s, i) => (
            <motion.div key={s.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-go text-primary-foreground font-display font-bold text-xl mb-6">
                {s.step}
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>

    {/* Cities */}
    <AnimatedSection className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-display font-semibold text-sm uppercase tracking-widest">Nos villes</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">Disponible dans les grandes villes du Maroc</h2>
          <p className="text-muted-foreground text-lg">Casablanca, Rabat et Tanger — et bientôt dans d'autres villes du Royaume.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Casablanca", img: cityCasablanca },
            { name: "Rabat", img: cityRabat },
            { name: "Tanger", img: cityTanger },
          ].map((city, i) => (
            <motion.div key={city.name} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="relative rounded-3xl overflow-hidden aspect-[3/2] group">
              <img src={city.img} alt={city.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-go-dark/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-display text-3xl font-bold text-primary-foreground">{city.name}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>

    {/* CTA */}
    <section className="py-24 gradient-go" id="contact">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Prêt à essayer Go 212 ?</h2>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-10">
            Rejoignez des milliers de clients satisfaits. Réservez votre premier service dès aujourd'hui.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/212660880110" target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl font-display font-semibold bg-primary-foreground text-primary hover:opacity-90 transition-opacity inline-flex items-center gap-2">
              Réserver via WhatsApp <ArrowRight className="h-5 w-5" />
            </a>
            <a href="tel:+212660880110"
              className="px-8 py-4 rounded-2xl font-display font-semibold border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 transition-colors">
              Appeler maintenant
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Index;
