/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'motion/react';
import logo from './logo.webp';
import image01 from './image01.webp';
import image02 from './image02.webp';
import image03 from './image03.webp';
import image04 from './image04.webp';
import { 
  ArrowRight, 
  Gavel, 
  MapPin, 
  Mail, 
  Phone,
  Instagram, 
  Menu,
  X,
  MessageCircle
} from 'lucide-react';

// --- Types ---
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

// --- Components ---

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#C9A96E] origin-left z-[130]"
      style={{ scaleX }}
    />
  );
};

const ParallaxText = ({ text, yOffset = 100, className = "" }: { text: string, yOffset?: number, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, yOffset]);

  return (
    <div ref={ref} className={`absolute pointer-events-none select-none z-0 overflow-hidden ${className}`}>
      <motion.span 
        style={{ y }}
        className="block font-serif text-[20vw] leading-none text-white opacity-[0.02] whitespace-nowrap tracking-tighter"
      >
        {text}
      </motion.span>
    </div>
  );
};

const Reveal = ({ 
  children, 
  delay = 0, 
  direction = "up", 
  distance = 30,
  duration = 1.4,
  threshold = 0.1
}: { 
  children: React.ReactNode, 
  delay?: number, 
  direction?: "up" | "down" | "left" | "right" | "none",
  distance?: number,
  duration?: number,
  threshold?: number,
  key?: React.Key
}) => {
  const variants = {
    hidden: { 
      opacity: 0, 
      x: direction === "left" ? -distance : direction === "right" ? distance : 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0 
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={variants}
      className="will-change-[transform,opacity]"
      transition={{ 
        duration, 
        delay, 
        ease: [0.22, 1, 0.36, 1] 
      }}
    >
      {children}
    </motion.div>
  );
};

const ProgressiveImage = ({ 
  src, 
  alt, 
  className = "", 
  imgClassName = "",
  priority = false 
}: { 
  src: string; 
  alt: string; 
  className?: string; 
  imgClassName?: string;
  priority?: boolean;
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        onLoad={() => setIsLoaded(true)}
        loading={priority ? "eager" : "lazy"}
        className={`w-full h-full object-cover ${imgClassName}`}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse" />
      )}
    </div>
  );
};

