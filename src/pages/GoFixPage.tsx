import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wrench, ArrowRight, Check, Zap, Droplets, Paintbrush, Settings, Phone, Shield, Clock, MapPin, User, Calendar, ChevronLeft, Navigation, Camera, ImagePlus, X, Loader2 } from "lucide-react";
import { locateUser } from "@/lib/geolocation";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import fixHero from "@/assets/fix-hero.jpg";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const servicesData = [
  { icon: Droplets, title: "Plomberie", emoji: "🔧", items: ["Réparation fuites", "Débouchage canalisations", "Installation sanitaire", "Chauffe-eau"] },
  { icon: Zap, title: "Électricité", emoji: "⚡", items: ["Pannes électriques", "Installation prises/interrupteurs", "Tableau électrique", "Éclairage"] },
  { icon: Paintbrush, title: "Peinture & Finitions", emoji: "🎨", items: ["Peinture intérieure", "Retouches murales", "Pose de papier peint", "Enduit"] },
  { icon: Settings, title: "Maintenance générale", emoji: "🔩", items: ["Montage de meubles", "Serrurerie", "Menuiserie", "Petits travaux divers"] },
];

type ProblemType = "plomberie" | "electricite" | "mobilier" | "autre";

const problemTypes: { id: ProblemType; label: string; icon: typeof Wrench; emoji: string }[] = [
  { id: "plomberie", label: "Plomberie", icon: Droplets, emoji: "🔧" },
  { id: "electricite", label: "Électricité", icon: Zap, emoji: "⚡" },
  { id: "mobilier", label: "Mobilier", icon: Settings, emoji: "🪑" },
  { id: "autre", label: "Autre", icon: Wrench, emoji: "🔩" },
];

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00",
];

