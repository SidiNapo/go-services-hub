import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Printer, Upload, Palette, ShoppingCart, MessageCircle, FileText,
  Check, ArrowRight, ArrowLeft, Package, Layers, Shirt, Flag,
  CreditCard, Image, StickyNote, X, Plus, Minus, ChevronRight
} from "lucide-react";
import Layout from "@/components/Layout";
import { SEO } from "@/components/SEO";
import AnimatedSection from "@/components/AnimatedSection";
import printHero from "@/assets/print-hero.jpg";

/* ── Product catalog ── */
const categories = [
  { id: "print", label: "Impression", icon: Printer },
  { id: "textile", label: "Textile", icon: Shirt },
  { id: "signage", label: "Signalétique", icon: Flag },
];

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  sizes: string[];
  materials: string[];
  finishes: string[];
  pricing: { qty: number; price: number }[];
}

const products: Product[] = [
  {
    id: "business-cards",
    name: "Cartes de visite",
    category: "print",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
    description: "Cartes de visite professionnelles, impression haute qualité.",
    sizes: ["85x55mm (standard)", "90x50mm", "85x85mm (carré)"],
    materials: ["Couché 350g", "Couché 400g", "Recyclé 300g", "PVC"],
    finishes: ["Mat", "Brillant", "Laminé mat", "Vernis sélectif"],
    pricing: [{ qty: 100, price: 120 }, { qty: 250, price: 220 }, { qty: 500, price: 350 }, { qty: 1000, price: 550 }],
  },
  {
    id: "flyers",
    name: "Flyers",
    category: "print",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&q=80",
    description: "Flyers publicitaires pour tous vos événements et campagnes.",
    sizes: ["A5 (148x210mm)", "A4 (210x297mm)", "DL (99x210mm)"],
    materials: ["Couché 135g", "Couché 170g", "Couché 250g"],
    finishes: ["Mat", "Brillant", "Laminé mat"],
    pricing: [{ qty: 100, price: 90 }, { qty: 500, price: 250 }, { qty: 1000, price: 400 }, { qty: 5000, price: 1200 }],
  },
  {
    id: "brochures",
    name: "Brochures",
    category: "print",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80",
    description: "Brochures pliées pour présenter vos produits et services.",
    sizes: ["A4 plié en 2", "A4 plié en 3", "A3 plié en 2"],
    materials: ["Couché 170g", "Couché 250g", "Recyclé 200g"],
    finishes: ["Mat", "Brillant", "Laminé mat"],
    pricing: [{ qty: 100, price: 350 }, { qty: 250, price: 650 }, { qty: 500, price: 1000 }, { qty: 1000, price: 1600 }],
  },
  {
    id: "stickers",
    name: "Vinyle / Stickers",
    category: "signage",
    image: "https://images.unsplash.com/photo-1635405074683-96d6921a2a68?w=600&q=80",
    description: "Stickers et vinyles adhésifs haute résistance.",
    sizes: ["5x5cm", "10x10cm", "A5", "A4", "Sur mesure"],
    materials: ["Vinyle blanc", "Vinyle transparent", "Vinyle micro-perforé"],
    finishes: ["Mat", "Brillant", "Laminé UV"],
    pricing: [{ qty: 50, price: 80 }, { qty: 100, price: 130 }, { qty: 500, price: 450 }, { qty: 1000, price: 750 }],
  },
  {
    id: "banners",
    name: "Bâches publicitaires",
    category: "signage",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
    description: "Bâches grand format pour vos événements et publicités.",
    sizes: ["1m x 2m", "2m x 3m", "3m x 5m", "Sur mesure"],
    materials: ["PVC 440g", "PVC 510g", "Mesh aéré"],
    finishes: ["Standard", "Anti-UV", "Double face"],
    pricing: [{ qty: 1, price: 250 }, { qty: 2, price: 450 }, { qty: 5, price: 1000 }, { qty: 10, price: 1800 }],
  },
  {
    id: "tshirts",
    name: "T-shirts imprimés",
    category: "textile",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    description: "T-shirts personnalisés avec votre logo ou design.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    materials: ["Coton 100%", "Coton/Polyester", "Polyester sport"],
    finishes: ["Sérigraphie", "Impression numérique", "Broderie", "Flex"],
    pricing: [{ qty: 10, price: 650 }, { qty: 25, price: 1400 }, { qty: 50, price: 2500 }, { qty: 100, price: 4500 }],
  },
  {
    id: "caps",
    name: "Casquettes avec logo",
    category: "textile",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c334e67a?w=600&q=80",
    description: "Casquettes brodées ou imprimées avec votre marque.",
    sizes: ["Taille unique ajustable", "S/M", "L/XL"],
    materials: ["Coton", "Polyester", "Coton/Polyester"],
    finishes: ["Broderie", "Impression numérique", "Patch cousu"],
    pricing: [{ qty: 10, price: 550 }, { qty: 25, price: 1200 }, { qty: 50, price: 2100 }, { qty: 100, price: 3800 }],
  },
  {
    id: "vests",
    name: "Gilets personnalisés",
    category: "textile",
    image: "https://images.unsplash.com/photo-1614786269829-d24616faf56d?w=600&q=80",
    description: "Gilets de travail ou promotionnels personnalisés.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    materials: ["Polyester", "Softshell", "Coton mélangé"],
    finishes: ["Broderie", "Sérigraphie", "Impression numérique"],
    pricing: [{ qty: 10, price: 1200 }, { qty: 25, price: 2600 }, { qty: 50, price: 4800 }, { qty: 100, price: 8500 }],
  },
];

