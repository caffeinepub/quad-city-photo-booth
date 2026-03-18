import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Camera,
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  Palette,
  PartyPopper,
  Phone,
  Settings,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SiFacebook, SiInstagram } from "react-icons/si";
import { toast } from "sonner";
import { EventType, useSubmitInquiry } from "./hooks/useQueries";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
];

const HOW_IT_WORKS = [
  {
    icon: <Camera className="w-8 h-8" />,
    step: "01",
    title: "Book Your Date",
    desc: "Choose your event date and package online or give us a call.",
  },
  {
    icon: <Palette className="w-8 h-8" />,
    step: "02",
    title: "Design Your Prints",
    desc: "Pick templates, colors, and custom branding for your event.",
  },
  {
    icon: <Settings className="w-8 h-8" />,
    step: "03",
    title: "We Set Up & Host",
    desc: "Our team arrives early, sets up, and stays to keep things running smoothly.",
  },
  {
    icon: <PartyPopper className="w-8 h-8" />,
    step: "04",
    title: "Have Fun & Get Photos",
    desc: "Guests take unlimited photos and walk away with printed keepsakes.",
  },
];

const PACKAGES = [
  {
    name: "Classic Booth",
    price: "$797",
    duration: "3 Hours",
    features: [
      "Unlimited Prints",
      "Standard Props Package",
      "Digital Copies",
      "Professional Setup",
      "Friendly Attendant",
    ],
    featured: false,
  },
  {
    name: "Premium Booth",
    price: "$997",
    duration: "4 Hours",
    features: [
      "Unlimited Prints",
      "Custom Backdrop",
      "Online Digital Gallery",
      "Premium Props",
      "Dedicated Attendant",
      "Guest Book",
    ],
    featured: true,
  },
  {
    name: "Deluxe Experience",
    price: "$999",
    duration: "5 Hours",
    features: [
      "Unlimited Prints",
      "360° Booth Option",
      "Custom Branding",
      "Luxury Props",
      "Two Attendants",
      "Digital Gallery + USB",
      "Same-Day Preview",
    ],
    featured: false,
  },
  {
    name: "Mirror Booth",
    price: "$997",
    duration: "3 Hours",
    features: [
      "Unlimited Prints",
      "Standard Props Package",
      "Digital Copies",
      "Professional Setup",
      "Friendly Attendant",
    ],
    featured: false,
  },
  {
    name: "Mirror Booth",
    price: "$1197",
    duration: "4 Hours",
    features: [
      "Unlimited Prints",
      "Custom Backdrop",
      "Online Digital Gallery",
      "Premium Props",
      "Dedicated Attendant",
      "Guest Book",
    ],
    featured: false,
  },
  {
    name: "360 Video Booth",
    price: "$650",
    duration: "2 Hours",
    features: [
      "360° Slow-Motion Video",
      "Instant Digital Sharing",
      "Professional Setup",
      "Friendly Attendant",
    ],
    featured: false,
  },
  {
    name: "360 Video Booth",
    price: "$997",
    duration: "3 Hours",
    features: [
      "360° Slow-Motion Video",
      "Instant Digital Sharing",
      "Custom Overlay/Branding",
      "Professional Setup",
      "Dedicated Attendant",
    ],
    featured: false,
  },
  {
    name: "360 Video Booth",
    price: "$1,197",
    duration: "4 Hours",
    features: [
      "360° Slow-Motion Video",
      "Instant Digital Sharing",
      "Custom Overlay/Branding",
      "Premium LED Ring Light",
      "Dedicated Attendant",
      "Online Gallery",
    ],
    featured: false,
  },
];

