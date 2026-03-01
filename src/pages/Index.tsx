import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight, Leaf, MapPin, Star, Users, Droplets, TrendingUp } from "lucide-react";
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
  { icon: Users, value: 15000, suffix: "+", label: "Clients satisfaits", emoji: "🙌" },
  { icon: Droplets, value: 500, suffix: "K+", label: "Litres d'eau économisés", emoji: "💧" },
  { icon: MapPin, value: 3, suffix: "", label: "Villes desservies", emoji: "📍" },
  { icon: TrendingUp, value: 4.9, suffix: "/5", label: "Note moyenne", emoji: "⭐" },
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

    {/* Stats — immersive banner */}
    <section className="py-16 relative overflow-hidden">
      {/* Full green gradient background */}
      <div className="absolute inset-0 gradient-go" />
      
      {/* Animated floating shapes */}
      <motion.div
        className="absolute top-10 left-[10%] w-40 h-40 rounded-full bg-white/10 blur-2xl"
        animate={{ y: [0, -25, 0], x: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-5 right-[15%] w-56 h-56 rounded-full bg-white/8 blur-2xl"
        animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-white/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-primary-foreground/70 font-display text-sm uppercase tracking-[0.25em] mb-10"
        >
          Go 212 en chiffres
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 80, damping: 15 }}
              whileHover={{ y: -6 }}
              className="group cursor-default"
            >
              <div className="relative rounded-3xl bg-white/15 backdrop-blur-md border border-white/20 p-6 md:p-8 text-center overflow-hidden transition-all duration-300 group-hover:bg-white/25 group-hover:border-white/35 group-hover:shadow-[0_8px_40px_-8px_rgba(255,255,255,0.2)]">
                {/* Shine sweep on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                
                <motion.span
                  className="text-3xl md:text-4xl block mb-3"
                  whileHover={{ scale: 1.3, rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {s.emoji}
                </motion.span>

                <div className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-1 tracking-tight">
                  <CountUp target={s.value} suffix={s.suffix} decimals={s.label === "Note moyenne" ? 1 : 0} />
                </div>
                <div className="text-xs md:text-sm text-primary-foreground/70 font-medium tracking-wide">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>


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
    <section className="py-12 gradient-go" id="contact">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-3">Prêt à essayer Go 212 ?</h2>
          <p className="text-primary-foreground/80 text-sm max-w-md mx-auto mb-6">
            Rejoignez des milliers de clients satisfaits. Réservez dès aujourd'hui.
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
