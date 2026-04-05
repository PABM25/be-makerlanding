"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Code2, 
  Layout, 
  Smartphone, 
  BrainCircuit, 
  Cloud, 
  ShieldCheck, 
  Terminal as TerminalIcon,
  ChevronRight,
  Menu,
  X,
  Github,
  Linkedin,
  Twitter,
  Workflow
} from 'lucide-react';

// --- HOOK PERSONALIZADO PARA ANIMACIÓN AL HACER SCROLL ---
const useScrollReveal = (): [React.RefObject<HTMLDivElement>, boolean] => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, isVisible];
};

// --- COMPONENTE DEL LOGO ---
const BeMakerLogo = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M 25 20 C 65 20 75 30 75 45 C 75 52 65 55 55 55 C 65 55 80 60 80 75 C 80 92 65 100 25 100" 
      stroke="#ED0807" 
      strokeWidth="12" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <circle cx="45" cy="40" r="7" fill="#ED0807" />
    <circle cx="45" cy="78" r="7" fill="#ED0807" />
  </svg>
);

// --- COMPONENTE DE LA TERMINAL ---
const TerminalMockup = () => {
  const [lines, setLines] = useState<{text: string, type: string}[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  
  const fullCommands = [
    { text: "> bemaker init --project \"innovative\"", type: "command" },
    { text: "> Initializing BeMaker engine...", type: "system" },
    { text: "> Loading creative modules... 100%", type: "system" },
    { text: "> Connecting talent network...", type: "system" },
    { text: "> Project created successfully!", type: "success" }
  ];

  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    let typingInterval: NodeJS.Timeout;

    const typeLine = () => {
      if (currentLine >= fullCommands.length) {
        setIsTyping(false);
        return;
      }

      const lineContent = fullCommands[currentLine];

      if (lineContent.type === "command") {
        if (currentChar <= lineContent.text.length) {
          setLines(prev => {
            const newLines = [...prev];
            newLines[currentLine] = { ...lineContent, text: lineContent.text.substring(0, currentChar) };
            return newLines;
          });
          currentChar++;
          typingInterval = setTimeout(typeLine, 50);
        } else {
          currentLine++;
          currentChar = 0;
          typingInterval = setTimeout(typeLine, 500);
        }
      } else {
        setLines(prev => [...prev, lineContent]);
        currentLine++;
        typingInterval = setTimeout(typeLine, 800);
      }
    };

    typingInterval = setTimeout(typeLine, 1000);
    return () => clearTimeout(typingInterval);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto bg-[#0a0a14] rounded-xl overflow-hidden border border-[#010066]/30 shadow-2xl shadow-[#010066]/20">
      <div className="flex items-center px-4 py-3 bg-[#05050a] border-b border-[#010066]/30">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="mx-auto flex items-center space-x-2 text-xs text-gray-500 font-mono">
          <TerminalIcon size={14} />
          <span>bemaker-terminal — bash</span>
        </div>
      </div>
      <div className="p-6 font-mono text-sm min-h-[200px]">
        {lines.map((line, index) => (
          <div 
            key={index} 
            className={`mb-2 ${
              line.type === 'command' ? 'text-white' : 
              line.type === 'success' ? 'text-green-400' : 'text-gray-400'
            }`}
          >
            {line.text}
          </div>
        ))}
        {isTyping && <span className="animate-pulse text-[#ED0807]">_</span>}
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---
export default function Page() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Referencias para las animaciones
  const [heroRef, heroVisible] = useScrollReveal();
  const [servicesRef, servicesVisible] = useScrollReveal();
  const [terminalRef, terminalVisible] = useScrollReveal();
  const [statsRef, statsVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  const navLinks = ["Inicio", "Servicios", "Terminal", "Nosotros", "Contacto"];

  const services = [
    { icon: <Code2 size={32} />, title: "Desarrollo Web", desc: "Plataformas web de alto rendimiento con las últimas tecnologías: React, Node.js, y arquitecturas escalables." },
    { icon: <Layout size={32} />, title: "Diseño UI/UX", desc: "Interfaces intuitivas y visualmente impactantes. Cada pixel cuenta para crear experiencias memorables." },
    { icon: <Smartphone size={32} />, title: "Apps Móviles", desc: "Aplicaciones nativas y multiplataforma que llevan tu marca al bolsillo de cada usuario." },
    { icon: <Workflow size={32} />, title: "Automatización & CRM", desc: "Optimizamos tu ecosistema digital creando flujos de trabajo eficientes e integraciones con Airtable, Make y Salesforce." },
    { icon: <BrainCircuit size={32} />, title: "Inteligencia Artificial", desc: "Soluciones con IA que automatizan procesos y transforman datos en decisiones inteligentes." },
    { icon: <Cloud size={32} />, title: "Cloud & DevOps", desc: "Infraestructura escalable y despliegues automáticos. Tu proyecto siempre disponible y seguro." },
    { icon: <ShieldCheck size={32} />, title: "Ciberseguridad", desc: "Protección integral para tu ecosistema digital. Auditamos, protegemos y mejoramos prácticas." }
  ];

  return (
    <div className="min-h-screen bg-[#030308] text-white selection:bg-[#ED0807] selection:text-white">
      {/* --- NAVBAR --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#05050A]/80 backdrop-blur-md py-3 border-b border-[#010066]/30 shadow-lg' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer">
            <BeMakerLogo className="w-8 h-8" />
            <span className="text-xl font-bold tracking-wide">BeMaker</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-gray-300 hover:text-[#ED0807] transition-colors">
                  {link}
                </a>
              ))}
            </div>
            <button className="bg-[#ED0807] hover:bg-[#c20605] text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-[0_0_15px_rgba(237,8,7,0.3)] hover:shadow-[0_0_25px_rgba(237,8,7,0.5)]">
              Comenzar
            </button>
          </div>

          <button className="md:hidden text-gray-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#05050A] border-b border-[#010066]/30 py-4 px-6 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-[#ED0807]">
                {link}
              </a>
            ))}
            <button className="bg-[#ED0807] text-white px-5 py-2 rounded-full font-semibold w-full">
              Comenzar
            </button>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="inicio" className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex flex-col items-center text-center px-6 min-h-screen justify-center">
        <div className="absolute inset-0 bg-glow-blue z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-glow-red z-0"></div>

        <div
          ref={heroRef}
          className={`relative z-10 max-w-4xl mx-auto flex flex-col items-center transition-all duration-1000 transform ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="mb-8 relative">
            <BeMakerLogo className="w-24 h-24 lg:w-32 lg:h-32 drop-shadow-[0_0_30px_rgba(237,8,7,0.6)]" />
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Be</span><span className="text-[#ED0807] text-glow">Maker</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl font-light">
            Transformamos ideas en experiencias digitales de alto impacto.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["TECNOLOGÍA", "CREATIVIDAD", "INNOVACIÓN"].map((tag) => (
              <span key={tag} className="text-xs md:text-sm font-semibold tracking-widest text-gray-300 border border-[#010066] px-4 py-1.5 rounded-full bg-[#010066]/10 uppercase">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="bg-[#ED0807] hover:bg-[#c20605] text-white px-8 py-4 rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(237,8,7,0.4)] hover:shadow-[0_0_30px_rgba(237,8,7,0.6)] flex items-center justify-center gap-2">
              Explorar Servicios <ChevronRight size={20} />
            </button>
            <button className="border border-gray-600 hover:border-white text-white px-8 py-4 rounded-full font-semibold transition-all hover:bg-white/5">
              Ver Demo
            </button>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="servicios" className="py-24 px-6 bg-[#05050A] relative border-t border-[#010066]/20">
        <div className="absolute left-0 top-0 w-1/3 h-full bg-glow-blue opacity-50 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div
            ref={servicesRef}
            className={`text-center mb-16 transition-all duration-1000 ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 className="text-sm font-bold tracking-widest text-[#ED0807] uppercase mb-3">Nuestros Servicios</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-4">Construimos el futuro</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">Cada proyecto es una oportunidad de innovar. Combinamos tecnología de vanguardia con diseño excepcional para crear soluciones únicas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`bg-[#0a0a14] border border-[#010066]/30 p-8 rounded-2xl hover:border-[#ED0807]/50 hover:shadow-[0_0_30px_rgba(1,0,102,0.3)] transition-all duration-300 group ${servicesVisible ? 'opacity-100' : 'opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-[#010066]/20 rounded-xl flex items-center justify-center text-[#ED0807] mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{service.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TERMINAL / TALENT SECTION --- */}
      <section id="terminal" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div
            ref={terminalRef}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-1000 ${terminalVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div>
              <h2 className="text-sm font-bold tracking-widest text-[#ED0807] uppercase mb-3">Talento Exportación</h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Código que habla por sí <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ED0807] to-orange-500">solo</span>
              </h3>
              <p className="text-gray-400 mb-8 text-lg">
                Nuestro equipo respira tecnología. Desde líneas de código hasta arquitecturas complejas, cada solución refleja nuestra pasión por la excelencia técnica.
              </p>
              
              <div className="flex flex-wrap gap-3">
                {["React", "Node.js", "Python", "AWS", "Docker", "TypeScript", "Airtable", "Make", "Salesforce"].map((tech) => (
                  <span key={tech} className="px-4 py-2 bg-[#05050A] border border-gray-800 rounded-lg text-sm font-medium hover:border-[#010066] transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#010066] to-[#ED0807] rounded-xl blur-2xl opacity-20 animate-pulse"></div>
              <TerminalMockup />
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS & ABOUT SECTION --- */}
      <section id="nosotros" className="py-24 px-6 bg-[#05050A] border-y border-[#010066]/20 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-1/2 h-full bg-glow-red opacity-30 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto">
          <div
            ref={statsRef}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-16 transition-all duration-1000 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "150+", label: "Proyectos" },
                { number: "50+", label: "Clientes" },
                { number: "99%", label: "Satisfacción" },
                { number: "24/7", label: "Soporte" }
              ].map((stat, i) => (
                <div key={i} className="bg-[#0a0a14] border border-[#010066]/30 p-8 rounded-2xl flex flex-col items-center justify-center text-center">
                  <span className="text-4xl md:text-5xl font-bold text-[#ED0807] mb-2">{stat.number}</span>
                  <span className="text-gray-400 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Somos Makers</h2>
              <div className="space-y-4 text-gray-400 text-lg">
                <p>
                  BeMaker nació de la convicción de que la tecnología debe ser una herramienta de transformación. Somos un equipo de desarrolladores, diseñadores y estrategas apasionados por crear soluciones que marquen la diferencia.
                </p>
                <p>
                  Cada proyecto que tomamos es tratado con la dedicación de un artesano y la precisión de un ingeniero. No construimos software — construimos el futuro digital de nuestros clientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section id="contacto" className="py-32 px-6 relative">
        <div
          ref={ctaRef}
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${ctaVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
          <h2 className="text-sm font-bold tracking-widest text-[#ED0807] uppercase mb-4">Contacto</h2>
          <h3 className="text-5xl md:text-6xl font-bold mb-6">¿Listo para construir?</h3>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Cuéntanos tu idea y la hacemos realidad. Cada gran proyecto comienza con una conversación.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
            <div className="bg-[#05050A] border border-[#010066]/50 px-8 py-4 rounded-xl flex items-center space-x-3 w-full md:w-auto justify-center">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="font-mono text-gray-300">hola@bemaker.io</span>
            </div>
            <div className="bg-[#05050A] border border-[#010066]/50 px-8 py-4 rounded-xl flex items-center space-x-3 w-full md:w-auto justify-center">
              <GlobeIcon className="w-5 h-5 text-[#ED0807]" />
              <span className="font-mono text-gray-300">Global & Remote</span>
            </div>
          </div>

          <button className="bg-[#ED0807] hover:bg-[#c20605] text-white px-10 py-5 rounded-full text-lg font-bold transition-all shadow-[0_0_20px_rgba(237,8,7,0.4)] hover:shadow-[0_0_40px_rgba(237,8,7,0.6)] hover:-translate-y-1 inline-flex items-center gap-3">
            Iniciar Proyecto <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#030308] border-t border-[#010066]/30 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <BeMakerLogo className="w-6 h-6" />
            <span className="text-lg font-bold">BeMaker</span>
          </div>
          
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} BeMaker. Todos los derechos reservados.
          </p>

          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><Github size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-[#0077B5] transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-[#1DA1F2] transition-colors"><Twitter size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Icono simple de globo para el CTA
function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}