"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
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
  Workflow
} from 'lucide-react';

// --- HOOK PERSONALIZADO CON TIPADO ESTRICTO DE TYPESCRIPT ---
const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (currentRef) observer.unobserve(currentRef);
        }
      },
      { threshold: 0.1 }
    );
    
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // "as const" le dice a TypeScript que esto es una Tupla exacta, no un array genérico
  return [ref, isVisible] as const; 
};

// --- COMPONENTE DEL LOGO CON TIPADO ---
const BeMakerLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <Image src="/logo.png" alt="BeMaker Logo" width={32} height={32} className={className} />
);

// --- COMPONENTE DE LA TERMINAL ---
const TerminalMockup = () => {
  const [lines, setLines] = useState<{text: string, type: string}[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(true);
  
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
    let typingInterval: ReturnType<typeof setTimeout>;

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ahora TS entiende perfectamente que esto es un [RefObject<HTMLDivElement>, boolean]
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
            <Image src="/logo.png" alt="BeMaker Logo" width={128} height={128} className="drop-shadow-[0_0_30px_rgba(237,8,7,0.6)]" />
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
            <Image src="/logo.png" alt="BeMaker Logo" width={24} height={24} />
            <span className="text-lg font-bold">BeMaker</span>
          </div>
          
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} BeMaker. Todos los derechos reservados.
          </p>

          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><GithubIcon size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-[#0077B5] transition-colors"><LinkedinIcon size={20} /></a>
            <a href="#" className="text-gray-500 hover:text-[#1DA1F2] transition-colors"><TwitterIcon size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Iconos de redes sociales (reemplazando los removidos de lucide-react)
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

function GithubIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
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