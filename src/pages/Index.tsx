import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight, MapPin, Droplets, TrendingUp, Users, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import ServiceCard from "@/components/ServiceCard";
import cityCasablanca from "@/assets/city-casablanca.jpg";
import cityRabat from "@/assets/city-rabat.jpg";
import cityTanger from "@/assets/city-tanger.jpg";
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
  { value: 15000, suffix: "+", label: "Clients satisfaits", icon: Users },
  { value: 500, suffix: "K+", label: "Litres d'eau économisés", icon: Droplets },
  { value: 98, suffix: "%", label: "Taux de satisfaction", icon: TrendingUp },
  { value: 24, suffix: "/7", label: "Support disponible", icon: Clock },
];

function CountUp({ target, suffix, decimals = 0 }: { target: number; suffix: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => decimals ? v.toFixed(decimals) : Math.floor(v).toLocaleString("fr-FR"));

  useEffect(() => {
    const controls = animate(motionVal, target, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [target, motionVal]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = v + suffix;
    });
    return unsubscribe;
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const Index = () => (
  <Layout>
    {/* Services */}
    <section className="pt-28 pb-16 md:pb-24">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
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
      <motion.div className="absolute top-10 left-[10%] w-40 h-40 rounded-full bg-white/10 blur-2xl"
        animate={{ y: [0, -25, 0], x: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-5 right-[15%] w-56 h-56 rounded-full bg-white/8 blur-2xl"
        animate={{ y: [0, 20, 0], x: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-white/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center text-primary-foreground/70 font-display text-sm uppercase tracking-[0.25em] mb-8 md:mb-10">
          Go 212 en chiffres
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.12, type: "spring", stiffness: 80, damping: 15 }}
              whileHover={{ y: -6 }} className="group cursor-default">
              <div className="relative rounded-2xl md:rounded-3xl bg-white/10 backdrop-blur-xl border border-white/15 p-4 py-5 md:p-8 text-center transition-all duration-500 group-hover:bg-white/20 group-hover:border-white/30 group-hover:shadow-[0_16px_60px_-12px_rgba(255,255,255,0.15)]">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <motion.div
                  className="w-10 h-10 md:w-14 md:h-14 mx-auto mb-2 md:mb-4 rounded-xl md:rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <s.icon className="h-4 w-4 md:h-6 md:w-6 text-primary-foreground" />
                </motion.div>
                <div className="font-display text-xl sm:text-2xl md:text-5xl font-bold text-primary-foreground mb-1 tracking-tight whitespace-nowrap">
                  <CountUp target={s.value} suffix={s.suffix} decimals={0} />
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
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="relative rounded-3xl overflow-hidden aspect-[3/2] group cursor-default shadow-card hover:shadow-elevated transition-all duration-500">
              <img src={city.img} alt={city.name} className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${city.comingSoon ? "grayscale opacity-70" : ""}`} loading="lazy" />
              <div className="absolute inset-0 bg-go-dark/40 group-hover:bg-go-dark/50 transition-colors duration-500" />
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="p-2 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 w-fit mx-auto mb-3">
                    <MapPin className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">{city.name}</h3>
                  {city.comingSoon && (
                    <span className="inline-block mt-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold text-primary-foreground/80 tracking-wide uppercase">Bientôt</span>
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
            <motion.a href="https://wa.me/212660880110" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl font-display font-semibold gradient-go text-primary-foreground shadow-go inline-flex items-center justify-center gap-2">
              Réserver via WhatsApp <ArrowRight className="h-5 w-5" />
            </motion.a>
            <motion.a href="tel:+212660880110"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl font-display font-semibold border-2 border-border text-foreground hover:bg-accent transition-colors inline-flex items-center justify-center">
              Appeler maintenant
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default Index;
