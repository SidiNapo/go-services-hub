import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const services = [
  { name: "GoRide", path: "/goride", desc: "Location de motos électriques" },
  { name: "GoWash", path: "/gowash", desc: "Lavage auto à domicile" },
  { name: "GoClean", path: "/goclean", desc: "Nettoyage Airbnb professionnel" },
  { name: "GoFix", path: "/gofix", desc: "Services techniques à domicile" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-card border-b py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Go 212" className="h-14 w-14 rounded-xl object-cover transition-transform group-hover:scale-110" />
          <span className="font-display text-xl font-bold tracking-tight">
            Go <span className="text-gradient">212</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link to="/" className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent transition-colors">
            Accueil
          </Link>

          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent transition-colors">
              Services <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-1 w-72 glass-card rounded-2xl p-2 shadow-elevated"
                >
                  {services.map((s) => (
                    <Link
                      key={s.path}
                      to={s.path}
                      className="flex flex-col px-4 py-3 rounded-xl hover:bg-accent transition-colors"
                    >
                      <span className="font-display font-semibold text-sm">{s.name}</span>
                      <span className="text-xs text-muted-foreground">{s.desc}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/#about" className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent transition-colors">
            À propos
          </Link>
          <Link to="/#contact" className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent transition-colors">
            Contact
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer"
            className="gradient-go px-6 py-2.5 rounded-xl text-sm font-semibold text-primary-foreground shadow-go hover:opacity-90 transition-opacity">
            Réserver maintenant
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg hover:bg-accent">
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-card border-t overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 space-y-2">
              <Link to="/" className="block px-4 py-3 rounded-xl hover:bg-accent text-sm font-medium">Accueil</Link>
              {services.map((s) => (
                <Link key={s.path} to={s.path} className="block px-4 py-3 rounded-xl hover:bg-accent">
                  <span className="text-sm font-semibold">{s.name}</span>
                  <span className="block text-xs text-muted-foreground">{s.desc}</span>
                </Link>
              ))}
              <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer"
                className="block text-center gradient-go px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground mt-4">
                Réserver maintenant
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
