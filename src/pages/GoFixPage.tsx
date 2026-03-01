import { motion } from "framer-motion";
import { Wrench, ArrowRight, Check, Zap, Droplets, Paintbrush, Settings, Phone, Shield, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import fixHero from "@/assets/fix-hero.jpg";

const services = [
  { icon: Droplets, title: "Plomberie", emoji: "🔧", items: ["Réparation fuites", "Débouchage canalisations", "Installation sanitaire", "Chauffe-eau"] },
  { icon: Zap, title: "Électricité", emoji: "⚡", items: ["Pannes électriques", "Installation prises/interrupteurs", "Tableau électrique", "Éclairage"] },
  { icon: Paintbrush, title: "Peinture & Finitions", emoji: "🎨", items: ["Peinture intérieure", "Retouches murales", "Pose de papier peint", "Enduit"] },
  { icon: Settings, title: "Maintenance générale", emoji: "🔩", items: ["Montage de meubles", "Serrurerie", "Menuiserie", "Petits travaux divers"] },
];

const GoFixPage = () => (
  <Layout>
    {/* Hero */}
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={fixHero} alt="GoFix" className="w-full h-full object-cover" loading="eager" />
        <div className="hero-overlay absolute inset-0" />
      </div>
      <div className="container mx-auto px-4 relative z-10 pt-24">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary-foreground text-sm font-medium mb-6">
            <Wrench className="h-4 w-4" /> GoFix
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-primary-foreground leading-[0.9] mb-6">
            Services <span className="text-gradient">techniques</span> à domicile
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/80 max-w-xl mb-8">
            Plomberie, électricité, réparations et maintenance générale. On répare tout ce dont votre maison a besoin.
          </p>
          <motion.a href="https://wa.me/212660880110" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="gradient-go px-8 py-4 rounded-2xl font-display font-semibold text-primary-foreground shadow-go inline-flex items-center gap-2">
            Demander une intervention <ArrowRight className="h-5 w-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>

    {/* Services grid */}
    <AnimatedSection className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-primary font-display font-semibold text-sm uppercase tracking-widest">Nos expertises</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">Tous les métiers du bâtiment</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {services.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group glass-card p-6 md:p-8 rounded-3xl hover:border-primary/30 transition-all duration-300 hover:shadow-go relative overflow-hidden cursor-default"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <span className="text-2xl">{s.emoji}</span>
                </div>
                <h3 className="font-display font-bold text-lg md:text-xl">{s.title}</h3>
              </div>
              <ul className="space-y-2">
                {s.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>

    {/* Process - creative steps */}
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-go" />
      <motion.div className="absolute top-10 left-[20%] w-48 h-48 rounded-full bg-white/10 blur-2xl"
        animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-10 right-[10%] w-32 h-32 rounded-full bg-white/5 blur-2xl"
        animate={{ y: [0, 15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground">Comment ça marche ?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-3xl mx-auto">
          {[
            { step: "01", title: "Décrivez votre besoin", desc: "Envoyez-nous une description ou photo du problème via WhatsApp.", emoji: "📸" },
            { step: "02", title: "Recevez un devis", desc: "Notre technicien évalue et vous propose un devis transparent sous 30 min.", emoji: "📋" },
            { step: "03", title: "Intervention rapide", desc: "Le technicien se déplace et résout le problème. Paiement après satisfaction.", emoji: "🔧" },
          ].map((s, i) => (
            <motion.div key={s.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="group text-center rounded-3xl bg-white/15 backdrop-blur-md border border-white/20 p-6 md:p-8 transition-all duration-300 hover:bg-white/25 hover:border-white/35 relative overflow-hidden cursor-default"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <motion.span className="text-3xl md:text-4xl block mb-4" whileHover={{ scale: 1.2 }}>{s.emoji}</motion.span>
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 text-primary-foreground font-display font-bold text-sm mb-4">
                {s.step}
              </div>
              <h3 className="font-display font-bold text-base md:text-lg mb-2 text-primary-foreground">{s.title}</h3>
              <p className="text-xs md:text-sm text-primary-foreground/70">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Guarantees */}
    <AnimatedSection className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
          {[
            { icon: Shield, title: "Garantie satisfaction", desc: "Si le travail ne vous satisfait pas, on revient gratuitement.", emoji: "✅" },
            { icon: Clock, title: "Intervention rapide", desc: "Nos techniciens interviennent dans les 24h suivant votre demande.", emoji: "⏱️" },
            { icon: Phone, title: "Support 7j/7", desc: "Notre équipe est disponible pour vous accompagner à tout moment.", emoji: "📞" },
          ].map((g, i) => (
            <motion.div key={g.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group glass-card p-6 md:p-8 rounded-3xl text-center hover:shadow-go transition-all duration-300 relative overflow-hidden cursor-default"
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
              <motion.span className="text-3xl block mb-3" whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}>{g.emoji}</motion.span>
              <h3 className="font-display font-bold text-base md:text-lg mb-2">{g.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{g.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>

    {/* CTA */}
    <section className="py-16 md:py-24 bg-go-surface">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Un problème ? GoFix s'en occupe</h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-8">
            Envoyez-nous une photo de votre problème et recevez un devis en 30 minutes.
          </p>
          <motion.a href="https://wa.me/212660880110" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-2xl font-display font-semibold gradient-go text-primary-foreground shadow-go inline-flex items-center gap-2">
            Contacter GoFix <ArrowRight className="h-5 w-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default GoFixPage;
