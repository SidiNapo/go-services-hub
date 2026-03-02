import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Droplets, TrendingUp, Users, Clock, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Link } from "react-router-dom";
import cityCasablanca from "@/assets/city-casablanca.jpg";
import cityRabat from "@/assets/city-rabat.jpg";
import cityMarrakech from "@/assets/city-marrakech.jpg";
import motoHero from "@/assets/moto-flow-studio.jpg";
import washHero from "@/assets/wash-hero.jpg";
import cleanHero from "@/assets/clean-hero.jpg";
import fixHero from "@/assets/fix-hero.jpg";

const services = [
  { title: "GoRide", description: "Location de motos électriques à autonomie illimitée.", image: motoHero, path: "/goride", imageContain: true },
  { title: "GoWash", description: "Lavage auto écologique à domicile. Sans eau.", image: washHero, path: "/gowash" },
  { title: "GoClean", description: "Nettoyage professionnel d'appartements Airbnb.", image: cleanHero, path: "/goclean" },
  { title: "GoFix", description: "Plomberie, électricité & maintenance à domicile.", image: fixHero, path: "/gofix" },
];

const stats = [
  { value: "15K+", label: "Clients satisfaits", icon: Users },
  { value: "500K+", label: "Litres d'eau économisés", icon: Droplets },
  { value: "98%", label: "Taux de satisfaction", icon: TrendingUp },
  { value: "24/7", label: "Support disponible", icon: Clock },
];

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroTextY = useTransform(heroScroll, [0, 1], [0, 100]);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 0.6], [1, 0.95]);

  return (
    <Layout>
      <SEO 
        title="GO212 - La Super App 100% Marocaine | Transport, Livraison & Services"
        description="Découvrez GO212, la super-app 100% marocaine. Simplifiez votre quotidien avec nos services de transport, livraison, food, shopping et services à domicile."
        canonical="https://go212.ma/"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "GO212",
          "url": "https://go212.ma",
          "description": "La Super App 100% marocaine pour tous vos services quotidiens.",
          "publisher": { "@type": "Organization", "name": "GO212", "logo": "https://go212.ma/logogo212.png" }
        }}
      />

      {/* ═══════════ HERO ═══════════ */}
      <section ref={heroRef} className="relative min-h-[100vh] flex items-center overflow-hidden bg-background">
        {/* Animated floating orbs */}
        <motion.div
          className="absolute top-[5%] right-[10%] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(142 72% 42% / 0.08), transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1], x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(142 60% 55% / 0.06), transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        <BackgroundPaths>
          <motion.div
            className="container mx-auto px-4 pt-28 pb-20"
            style={{ y: heroTextY, opacity: heroOpacity, scale: heroScale }}
          >
            <div className="max-w-5xl mx-auto text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-accent/60 border border-primary/15 text-sm font-medium mb-10"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-foreground/80">La Super App 100% Marocaine</span>
              </motion.div>

              {/* Headline — staggered letter reveal */}
              <div className="mb-8">
                <div className="overflow-hidden">
                  <motion.h1
                    className="font-display text-[3.2rem] sm:text-7xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter leading-[0.9]"
                  >
                    {["Simplifiez", "votre", "vie"].map((word, wi) => (
                      <span key={wi} className="inline-block mr-[0.25em]">
                        {word.split("").map((letter, li) => (
                          <motion.span
                            key={li}
                            initial={{ y: 80, opacity: 0, rotateX: 90 }}
                            animate={{ y: 0, opacity: 1, rotateX: 0 }}
                            transition={{
                              delay: 0.2 + wi * 0.12 + li * 0.025,
                              type: "spring",
                              stiffness: 100,
                              damping: 15,
                            }}
                            className="inline-block text-foreground"
                          >
                            {letter}
                          </motion.span>
                        ))}
                      </span>
                    ))}
                  </motion.h1>
                </div>
                <div className="overflow-hidden mt-1">
                  <motion.h1 className="font-display text-[3.2rem] sm:text-7xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter leading-[0.9]">
                    {["avec"].map((word, wi) => (
                      <span key={wi} className="inline-block mr-[0.25em]">
                        {word.split("").map((letter, li) => (
                          <motion.span
                            key={li}
                            initial={{ y: 80, opacity: 0, rotateX: 90 }}
                            animate={{ y: 0, opacity: 1, rotateX: 0 }}
                            transition={{
                              delay: 0.6 + li * 0.03,
                              type: "spring",
                              stiffness: 100,
                              damping: 15,
                            }}
                            className="inline-block text-foreground/40"
                          >
                            {letter}
                          </motion.span>
                        ))}
                      </span>
                    ))}
                    <span className="inline-block">
                      {"GO212".split("").map((letter, li) => (
                        <motion.span
                          key={li}
                          initial={{ y: 80, opacity: 0, scale: 0.5, rotateX: 90 }}
                          animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
                          transition={{
                            delay: 0.75 + li * 0.05,
                            type: "spring",
                            stiffness: 120,
                            damping: 12,
                          }}
                          className="inline-block text-gradient"
                        >
                          {letter}
                        </motion.span>
                      ))}
                    </span>
                  </motion.h1>
                </div>
              </div>

              {/* Subtitle with blur-in */}
              <motion.p
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 1 }}
                className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
              >
                Transport, livraison, services à domicile — tout ce dont vous avez besoin, dans une seule app.
              </motion.p>

              {/* CTA + quick stats */}
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 1.2 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <motion.a
                  href="#services"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative gradient-go h-14 px-8 rounded-full font-display font-semibold text-primary-foreground shadow-go inline-flex items-center gap-2.5 overflow-hidden text-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative">Découvrir nos services</span>
                  <ArrowRight className="h-4 w-4 relative group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a
                  href="https://wa.me/212660880110"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group h-14 px-8 rounded-full font-display font-semibold border border-border bg-background/60 backdrop-blur-sm text-foreground hover:border-primary/30 hover:bg-accent/50 transition-all inline-flex items-center gap-2.5 text-sm"
                >
                  Contacter via WhatsApp
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.a>
              </motion.div>

              {/* Floating mini stats */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="flex flex-wrap items-center justify-center gap-3 mt-14"
              >
                {[
                  { val: "15K+", lbl: "Clients" },
                  { val: "98%", lbl: "Satisfaction" },
                  { val: "24/7", lbl: "Support" },
                ].map((s, i) => (
                  <motion.div
                    key={s.lbl}
                    whileHover={{ y: -3, scale: 1.05 }}
                    className="px-5 py-3 rounded-2xl bg-accent/40 border border-border/60 text-center cursor-default"
                  >
                    <div className="font-display text-lg font-bold text-foreground">{s.val}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.lbl}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </BackgroundPaths>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════ SERVICES ═══════════ */}
      <section className="py-24 md:py-32 relative" id="services">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14 md:mb-20"
          >
            <span className="text-primary font-display font-semibold text-sm uppercase tracking-widest">Nos Services</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-3 mb-4 tracking-tight">Tout pour votre quotidien</h2>
            <p className="text-muted-foreground text-base md:text-lg">Quatre services pensés pour simplifier votre vie.</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to={s.path} className="group block relative rounded-3xl overflow-hidden aspect-[3/4] md:aspect-[4/5]">
                  <motion.img
                    src={s.image}
                    alt={s.title}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    loading="lazy"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(160_20%_5%)] via-[hsl(160_20%_5%/0.4)] to-transparent opacity-80" />
                  <div className="absolute top-4 left-4 md:top-5 md:left-5">
                    <div className="px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-xs font-display font-semibold tracking-wider uppercase">
                      {s.title}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-7">
                    <h3 className="font-display text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary-foreground mb-1 leading-tight">{s.title}</h3>
                    <p className="text-[10px] sm:text-xs md:text-sm text-primary-foreground/70 line-clamp-2 leading-relaxed mb-3">{s.description}</p>
                    <motion.div
                      className="w-full py-2.5 rounded-xl gradient-go text-primary-foreground shadow-go inline-flex items-center justify-center gap-1.5"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <span className="text-[10px] sm:text-xs font-display font-semibold">Réservez maintenant</span>
                      <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ STATS ═══════════ */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-go" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-primary-foreground/70 font-display text-sm uppercase tracking-[0.25em] mb-10"
          >
            Go 212 en chiffres
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group cursor-default"
              >
                <div className="rounded-2xl md:rounded-3xl bg-white/10 border border-white/15 p-4 py-5 md:p-8 text-center transition-colors duration-300 hover:bg-white/20">
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

      {/* ═══════════ CITIES ═══════════ */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
          >
            <span className="text-primary font-display font-semibold text-sm uppercase tracking-widest">Nos villes</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-4">Disponible au Maroc</h2>
            <p className="text-muted-foreground text-base md:text-lg">Présents à Casablanca — Rabat et Marrakech arrivent bientôt.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            {[
              { name: "Casablanca", img: cityCasablanca, comingSoon: false },
              { name: "Rabat", img: cityRabat, comingSoon: true },
              { name: "Marrakech", img: cityMarrakech, comingSoon: true },
            ].map((city, i) => (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 50, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="relative rounded-3xl overflow-hidden aspect-[3/2] group cursor-default shadow-card hover:shadow-elevated transition-shadow duration-500"
              >
                <motion.img
                  src={city.img}
                  alt={city.name}
                  className={`w-full h-full object-cover ${city.comingSoon ? "grayscale opacity-70" : ""}`}
                  loading="lazy"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-[hsl(var(--go-dark)/0.4)]" />
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
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="py-16 md:py-24 bg-accent/30 relative overflow-hidden" id="contact">
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(142 72% 42% / 0.06), transparent 70%)" }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Prêt à essayer <span className="text-gradient">Go 212</span> ?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto mb-8">
              Rejoignez des milliers de clients satisfaits. Réservez dès aujourd'hui.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4">
              <motion.a
                href="https://wa.me/212660880110"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-8 py-4 rounded-2xl font-display font-semibold gradient-go text-primary-foreground shadow-go inline-flex items-center justify-center gap-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Réserver via WhatsApp</span>
                <ArrowRight className="h-5 w-5 relative" />
              </motion.a>
              <a
                href="tel:+212660880110"
                className="px-8 py-4 rounded-2xl font-display font-semibold border-2 border-border text-foreground hover:bg-accent transition-colors inline-flex items-center justify-center active:scale-95"
              >
                Appeler maintenant
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
