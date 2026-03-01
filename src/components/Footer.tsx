import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const Footer = () => (
  <footer className="bg-go-dark text-primary-foreground relative overflow-hidden">
    {/* Subtle decorative elements */}
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-primary/5 blur-3xl" />

    <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {/* Brand */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Go 212" className="h-10 w-10 rounded-xl" />
            <span className="font-display text-xl font-bold tracking-tight">Go <span className="text-gradient">212</span></span>
          </div>
          <p className="text-sm opacity-70 leading-relaxed max-w-xs">
            Vos services du quotidien, réinventés. Mobilité électrique, lavage écologique, nettoyage professionnel et réparations à domicile.
          </p>
          <div className="flex gap-3 mt-6">
            <a href="#" className="p-2.5 rounded-xl bg-primary/20 hover:bg-primary/30 transition-colors hover:scale-110 transform duration-200"><Instagram className="h-4 w-4" /></a>
            <a href="#" className="p-2.5 rounded-xl bg-primary/20 hover:bg-primary/30 transition-colors hover:scale-110 transform duration-200"><Facebook className="h-4 w-4" /></a>
          </div>
        </motion.div>

        {/* Services */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <h4 className="font-display font-semibold mb-4 text-sm md:text-base">Nos Services</h4>
          <ul className="space-y-2.5 text-sm opacity-70">
            <li><Link to="/goride" className="hover:opacity-100 hover:text-primary transition-all">GoRide – Location Motos</Link></li>
            <li><Link to="/gowash" className="hover:opacity-100 hover:text-primary transition-all">GoWash – Lavage Auto</Link></li>
            <li><Link to="/goclean" className="hover:opacity-100 hover:text-primary transition-all">GoClean – Nettoyage Airbnb</Link></li>
            <li><Link to="/gofix" className="hover:opacity-100 hover:text-primary transition-all">GoFix – Réparations</Link></li>
          </ul>
        </motion.div>

        {/* Villes */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <h4 className="font-display font-semibold mb-4 text-sm md:text-base">Nos Villes</h4>
          <ul className="space-y-2.5 text-sm opacity-70">
            <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary" /> Casablanca</li>
            <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary" /> Rabat</li>
            <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-primary" /> Tanger</li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          <h4 className="font-display font-semibold mb-4 text-sm md:text-base">Contact</h4>
          <ul className="space-y-2.5 text-sm opacity-70">
            <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-primary" /> +212 6 60 88 01 10</li>
            <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-primary" /> contact@go212.ma</li>
          </ul>
          <p className="mt-4 text-sm opacity-70">Disponible 7j/7 — 9h à 22h</p>
        </motion.div>
      </div>

      <div className="mt-12 md:mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs opacity-50">© 2026 Go 212. Tous droits réservés.</p>
        <div className="flex gap-6 text-xs opacity-50">
          <a href="#" className="hover:opacity-100 transition-opacity">Mentions légales</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Politique de confidentialité</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