/* ── Helpers ── */
const formatPrice = (n: number) => n.toLocaleString("fr-MA") + " MAD";

const GoPrintPage = () => {
  const [activeCategory, setActiveCategory] = useState("print");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [step, setStep] = useState(0); // 0=catalog, 1=configure, 2=design, 3=summary
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [selectedFinish, setSelectedFinish] = useState("");
  const [selectedQtyIdx, setSelectedQtyIdx] = useState(0);
  const [customQty, setCustomQty] = useState<number | null>(null);
  const [designMode, setDesignMode] = useState<"upload" | "request" | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [designDescription, setDesignDescription] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const totalSteps = 4;

  const scrollTop = () => setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);

  const selectProduct = (p: Product) => {
    setSelectedProduct(p);
    setSelectedSize(p.sizes[0]);
    setSelectedMaterial(p.materials[0]);
    setSelectedFinish(p.finishes[0]);
    setSelectedQtyIdx(0);
    setCustomQty(null);
    setDesignMode(null);
    setUploadedFile(null);
    setDesignDescription("");
    setStep(1);
    scrollTop();
  };

  const currentPricing = selectedProduct?.pricing ?? [];
  const chosenTier = currentPricing[selectedQtyIdx];
  const quantity = customQty ?? (chosenTier?.qty ?? 0);
  const unitPrice = chosenTier ? chosenTier.price / chosenTier.qty : 0;
  const totalPrice = customQty ? Math.round(unitPrice * customQty) : (chosenTier?.price ?? 0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setUploadedFile(e.target.files[0]);
  };

  const handleWhatsApp = () => {
    const p = selectedProduct!;
    const designInfo = designMode === "upload"
      ? `📎 Fichier: ${uploadedFile?.name ?? "Aucun"}`
      : `📝 Description: ${designDescription}`;
    const msg = `Bonjour, je souhaite commander via GoPrint :\n\n🖨️ Produit: ${p.name}\n📐 Taille: ${selectedSize}\n📦 Matériau: ${selectedMaterial}\n✨ Finition: ${selectedFinish}\n🔢 Quantité: ${quantity}\n💰 Prix estimé: ${formatPrice(totalPrice)}\n\n${designInfo}\n\n👤 ${name}\n📞 ${phone}`;
    window.open(`https://wa.me/212660880110?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const filteredProducts = products.filter((p) => p.category === activeCategory);

  const stepLabels = ["Produit", "Options", "Design", "Commande"];

  return (
    <Layout>
      <SEO
        title="GoPrint - Impression & Personnalisation | GO212"
        description="Donnez vie à vos idées avec GoPrint. Cartes de visite, textile, bâches publicitaires, stickers et bien plus. Impression professionnelle au Maroc."
        canonical="https://go212.ma/goprint"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "GoPrint – Impression & Personnalisation",
          "provider": { "@type": "Organization", "name": "GO212" },
        }}
      />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <img src={printHero} alt="GoPrint hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(160_20%_5%)] via-[hsl(160_20%_5%/0.6)] to-[hsl(160_20%_5%/0.3)]" />
        <div className="container mx-auto px-4 relative z-10 pt-32 pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-xs font-display font-semibold tracking-wider uppercase mb-6">
              <Printer className="h-3.5 w-3.5" /> GoPrint
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-primary-foreground leading-tight mb-4">
              Impression &<br />
              <span className="text-gradient">Personnalisation</span>
            </h1>
            <p className="text-primary-foreground/70 text-base md:text-lg max-w-lg leading-relaxed">
              Donnez vie à vos idées avec nos solutions d'impression professionnelles. Cartes de visite, textile personnalisé, supports publicitaires et bien plus.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ MAIN CONTENT ═══ */}
      <div ref={topRef} className="scroll-mt-24" />
      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* Progress bar (when configuring) */}
          {step > 0 && (
            <div className="flex items-center justify-center gap-2 mb-12">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-display font-bold text-xs sm:text-sm transition-colors ${
                    step >= s ? "gradient-go text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {step > s ? <Check className="h-4 w-4" /> : s}
                  </div>
                  {s < 4 && <div className={`w-6 sm:w-8 h-0.5 transition-colors ${step > s ? "bg-primary" : "bg-muted"}`} />}
                </div>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* ── STEP 0: CATALOG ── */}
            {step === 0 && (
              <motion.div key="catalog" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <div className="text-center mb-10">
                  <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">Notre Catalogue</h2>
                  <p className="text-muted-foreground max-w-lg mx-auto">Choisissez un produit pour commencer la personnalisation.</p>
                </div>

                {/* Category tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveCategory(c.id)}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-display text-sm font-semibold transition-all ${
                        activeCategory === c.id
                          ? "gradient-go text-primary-foreground shadow-go"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <c.icon className="h-4 w-4" />
                      {c.label}
                    </button>
                  ))}
                </div>

                {/* Product grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredProducts.map((p, i) => (
                    <motion.button
                      key={p.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={() => selectProduct(p)}
                      className="group glass-card rounded-2xl overflow-hidden text-left hover:border-primary/40 hover:shadow-go transition-all"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-display font-bold text-sm sm:text-base mb-1">{p.name}</h3>
                        <p className="text-[11px] sm:text-xs text-muted-foreground line-clamp-2 mb-3">{p.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-primary">À partir de {formatPrice(p.pricing[0].price)}</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── STEP 1: CONFIGURE ── */}
            {step === 1 && selectedProduct && (
              <motion.div key="configure" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <button onClick={() => setStep(0)} className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1">
                  <ArrowLeft className="h-3.5 w-3.5" /> Retour au catalogue
                </button>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Product image */}
                  <div className="rounded-2xl overflow-hidden aspect-square">
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Configuration */}
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2">{selectedProduct.name}</h2>
                    <p className="text-muted-foreground text-sm mb-6">{selectedProduct.description}</p>

                    {/* Size */}
                    <div className="mb-5">
                      <label className="font-display font-semibold text-sm mb-2 block">📐 Taille</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizes.map((s) => (
                          <button key={s} onClick={() => setSelectedSize(s)}
                            className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                              selectedSize === s ? "gradient-go text-primary-foreground shadow-go" : "bg-muted text-foreground hover:bg-accent"
                            }`}>{s}</button>
                        ))}
                      </div>
                    </div>

                    {/* Material */}
                    <div className="mb-5">
                      <label className="font-display font-semibold text-sm mb-2 block">📦 Matériau</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.materials.map((m) => (
                          <button key={m} onClick={() => setSelectedMaterial(m)}
                            className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                              selectedMaterial === m ? "gradient-go text-primary-foreground shadow-go" : "bg-muted text-foreground hover:bg-accent"
                            }`}>{m}</button>
                        ))}
                      </div>
                    </div>

                    {/* Finish */}
                    <div className="mb-5">
                      <label className="font-display font-semibold text-sm mb-2 block">✨ Finition</label>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.finishes.map((f) => (
                          <button key={f} onClick={() => setSelectedFinish(f)}
                            className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                              selectedFinish === f ? "gradient-go text-primary-foreground shadow-go" : "bg-muted text-foreground hover:bg-accent"
                            }`}>{f}</button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="mb-6">
                      <label className="font-display font-semibold text-sm mb-2 block">🔢 Quantité</label>
                      <div className="flex flex-wrap gap-2">
                        {currentPricing.map((t, i) => (
                          <button key={i} onClick={() => { setSelectedQtyIdx(i); setCustomQty(null); }}
                            className={`px-4 py-3 rounded-xl text-center transition-all ${
                              selectedQtyIdx === i && !customQty ? "gradient-go text-primary-foreground shadow-go" : "bg-muted text-foreground hover:bg-accent"
                            }`}>
                            <div className="font-display font-bold text-sm">{t.qty}</div>
                            <div className="text-[10px] opacity-70">{formatPrice(t.price)}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price display */}
                    <div className="glass-card rounded-2xl p-5 mb-6">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">Prix unitaire</span>
                        <span className="font-display font-semibold text-sm">{unitPrice > 0 ? formatPrice(Math.round(unitPrice * 100) / 100) : "—"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">Prix total</span>
                        <span className="font-display font-bold text-xl text-primary">{formatPrice(totalPrice)}</span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { setStep(2); scrollTop(); }}
                      className="w-full py-3.5 rounded-xl gradient-go text-primary-foreground font-display font-semibold text-sm shadow-go inline-flex items-center justify-center gap-2"
                    >
                      Continuer <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: DESIGN ── */}
            {step === 2 && (
              <motion.div key="design" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <button onClick={() => setStep(1)} className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1">
                  <ArrowLeft className="h-3.5 w-3.5" /> Retour aux options
                </button>

                <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-8">Votre design</h2>

                <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
                  {/* Upload */}
                  <button
                    onClick={() => setDesignMode("upload")}
                    className={`glass-card rounded-2xl p-6 text-center hover:border-primary/40 transition-all ${
                      designMode === "upload" ? "border-primary ring-2 ring-primary/20" : ""
                    }`}
                  >
                    <div className="w-14 h-14 rounded-2xl gradient-go flex items-center justify-center mx-auto mb-4">
                      <Upload className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-display font-bold mb-1">J'ai mon design</h3>
                    <p className="text-xs text-muted-foreground">Importez votre fichier PDF, PNG, AI, PSD ou JPG</p>
                  </button>

                  {/* Request */}
                  <button
                    onClick={() => setDesignMode("request")}
                    className={`glass-card rounded-2xl p-6 text-center hover:border-primary/40 transition-all ${
                      designMode === "request" ? "border-primary ring-2 ring-primary/20" : ""
                    }`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
                      <Palette className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <h3 className="font-display font-bold mb-1">Créez mon design</h3>
                    <p className="text-xs text-muted-foreground">Décrivez votre projet, on s'occupe du reste</p>
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {designMode === "upload" && (
                    <motion.div key="upload-form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-md mx-auto">
                      <input ref={fileRef} type="file" accept=".pdf,.png,.jpg,.jpeg,.ai,.psd" onChange={handleFileChange} className="hidden" />
                      <button
                        onClick={() => fileRef.current?.click()}
                        className="w-full glass-card rounded-2xl border-dashed border-2 border-border hover:border-primary/40 p-10 text-center transition-all"
                      >
                        {uploadedFile ? (
                          <div className="flex items-center justify-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            <span className="font-display font-semibold text-sm">{uploadedFile.name}</span>
                            <button onClick={(e) => { e.stopPropagation(); setUploadedFile(null); }} className="p-1 rounded-full hover:bg-muted">
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                            <p className="font-display font-semibold text-sm mb-1">Cliquez pour importer</p>
                            <p className="text-[11px] text-muted-foreground">PDF, PNG, JPG, AI, PSD</p>
                          </>
                        )}
                      </button>
                    </motion.div>
                  )}

                  {designMode === "request" && (
                    <motion.div key="request-form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-md mx-auto">
                      <textarea
                        value={designDescription}
                        onChange={(e) => setDesignDescription(e.target.value)}
                        placeholder="Décrivez ce que vous souhaitez imprimer. Ex: Une carte de visite moderne avec mon logo et mes coordonnées..."
                        rows={4}
                        className="w-full rounded-2xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      />
                      <p className="text-[11px] text-muted-foreground mt-2">Vous pouvez aussi joindre un logo ou des images via WhatsApp après la commande.</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {designMode && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { setStep(3); scrollTop(); }}
                      className="w-full py-3.5 rounded-xl gradient-go text-primary-foreground font-display font-semibold text-sm shadow-go inline-flex items-center justify-center gap-2"
                    >
                      Continuer <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* ── STEP 3: SUMMARY & ORDER ── */}
            {step === 3 && selectedProduct && (
              <motion.div key="summary" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <button onClick={() => setStep(2)} className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1">
                  <ArrowLeft className="h-3.5 w-3.5" /> Retour
                </button>

                <h2 className="font-display text-2xl sm:text-3xl font-bold text-center mb-8">Récapitulatif</h2>

                <div className="max-w-lg mx-auto">
                  {/* Order summary card */}
                  <div className="glass-card rounded-2xl p-6 mb-6 space-y-3">
                    <div className="flex items-center gap-4 mb-4">
                      <img src={selectedProduct.image} alt="" className="w-16 h-16 rounded-xl object-cover" />
                      <div>
                        <h3 className="font-display font-bold">{selectedProduct.name}</h3>
                        <p className="text-xs text-muted-foreground">Quantité: {quantity}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-muted-foreground">Taille</span><span className="font-medium">{selectedSize}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Matériau</span><span className="font-medium">{selectedMaterial}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Finition</span><span className="font-medium">{selectedFinish}</span></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Design</span><span className="font-medium">{designMode === "upload" ? "Fichier importé" : "Conception demandée"}</span></div>
                      <div className="border-t border-border pt-2 mt-2 flex justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="font-display font-bold text-lg text-primary">{formatPrice(totalPrice)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Contact info */}
                  <div className="space-y-3 mb-6">
                    <input
                      type="text"
                      placeholder="Votre nom complet"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-12 rounded-xl border border-input bg-background px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <input
                      type="tel"
                      placeholder="Numéro de téléphone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-12 rounded-xl border border-input bg-background px-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  {/* Action buttons */}
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleWhatsApp}
                      disabled={!name.trim() || !phone.trim()}
                      className="w-full py-3.5 rounded-xl gradient-go text-primary-foreground font-display font-semibold text-sm shadow-go inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <MessageCircle className="h-4 w-4" /> Commander via WhatsApp
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleWhatsApp}
                      disabled={!name.trim() || !phone.trim()}
                      className="w-full py-3.5 rounded-xl border border-border bg-background font-display font-semibold text-sm inline-flex items-center justify-center gap-2 hover:bg-accent transition-colors disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <FileText className="h-4 w-4" /> Demander un devis
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </AnimatedSection>
    </Layout>
  );
};

export default GoPrintPage;
