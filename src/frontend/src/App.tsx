import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  CheckCircle2,
  ChevronRight,
  Mail,
  MapPin,
  Menu,
  Phone,
  RotateCcw,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SiFacebook, SiInstagram } from "react-icons/si";
import { toast } from "sonner";

type EventType = "Wedding" | "Corporate" | "Birthday" | "Prom" | "Other";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Booths", href: "#booths" },
  { label: "Gallery", href: "#portfolio" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const booths = [
  {
    name: "Classic Booth",
    image: "/assets/generated/classic-booth-open-air.dim_800x600.jpg",
    icon: Camera,
    description: "The timeless photo booth experience your guests will love.",
    features: [
      "Unlimited Prints",
      "Standard Props Package",
      "Digital Copies",
      "Professional Setup",
      "Friendly Attendant",
    ],
    badge: "Popular",
  },
  {
    name: "Mirror Booth",
    image: "/assets/generated/mirror-booth.dim_800x600.jpg",
    icon: Sparkles,
    description: "Full-length glam meets interactive touch-screen magic.",
    features: [
      "Full-Length Mirror Display",
      "Interactive Touch Screen",
      "Animated GIFs",
      "Unlimited Prints",
      "Premium Props",
    ],
    badge: "Luxury",
  },
  {
    name: "360 Video Booth",
    image: "/assets/generated/360-booth.dim_800x600.jpg",
    icon: RotateCcw,
    description: "Cinematic slow-motion video moments from every angle.",
    features: [
      "360° Slow-Motion Video",
      "Instant Digital Sharing",
      "Custom Overlay/Branding",
      "LED Ring Light",
      "Dedicated Attendant",
    ],
    badge: "Premium",
  },
];

const pricingData = [
  {
    name: "Classic Booth",
    tiers: [
      { duration: "3 Hours", price: "$797" },
      { duration: "4 Hours", price: "$997" },
    ],
    popular: false,
    included: [
      "Props Package Included",
      "Unlimited Prints",
      "Digital Copies",
      "Friendly Attendant",
      "Professional Setup & Delivery",
    ],
  },
  {
    name: "Mirror Booth",
    tiers: [
      { duration: "3 Hours", price: "$997" },
      { duration: "4 Hours", price: "$1,197" },
    ],
    popular: true,
    included: [
      "Premium Props Package Included",
      "Unlimited Prints",
      "Animated GIFs",
      "Interactive Touch Screen",
      "Professional Setup & Delivery",
    ],
  },
  {
    name: "360 Video Booth",
    tiers: [
      { duration: "2 Hours", price: "$650" },
      { duration: "3 Hours", price: "$997" },
      { duration: "4 Hours", price: "$1,197" },
    ],
    popular: false,
    included: [
      "Props Package Included",
      "360° Slow-Motion Video",
      "Instant Digital Sharing",
      "Custom Overlay/Branding",
      "LED Ring Light",
    ],
  },
];

const testimonials = [
  {
    quote:
      "Quad City Photo Booth made our wedding reception absolutely unforgettable! Every guest took home a beautiful keepsake.",
    author: "Sarah & Mike T.",
    event: "Wedding Reception",
  },
  {
    quote:
      "We booked the 360 Booth for our company gala and it was a massive hit. Professional, fun, and the custom branding looked amazing.",
    author: "Jennifer R.",
    event: "Corporate Gala",
  },
  {
    quote:
      "The Mirror Booth was the highlight of our birthday party. Everyone was obsessed with the animations and prints!",
    author: "Marcus L.",
    event: "Birthday Party",
  },
];

const portfolioStats = [
  { number: "500+", label: "Events Served" },
  { number: "5-Star", label: "Average Rating" },
  { number: "3+", label: "Booth Types" },
  { number: "100%", label: "Satisfaction" },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    eventDate: "",
    guests: "",
    eventType: "" as EventType | "",
    message: "",
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.eventType) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const subject = encodeURIComponent(`Photo Booth Inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nEvent Date: ${form.eventDate || "Not specified"}\nEvent Type: ${form.eventType}\nEstimated Guests: ${form.guests || "Not specified"}\nMessage: ${form.message || "No message provided"}`,
    );
    window.location.href = `mailto:kevin@qcphotobooth.com?subject=${subject}&body=${body}`;
    toast.success("Opening your email client to send your inquiry!");
    setForm({
      name: "",
      email: "",
      eventDate: "",
      guests: "",
      eventType: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Toaster />

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
        data-ocid="header.panel"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            type="button"
            className="flex items-center gap-2 cursor-pointer bg-transparent border-none outline-none p-0"
            onClick={() => handleNavClick("#hero")}
            data-ocid="nav.link"
          >
            <img
              src="/assets/uploads/quadcity-green-1.png"
              alt="Quad City Booth Logo"
              className="h-10 w-auto"
            />
          </button>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-6"
            data-ocid="nav.panel"
          >
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
                data-ocid="nav.link"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              className="hidden md:flex bg-accent hover:bg-accent/90 text-accent-foreground rounded-full"
              onClick={() => handleNavClick("#contact")}
              data-ocid="nav.primary_button"
            >
              Book Now
            </Button>
            <button
              type="button"
              className="md:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-ocid="nav.toggle"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white/98 backdrop-blur-md border-b overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    type="button"
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left text-sm font-medium py-2 text-foreground/70 hover:text-foreground transition-colors"
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </button>
                ))}
                <Button
                  className="bg-accent text-accent-foreground rounded-full w-full"
                  onClick={() => handleNavClick("#contact")}
                  data-ocid="nav.primary_button"
                >
                  Book Now
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <img
          src="/assets/generated/hero-booth.dim_1400x800.jpg"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-background/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-white/90 text-sm">
              <Sparkles className="w-4 h-4" />
              Quad Cities Premier Photo Booth Rental
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Capture Every
              <span className="block bg-gradient-to-r from-yellow-300 to-lime-300 bg-clip-text text-transparent">
                Perfect Moment
              </span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Professional photo booth rentals for weddings, corporate events,
              birthday parties, and more across the Quad Cities area.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mb-14">
              <Button
                size="lg"
                className="bg-white text-foreground hover:bg-white/90 rounded-full font-semibold px-8"
                onClick={() => handleNavClick("#booths")}
                data-ocid="hero.primary_button"
              >
                View Our Booths
              </Button>
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-semibold px-8"
                onClick={() => handleNavClick("#contact")}
                data-ocid="hero.secondary_button"
              >
                Get a Quote
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { number: "4+", label: "Years Experience" },
                { number: "500+", label: "Events Served" },
                { number: "3", label: "Booth Types" },
                { number: "5-Star", label: "Rating" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-background/20 backdrop-blur-sm rounded-xl px-4 py-3 text-white text-center"
                >
                  <div className="text-2xl font-display font-bold">
                    {stat.number}
                  </div>
                  <div className="text-xs text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booth Types */}
      <section id="booths" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold mb-4">
              Our Photo Booth Collection
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Three unique booth experiences to make your event unforgettable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {booths.map((booth, i) => (
              <motion.div
                key={booth.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="overflow-hidden h-full flex flex-col shadow-card hover:shadow-card-hover transition-shadow">
                  <div className="relative">
                    <img
                      src={booth.image}
                      alt={booth.name}
                      className="h-48 w-full object-cover"
                    />
                    <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
                      {booth.badge}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                      <booth.icon className="w-5 h-5 text-accent" />
                    </div>
                    <CardTitle className="font-display">{booth.name}</CardTitle>
                    <CardDescription>{booth.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      {booth.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-full"
                      onClick={() => handleNavClick("#contact")}
                      data-ocid={`booths.primary_button.${i + 1}`}
                    >
                      Book This Booth
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio / Gallery */}
      <section id="portfolio" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold mb-4">
              Our Work & Happy Clients
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Real moments from real events across the Quad Cities.
            </p>
          </motion.div>

          {/* Top two-column */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-96 rounded-2xl overflow-hidden"
            >
              <img
                src="/assets/generated/portfolio-events.dim_800x600.jpg"
                alt="Events"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-display font-bold">
                  Creating Memories
                </h3>
                <p className="text-white/80 text-sm mt-1">
                  Every event is a story worth telling
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {portfolioStats.map((stat) => (
                <Card
                  key={stat.label}
                  className="flex flex-col items-center justify-center p-6 text-center shadow-card"
                >
                  <div className="text-3xl font-display font-bold text-foreground mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </Card>
              ))}
            </motion.div>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="h-full shadow-card">
                  <CardContent className="pt-6">
                    <div className="flex gap-1 mb-3">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <Star className="w-4 h-4 fill-accent text-accent" />
                    </div>
                    <p className="text-sm text-foreground/80 mb-4 italic">
                      "{t.quote}"
                    </p>
                    <div>
                      <div className="font-semibold text-sm">{t.author}</div>
                      <div className="text-xs text-muted-foreground">
                        {t.event}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              No hidden fees. Choose the booth and hours that fit your event.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingData.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card
                  className={`h-full flex flex-col shadow-card ${
                    pkg.popular ? "ring-2 ring-accent" : ""
                  }`}
                >
                  <CardHeader>
                    {pkg.popular && (
                      <Badge className="w-fit bg-accent text-accent-foreground mb-2">
                        Most Popular
                      </Badge>
                    )}
                    <CardTitle className="font-display">{pkg.name}</CardTitle>
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Starting at{" "}
                      </span>
                      <span className="text-3xl font-display font-bold text-foreground">
                        {pkg.tiers[0].price}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3 mb-5">
                      {pkg.tiers.map((tier) => (
                        <li
                          key={tier.duration}
                          className="flex justify-between items-center text-sm border-b pb-2 last:border-0"
                        >
                          <span className="text-muted-foreground">
                            {tier.duration}
                          </span>
                          <span className="font-semibold">{tier.price}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-2 mb-4">
                      {pkg.included.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-muted-foreground">
                      All packages include delivery, professional setup, and a
                      dedicated attendant.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full rounded-full bg-accent hover:bg-accent/90 text-accent-foreground"
                      onClick={() => handleNavClick("#contact")}
                      data-ocid={`pricing.primary_button.${i + 1}`}
                    >
                      Book Now
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold mb-4">
              Get In Touch
            </h2>
            <p className="text-muted-foreground text-lg">
              Ready to make your event unforgettable? Contact us today!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="font-display">
                    Send an Inquiry
                  </CardTitle>
                  <CardDescription>
                    Fill out the form and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    data-ocid="contact.panel"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          placeholder="Your name"
                          required
                          data-ocid="contact.input"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          placeholder="your@email.com"
                          required
                          data-ocid="contact.input"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="eventDate">Event Date</Label>
                        <Input
                          id="eventDate"
                          type="date"
                          value={form.eventDate}
                          onChange={(e) =>
                            setForm({ ...form, eventDate: e.target.value })
                          }
                          data-ocid="contact.input"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="guests">Est. Guests</Label>
                        <Input
                          id="guests"
                          type="number"
                          value={form.guests}
                          onChange={(e) =>
                            setForm({ ...form, guests: e.target.value })
                          }
                          placeholder="100"
                          min="1"
                          data-ocid="contact.input"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label>Event Type *</Label>
                      <Select
                        value={form.eventType}
                        onValueChange={(v) =>
                          setForm({ ...form, eventType: v as EventType })
                        }
                      >
                        <SelectTrigger data-ocid="contact.select">
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Wedding">Wedding</SelectItem>
                          <SelectItem value="Corporate">Corporate</SelectItem>
                          <SelectItem value="Birthday">
                            Birthday Party
                          </SelectItem>
                          <SelectItem value="Prom">
                            Prom / School Event
                          </SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        placeholder="Tell us about your event..."
                        rows={4}
                        data-ocid="contact.textarea"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full rounded-full bg-accent hover:bg-accent/90 text-accent-foreground"
                      data-ocid="contact.submit_button"
                    >
                      Send Inquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-6"
            >
              <div>
                <h3 className="text-2xl font-display font-bold mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <a
                    href="tel:5635083418"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-muted-foreground">563-508-3418</div>
                    </div>
                  </a>
                  <a
                    href="mailto:kevin@qcphotobooth.com"
                    className="flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-muted-foreground">
                        kevin@qcphotobooth.com
                      </div>
                    </div>
                  </a>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <div className="font-semibold">Location</div>
                      <div className="text-muted-foreground">
                        Bettendorf, Iowa
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Follow Us</h4>
                <div className="flex gap-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                    data-ocid="contact.link"
                  >
                    <SiFacebook className="w-5 h-5" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                    data-ocid="contact.link"
                  >
                    <SiInstagram className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <Card className="bg-accent text-accent-foreground shadow-glow">
                <CardContent className="pt-6">
                  <h4 className="font-display font-bold text-lg mb-2">
                    Ready to Book?
                  </h4>
                  <p className="text-accent-foreground/80 text-sm mb-4">
                    Contact us today to check availability for your event date.
                    We book up fast!
                  </p>
                  <Button
                    variant="secondary"
                    className="rounded-full w-full font-semibold"
                    onClick={() => window.scrollTo({ top: 0 })}
                    data-ocid="contact.secondary_button"
                  >
                    Call Now: 563-508-3418
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img
                  src="/assets/uploads/quadcity-green-1.png"
                  alt="Quad City Booth Logo"
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Creating unforgettable memories across the Quad Cities.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  data-ocid="footer.link"
                >
                  <SiFacebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  data-ocid="footer.link"
                >
                  <SiInstagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      type="button"
                      onClick={() => handleNavClick(link.href)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                      data-ocid="footer.link"
                    >
                      <ChevronRight className="w-3 h-3" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Booths */}
            <div>
              <h4 className="font-semibold mb-4">Our Booths</h4>
              <ul className="space-y-2">
                {booths.map((b) => (
                  <li key={b.name}>
                    <button
                      type="button"
                      onClick={() => handleNavClick("#booths")}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                      data-ocid="footer.link"
                    >
                      <ChevronRight className="w-3 h-3" />
                      {b.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  563-508-3418
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  kevin@qcphotobooth.com
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  Bettendorf, Iowa
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-muted-foreground">
            <span>
              © {new Date().getFullYear()} Quad City Photo Booth. All rights
              reserved.
            </span>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Built with ❤️ using caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
