import { motion } from "framer-motion";
import { Wrench, ArrowRight, Check, Zap, Droplets, Paintbrush, Settings, Phone, Shield, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import fixHero from "@/assets/fix-hero.jpg";

const services = [
  { icon: Droplets, title: "Plomberie", items: ["Réparation fuites", "Débouchage canalisations", "Installation sanitaire", "Chauffe-eau"] },
  { icon: Zap, title: "Électricité", items: ["Pannes électriques", "Installation prises/interrupteurs", "Tableau électrique", "Éclairage"] },
  { icon: Paintbrush, title: "Peinture & Finitions", items: ["Peinture intérieure", "Retouches murales", "Pose de papier peint", "Enduit"] },
  { icon: Settings, title: "Maintenance générale", items: ["Montage de meubles", "Serrurerie", "Menuiserie", "Petits travaux divers"] },
];

const GoFixPage = () => (
  <Layout>
    {/* Hero */}
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={fixHero} alt="GoFix" className="w-full h-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
      </div>
      <div className="container mx-auto px-4 relative z-10 pt-24">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-md text-primary-foreground text-sm font-medium mb-6">
            <Wrench className="h-4 w-4" /> GoFix
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-primary-foreground leading-[0.9] mb-6">
            Services <span className="text-gradient">techniques</span> à domicile
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-xl mb-8">
            Plomberie, électricité, réparations et maintenance générale. On répare tout ce dont votre maison a besoin.
          </p>
          <a href="https://wa.me/212600000000" className="gradient-go px-8 py-4 rounded-2xl font-display font-semibold text-primary-foreground shadow-go hover:opacity-90 transition-all inline-flex items-center gap-2">
            Demander une intervention <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>

    {/* Services grid */}
    <AnimatedSection className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-display font-semibold text-sm uppercase tracking-widest">Nos expertises</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">Tous les métiers du bâtiment</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl hover:border-primary/30 transition-colors">
              <div className="p-3 rounded-2xl bg-primary/10 w-fit mb-4">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-xl mb-4">{s.title}</h3>
              <ul className="space-y-2">
                {s.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>

    {/* Process */}
    <AnimatedSection className="py-24 bg-go-surface">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold">Comment ça marche ?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { step: "01", title: "Décrivez votre besoin", desc: "Envoyez-nous une description ou photo du problème via WhatsApp." },
            { step: "02", title: "Recevez un devis", desc: "Notre technicien évalue et vous propose un devis transparent sous 30 min." },
            { step: "03", title: "Intervention rapide", desc: "Le technicien se déplace et résout le problème. Paiement après satisfaction." },
          ].map((s, i) => (
            <motion.div key={s.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-go text-primary-foreground font-display font-bold text-xl mb-6">
                {s.step}
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>

    {/* Guarantees */}
    <AnimatedSection className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { icon: Shield, title: "Garantie satisfaction", desc: "Si le travail ne vous satisfait pas, on revient gratuitement." },
            { icon: Clock, title: "Intervention rapide", desc: "Nos techniciens interviennent dans les 24h suivant votre demande." },
            { icon: Phone, title: "Support 7j/7", desc: "Notre équipe est disponible pour vous accompagner à tout moment." },
          ].map((g, i) => (
            <motion.div key={g.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl text-center">
              <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                <g.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{g.title}</h3>
              <p className="text-sm text-muted-foreground">{g.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>

    {/* CTA */}
    <section className="py-24 gradient-go">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Un problème ? GoFix s'en occupe</h2>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
            Envoyez-nous une photo de votre problème et recevez un devis en 30 minutes.
          </p>
          <a href="https://wa.me/212600000000" className="px-8 py-4 rounded-2xl font-display font-semibold bg-primary-foreground text-primary hover:opacity-90 transition-opacity inline-flex items-center gap-2">
            Contacter GoFix <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  </Layout>
);

export default GoFixPage;
