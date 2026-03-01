import { motion } from "framer-motion";
import { ArrowRight, MapPin, Droplets, TrendingUp, Users, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import ServiceCard from "@/components/ServiceCard";
import cityCasablanca from "@/assets/city-casablanca.jpg";
import cityRabat from "@/assets/city-rabat.jpg";
import cityMarrakech from "@/assets/city-marrakech.jpg";
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
  { value: "15 000+", label: "Clients satisfaits", icon: Users },
  { value: "500K+", label: "Litres d'eau économisés", icon: Droplets },
  { value: "98%", label: "Taux de satisfaction", icon: TrendingUp },
  { value: "24/7", label: "Support disponible", icon: Clock },
];

const Index = () => (
  <Layout>
    <SEO 
      title="GO212 - La Super App 100% Marocaine | Transport, Livraison & Services"
      description="Découvrez GO212, la super-app 100% marocaine. Simplifiez votre quotidien avec nos services de transport, livraison, food, shopping et services à domicile (GoRide, GoWash...)."
      canonical="https://go212.ma/"
      schema={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "GO212",
        "url": "https://go212.ma",
        "description": "La Super App 100% marocaine pour tous vos services quotidiens.",
        "publisher": {
          "@type": "Organization",
          "name": "GO212",
          "logo": "https://go212.ma/logogo212.png"
        }
      }}
    />
    
    {/* Hero Section */}
    <section className="pt-32 pb-20 overflow-hidden relative">
      <div className="absolute inset-0 bg-go-surface -z-10" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 text-accent-foreground text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span></span>
            La Super App 100% Marocaine
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Simplifiez votre vie <br /> <span className="text-gradient">avec GO212</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            De GoBike, GoEat et GoMart à nos nouveaux services à domicile GoRide, GoWash, GoClean et GoFix, GO212 vous accompagne chaque jour. L'innovation locale au service de votre confort.
          </motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#services" className="gradient-go px-8 py-4 rounded-xl font-display font-semibold text-primary-foreground shadow-go hover:shadow-lg transition-shadow inline-flex items-center gap-2 w-full sm:w-auto justify-center">
              Découvrir nos services <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="pt-28 pb-16 md:pb-24">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <span className="text-primary font-display font-semibold text-sm uppercase tracking-widest">Nos Services</span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4">Tout pour votre quotidien</h1>
          <p className="text-muted-foreground text-base md:text-lg">Quatre services pensés pour simplifier votre vie, avec une touche d'innovation et de responsabilité écologique.</p>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="py-12 md:py-16 relative overflow-hidden">
      <div className="absolute inset-0 gradient-go" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center text-primary-foreground/70 font-display text-sm uppercase tracking-[0.25em] mb-8 md:mb-10">
          Go 212 en chiffres
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }}
              className="group cursor-default">
              <div className="rounded-2xl md:rounded-3xl bg-white/10 border border-white/15 p-4 py-5 md:p-8 text-center transition-colors duration-300 hover:bg-white/15">
                <div className="w-10 h-10 md:w-14 md:h-14 mx-auto mb-2 md:mb-4 rounded-xl md:rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
                  <s.icon className="h-4 w-4 md:h-6 md:w-6 text-primary-foreground" />
                </div>
                <div className="font-display text-xl sm:text-2xl md:text-5xl font-bold text-primary-foreground mb-1 tracking-tight whitespace-nowrap">
                  {s.value}
                </div>
                <div className="text-[9px] sm:text-[10px] md:text-sm text-primary-foreground/60 font-medium tracking-wide uppercase leading-tight">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Cities */}
    <AnimatedSection className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <span className="text-primary font-display font-semibold text-sm uppercase tracking-widest">Nos villes</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-4">Disponible dans les grandes villes du Maroc</h2>
          <p className="text-muted-foreground text-base md:text-lg">Présents à Casablanca — Rabat et Marrakech arrivent bientôt.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {[
            { name: "Casablanca", img: cityCasablanca, comingSoon: false },
            { name: "Rabat", img: cityRabat, comingSoon: true },
            { name: "Marrakech", img: cityMarrakech, comingSoon: true },
          ].map((city, i) => (
            <motion.div key={city.name} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }}
              className="relative rounded-3xl overflow-hidden aspect-[3/2] group cursor-default shadow-card hover:shadow-elevated transition-shadow duration-300">
              <img src={city.img} alt={city.name} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${city.comingSoon ? "grayscale opacity-70" : ""}`} loading="lazy" />
              <div className="absolute inset-0 bg-go-dark/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="p-2 rounded-full bg-primary/20 border border-primary/30 w-fit mx-auto mb-3">
                    <MapPin className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">{city.name}</h3>
                  {city.comingSoon && (
                    <span className="inline-block mt-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold text-primary-foreground/80 tracking-wide uppercase">Bientôt</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>

    {/* CTA */}
    <section className="py-12 md:py-16 bg-go-surface" id="contact">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-3">Prêt à essayer Go 212 ?</h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto mb-6">
            Rejoignez des milliers de clients satisfaits. Réservez dès aujourd'hui.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4">
            <a href="https://wa.me/212660880110" target="_blank" rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl font-display font-semibold gradient-go text-primary-foreground shadow-go inline-flex items-center justify-center gap-2 active:scale-95 transition-transform">
              Réserver via WhatsApp <ArrowRight className="h-5 w-5" />
            </a>
            <a href="tel:+212660880110"
              className="px-8 py-4 rounded-2xl font-display font-semibold border-2 border-border text-foreground hover:bg-accent transition-colors inline-flex items-center justify-center active:scale-95">
              Appeler maintenant
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Index;