const GALLERY = [
  {
    src: "/assets/generated/gallery-wedding.dim_400x300.jpg",
    label: "Weddings",
  },
  {
    src: "/assets/generated/gallery-birthday.dim_400x300.jpg",
    label: "Birthdays",
  },
  {
    src: "/assets/generated/gallery-gala.dim_400x300.jpg",
    label: "Corporate & Galas",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Quad City Photo Booth made our wedding reception absolutely unforgettable! Every guest took home a beautiful keepsake and the attendant was so helpful all night.",
    author: "Sarah & Mike T.",
    event: "Wedding Reception",
  },
  {
    quote:
      "We booked the Deluxe Experience for our company gala and it was a huge hit. Professional, fun, and the custom branding made our brand look amazing.",
    author: "Jennifer R.",
    event: "Corporate Gala",
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    eventDate: "",
    eventType: "" as EventType | "",
    guests: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const submitInquiry = useSubmitInquiry();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.eventType) return;
    try {
      await submitInquiry.mutateAsync({
        name: formData.name,
        email: formData.email,
        eventDate: formData.eventDate,
        eventType: formData.eventType as EventType,
        guests: Number.parseInt(formData.guests) || 0,
        message: formData.message,
      });
      setSubmitted(true);
      toast.success("Inquiry sent! We'll be in touch within 24 hours.");
    } catch {
      toast.error("Failed to send inquiry. Please try again.");
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Toaster />

      {/* ── STICKY HEADER ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-white/95 shadow-sm"
        }`}
        data-ocid="header.panel"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("home")}
            className="flex items-center gap-2 group"
            data-ocid="nav.home_link"
          >
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow">
              <Camera className="w-5 h-5 text-yellow-400" />
            </div>
            <span className="font-bold text-primary text-sm sm:text-base leading-tight hidden sm:block">
              Quad City
              <br />
              <span className="text-accent font-extrabold tracking-wide">
                Photo Booth
              </span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-6"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.label}
                onClick={() => scrollTo(link.href.slice(1))}
                className="text-sm font-semibold text-foreground hover:text-accent transition-colors uppercase tracking-wide"
                data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "-")}_link`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Book Now CTA */}
          <div className="flex items-center gap-3">
            <Button
              onClick={() => scrollTo("contact")}
              className="hidden sm:flex bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest rounded-full px-6 py-2 text-sm shadow transition-all"
              data-ocid="nav.book_now_button"
            >
              Book Now
            </Button>
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-primary"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              data-ocid="nav.hamburger_button"
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="lg:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-3"
              data-ocid="nav.mobile_panel"
            >
              {NAV_LINKS.map((link) => (
                <button
                  type="button"
                  key={link.label}
                  onClick={() => scrollTo(link.href.slice(1))}
                  className="text-left text-base font-semibold text-foreground hover:text-accent py-2 uppercase tracking-wide"
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => scrollTo("contact")}
                className="bg-primary text-white rounded-full font-bold uppercase tracking-widest mt-2"
              >
                Book Now
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ── */}
      <section
        id="home"
        className="relative h-[100svh] min-h-[600px] flex items-center justify-center overflow-hidden"
        data-ocid="hero.section"
      >
        <img
          src="/assets/generated/hero-booth.dim_1400x800.jpg"
          alt="Event celebration at venue"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/70 to-accent/60" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-yellow-300 font-bold uppercase tracking-[0.3em] text-sm mb-4"
          >
            Quad Cities Premier Photo Booth Rental
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none mb-6"
          >
            Capture Your
            <br />
            <span className="text-yellow-300">Perfect Moment</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white/85 text-lg sm:text-xl max-w-2xl mx-auto mb-10 font-medium"
          >
            Premium Photo Booth Rentals for Weddings, Parties &amp; Events in
            the Quad Cities
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => scrollTo("services")}
              className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest px-8 py-3 text-base rounded-full shadow-lg transition-all"
              data-ocid="hero.view_packages_button"
            >
              View Packages
            </Button>
            <Button
              onClick={() => scrollTo("contact")}
              className="bg-accent hover:bg-accent/90 text-white font-bold uppercase tracking-widest px-8 py-3 text-base rounded-full shadow-lg transition-all"
              data-ocid="hero.get_quote_button"
            >
              Get a Quote
            </Button>
          </motion.div>
        </div>
        <button
          type="button"
          onClick={() => scrollTo("how-it-works")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-yellow-300 transition-colors animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section
        id="how-it-works"
        className="py-20 bg-white"
        data-ocid="how_it_works.section"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-accent font-bold uppercase tracking-[0.25em] text-sm mb-3">
              Simple Process
            </p>
            <h2 className="text-4xl sm:text-5xl font-black uppercase text-primary tracking-tight">
              How It Works
            </h2>
            <div className="w-16 h-1 bg-yellow-400 rounded-full mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="flex flex-col items-center text-center group"
                data-ocid={`how_it_works.item.${i + 1}`}
              >
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:bg-primary transition-colors shadow-md">
                  <div className="text-primary group-hover:text-yellow-300 transition-colors">
                    {step.icon}
                  </div>
                </div>
                <span className="text-yellow-500 font-black text-3xl mb-2">
                  {step.step}
                </span>
                <h3 className="font-bold text-primary uppercase tracking-wide text-base mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES & PACKAGES ── */}
      <section
        id="services"
        className="py-20 bg-muted"
        data-ocid="services.section"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-accent font-bold uppercase tracking-[0.25em] text-sm mb-3">
              Choose Your Package
            </p>
            <h2 className="text-4xl sm:text-5xl font-black uppercase text-primary tracking-tight">
              Services & Packages
            </h2>
            <div className="w-16 h-1 bg-yellow-400 rounded-full mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PACKAGES.map((pkg, i) => (
              <motion.div
                key={`${pkg.name}-${i}`}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className={`relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-all flex flex-col ${
                  pkg.featured ? "ring-2 ring-yellow-400 scale-105" : ""
                }`}
                data-ocid={`services.item.${i + 1}`}
              >
                {pkg.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-primary font-black uppercase tracking-widest text-xs px-5 py-1.5 rounded-full shadow">
                    Most Popular
                  </div>
                )}
                <div
                  className={`rounded-t-2xl px-8 py-8 ${pkg.featured ? "bg-primary" : "bg-muted"}`}
                >
                  <h3
                    className={`font-black uppercase tracking-wide text-xl mb-1 ${pkg.featured ? "text-yellow-300" : "text-primary"}`}
                  >
                    {pkg.name}
                  </h3>
                  <p
                    className={`text-sm font-semibold mb-3 ${pkg.featured ? "text-white/70" : "text-muted-foreground"}`}
                  >
                    {pkg.duration}
                  </p>
                  <div
                    className={`text-4xl font-black ${pkg.featured ? "text-white" : "text-primary"}`}
                  >
                    {pkg.price}
                    <span
                      className={`text-base font-medium ml-1 ${pkg.featured ? "text-white/60" : "text-muted-foreground"}`}
                    >
                      starting at
                    </span>
                  </div>
                </div>
                <div className="px-8 py-6 flex-1 flex flex-col">
                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-3 text-sm text-foreground"
                      >
                        <Star className="w-4 h-4 text-yellow-400 flex-shrink-0 fill-yellow-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => scrollTo("contact")}
                    className={`w-full font-bold uppercase tracking-widest rounded-full py-3 transition-all ${
                      pkg.featured
                        ? "bg-yellow-400 hover:bg-yellow-400/90 text-primary"
                        : "bg-primary hover:bg-primary/90 text-white"
                    }`}
                    data-ocid={`services.book_now_button.${i + 1}`}
                  >
                    Book Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section
        id="gallery"
        className="py-20 bg-white"
        data-ocid="gallery.section"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-accent font-bold uppercase tracking-[0.25em] text-sm mb-3">
              Our Work
            </p>
            <h2 className="text-4xl sm:text-5xl font-black uppercase text-primary tracking-tight">
              Our Gallery
            </h2>
            <div className="w-16 h-1 bg-yellow-400 rounded-full mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {GALLERY.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-md cursor-pointer"
                data-ocid={`gallery.item.${i + 1}`}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-white font-bold uppercase tracking-widest text-sm">
                    {item.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / BOOKING ── */}
      <section
        id="contact"
        className="py-20 bg-muted"
        data-ocid="contact.section"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-accent font-bold uppercase tracking-[0.25em] text-sm mb-3">
              Get In Touch
            </p>
            <h2 className="text-4xl sm:text-5xl font-black uppercase text-primary tracking-tight">
              Ready to Book?
            </h2>
            <div className="w-16 h-1 bg-yellow-400 rounded-full mx-auto mt-4" />
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Fill out the form below and our team will be in touch within 24
              hours to confirm your booking.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Testimonials */}
            <div
              className="flex flex-col gap-6"
              data-ocid="contact.testimonials_panel"
            >
              <h3 className="font-black text-primary uppercase tracking-widest text-sm mb-2">
                What Our Clients Say
              </h3>
              {TESTIMONIALS.map((t) => (
                <motion.div
                  key={t.author}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                  className="bg-white rounded-2xl p-6 shadow-md"
                  data-ocid="contact.testimonial.1"
                >
                  <div className="flex gap-1 mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </div>
                  <p className="text-foreground text-sm leading-relaxed italic mb-4">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-bold text-primary text-sm">{t.author}</p>
                    <p className="text-muted-foreground text-xs">{t.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-1" data-ocid="contact.form_panel">
              <div className="bg-white rounded-2xl shadow-md p-8">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                      data-ocid="contact.success_state"
                    >
                      <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <PartyPopper className="w-8 h-8 text-accent" />
                      </div>
                      <h3 className="font-black text-primary text-xl uppercase mb-2">
                        Inquiry Received!
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Thank you! We'll reach out within 24 hours to discuss
                        your event.
                      </p>
                      <Button
                        onClick={() => setSubmitted(false)}
                        className="mt-6 bg-primary text-white rounded-full font-bold uppercase tracking-widest"
                      >
                        Submit Another
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                      data-ocid="contact.inquiry_form"
                    >
                      <h3 className="font-black text-primary uppercase tracking-wide text-lg mb-6">
                        Send an Inquiry
                      </h3>
                      <div className="space-y-1">
                        <Label
                          htmlFor="name"
                          className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                        >
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          required
                          placeholder="Jane Smith"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((p) => ({ ...p, name: e.target.value }))
                          }
                          data-ocid="contact.name_input"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="email"
                          className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                        >
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          placeholder="jane@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              email: e.target.value,
                            }))
                          }
                          data-ocid="contact.email_input"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <Label
                            htmlFor="eventDate"
                            className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                          >
                            Event Date
                          </Label>
                          <Input
                            id="eventDate"
                            type="date"
                            required
                            value={formData.eventDate}
                            onChange={(e) =>
                              setFormData((p) => ({
                                ...p,
                                eventDate: e.target.value,
                              }))
                            }
                            data-ocid="contact.event_date_input"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label
                            htmlFor="guests"
                            className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                          >
                            Est. Guests
                          </Label>
                          <Input
                            id="guests"
                            type="number"
                            min="1"
                            placeholder="100"
                            value={formData.guests}
                            onChange={(e) =>
                              setFormData((p) => ({
                                ...p,
                                guests: e.target.value,
                              }))
                            }
                            data-ocid="contact.guests_input"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          Event Type
                        </Label>
                        <Select
                          value={formData.eventType}
                          onValueChange={(v) =>
                            setFormData((p) => ({
                              ...p,
                              eventType: v as EventType,
                            }))
                          }
                        >
                          <SelectTrigger data-ocid="contact.event_type_select">
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={EventType.wedding}>
                              Wedding
                            </SelectItem>
                            <SelectItem value={EventType.birthday}>
                              Birthday
                            </SelectItem>
                            <SelectItem value={EventType.corporate}>
                              Corporate
                            </SelectItem>
                            <SelectItem value={EventType.festival}>
                              Festival
                            </SelectItem>
                            <SelectItem value={EventType.other}>
                              Other
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="message"
                          className="text-xs font-bold uppercase tracking-widest text-muted-foreground"
                        >
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your event..."
                          rows={3}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              message: e.target.value,
                            }))
                          }
                          data-ocid="contact.message_textarea"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={submitInquiry.isPending}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-full py-3 text-sm transition-all"
                        data-ocid="contact.submit_button"
                      >
                        {submitInquiry.isPending
                          ? "Sending..."
                          : "Send Inquiry"}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-6" data-ocid="contact.info_panel">
              <h3 className="font-black text-primary uppercase tracking-widest text-sm mb-2">
                Contact Information
              </h3>
              <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
                      Phone
                    </p>
                    <a
                      href="tel:+15635083418"
                      className="font-bold text-primary hover:text-accent transition-colors"
                    >
                      (563) 508-3418
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
                      Email
                    </p>
                    <a
                      href="mailto:Kevin@qcphotobooth.com"
                      className="font-bold text-primary hover:text-accent transition-colors text-sm"
                    >
                      Kevin@qcphotobooth.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-0.5">
                      Location
                    </p>
                    <p className="font-bold text-primary">Bettendorf, Iowa</p>
                    <p className="text-sm text-muted-foreground">
                      Serving the Quad Cities Area
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-primary rounded-2xl p-6 text-white">
                <p className="font-black uppercase tracking-widest text-yellow-300 text-xs mb-3">
                  Service Area
                </p>
                <p className="font-bold text-lg mb-1">Quad Cities</p>
                <p className="text-white/70 text-sm">
                  Davenport &bull; Bettendorf &bull; Rock Island &bull; Moline
                </p>
                <p className="text-white/50 text-xs mt-3">
                  And surrounding areas in Iowa & Illinois
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-primary text-white" data-ocid="footer.section">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <p className="font-black text-white text-sm leading-tight">
                    Quad City
                  </p>
                  <p className="font-black text-yellow-300 text-sm">
                    Photo Booth
                  </p>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-5">
                Creating unforgettable memories for events across the Quad
                Cities since 2018.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-yellow-400 transition-colors flex items-center justify-center"
                  aria-label="Facebook"
                  data-ocid="footer.facebook_link"
                >
                  <SiFacebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-yellow-400 transition-colors flex items-center justify-center"
                  aria-label="Instagram"
                  data-ocid="footer.instagram_link"
                >
                  <SiInstagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-black uppercase tracking-widest text-yellow-300 text-xs mb-5">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link.href.slice(1))}
                      className="text-white/60 hover:text-white text-sm transition-colors"
                      data-ocid={`footer.${link.label.toLowerCase().replace(/\s+/g, "-")}_link`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-black uppercase tracking-widest text-yellow-300 text-xs mb-5">
                Services
              </h4>
              <ul className="space-y-2.5">
                {PACKAGES.map((pkg) => (
                  <li key={pkg.name}>
                    <button
                      type="button"
                      onClick={() => scrollTo("services")}
                      className="text-white/60 hover:text-white text-sm transition-colors text-left"
                    >
                      {pkg.name}
                    </button>
                  </li>
                ))}
                <li>
                  <span className="text-white/60 text-sm">
                    360° Video Booth
                  </span>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-black uppercase tracking-widest text-yellow-300 text-xs mb-5">
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-yellow-300 mt-0.5 flex-shrink-0" />
                  <a
                    href="tel:+15635083418"
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    (563) 508-3418
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-yellow-300 mt-0.5 flex-shrink-0" />
                  <a
                    href="mailto:Kevin@qcphotobooth.com"
                    className="text-white/70 hover:text-white text-sm transition-colors break-all"
                  >
                    Kevin@qcphotobooth.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-yellow-300 mt-0.5 flex-shrink-0" />
                  <span className="text-white/70 text-sm">
                    Bettendorf, Iowa
                    <br />
                    Quad Cities Area
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-white/40 text-xs">
              &copy; {new Date().getFullYear()} Quad City Photo Booth. All
              rights reserved.
            </p>
            <p className="text-white/40 text-xs">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white/70 underline transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