const GoFixPage = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Step 1: Problem
  const [problemType, setProblemType] = useState<ProblemType | null>(null);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Step 2: Location
  const [city, setCity] = useState("Casablanca");
  const [address, setAddress] = useState("");
  const [accessInstructions, setAccessInstructions] = useState("");
  const [locating, setLocating] = useState(false);

  // Step 3: Date & Time
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState("");

  // Step 4: Personal info
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [locationCoords, setLocationCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openModal = () => { setStep(1); setOpen(true); };

  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
  const MAX_SIZE = 10 * 1024 * 1024;

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast({ title: "Format non supporté", description: "Utilisez JPG, PNG ou WebP.", variant: "destructive" });
      return;
    }
    if (file.size > MAX_SIZE) {
      toast({ title: "Fichier trop volumineux", description: "Maximum 10 MB.", variant: "destructive" });
      return;
    }
    setPhoto(file);
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const removePhoto = () => { setPhoto(null); setPhotoPreview(null); };

  const handleLocateMe = async () => {
    setLocating(true);
    try {
      const result = await locateUser();
      if (result) {
        setLocationCoords({ lat: result.lat, lng: result.lng });
        setAddress(result.address);
      }
    } finally {
      setLocating(false);
    }
  };

  const canNext = () => {
    switch (step) {
      case 1: return !!problemType && description.trim().length > 0;
      case 2: return address.trim().length > 0;
      case 3: return !!date && !!hour;
      case 4: return name.trim().length > 0 && phone.trim().length > 0;
      default: return false;
    }
  };

  const buildMessage = () => {
    const typeLabel = problemTypes.find(p => p.id === problemType)?.label ?? "";
    const mapsLink = locationCoords
      ? `\nLocalisation: https://www.google.com/maps?q=${locationCoords.lat},${locationCoords.lng}`
      : "";
    const lines = [
      "Demande d'intervention GoFix",
      "---",
      `Type: ${typeLabel}`,
      `Probleme: ${description}`,
      "",
      `Ville: ${city}`,
      `Adresse: ${address}${mapsLink}`,
      accessInstructions ? `Acces: ${accessInstructions}` : "",
      "",
      `Date: ${date ? format(date, "dd/MM/yyyy") : ""}`,
      `Heure: ${hour}`,
      "",
      `Nom: ${name}`,
      `Tel: ${phone}`,
      notes ? `Notes: ${notes}` : "",
    ].filter(Boolean);
    return lines.join("\n");
  };

  const handleConfirm = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const WA_NUMBER = "212660880110";

    try {
      let photoUrl: string | null = null;

      // Upload photo to cloud if present
      if (photo) {
        const formData = new FormData();
        formData.append("repair_type", problemType || "");
        formData.append("description", description);
        formData.append("city", city);
        formData.append("address", address);
        formData.append("preferred_date", date ? format(date, "dd/MM/yyyy") : "");
        formData.append("preferred_time", hour);
        formData.append("client_name", name);
        formData.append("client_phone", phone);
        formData.append("photo", photo);

        const { data, error } = await supabase.functions.invoke("send-gofix-request", {
          body: formData,
        });

        if (error) throw error;
        photoUrl = data?.photo_url;
      } else {
        // No photo — still save to DB via edge function
        const formData = new FormData();
        formData.append("repair_type", problemType || "");
        formData.append("description", description);
        formData.append("city", city);
        formData.append("address", address);
        formData.append("preferred_date", date ? format(date, "dd/MM/yyyy") : "");
        formData.append("preferred_time", hour);
        formData.append("client_name", name);
        formData.append("client_phone", phone);

        await supabase.functions.invoke("send-gofix-request", { body: formData });
      }

      // Build WhatsApp message with photo URL included
      let msg = buildMessage();
      if (photoUrl) {
        msg += `\n\n📸 Photo du problème:\n${photoUrl}`;
      }

      const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, "_blank");

      toast({
        title: "Demande envoyée ✓",
        description: "Votre demande a été enregistrée. WhatsApp s'ouvre avec les détails.",
      });

      setOpen(false);
    } catch (err: any) {
      console.error("GoFix submit error:", err);
      toast({
        title: "Erreur d'envoi",
        description: "Impossible d'envoyer la demande. Réessayez.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepLabels = ["Problème", "Adresse", "Date", "Infos"];

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
        <motion.div className="absolute inset-0" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}>
          <img src={fixHero} alt="GoFix" className="w-full h-full object-cover" loading="eager" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(160_20%_5%/0.6)] via-[hsl(160_20%_8%/0.4)] to-[hsl(160_20%_5%/0.85)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(160_20%_5%/0.5)] via-transparent to-transparent" />

        <div className="absolute top-[15%] right-[10%] w-72 h-72 rounded-full bg-primary/10 blur-[100px] opacity-40" />
        <div className="absolute bottom-[20%] left-[5%] w-56 h-56 rounded-full bg-primary/8 blur-[80px] opacity-30" />

        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, hsl(var(--primary-foreground)) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="container mx-auto px-4 relative z-10 pt-24">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/15 border border-primary/20 text-primary-foreground text-sm font-medium mb-8">
              <Wrench className="h-4 w-4" />
              Services techniques à domicile
            </motion.div>

            <div className="overflow-hidden mb-3">
              <motion.h1 initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
                className="font-display text-4xl sm:text-6xl md:text-8xl font-bold text-primary-foreground leading-[0.85] tracking-tight">
                Services
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h1 initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.35 }}
                className="font-display text-4xl sm:text-6xl md:text-8xl font-bold leading-[0.85] tracking-tight">
                <span className="text-gradient">techniques</span>{" "}
                <span className="text-primary-foreground/60 font-light">pro</span>
              </motion.h1>
            </div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base md:text-xl text-primary-foreground/70 max-w-xl mb-10 leading-relaxed">
              Plomberie, électricité, réparations et maintenance générale. On répare tout ce dont votre maison a besoin.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <motion.button onClick={openModal} whileTap={{ scale: 0.95 }}
                className="gradient-go px-8 py-4 rounded-2xl font-display font-semibold text-primary-foreground shadow-go inline-flex items-center gap-3 text-base">
                <span>Demander une intervention</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>

              <div className="flex items-center gap-6 px-6 py-4 rounded-2xl bg-black/40 border border-white/20 shadow-lg">
                <div className="text-center">
                  <div className="font-display text-2xl font-bold text-white drop-shadow-md">24h</div>
                  <div className="text-xs text-white/90 uppercase tracking-wider font-medium">Intervention</div>
                </div>
                <div className="w-px h-8 bg-white/40" />
                <div className="text-center">
                  <div className="font-display text-2xl font-bold text-white drop-shadow-md">30min</div>
                  <div className="text-xs text-white/90 uppercase tracking-wider font-medium">Devis gratuit</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Services grid */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/20 to-background" />
        <div className="absolute top-20 left-[10%] w-80 h-80 rounded-full bg-primary/5 blur-[120px] opacity-40" />
        <div className="absolute bottom-20 right-[10%] w-60 h-60 rounded-full bg-primary/8 blur-[100px] opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
              <Wrench className="h-3.5 w-3.5" /> Nos expertises
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Tous les métiers<br className="hidden sm:block" /> du <span className="text-gradient">bâtiment</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
            {servicesData.map((s, i) => (
              <motion.div key={s.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className={cn(
                  "group relative rounded-3xl p-7 md:p-9 transition-all duration-500 cursor-default overflow-hidden border",
                  i === 0 ? "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 hover:border-primary/40 hover:shadow-go" :
                  "glass-card border-border/50 hover:border-primary/30 hover:shadow-go"
                )}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 via-transparent to-primary/3" />
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-primary/8 to-transparent" />
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="relative w-14 h-14">
                      <div className="absolute inset-0 rounded-2xl gradient-go opacity-20 group-hover:opacity-30 transition-opacity group-hover:scale-110 duration-500" />
                      <div className="relative w-14 h-14 rounded-2xl bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center transition-all duration-300">
                        <s.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-xl md:text-2xl group-hover:text-primary transition-colors duration-300">{s.title}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {s.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors">
                        <div className="flex-shrink-0 w-5 h-5 rounded-md bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-go" />
        <div className="absolute top-10 left-[20%] w-48 h-48 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-10 right-[10%] w-32 h-32 rounded-full bg-white/5 blur-2xl" />
        
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
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group text-center rounded-3xl bg-white/15 border border-white/20 p-6 md:p-8 transition-colors duration-300 hover:bg-white/20 cursor-default">
                <span className="text-3xl md:text-4xl block mb-4">{s.emoji}</span>
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
                className="group glass-card p-6 md:p-8 rounded-3xl text-center hover:shadow-go transition-all duration-300 relative overflow-hidden cursor-default">
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
      <section className="py-10 md:py-14 relative overflow-hidden">
        <div className="absolute inset-0 gradient-go" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <h3 className="font-display text-xl md:text-2xl font-bold text-primary-foreground text-center sm:text-left">
              Un problème ? GoFix s'en occupe
            </h3>
            <motion.button onClick={openModal} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl font-display font-semibold bg-primary-foreground text-primary hover:opacity-90 transition-opacity inline-flex items-center gap-2 text-sm shadow-elevated whitespace-nowrap">
              Demander une intervention <ArrowRight className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── Reservation Modal ─────────────────────────── */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 rounded-3xl border-border/50 gap-0">
          <DialogTitle className="sr-only">Demander une intervention GoFix</DialogTitle>

          {/* Header with progress */}
          <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border/50 p-4 md:p-6 pb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" />
                <span className="font-display font-bold text-lg">GoFix</span>
              </div>
              <span className="text-sm text-muted-foreground">Étape {step}/{totalSteps}</span>
            </div>
            <div className="flex items-center gap-1">
              {stepLabels.map((label, i) => (
                <div key={label} className="flex-1 flex flex-col items-center gap-1">
                  <div className={cn(
                    "w-full h-1.5 rounded-full transition-all duration-300",
                    step > i + 1 ? "bg-primary" : step === i + 1 ? "bg-primary/60" : "bg-muted"
                  )} />
                  <span className={cn(
                    "text-[10px] font-medium transition-colors",
                    step >= i + 1 ? "text-primary" : "text-muted-foreground"
                  )}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 md:p-6">
            <AnimatePresence mode="wait">
              {/* Step 1: Describe problem */}
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                  <h3 className="font-display text-xl font-bold mb-1">Décrivez votre problème</h3>
                  <p className="text-sm text-muted-foreground mb-5">Quel type d'intervention avez-vous besoin ?</p>

                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 block">Type de problème *</label>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {problemTypes.map(p => (
                      <button key={p.id} onClick={() => setProblemType(p.id)}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200",
                          problemType === p.id
                            ? "border-primary bg-primary/5 shadow-go"
                            : "border-border hover:border-primary/30 hover:bg-muted/30"
                        )}>
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                          problemType === p.id ? "bg-primary/20" : "bg-muted"
                        )}>
                          <p.icon className={cn("h-5 w-5", problemType === p.id ? "text-primary" : "text-muted-foreground")} />
                        </div>
                        <span className="font-display font-semibold text-sm">{p.label}</span>
                      </button>
                    ))}
                  </div>

                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Décrivez votre problème *</label>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Ex: Fuite d'eau sous l'évier de la cuisine, le joint semble usé..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none mb-5"
                  />

                  {/* Photo upload */}
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Ajouter une photo du problème</label>
                  <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handlePhotoChange} />

                  {photoPreview ? (
                    <div className="relative rounded-2xl overflow-hidden border border-border bg-muted/30 group">
                      <img src={photoPreview} alt="Photo du problème" className="w-full h-48 object-cover" />
                      <button onClick={removePhoto}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm px-3 py-2">
                        <span className="text-xs text-white/90">{photo?.name}</span>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => fileRef.current?.click()}
                      className="w-full border-2 border-dashed border-border hover:border-primary/40 rounded-2xl p-8 flex flex-col items-center gap-3 text-center transition-all hover:bg-muted/20 group">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center transition-colors">
                        <ImagePlus className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-foreground">Touchez pour ajouter une photo</span>
                        <span className="block text-xs text-muted-foreground mt-0.5">JPG, PNG · Max 10 MB</span>
                      </div>
                    </button>
                  )}
                </motion.div>
              )}

              {/* Step 2: Location */}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                  <h3 className="font-display text-xl font-bold mb-1">Localisation</h3>
                  <p className="text-sm text-muted-foreground mb-5">Où devons-nous intervenir ?</p>

                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Ville</label>
                  <div className="flex gap-2 mb-5">
                    {[
                      { name: "Casablanca", active: true },
                      { name: "Rabat", active: false },
                      { name: "Marrakech", active: false },
                    ].map(c => (
                      <button key={c.name} type="button" disabled={!c.active}
                        onClick={() => c.active && setCity(c.name)}
                        className={cn(
                          "flex-1 py-3 rounded-xl text-sm font-semibold transition-all",
                          c.active && city === c.name
                            ? "border-2 border-primary bg-primary/5 text-foreground"
                            : c.active
                              ? "border border-border text-foreground hover:border-primary/30"
                              : "border border-border bg-muted/30 text-muted-foreground opacity-60 cursor-not-allowed"
                        )}>
                        {c.name}
                        {!c.active && <span className="block text-[10px] text-primary/60 font-medium mt-0.5">Bientôt</span>}
                      </button>
                    ))}
                  </div>

                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Adresse complète *</label>
                  <div className="relative mb-2">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input value={address} onChange={e => setAddress(e.target.value)}
                      placeholder="Ex: 123 Rue Mohammed V, Maarif"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                  </div>
                  <button type="button" onClick={handleLocateMe} disabled={locating}
                    className="inline-flex items-center gap-2 text-xs font-medium text-primary hover:text-primary/80 transition-colors mb-5">
                    <Navigation className={cn("h-3.5 w-3.5", locating && "animate-spin")} />
                    {locating ? "Localisation en cours..." : "📍 Me localiser automatiquement"}
                  </button>

                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Instructions d'accès (optionnel)</label>
                  <textarea value={accessInstructions} onChange={e => setAccessInstructions(e.target.value)}
                    placeholder="Code d'entrée, étage, numéro d'appartement..."
                    rows={2} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none" />
                </motion.div>
              )}

              {/* Step 3: Date & Time */}
              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                  <h3 className="font-display text-xl font-bold mb-1">Date & Heure</h3>
                  <p className="text-sm text-muted-foreground mb-5">Quand souhaitez-vous l'intervention ?</p>

                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Date souhaitée *</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-sm transition-all mb-5",
                        date ? "border-primary bg-primary/5" : "border-input hover:border-primary/30"
                      )}>
                        <Calendar className="h-4 w-4 text-primary" />
                        {date ? format(date, "EEEE d MMMM yyyy", { locale: fr }) : "Sélectionner une date"}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarUI mode="single" selected={date} onSelect={setDate}
                        disabled={(d) => d < new Date()}
                        className={cn("p-3 pointer-events-auto")} />
                    </PopoverContent>
                  </Popover>

                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Heure souhaitée *</label>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {timeSlots.map(t => (
                      <button key={t} onClick={() => setHour(t)}
                        className={cn(
                          "py-2 rounded-lg text-xs font-medium transition-all",
                          hour === t
                            ? "gradient-go text-primary-foreground shadow-go"
                            : "border border-border hover:border-primary/30 text-foreground"
                        )}>{t}</button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Personal info */}
              {step === 4 && (
                <motion.div key="s4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                  <h3 className="font-display text-xl font-bold mb-1">Vos informations</h3>
                  <p className="text-sm text-muted-foreground mb-5">Pour vous contacter et confirmer l'intervention</p>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Nom complet *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input value={name} onChange={e => setName(e.target.value)} placeholder="Votre nom"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Téléphone *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="06 XX XX XX XX" type="tel"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Notes (optionnel)</label>
                      <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Instructions spéciales..."
                        rows={2} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none" />
                    </div>

                    {/* Summary */}
                    <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 p-5 mt-3 space-y-4">
                      <h4 className="font-display font-bold text-base flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" /> Récapitulatif
                      </h4>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
                        <div>
                          <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Type</span>
                          <p className="font-medium mt-0.5">{problemTypes.find(p => p.id === problemType)?.label}</p>
                        </div>
                        <div>
                          <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Ville</span>
                          <p className="font-medium mt-0.5">{city}</p>
                        </div>
                        <div>
                          <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Date</span>
                          <p className="font-medium mt-0.5">{date ? format(date, "dd MMM yyyy", { locale: fr }) : "-"}</p>
                        </div>
                        <div>
                          <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">Heure</span>
                          <p className="font-medium mt-0.5">{hour}</p>
                        </div>
                      </div>

                      {/* Photo preview in summary */}
                      {photoPreview && (
                        <div className="rounded-xl overflow-hidden border border-border/50 relative">
                          <img src={photoPreview} alt="Photo jointe" className="w-full h-32 object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute bottom-2 left-3 right-3 flex items-center gap-2">
                            <Camera className="h-3.5 w-3.5 text-white/90" />
                            <span className="text-xs text-white/90 font-medium truncate">{photo?.name}</span>
                          </div>
                        </div>
                      )}

                      {/* Cloud upload info */}
                      {photo && (
                        <div className="rounded-xl bg-primary/10 border border-primary/20 px-4 py-3 flex items-start gap-3">
                          <Camera className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-foreground/80 leading-relaxed">
                            La photo sera uploadée automatiquement et incluse comme lien dans le message WhatsApp. Aucune action manuelle nécessaire.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer navigation */}
          <div className="sticky bottom-0 bg-background/95 backdrop-blur-md border-t border-border/50 p-4 md:p-6 pt-4 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="h-4 w-4" /> Retour
              </button>
            ) : <div />}

            {step < totalSteps ? (
              <button onClick={() => canNext() && setStep(step + 1)} disabled={!canNext()}
                className={cn(
                  "gradient-go px-6 py-3 rounded-xl font-display font-semibold text-sm text-primary-foreground inline-flex items-center gap-2 transition-all",
                  !canNext() && "opacity-40 cursor-not-allowed"
                )}>
                Suivant <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={handleConfirm} disabled={!canNext() || isSubmitting}
                className={cn(
                  "gradient-go px-6 py-3 rounded-xl font-display font-semibold text-sm text-primary-foreground inline-flex items-center gap-2 transition-all",
                  (!canNext() || isSubmitting) && "opacity-40 cursor-not-allowed"
                )}>
                {isSubmitting ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Envoi...</>
                ) : (
                  <>Confirmer via WhatsApp <ArrowRight className="h-4 w-4" /></>
                )}
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default GoFixPage;