const Section = ({ children, className = "", id }: SectionProps) => (
  <section id={id} className={`w-full py-16 md:py-24 lg:py-32 px-5 sm:px-8 md:px-12 lg:px-24 overflow-hidden ${className}`}>
    <div className="max-w-7xl mx-auto">
      {children}
    </div>
  </section>
);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0D0D0D] py-3 md:py-6 border-b border-white/5">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-8 md:px-12 flex justify-between items-center gap-4">
        <a href="#inicio" className="flex items-center gap-2 sm:gap-4 cursor-pointer group shrink min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 relative overflow-hidden flex items-center justify-center shrink-0">
            <img 
              src={logo} 
              alt="SG" 
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <span className="font-serif text-sm sm:text-base md:text-xl tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#C9A96E] group-hover:text-white transition-colors truncate">Siran Gomes</span>
        </a>

        <div className="hidden lg:flex items-center gap-8 xl:gap-12 shrink-0">
          {[
            { label: 'Manifesto', href: '#manifesto' },
            { label: 'Credenciais', href: '#credenciais' },
            { label: 'Atuação', href: '#atuacao' },
            { label: 'Trajetória', href: '#trajetoria' }
          ].map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              className="text-[10px] uppercase tracking-[0.3em] text-white/60 hover:text-[#C9A96E] transition-colors whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
          <a href="#contato" className="px-6 py-2 border border-[#C9A96E] text-[#C9A96E] text-[10px] uppercase tracking-widest hover:bg-[#C9A96E] hover:text-black transition-all whitespace-nowrap">
            Contato
          </a>
        </div>

        <button 
          className="lg:hidden text-white p-2 z-[60] cursor-pointer active:scale-95 transition-transform shrink-0" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#0D0D0D] z-[55] flex flex-col items-center justify-center gap-12 p-8"
          >
            <div className="flex flex-col items-center gap-6">
              {[
                { label: 'Manifesto', href: '#manifesto' },
                { label: 'Credenciais', href: '#credenciais' },
                { label: 'Atuação', href: '#atuacao' },
                { label: 'Trajetória', href: '#trajetoria' },
                { label: 'Contato', href: '#contato' }
              ].map((item, idx) => (
                <motion.a 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (idx * 0.05) }}
                  key={item.label} 
                  href={item.href} 
                  className="text-3xl font-serif text-white hover:text-[#C9A96E] transition-colors text-center cursor-pointer active:scale-95"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="inicio" ref={containerRef} className="relative w-full h-screen min-h-[700px] overflow-hidden flex items-center bg-[#0D0D0D]">
      {/* Integrated Background Image */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {/* Gradients for seamless blending */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/80 to-transparent z-10 w-full lg:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-transparent to-transparent z-10 h-32" />
        
        <div className="absolute right-0 top-0 w-full lg:w-2/3 h-full">
          <ProgressiveImage 
            src={image01} 
            alt="Siran Gomes Professional Portrait"
            className="w-full h-full"
            imgClassName="object-[center_15%] lg:object-[45%_15%] opacity-40 lg:opacity-60 grayscale-[20%]"
            priority={true}
          />
          {/* Subtle radial mask to soften the image edges further */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,transparent_0%,#0D0D0D_85%)] opacity-60 lg:opacity-40" />
        </div>
      </motion.div>

      <div className="relative z-20 w-full px-5 sm:px-12 lg:px-24">
        <div className="max-w-[1800px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <span className="inline-block text-[#C9A96E] text-[9px] sm:text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.5em] mb-4 sm:mb-6">
              Advogado • OAB/AL 17.534
            </span>
            <h1 className="text-[2.8rem] leading-[1.15] tracking-tight xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif md:leading-[0.95] lg:leading-[0.9] mb-6 sm:mb-8">
              Siran Gomes <br />
              <span className="italic text-white/40 tracking-normal">Advocacia.</span>
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-white/60 max-w-xl font-light leading-relaxed mb-10 md:mb-12 pr-4">
              Uma trajetória forjada na defesa das garantias fundamentais e na excelência técnica jurídica em Santana do Ipanema/AL.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/5582981880052"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-[#C9A96E] text-black text-center font-semibold text-[10px] uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
              >
                Agendar Consulta
              </motion.a>
              <motion.a 
                whileHover={{ opacity: 0.8 }}
                href="#manifesto"
                className="flex items-center gap-3 text-[10px] uppercase tracking-widest border-b border-white/20 pb-2 ml-1 sm:ml-0 group cursor-pointer"
              >
                Leia o Manifesto
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Manifesto = () => {
  return (
    <Section id="manifesto" className="bg-[#001B2A] relative overflow-hidden">
      {/* Integrated Background Image (Image 02) */}
      <div className="absolute top-0 left-0 w-full lg:w-1/2 h-full z-0 pointer-events-none">
        <ProgressiveImage 
          src={image02} 
          alt="Siran Gomes Manifesto" 
          className="w-full h-full"
          imgClassName="object-[center_15%] opacity-30 lg:opacity-50"
        />
        {/* Dissolution/Decomposition Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#001B2A]/40 to-[#001B2A] z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001B2A] via-transparent to-[#001B2A]/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#001B2A] via-transparent to-transparent z-10 h-24" />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
        <div className="lg:col-start-5 lg:col-span-8">
          <Reveal>
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-serif leading-tight mb-8 md:mb-12">
              "O Direito não é apenas um conjunto de regras, é a <span className="text-[#C9A96E] italic">arquitetura da liberdade</span>."
            </h2>
          </Reveal>
          
          <Reveal delay={0.4} distance={20}>
            <div className="space-y-6 md:space-y-8 text-sm sm:text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-2xl">
              <p>
                Bacharel em Direito pelo CESMAC, minha trajetória reúne atuação jurídica, conciliação, gestão pública e participação institucional ativa na OAB.
              </p>
              <p>
                Minha atuação é pautada pelo rigor acadêmico e pela sensibilidade humana, transformando litígios complexos em soluções institucionais seguras para Santana do Ipanema e região.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};

const Credentials = () => {
  const credentials = [
    {
      title: "Direitos Humanos",
      role: "Presidente",
      org: "OAB Santana do Ipanema",
      desc: "Liderança institucional na defesa das garantias constitucionais e fiscalização institucional."
    },
    {
      title: "Justiça Federal",
      role: "Conciliador",
      org: "JFAL",
      desc: "Resolução de conflitos federais de alta complexidade e mediação estratégica."
    },
    {
      title: "Trabalho & Previdência",
      role: "Especialista",
      org: "CESMAC",
      desc: "Foco em reestruturação trabalhista e planejamento previdenciário de alto nível."
    },
    {
      title: "Direito Constitucional",
      role: "Especialista",
      org: "Legale",
      desc: "Análise de teses supremas e controle de constitucionalidade aplicada."
    }
  ];

  return (
    <Section id="credenciais">
      <div className="mb-12 sm:mb-16 md:mb-24">
        <Reveal>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-serif">Credenciais</h2>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 sm:gap-y-16 md:gap-y-24">
        {credentials.map((cred, idx) => (
          <Reveal key={idx} delay={idx * 0.2} direction="up" distance={25} threshold={0.2}>
            <div className="group">
              <div className="flex items-baseline gap-4 sm:gap-6 mb-4 sm:mb-6 cursor-default">
                <span className="text-4xl sm:text-5xl font-serif text-white/10 group-hover:text-[#C9A96E]/20 transition-colors">0{idx + 1}</span>
                <h3 className="text-2xl sm:text-3xl font-serif group-hover:text-[#C9A96E] transition-colors">{cred.title}</h3>
              </div>
              <div className="pl-12 sm:pl-16">
                <div className="flex items-center gap-2 text-[#C9A96E] text-[9px] sm:text-[10px] uppercase tracking-widest mb-3 sm:mb-4">
                  <span>{cred.role}</span>
                  <span className="w-3 sm:w-4 h-[1px] bg-[#C9A96E]/30" />
                  <span className="text-white/40">{cred.org}</span>
                </div>
                <p className="text-white/60 font-light leading-relaxed text-sm sm:text-base">
                  {cred.desc}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

const PracticeArea = () => {
  const areas = [
    {
      title: "Direito Previdenciário",
      img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200",
      desc: "Orientação, análise e atuação jurídica responsável."
    },
    {
      title: "Direito do Trabalho",
      img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200",
      desc: "Atuação em relações laborais e defesa de direitos do trabalhador."
    },
    {
      title: "Direito Civil",
      img: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=1200",
      desc: "Resolução de conflitos civis com foco em responsabilidade."
    }
  ];

  return (
    <section id="atuacao" className="w-full relative overflow-hidden">
      <ParallaxText text="INTEGRIDADE" yOffset={-100} className="top-10 -left-10 opacity-[0.01]" />
      <ParallaxText text="CLAREZA" yOffset={100} className="bottom-20 -right-10 opacity-[0.01]" />
      
      {areas.map((area, idx) => (
        <a 
          key={idx} 
          href="#contato"
          className="relative h-[45vh] sm:h-[55vh] min-h-[350px] sm:min-h-[450px] group overflow-hidden border-b border-white/5 block cursor-pointer"
        >
          <div className="absolute inset-0 bg-[#0D0D0D]/50 group-hover:bg-[#0D0D0D]/30 transition-all duration-700 z-10" />
          <img 
            src={area.img} 
            alt={area.title} 
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 sm:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
          />
          
          <div className="relative z-20 h-full flex flex-col justify-end p-6 sm:p-12 md:p-16">
            <div className="max-w-2xl">
              <Reveal>
                <h3 className="text-3xl sm:text-5xl md:text-6xl font-serif mb-3 sm:mb-5">{area.title}</h3>
                <p className="text-sm sm:text-base md:text-lg text-white/80 font-light max-w-sm lg:translate-y-10 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-500">
                  {area.desc}
                </p>
              </Reveal>
            </div>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 right-6 sm:right-12 md:right-24 z-20 hidden xs:block group-hover:translate-x-2 transition-transform">
            <ArrowRight size={48} className="text-white/20 group-hover:text-[#C9A96E] transition-colors -rotate-45" />
          </div>
        </a>
      ))}
    </section>
  );
};

const Trajectory = () => {
  const events = [
    { year: "Atual", title: "Presidente CDH", desc: "Presidente da Comissão de Direitos Humanos da OAB - Santana do Ipanema." },
    { year: "Pública", title: "Gestão Jurídica", desc: "Experiência como conciliador federal e diretor jurídico." },
    { year: "Especialista", title: "Teses Supremas", desc: "Pós-graduação em Direito Constitucional, Trabalho e Previdenciário." },
    { year: "Formação", title: "CESMAC", desc: "Bacharel em Direito com foco em participação institucional." }
  ];

  return (
    <Section id="trajetoria" className="relative overflow-hidden">
      {/* Integrated Background Image (Image 03) */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-0 pointer-events-none overflow-hidden">
        <ProgressiveImage 
          src={image03} 
          alt="" 
          className="w-full h-full"
          imgClassName="object-cover object-[center_20%] opacity-[0.15] grayscale brightness-[0.3]"
        />
        {/* Dissolution/Decomposition Gradients */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0D0D0D]/60 to-[#0D0D0D] z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-[#0D0D0D]/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-transparent to-transparent z-10 h-32" />
      </div>

      <ParallaxText text="JUSTIÇA" yOffset={-150} className="top-0 -right-20 opacity-[0.01]" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
        <div className="lg:col-span-4 mb-8 sm:mb-12 lg:mb-0">
          <Reveal>
            <h2 className="text-3xl sm:text-5xl font-serif mb-4 sm:mb-6 md:mb-8">Trajetória</h2>
            <p className="text-white/50 font-light leading-relaxed text-sm sm:text-base pr-4">
              Um percurso marcado pelo aperfeiçoamento constante e ética inegociável.
            </p>
          </Reveal>
        </div>
        
        <div className="lg:col-span-8">
          <div className="space-y-16 sm:space-y-24">
            {events.map((event, idx) => (
              <Reveal key={idx} delay={idx * 0.15} direction="up" distance={20} threshold={0.15}>
                <div className="relative pl-8 sm:pl-12 border-l border-white/10 group cursor-default">
                  <div className="absolute top-2 left-[-4px] sm:left-[-5px] w-[8px] h-[8px] sm:w-[10px] sm:h-[10px] bg-[#C9A96E] rounded-full group-hover:scale-150 group-hover:shadow-[0_0_10px_#C9A96E] transition-all" />
                  <span className="text-[#C9A96E] font-serif text-xl sm:text-2xl italic mb-2 sm:mb-4 block">{event.year}</span>
                  <h4 className="text-xl sm:text-2xl font-serif mb-2 sm:mb-4 group-hover:text-white transition-colors">{event.title}</h4>
                  <p className="text-sm sm:text-base text-white/50 font-light">{event.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

const Contact = () => {
  return (
    <Section id="contato" className="bg-[#001B2A] text-white py-16 sm:py-24 md:py-32 relative overflow-hidden">
      {/* Integrated Background Image (Image 04) */}
      <div className="absolute top-0 left-0 w-full lg:w-1/2 h-full z-0 pointer-events-none overflow-hidden">
        <ProgressiveImage 
          src={image04} 
          alt="" 
          className="w-full h-full"
          imgClassName="object-cover object-[center_30%] opacity-[0.2] lg:opacity-[0.35] brightness-[0.7] saturate-[0.8]"
        />
        {/* Dissolution/Decomposition Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#001B2A]/70 to-[#001B2A] z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001B2A] via-transparent to-[#001B2A]/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#001B2A] via-transparent to-transparent z-10 h-24" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">
        <div className="flex flex-col justify-center order-2 lg:order-1">
          <div className="space-y-8 sm:space-y-12">
            <Reveal delay={0.2}>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-[#C9A96E]" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-white/40 block">WhatsApp e Telefone</span>
                  <a 
                    href="https://wa.me/5582981880052" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-base sm:text-xl font-serif hover:text-[#C9A96E] transition-colors"
                  >
                    (82) 98188-0052
                  </a>
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={0.3}>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-[#C9A96E]" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-white/40 block">E-mail Profissional</span>
                  <p className="text-base sm:text-xl font-serif break-all sm:break-normal">sirangomesadv@gmail.com</p>
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={0.4}>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-[#C9A96E]" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-white/40 block">Escritório Presencial</span>
                  <p className="text-base sm:text-xl font-serif">Rua Prefeito Pedro Gaia, 913 — Camuxinga<br />Santana do Ipanema/AL</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                  <Instagram size={18} className="text-[#C9A96E]" />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-white/40 block">Rede Social Profissional</span>
                  <a 
                    href="https://instagram.com/siran_gomes" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-base sm:text-xl font-serif hover:text-[#C9A96E] transition-colors"
                  >
                    @siran_gomes
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        
        <div className="flex flex-col justify-center order-1 lg:order-2">
          <Reveal>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-serif leading-none mb-8 sm:mb-10">
              Disponível para <br />
              <span className="italic text-white/30">consultoria.</span>
            </h2>
          </Reveal>
          
          <Reveal delay={0.4}>
            <div className="bg-[#0D0D0D]/40 backdrop-blur-md p-8 sm:p-12 md:p-16 text-white border border-white/5 relative overflow-hidden group">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A96E]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#C9A96E]/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
              
              <div className="relative z-10">
                <svg 
                  viewBox="0 0 24 24" 
                  className="text-[#C9A96E] mb-6 sm:mb-8" 
                  width={40} 
                  height={40} 
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.411 0 .01 5.401.01 12.039c0 2.12.556 4.189 1.612 6.007L0 24l6.117-1.605a11.803 11.803 0 005.925 1.585h.005c6.637 0 12.038-5.402 12.038-12.041a11.777 11.777 0 00-3.518-8.497z" />
                </svg>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 sm:mb-6 leading-tight">
                  Agende sua consulta <br className="hidden sm:block" />
                  <span className="italic text-white/60">via WhatsApp.</span>
                </h3>
                
                <motion.a 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://wa.me/5582981880052"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 px-8 py-4 sm:px-10 sm:py-5 bg-[#C9A96E] text-black font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
                >
                  Iniciar Conversa <ArrowRight size={14} />
                </motion.a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};

const Footer = () => {
  return (
    <footer className="w-full py-10 sm:py-12 px-5 sm:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 md:flex-row md:justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 relative flex items-center justify-center">
            <img 
              src={logo} 
              alt="SG Logo" 
              className="w-full h-full object-contain opacity-80"
            />
          </div>
          <span className="font-serif text-xs sm:text-sm tracking-[0.2em] uppercase text-white/60">Siran Gomes Advocacia</span>
        </div>
        
        <div className="flex flex-col items-center sm:flex-row gap-4 sm:gap-12">
          <span className="text-[9px] uppercase tracking-widest text-white/30">© {new Date().getFullYear()} Siran Gomes Advocacia</span>
          <span className="text-[9px] uppercase tracking-widest text-white/30">Inscrição OAB/AL 17.534</span>
        </div>
      </div>
    </footer>
  );
};

const Quote = ({ text, author }: { text: string; author?: string }) => (
  <section className="bg-[#0D0D0D] py-24 sm:py-40 relative overflow-hidden">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <Reveal direction="up" distance={20} threshold={0.3}>
        <div className="relative inline-block">
          <span className="absolute -top-16 -left-12 text-[120px] font-serif text-[#C9A96E]/5 select-none pointer-events-none">"</span>
          <p className="text-2xl sm:text-3xl md:text-5xl font-serif italic text-white/90 leading-tight mb-10 tracking-tight">
            {text}
          </p>
          <span className="absolute -bottom-24 -right-12 text-[120px] font-serif text-[#C9A96E]/5 select-none pointer-events-none">"</span>
        </div>
        {author && (
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "auto" }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-6 mt-4 overflow-hidden"
          >
            <div className="h-px w-12 bg-[#C9A96E]/30" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.5em] text-[#C9A96E] font-medium whitespace-nowrap">{author}</span>
            <div className="h-px w-12 bg-[#C9A96E]/30" />
          </motion.div>
        )}
      </Reveal>
    </div>
  </section>
);

export default function SiranGomesApp() {
  return (
    <div className="bg-[#0D0D0D] selection:bg-[#C9A96E] selection:text-black">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <Quote 
          text="A defesa das garantias fundamentais é a base sobre a qual se ergue a verdadeira justiça." 
          author="Siran Gomes"
        />
        <Credentials />
        <PracticeArea />
        <Quote 
          text="A técnica jurídica é o instrumento; o compromisso ético é a nossa bússola."
        />
        <Trajectory />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
