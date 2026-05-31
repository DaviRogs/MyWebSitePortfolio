import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Instagram,
  Mail, 
  X, 
  FileText, 
  Code, 
  ExternalLink, 
  ArrowRight, 
  Users, 
  Package, 
  Settings, 
  Smartphone, 
  ChevronLeft,
  ChevronRight, 
  Sparkles, 
  MessageSquare,
  Bookmark,
  CheckCircle,
  HelpCircle,
  Edit2,
  Braces,
  Atom,
  Server,
  Terminal,
  Boxes,
  Database,
  Layers,
  Code2,
  FileCode
} from "lucide-react";
import { downloadDaviCV } from "./utils/cvGenerator";

// Types for Portfolio State
interface ProjectCategory {
  id: string; // e.g. "office-wear", "party", "casual", "erotica"
  label: string; // e.g. "Office Wear"
  aliasTitle: string; // 6 characters
  banner: string; // 12 characters (e.g. "Project 1062")
  paragraph: string; // 142 characters
  stackTech: {
    primary: string; // 6 characters
    secondary: string; // 5 characters
  };
  lookbookImages: {
    title: string;
    description: string;
    tech: string;
    year: string;
  }[];
}

const REAL_PROJECTS_PT = [
  {
    title: "Presence",
    year: "2022",
    description: "Plataforma avançada de controle de presença acadêmica e gestão de turmas. Permite relatórios em tempo real de frequência estudantil e administração inteligente de aulas.",
    tech: "Next.js, TypeScript, Node.js, PostgreSQL",
    image: "https://i.imgur.com/Nog4AUA.png",
    link: "https://github.com/DSUnB/Presence-DS"
  },
  {
    title: "CAPJu",
    year: "2023",
    description: "Sistema inteligente para controle de fluxos judiciais e etapas de processos de medidas protetivas urgentes. Identifica automaticamente gargalos, calcula atrasos e monitora o avanço das fases da justiça de forma ágil.",
    tech: "React, Node.js, Express, PostgreSQL, Jest",
    image: "https://i.imgur.com/qEfvNmR.png",
    link: "https://github.com/fga-eps-mds/2023-2-CAPJu-Doc"
  },
  {
    title: "Alvorecer Feudal",
    year: "2025",
    description: "Um aplicativo educativo gamificado desenvolvido para UnB que aproxima alunos e professores através da análise de dados de perfomance de alunos em atividades de ensino. (Software Low-Code)",
    tech: "Python, Pygame, SpriteSheets, OOP Game Design",
    image: "https://i.imgur.com/J4RD7hi.png",
    link: "https://cedis.unb.br/projects/alvorecer_feudal/"
  }
];

const REAL_PROJECTS_EN = [
  {
    title: "Presence",
    year: "2022",
    description: "Advanced platform for academic attendance control and class management. Allows real-time student attendance reporting and intelligent class administration.",
    tech: "Next.js, TypeScript, Node.js, PostgreSQL",
    image: "https://i.imgur.com/Nog4AUA.png",
    link: "https://github.com/DSUnB/Presence-DS"
  },
  {
    title: "CAPJu",
    year: "2023",
    description: "Intelligent system for controlling judicial workflows and urgent protective measure process stages. Automatically identifies bottlenecks, calculates delays, and dynamically monitors justice phases.",
    tech: "React, Node.js, Express, PostgreSQL, Jest",
    image: "https://i.imgur.com/qEfvNmR.png",
    link: "https://github.com/fga-eps-mds/2023-2-CAPJu-Doc"
  },
  {
    title: "Alvorecer Feudal",
    year: "2025",
    description: "A gamified educational application developed for UnB that connects students and teachers through performance data analysis in teaching activities. (Low-Code Software)",
    tech: "Python, Pygame, SpriteSheets, OOP Game Design",
    image: "https://i.imgur.com/J4RD7hi.png",
    link: "https://cedis.unb.br/projects/alvorecer_feudal/"
  }
];

const CATEGORIES_PT: ProjectCategory[] = [
  {
    id: "office-wear",
    label: "Corporativo",
    aliasTitle: "davi.r",
    banner: "Project 1062",
    paragraph: "Sou um programador UI/UX que cria interfaces web's com foco no usuário, minha real paixão é projetar sites corporativos com a identidade única para cada cliente.", 
    stackTech: {
      primary: "react.",
      secondary: "node."
    },
    lookbookImages: [
      { title: "Portal Administrativo de SaaS", description: "Suíte de análise empresarial de alta performance com relatórios automatizados.", tech: "React, Tremor, Tailwind, NestJS", year: "2026" },
      { title: "Centro de Trabalho Colaborativo", description: "Plataforma de canvas em tempo real para equipes de desenvolvimento de grande porte.", tech: "React, Socket.io, Redis, Express", year: "2025" },
      { title: "Sincronização de Ledger Financeiro", description: "Cliente de contabilidade sob medida representando trilhas de auditoria em tabelas interativas.", tech: "TypeScript, D3.js, Tailwind CSS", year: "2025" }
    ]
  },
  {
    id: "party",
    label: "Festa",
    aliasTitle: "davirr",
    banner: "Release 2026",
    paragraph: "Sou um programador vibrante que cria mundos virtuais em 3D e interfaces criativas. Meu foco diário está em aplicativos web leves e velozes....",
    stackTech: {
      primary: "three.",
      secondary: "vite."
    },
    lookbookImages: [
      { title: "Explorador de Terreno Procedural 3D", description: "Um ambiente de jogo visual em WebGL construído com shaders de alta densidade.", tech: "Vite, Three.js, React Three Fiber", year: "2026" },
      { title: "Sintetizador Interativo em Canvas", description: "Gerador de ondas sonoras ao vivo mapeando gestos do navegador em loops ambientes.", tech: "Web Audio API, Tailwind, TypeScript", year: "2026" },
      { title: "Controlador de Batidas NeoRhythm", description: "Sintetizador audiovisual personalizado utilizando belos gráficos vetoriais responsivos.", tech: "Motion, Lucide, React 19", year: "2025" }
    ]
  },
  {
    id: "casual",
    label: "Casual",
    aliasTitle: "davi r",
    banner: "Profile 1062",
    paragraph: "Sou um criador minimalista criando sites modernos e responsivos com layouts simples. Meu doce foco está em fazer telas leves e de fácil uso...",
    stackTech: {
      primary: "tailwind",
      secondary: "next."
    },
    lookbookImages: [
      { title: "Centro de Leitura Minimalista", description: "Um leitor digital altamente legível utilizando configurações de tipografia generosas.", tech: "NextJS, Tailwind CSS, Vercel", year: "2025" },
      { title: "Utilitário de Notas de Foco Elegante", description: "Bloco de notas offline focado em interações responsivas e armazenamento local.", tech: "React, LocalStorage, Motion", year: "2026" },
      { title: "Portfólio com Curadoria Sob Medida", description: "Layout rígido inspirado em revistas impressas de editorial de moda de luxo.", tech: "React 19, Tailwind CSS v4", year: "2026" }
    ]
  },
  {
    id: "erotica",
    label: "Erótico",
    aliasTitle: "davi_r",
    banner: "Journal 1062",
    paragraph: "Sou um desenhista audacioso que desafia as barreiras visuais de sites padrões. Meu profundo interesse está em criar portais bem artísticos....",
    stackTech: {
      primary: "framer",
      secondary: "astro"
    },
    lookbookImages: [
      { title: "Revista Brutalista de Vanguarda", description: "Uma publicação tipográfica testando os limites das grades de desktop padrão.", tech: "Astro, Custom CSS, Post-structuralism", year: "2026" },
      { title: "Rolagem Sensorial Interativa", description: "Layout de tipografia cinética respondendo a acelerações e velocidades de rolagem.", tech: "Motion, Tailwind, Raf Loop", year: "2025" },
      { title: "Currículo Neo-Brutalista de Alto Contraste", description: "Um currículo estético em preto e branco apresentando registros de carreira em monospace elegante.", tech: "TypeScript, Monospace, Minimal", year: "2025" }
    ]
  }
];

const CATEGORIES_EN: ProjectCategory[] = [
  {
    id: "office-wear",
    label: "Corporate",
    aliasTitle: "davi.r",
    banner: "Project 1062",
    paragraph: "I am a UI/UX developer creating user-centric web interfaces, my true passion is designing corporate websites with a unique identity for each client.", 
    stackTech: {
      primary: "react.",
      secondary: "node."
    },
    lookbookImages: [
      { title: "SaaS Administrative Portal", description: "High-performance enterprise analytics suite with automated reports.", tech: "React, Tremor, Tailwind, NestJS", year: "2026" },
      { title: "Collaborative Workspace Hub", description: "Real-time canvas platform for large-scale development teams.", tech: "React, Socket.io, Redis, Express", year: "2025" },
      { title: "Financial Ledger Sync", description: "Tailor-made accounting client rendering audit trails in interactive tables.", tech: "TypeScript, D3.js, Tailwind CSS", year: "2025" }
    ]
  },
  {
    id: "party",
    label: "Party",
    aliasTitle: "davirr",
    banner: "Release 2026",
    paragraph: "I am a vibrant developer crafting virtual 3D worlds and creative interfaces. My daily focus is on fast, lightweight web applications...",
    stackTech: {
      primary: "three.",
      secondary: "vite."
    },
    lookbookImages: [
      { title: "3D Procedural Terrain Explorer", description: "A WebGL visual gaming environment built with high-density shaders.", tech: "Vite, Three.js, React Three Fiber", year: "2026" },
      { title: "Canvas Interactive Synthesizer", description: "Live sound wave generator mapping browser gestures into ambient loops.", tech: "Web Audio API, Tailwind, TypeScript", year: "2026" },
      { title: "NeoRhythm Beat Controller", description: "Custom audiovisual synthesizer leveraging beautiful responsive vector graphics.", tech: "Motion, Lucide, React 19", year: "2025" }
    ]
  },
  {
    id: "casual",
    label: "Casual",
    aliasTitle: "davi r",
    banner: "Profile 1062",
    paragraph: "I am a minimalist creator building modern and responsive sites with clean layouts. My sweet spot lies in crafting lightweight, easy-to-use screens...",
    stackTech: {
      primary: "tailwind",
      secondary: "next."
    },
    lookbookImages: [
      { title: "Minimalist Reading Hub", description: "A highly readable digital e-reader with generous typography configurations.", tech: "NextJS, Tailwind CSS, Vercel", year: "2025" },
      { title: "Elegant Focus Notes Utility", description: "Offline notepad focused on responsive interactions and local storage.", tech: "React, LocalStorage, Motion", year: "2026" },
      { title: "Bespoke Curated Portfolio", description: "Rigid layout inspired by high-end fashion editorial print magazines.", tech: "React 19, Tailwind CSS v4", year: "2026" }
    ]
  },
  {
    id: "erotica",
    label: "Erotic",
    aliasTitle: "davi_r",
    banner: "Journal 1062",
    paragraph: "I am an audacious designer challenging visual boundaries of standard websites. My deep interest lies in creating highly artistic portals...",
    stackTech: {
      primary: "framer",
      secondary: "astro"
    },
    lookbookImages: [
      { title: "Avant-Garde Brutalist Magazine", description: "A typographical publication pushing the limits of standard desktop grids.", tech: "Astro, Custom CSS, Post-structuralism", year: "2026" },
      { title: "Interactive Sensory Scrolling", description: "Kinetic typography layout responding to scroll accelerations and velocities.", tech: "Motion, Tailwind, Raf Loop", year: "2025" },
      { title: "High-Contrast Neo-Brutalist CV", description: "A black-and-white aesthetic resume showcasing career records in elegant monospace.", tech: "TypeScript, Monospace, Minimal", year: "2025" }
    ]
  }
];

const TOOLS_PT = [
  { name: "JavaScript", category: "Linguagem Principal", desc: "Linguagem principal de desenvolvimento. Dinâmica client-side, manipulação do ecossistema assíncrono e recursos modernos.", badge: "Avançado" },
  { name: "TypeScript", category: "Superset Tipado", desc: "Desenvolvimento robusto e tipado focado na consistência do código em escala.", badge: "Avançado" },
  { name: "ReactJS", category: "Front-End", desc: "Criação de SPAs performáticas e interfaces refinadas baseadas em componentes declarativos.", badge: "Avançado" },
  { name: "Expo / React Native", category: "Mobile Development", desc: "Criação e prototipagem de apps nativos para sistemas operacionais iOS e Android.", badge: "Intermediário" },
  { name: "Node.js", category: "Backend Runtime", desc: "Serviços assíncronos de alta performance, APIs RESTful sólidas e microsserviços rápidos.", badge: "Avançado" },
  { name: "Python", category: "Scripting & Automação", desc: "Automação inteligente de processos e tratamento de fluxos de dados.", badge: "Intermediário" },
  { name: "Docker", category: "DevOps & Infraestrutura", desc: "Conteinerização consistente das aplicações simplificando deploys em ambientes isolados.", badge: "Intermediário" },
  { name: "MySQL", category: "Banco de Dados SQL", desc: "Modelagem lógica estruturada, relacionamentos otimizados e integridade referencial.", badge: "Avançado" },
  { name: "MongoDB", category: "Banco NoSQL", desc: "Armazenamento documental flexível de alta escalabilidade para dados dinâmicos.", badge: "Intermediário" },
  { name: "HTML5 & CSS", category: "Core Web Markup", desc: "Acessibilidade semântica, SEO integrado e refinamento estético fluido.", badge: "Avançado" }
];

const TOOLS_EN = [
  { name: "JavaScript", category: "Core Language", desc: "Primary development language. Client-side dynamics, asynchronous ecosystem orchestration, and modern ES6+ features.", badge: "Advanced" },
  { name: "TypeScript", category: "Typed Superset", desc: "Robust and statically typed development focusing on code consistency at scale.", badge: "Advanced" },
  { name: "ReactJS", category: "Front-End Framework", desc: "Creation of high-performance SPAs and polished interfaces based on declarative components.", badge: "Advanced" },
  { name: "Expo / React Native", category: "Mobile Development", desc: "Creating and prototyping native cross-platform apps for iOS and Android.", badge: "Intermediate" },
  { name: "Node.js", category: "Backend Runtime", desc: "Asynchronous high-performance services, solid RESTful APIs, and fast microservices.", badge: "Advanced" },
  { name: "Python", category: "Scripting & Automation", desc: "Intelligent process automation and streamlined data stream processing.", badge: "Intermediate" },
  { name: "Docker", category: "DevOps & Infrastructure", desc: "Consistent containerization of applications simplifying deployments across isolated environments.", badge: "Intermediate" },
  { name: "MySQL", category: "SQL Database", desc: "Structured logical modeling, optimized relationships, and strong referential integrity.", badge: "Advanced" },
  { name: "MongoDB", category: "NoSQL Database", desc: "Highly scalable, flexible document-based storage for dynamic data.", badge: "Intermediate" },
  { name: "HTML5 & CSS", category: "Core Web Markup", desc: "Semantic accessibility, integrated SEO optimization, and fluid aesthetic layouts.", badge: "Advanced" }
];

const TEXTS = {
  preloaderQuote: {
    pt: "“O sucesso é uma jornada, não um destino.”",
    en: "“Success is a journey, not a destination.”"
  },
  loadingExp: {
    pt: "// Carregando experiência",
    en: "// Loading experience"
  },
  portfolioEditorial: {
    pt: "Portfólio Editorial",
    en: "Editorial Portfolio"
  },
  subtitle_tagline: {
    pt: "Seja bem vindo, me chamo",
    en: "Welcome, my name is"
  },
  ariaBack: {
    pt: "Voltar para Sobre Mim",
    en: "Back to About Me"
  },
  lookbookBtn: {
    pt: "PORTFÓLIO",
    en: "PORTFOLIO"
  },
  menuDots: {
    pt: "Menu.",
    en: "Menu."
  },
  menuAbout: {
    pt: "Sobre mim",
    en: "About me"
  },
  menuProjects: {
    pt: "Projetos",
    en: "Projects"
  },
  menuTools: {
    pt: "Ferramentas",
    en: "Tools"
  },
  menuContact: {
    pt: "Contato",
    en: "Contact"
  },
  myResume: {
    pt: "Meu currículo",
    en: "My resume"
  },
  moreAboutMe: {
    pt: "Mais sobre mim",
    en: "More about me"
  },
  instantInquiry: {
    pt: "Enviar consulta instantânea para Davi.",
    en: "Send an instant inquiry to Davi."
  },
  quickContact: {
    pt: "Contato Rápido",
    en: "Quick Contact"
  },
  pioneeringVisuals: {
    pt: "Pioneirismo visual em desenvolvimento de software com layouts de alta fidelidade e modularidade de ponta.",
    en: "Pioneering visuals in software development with high-fidelity layouts and cutting-edge modularity."
  },
  digitalArchitect: {
    pt: "Projetista e desenvolvedor de interfaces ricas com alto desempenho.",
    en: "Architect and developer of rich interfaces with high performance."
  },
  footerCopyright: {
    pt: "REALIZADO POR DAVI © 2026. TODOS OS DIREITOS RESERVADOS.",
    en: "BUILT BY DAVI © 2026. ALL RIGHTS RESERVED."
  },
  footerStatus: {
    pt: "STATUS: DISPONÍVEL PARA PROJETOS",
    en: "STATUS: AVAILABLE FOR PROJECTS"
  },
  footerLoc: {
    pt: "LOC: BRASÍLIA, BR",
    en: "LOC: BRASILIA, BR"
  },
  teamTitle: {
    pt: "Rede de Colaboração do Davi",
    en: "Davi's Collaboration Network"
  },
  teamSub: {
    pt: "O trabalho colaborativo faz os projetos crescerem de escala. Aqui está minha estrutura ativa de rede. Eu lidero engenharia de sistemas, design visual e banco de dados ao lado de arquitetos visuais.",
    en: "Collaborative work scales projects. Here is my active network structure. I lead systems engineering, visual design, and database integration alongside visual architects."
  },
  collabNetworks: {
    pt: "Gatilho Lateral",
    en: "Sidebar Trigger"
  },
  teamLeader: {
    pt: "Líder",
    en: "Leader"
  },
  teamRoleDavi: {
    pt: "Engenheiro Principal & Designer de UI",
    en: "Principal Engineer & UI Designer"
  },
  teamRoleMentor: {
    pt: "Mentor de Design de Conceito Original",
    en: "Original Concept Design Mentor"
  },
  teamRoleDevs: {
    pt: "Comunidade de React & Tailwind",
    en: "React & Tailwind Community"
  },
  teamInspiration: {
    pt: "Inspiração",
    en: "Inspiration"
  },
  teamEcosystem: {
    pt: "Ecossistema",
    en: "Ecosystem"
  },
  toolsTitle: {
    pt: "Ferramentas de Desenvolvimento",
    en: "Development Tools"
  },
  techToolsLabel: {
    pt: "Tecnologias & Ferramentas",
    en: "Technologies & Tools"
  },
  toolsDesc: {
    pt: "Crio soluções de software de alta performance utilizando as tecnologias mais atuais. Minha especialidade inclui a construção de microsserviços ágeis e a integração com bancos de dados modernos para gerar os melhores resultados.",
    en: "I build high-performance software solutions using the modern tech stack. My expertise includes building scalable microservices and integrating modern databases to deliver outstanding results."
  },
  mfgTitle: {
    pt: "Estrutura de Desenvolvimento do Davi",
    en: "Davi's Development Structure"
  },
  mfgDesc: {
    pt: "Aqui está o pipeline de desenvolvimento configurado para renderizar pixels com fidelidade. Feito com ecossistema de React e Vite, empacotador Esbuild e estilização Tailwind CSS.",
    en: "Here is the development pipeline configured to render pixels with high fidelity. Built with React and Vite ecosystem, Esbuild bundler, and Tailwind CSS."
  },
  mfgCurrentPl: {
    pt: "Pipeline de Desenvolvimento Atual",
    en: "Current Development Pipeline"
  },
  mfgBundler: {
    pt: "Motor Bundler",
    en: "Bundler Engine"
  },
  mfgStyling: {
    pt: "Estilização",
    en: "Styling"
  },
  mfgPhysics: {
    pt: "Movimentos Físicos",
    en: "Physical Movements"
  },
  lookbookTitle: {
    pt: "Projetos em Destaque",
    en: "Featured Projects"
  },
  lookbookDesc: {
    pt: "Neste espaço, você encontra alguns dos meus projetos, criado tanto para o ambientes acadêmicos quanto corporativo.",
    en: "In this space, you can find some of my projects, built for both academic and corporate settings."
  },
  lookbookSubtitle: {
    pt: "portfolio / projetos",
    en: "portfolio / projects"
  },
  lookbookExplore: {
    pt: "Explorar",
    en: "Explore"
  },
  contactLabel: {
    pt: "contratar / contato",
    en: "hire / contact"
  },
  contactTitle: {
    pt: "Colabore com Davi",
    en: "Collaborate with Davi"
  },
  contactDesc: {
    pt: "Envie uma solicitação instantânea de projeto ou consulta. Todas as mensagens serão guardadas no armazenamento local deste navegador.",
    en: "Send an instant project or inquiry request. All messages will be saved in this browser's local storage."
  },
  contactName: {
    pt: "Seu Nome",
    en: "Your Name"
  },
  contactEmail: {
    pt: "E-mail de Contato",
    en: "Contact Email"
  },
  contactDetails: {
    pt: "Detalhes da Consulta",
    en: "Inquiry Details"
  },
  placeholderName: {
    pt: "Ex: Carlos de Souza",
    en: "e.g., John Doe"
  },
  placeholderMsg: {
    pt: "Ideia de projeto, desenvolvimento de sistemas ou UI/UX exclusivo...",
    en: "Project idea, software development, or exclusive UI/UX..."
  },
  sendEmail: {
    pt: "Enviar E-mail",
    en: "Send Email"
  },
  successMsg: {
    pt: "Mensagem enviada com sucesso para davirocha12.80@gmail.com!",
    en: "Message successfully sent to davirocha12.80@gmail.com!"
  },
  instantContact: {
    pt: "Contato Instantâneo",
    en: "Instant Contact"
  },
  whatsappTitle: {
    pt: "Conversar no WhatsApp",
    en: "Chat on WhatsApp"
  },
  whatsappDesc: {
    pt: "Clique para iniciar um chat rápido direto com o Davi.",
    en: "Click to start a quick chat directly with Davi."
  },
  auditLabel: {
    pt: "Inspetor de Precisão de Engenharia",
    en: "Engineering Precision Inspector"
  },
  auditTitle: {
    pt: "Validação de Contagem de Caracteres",
    en: "Character Count Validation"
  },
  auditDesc: {
    pt: "O usuário solicitou reescrever elementos sobre o portfólio pessoal do Davi enquanto mantêm exatamente a mesma contagem de caracteres do design original \"Tooni\". Aqui está a auditoria detalhada:",
    en: "The user requested to rewrite elements of Davi's personal portfolio while maintaining the exact character counts of the original \"Tooni\" design. Here is the detailed audit:"
  },
  auditOriginal: {
    pt: "Original",
    en: "Original"
  },
  auditSub: {
    pt: "Substituição",
    en: "Replacement"
  },
  auditChars: {
    pt: "Caracteres",
    en: "Characters"
  },
  activePreview: {
    pt: "Texto da Visualização Ativa:",
    en: "Active Preview Text:"
  },
  daviAdapt: {
    pt: "Adaptação do Davi",
    en: "Davi's Adaptation"
  },
  passed: {
    pt: "PASSOU",
    en: "PASSED"
  },
  flexCompatible: {
    pt: "FLEXÍVEL / COMPATÍVEL",
    en: "FLEXIBLE / COMPATIBLE"
  },
  close: {
    pt: "fechar",
    en: "close"
  },
  softwareEngineerHeader: {
    pt: "ENGENHEIRO DE SOFTWARE",
    en: "SOFTWARE ENGINEER"
  },
  domains: {
    pt: "Domínios",
    en: "Domains"
  },
  contactMe: {
    pt: "Me contate",
    en: "Contact me"
  },
  auditDesignerSub: {
    pt: "DESIGNER / SUBTÍTULO",
    en: "DESIGNER / SUBTITLE"
  },
  auditMainBrand: {
    pt: "MARCA PRINCIPAL / TÍTULO",
    en: "MAIN BRAND / TITLE"
  },
  auditMainParagraph: {
    pt: "PARÁGRAFO PRINCIPAL",
    en: "MAIN PARAGRAPH"
  },
  auditButtonAction: {
    pt: "AÇÃO DO BOTÃO CONTRATAR",
    en: "HIRE BUTTON ACTION"
  },
  auditOriginalLen: {
    pt: "Original: 142 caracteres",
    en: "Original: 142 characters"
  }
};

function getTechIcon(name: string) {
  switch (name) {
    case "TypeScript":
      return <Braces className="w-5 h-5 flex-shrink-0" />;
    case "ReactJS":
      return <Atom className="w-5 h-5 flex-shrink-0 animate-spin" style={{ animationDuration: "12s" }} />;
    case "Expo / React Native":
      return <Smartphone className="w-5 h-5 flex-shrink-0" />;
    case "Node.js":
      return <Server className="w-5 h-5 flex-shrink-0" />;
    case "Python":
      return <Terminal className="w-5 h-5 flex-shrink-0" />;
    case "Docker":
      return <Boxes className="w-5 h-5 flex-shrink-0" />;
    case "MySQL":
      return <Database className="w-5 h-5 flex-shrink-0" />;
    case "MongoDB":
      return <Layers className="w-5 h-5 flex-shrink-0" />;
    case "HTML5 & CSS":
      return <Code2 className="w-5 h-5 flex-shrink-0" />;
    case "JavaScript":
      return <FileCode className="w-5 h-5 flex-shrink-0" />;
    default:
      return <Code className="w-5 h-5 flex-shrink-0" />;
  }
}

function TypewriterText({ text, speed = 50, delay = 100 }: { text: string; speed?: number; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setDisplayedText("");
    const startTimeout = setTimeout(() => {
      let currentIdx = 0;
      const interval = setInterval(() => {
        if (!isMounted) return;
        currentIdx++;
        setDisplayedText(text.slice(0, currentIdx));
        if (currentIdx >= text.length) {
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);

    const blinkInterval = setInterval(() => {
      if (!isMounted) return;
      setShowCursor(prev => !prev);
    }, 450);

    return () => {
      isMounted = false;
      clearTimeout(startTimeout);
      clearInterval(blinkInterval);
    };
  }, [text, speed, delay]);

  return (
    <span>
      {displayedText}
      <span className={`inline-block ml-1 bg-white w-[2.5px] h-[1.15em] align-middle transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
    </span>
  );
}

function BlinkingColon() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow(prev => !prev);
    }, 450);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`transition-opacity duration-100 ${show ? 'opacity-100' : 'opacity-0'}`}>
      :
    </span>
  );
}

interface AnimateLettersProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

function AnimateLetters({ text, className = "", delay = 0, stagger = 0.02 }: AnimateLettersProps) {
  const words = text.split(" ");
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      }
    }
  };
  
  const letterVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 110
      }
    }
  };

  return (
    <motion.span 
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10px" }}
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split("").map((char, cIdx) => (
            <motion.span
              key={cIdx}
              className="inline-block"
              variants={letterVariants}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}

const TABLET_CAROUSEL_VARIANTS = {
  enter: (dir: "left" | "right") => ({
    x: dir === "right" ? 80 : -80,
    opacity: 0,
    scale: 0.97
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 24,
      opacity: { duration: 0.25 }
    }
  },
  exit: (dir: "left" | "right") => ({
    x: dir === "right" ? -80 : 80,
    opacity: 0,
    scale: 0.97,
    transition: {
      x: { type: "tween", duration: 0.25, ease: "easeInOut" },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 }
    }
  })
};

export default function App() {
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const REAL_PROJECTS = lang === "pt" ? REAL_PROJECTS_PT : REAL_PROJECTS_EN;
  const CATEGORIES = lang === "pt" ? CATEGORIES_PT : CATEGORIES_EN;
  const TOOLS = lang === "pt" ? TOOLS_PT : TOOLS_EN;

  const [activeTab, setActiveTab] = useState<string>("office-wear");
  const [customTitle, setCustomTitle] = useState<string>("");
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const [typedTitleCount, setTypedTitleCount] = useState<number>(0);
  
  // Preloading states
  const [isPreloading, setIsPreloading] = useState<boolean>(true);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);

  // Preloader progress logic
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      // Gentle cinematic speed transitions
      const increment = Math.floor(Math.random() * 8) + 5;
      current += increment;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsPreloading(false);
        }, 2000);
      }
      setLoadingProgress(current);
    }, 110);
    return () => clearInterval(interval);
  }, []);


  
  // Slide Drawer states
  const [drawerOpen, setDrawerOpen] = useState<"team" | "packaging" | "manufacturing" | "lookbook" | "contact" | "audit" | null>(null);
  const [tabletProjIndex, setTabletProjIndex] = useState(0);
  const [tabletProjDir, setTabletProjDir] = useState<"left" | "right">("right");
  
  // Saved inquiries state
  const [inquiries, setInquiries] = useState<{ name: string; email: string; message: string; date: string }[]>([]);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryMsg, setInquiryMsg] = useState("");
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Load inquiries on mount
  useEffect(() => {
    const saved = localStorage.getItem("davi_portfolio_inquiries");
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const currentCategory = CATEGORIES.find(c => c.id === activeTab) || CATEGORIES[0];
  const displayedTitle = customTitle.length === 6 ? customTitle : currentCategory.aliasTitle;

  // Typewriter effect for the main title
  useEffect(() => {
    setTypedTitleCount(0);
    const startTimeout = setTimeout(() => {
      let currentCount = 0;
      const interval = setInterval(() => {
        currentCount++;
        setTypedTitleCount(currentCount);
        if (currentCount >= displayedTitle.length) {
          clearInterval(interval);
        }
      }, 120);
      return () => clearInterval(interval);
    }, 150);
    return () => clearTimeout(startTimeout);
  }, [displayedTitle]);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryEmail || !inquiryMsg) return;
    
    const newInquiry = {
      name: inquiryName,
      email: inquiryEmail,
      message: inquiryMsg,
      date: new Date().toLocaleDateString("en-US", { hour: "2-digit", minute: "2-digit" })
    };

    const updated = [...inquiries, newInquiry];
    setInquiries(updated);
    localStorage.setItem("davi_portfolio_inquiries", JSON.stringify(updated));
    
    // Prepare mailto link to open default email client
    const subject = encodeURIComponent(`Contato do Portfólio - ${inquiryName}`);
    const body = encodeURIComponent(
      `Nome: ${inquiryName}\nE-mail: ${inquiryEmail}\n\nMensagem:\n${inquiryMsg}`
    );
    const mailtoUrl = `mailto:davirocha12.80@gmail.com?subject=${subject}&body=${body}`;
    
    const mailLink = document.createElement("a");
    mailLink.href = mailtoUrl;
    mailLink.click();
    
    setInquiryName("");
    setInquiryEmail("");
    setInquiryMsg("");
    setInquirySubmitted(true);
    setTimeout(() => setInquirySubmitted(false), 4000);
  };

  const handleClearInquiries = () => {
    setInquiries([]);
    localStorage.removeItem("davi_portfolio_inquiries");
  };

  // Helper arrays for exact character counting
  const targetCounts = {
    subtitle: { label: "Seja bem vindo, me chamo:", original: "DESIGNED BY AR SHAKIR", targetLen: 25, originalLen: 21 },
    title: { label: displayedTitle, original: "hoodie", targetLen: 6, originalLen: 6 },
    banner: { label: currentCategory.banner, original: "Article 1062", targetLen: 12, originalLen: 12 },
    paragraph: { label: currentCategory.paragraph, original: "From they fine john...", targetLen: currentCategory.paragraph.length, originalLen: 142 },
    sizeLabel: { label: "stack", original: "sizes", targetLen: 5, originalLen: 5 },
    sizeM: { label: currentCategory.stackTech.primary, original: "medium", targetLen: currentCategory.stackTech.primary.length, originalLen: 6 },
    sizeL: { label: currentCategory.stackTech.secondary, original: "node.", targetLen: currentCategory.stackTech.secondary.length, originalLen: 5 },
    actionCart: { label: "me contrate hoje — $24", original: "add to your cart — $24", targetLen: 22, originalLen: 22 },
    actionWatch: { label: "VER PORTFÓLIO.", original: "WATCH LOOKBOOK", targetLen: 14, originalLen: 14 }
  };

  return (
    <div id="portfolio-container" className="bg-black text-white min-h-screen relative flex flex-col justify-between selection:bg-white selection:text-black sm:overflow-hidden overflow-y-auto font-sans select-none p-3 sm:p-5 lg:p-6">
      
      {/* Cinematic Entrance Preloader in Luxury Aesthetic */}
      <AnimatePresence>
        {isPreloading && (
          <motion.div 
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-[999] bg-black flex flex-col justify-between p-8 md:p-14 select-none pointer-events-auto"
          >
            {/* Ambient subtle background */}
            <div className="absolute inset-0 pointer-events-none z-0 bg-black" />

            {/* Top Branding Header */}
            <div className="relative z-10 flex justify-between items-center font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">
              <span>{TEXTS.portfolioEditorial[lang]}</span>
              <span>Davi R</span>
            </div>

            {/* Center Cinematic Quote */}
            <div className="relative z-10 max-w-2xl mx-auto text-center px-4 my-auto">
              <motion.h2 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.15 }}
                className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-neutral-100 leading-relaxed tracking-wide mb-6"
              >
                <TypewriterText text={TEXTS.preloaderQuote[lang]} speed={50} delay={200} />
              </motion.h2>
              <div className="h-[1px] w-12 bg-white/20 mx-auto" />
            </div>

            {/* Bottom Progress Bar & Counter */}
            <div className="relative z-10 flex justify-between items-end font-mono text-zinc-400">
              <div className="flex flex-col gap-1.5 items-start">
                <span className="text-[9px] uppercase tracking-widest text-zinc-650">{TEXTS.loadingExp[lang]}</span>
                <span className="text-2xl font-light tracking-widest text-neutral-200">{loadingProgress.toString().padStart(3, '0')}%</span>
              </div>
              <div className="w-1/3 max-w-[200px] h-[1px] bg-white/10 relative overflow-hidden mb-2.5">
                <motion.div 
                  className="absolute left-0 top-0 bottom-0 bg-white"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------- INTENTIONALLY STYLED VIDEO BACKGROUND FOR PC ONLY ----------------- */}
      <div className="hidden sm:block absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {/* Loop video background (silent, autoplay, playsinline, object-cover) */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale contrast-125 transition-opacity duration-1000"
        >
          <source src="https://i.imgur.com/MEn9nYl.mp4" type="video/mp4" />
        </video>

        {/* Dynamic ambient dark background depth */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,rgba(15,15,15,0.35)_0%,rgba(0,0,0,0)_80%)] bg-black/30 backdrop-blur-[1px]" />
      </div>

      {/* ----------------- ARTISTIC FLAIR GRID LINES & EXTRA FRAMING border ----------------- */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Architectural 3 vertical grid-lines as requested by the style */}
        <div className="absolute left-[25%] top-0 bottom-0 w-[1px] bg-white/[0.05]" />
        <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-white/[0.05]" />
        <div className="absolute left-[75%] top-0 bottom-0 w-[1px] bg-white/[0.05]" />
        {/* Master framing borders */}
        <div className="absolute inset-0 border border-white/10" />
      </div>
      


      {/* ----------------- TOP HEADER NAVIGATION ----------------- */}
      <header id="main-header" className="w-full h-24 px-6 md:px-12 flex justify-between items-center z-20 relative border-b border-white/10 bg-black/60 backdrop-blur-md">
        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            onClick={() => setDrawerOpen(null)} 
            className="relative group cursor-pointer focus:outline-none text-left"
            role="link"
            aria-label={TEXTS.ariaBack[lang]}
          >
            <span className="font-sans text-xl sm:text-2xl font-black tracking-tighter text-white select-none">Davi R</span>
            <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </button>

          {/* PT/EN Language Selector */}
          <div className="flex items-center gap-1 border border-white/10 px-1.5 py-0.5 font-mono text-[9px] bg-black/45 select-none rounded-none shadow-sm">
            <button 
              onClick={() => setLang("pt")} 
              className={`px-1.5 py-0.5 tracking-wider font-semibold transition-colors cursor-pointer ${lang === "pt" ? "bg-white text-black" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              PT
            </button>
            <span className="text-zinc-700 text-[8px] select-none">|</span>
            <button 
              onClick={() => setLang("en")} 
              className={`px-1.5 py-0.5 tracking-wider font-semibold transition-colors cursor-pointer ${lang === "en" ? "bg-white text-black" : "text-zinc-500 hover:text-zinc-300"}`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Social Links moved to the center of the navbar - ONLY on PC (lg:flex) */}
        <nav id="top-nav" className="hidden lg:flex items-center gap-8">
          <a href="https://linkedin.com/in/davi-rogs1" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors p-1 flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase hover:scale-102" title="LinkedIn">
            <Linkedin size={14} />
            <span>LinkedIn</span>
          </a>
          <a href="https://github.com/DaviRogs" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors p-1 flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase hover:scale-102" title="GitHub">
            <Github size={14} />
            <span>GitHub</span>
          </a>
          <a href="https://www.instagram.com/davi_rodrgs1/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors p-1 flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase hover:scale-102" title="Instagram">
            <Instagram size={14} />
            <span>Instagram</span>
          </a>
        </nav>

        {/* Section navigation in the top header navbar on mobile and tablet ONLY */}
        <div className="hidden sm:flex lg:hidden items-center gap-1 sm:gap-2 max-w-[65%] sm:max-w-none overflow-x-auto py-1 no-scrollbar select-none">
          {[
            { id: "about_me", label: lang === "pt" ? "Sobre" : "About" },
            { id: "lookbook", label: TEXTS.menuProjects[lang] },
            { id: "packaging", label: TEXTS.menuTools[lang] },
            { id: "contact", label: TEXTS.menuContact[lang] }
          ].map((item) => {
            const isActive = item.id === "about_me" ? (drawerOpen === null) : (drawerOpen === item.id);
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "about_me") {
                    setDrawerOpen(null);
                  } else {
                    setDrawerOpen(item.id as any);
                  }
                }}
                className={`text-[9px] sm:text-[10px] md:text-xs font-mono px-2 py-1 uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? "bg-white text-black font-semibold" 
                    : "text-zinc-400 hover:text-white border border-transparent hover:border-white/10"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* ----------------- LAYOUT CONTAINER ----------------- */}
      <div id="layout-body" className="flex-1 flex max-w-[1920px] mx-auto w-full relative sm:h-[calc(100vh-210px)] h-auto sm:min-h-[550px] min-h-0 border-l border-r border-white/5">
        
        {/* ----------------- MAIN CENTRAL CONTENT BLOCK ----------------- */}
        <main id="center-main-content" className="flex-1 flex flex-col justify-center px-4 py-8 sm:px-12 md:px-20 lg:px-24 sm:py-12 relative z-10 select-text bg-black/10">
          
          <div className="max-w-[800px] w-full text-left relative">
            {/* Desktop & Tablet views (Tabs) */}
            <div className="hidden sm:block">
              <AnimatePresence mode="wait">
                {drawerOpen === null && (
                  <motion.div
                    key="about_me"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* 1. Designer Tagline (Artistic Flair Georgia Serif Style as requested) */}
                    <div className="flex flex-col mb-4 mt-4">
                      <span id="designer-text" className="font-serif italic text-3xl md:text-4xl text-neutral-100 select-none normal-case leading-tight">
                        <AnimateLetters text={TEXTS.subtitle_tagline[lang]} delay={0.05} />
                        <BlinkingColon />
                      </span>
                    </div>

                    {/* 2. Main Large Title "davi r" (Artistic Flair char-wrapper layout) */}
                    <div className="relative mt-2 mb-4 flex items-baseline w-full">
                      <h1 className="font-sans font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none text-white uppercase select-none w-full flex justify-between tracking-tighter">
                        {displayedTitle.toUpperCase().split("").map((char, index) => (
                          <motion.span 
                            key={index} 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.04 + 0.1, type: "spring", stiffness: 100 }}
                            className="inline-block hover:-translate-y-2 transition-all duration-300"
                            style={{ display: "inline-block" }}
                          >
                            {char === " " ? "\u00A0" : char}
                          </motion.span>
                        ))}
                      </h1>
                    </div>

                    {/* Subtitle below name */}
                    <div className="mb-8 select-none">
                      <span className="text-xs md:text-sm font-mono tracking-[0.25em] uppercase text-zinc-400 block leading-relaxed">
                        <AnimateLetters text={TEXTS.softwareEngineerHeader[lang]} delay={0.35} />
                      </span>
                    </div>

                    {/* 4. Descriptive paragraph (Exactly 142 characters) */}
                    <div className="relative mb-10 group/para">
                      <motion.p 
                        id="desc-paragraph" 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45, duration: 0.5 }}
                        className="text-zinc-300 font-light text-sm sm:text-base leading-relaxed tracking-wider font-sans cursor-text max-w-lg"
                      >
                        {currentCategory.paragraph}
                      </motion.p>
                    </div>

                    {/* 5. Sizes adapts -> "Domínios" with style tags */}
                    <motion.div 
                      id="stack-selector" 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55, duration: 0.5 }}
                      className="mb-12 select-none"
                    >
                      <span className="text-[9px] font-mono tracking-[0.3em] text-zinc-500 uppercase block mb-4">
                        <AnimateLetters text={TEXTS.domains[lang]} delay={0.6} />
                      </span>
                      <div className="flex flex-wrap gap-3 items-center">
                        {(lang === "pt" ? ["Designer de Interface", "Full stack", "Elicitação de Requisitos"] : ["Interface Designer", "Full stack", "Requirements Elicitation"]).map((domain, idx) => (
                          <span 
                            key={idx}
                            className="border border-white/10 px-5 py-3 rounded-none text-xs tracking-wider uppercase font-mono bg-black text-zinc-300 hover:text-white hover:border-white transition-all select-none"
                          >
                            {domain}
                          </span>
                        ))}
                      </div>
                    </motion.div>

                    {/* 6. Action Elements (Add to Cart -> Hire Me, Watch Lookbook -> View Portfolio) */}
                    <motion.div 
                      id="action-buttons" 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.65, duration: 0.5 }}
                      className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mt-6 select-none"
                    >
                      <button 
                        id="hire-me-btn"
                        onClick={downloadDaviCV}
                        className="bg-white text-black hover:bg-neutral-200 border border-white px-8 py-4 rounded-none text-xs font-bold uppercase tracking-[0.2em] font-mono transition-all flex items-center gap-3 relative overflow-hidden group shadow-md active:scale-98 cursor-pointer"
                      >
                        <span>{TEXTS.myResume[lang]}</span>
                        <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
                      </button>

                      <button 
                        id="view-portfolio-btn"
                        onClick={() => setDrawerOpen("contact")}
                        className="text-xs uppercase font-mono tracking-[0.25em] text-zinc-400 hover:text-white transition-all py-3.5 border-b border-transparent hover:border-white relative flex items-center gap-2 group ml-2 active:scale-98 cursor-pointer"
                      >
                        <span>{TEXTS.contactMe[lang]}</span>
                        <ChevronRight size={13} className="text-zinc-600 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  </motion.div>
                )}

                {drawerOpen === "packaging" && (
                  <motion.div
                    key="packaging"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="w-full"
                  >
                    <div className="flex items-center gap-2 mb-2 select-none">
                      <Code size={14} className="text-zinc-400" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                        {TEXTS.techToolsLabel[lang]}
                      </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-serif text-white leading-tight mb-4 select-none">
                      {TEXTS.toolsTitle[lang]}
                      <span className="animate-blink inline-block">:</span>
                    </h2>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.5 }}
                      className="text-zinc-400 text-xs sm:text-sm mb-6 leading-relaxed font-sans font-light max-w-2xl select-none"
                    >
                      {TEXTS.toolsDesc[lang]}
                    </motion.p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                      {TOOLS.map((pkg, idx) => (
                        <div key={idx} className="bg-black/70 p-4 rounded-none border border-white/10 flex justify-between items-center hover:border-white/20 transition-all select-none group">
                          <div>
                            <span className="text-[9px] font-mono uppercase bg-white/5 border border-white/10 px-2 py-0.5 text-zinc-400 inline-block mb-1 tracking-wider">
                              {pkg.category}
                            </span>
                            <h4 className="font-mono text-sm text-white tracking-wide font-medium group-hover:text-white transition-colors">{pkg.name}</h4>
                            <p className="text-xs text-zinc-400 mt-1 font-light leading-relaxed">{pkg.desc}</p>
                          </div>
                          <div className="bg-white/5 border border-white/10 p-2.5 ml-4 rounded-none flex items-center justify-center text-zinc-400 group-hover:text-black group-hover:bg-white group-hover:border-white transition-all duration-300 transform group-hover:scale-105">
                            {getTechIcon(pkg.name)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {drawerOpen === "lookbook" && (
                  <motion.div
                    key="lookbook"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="w-full"
                  >
                    <span className="bg-white/5 text-zinc-400 px-2.5 py-1 text-[9px] font-mono border border-white/10 rounded-none uppercase tracking-widest select-none">
                      {TEXTS.lookbookSubtitle[lang]}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight my-4 select-none">
                      {TEXTS.lookbookTitle[lang]}
                      <span className="animate-blink inline-block">:</span>
                    </h2>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.5 }}
                      className="text-zinc-400 text-xs sm:text-sm mb-6 font-light max-w-xl select-none"
                    >
                      {TEXTS.lookbookDesc[lang]}
                    </motion.p>
                    
                    {/* PC/DESKTOP ONLY VIEW (screens >= 1280px) */}
                    <div className="hidden xl:grid grid-cols-3 gap-4 max-h-[440px] overflow-y-auto pr-2 custom-scrollbar">
                      {REAL_PROJECTS.map((project, index) => (
                        <div key={index} className="bg-black/80 p-4 rounded-none border border-white/10 group hover:border-white/30 transition-all duration-300 select-none flex flex-col justify-between">
                          <div>
                            <div className="w-full h-28 overflow-hidden mb-3 border border-white/5 relative bg-zinc-900">
                              <img 
                                src={project.image} 
                                alt={project.title} 
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                            </div>
                            <div className="flex justify-between items-baseline mb-1">
                              <h3 className="font-mono text-sm text-white group-hover:text-zinc-200 transition-colors tracking-wide font-semibold">
                                {project.title}
                              </h3>
                              <span className="font-mono text-[9px] text-zinc-500">{project.year}</span>
                            </div>
                            <p className="text-[11px] text-zinc-400 leading-relaxed font-light mb-4">
                              {project.description}
                            </p>
                          </div>
                          <div className="flex justify-end items-center text-[10px] font-mono text-zinc-500 pt-2 border-t border-white/10 mt-auto">
                            <a 
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-zinc-400 group-hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              {TEXTS.lookbookExplore[lang]} <ExternalLink size={10} />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* TABLET ONLY VIEW (screens >= 640px and < 1280px) */}
                    <div className="hidden sm:block xl:hidden w-full max-w-2xl md:max-w-3xl mx-auto">
                      <div className="flex items-center gap-4">
                        {/* Prev Arrow */}
                        <button 
                          onClick={() => {
                            setTabletProjDir("left");
                            setTabletProjIndex((prev) => (prev - 1 + REAL_PROJECTS.length) % REAL_PROJECTS.length);
                          }}
                          className="p-3 bg-black/80 border border-white/10 hover:border-white hover:text-white text-zinc-400 transition-all cursor-pointer rounded-none active:scale-95 shrink-0"
                          aria-label="Previous project"
                        >
                          <ChevronLeft size={20} />
                        </button>

                        {/* Centered Single Card with horizontal sliding animation */}
                        <div className="flex-1 overflow-hidden relative min-h-[380px]">
                          <AnimatePresence mode="wait" custom={tabletProjDir}>
                            <motion.div
                              key={tabletProjIndex}
                              custom={tabletProjDir}
                              variants={TABLET_CAROUSEL_VARIANTS}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              className="w-full bg-black/80 p-5 rounded-none border border-white/10 select-none flex flex-col justify-between min-h-[380px]"
                            >
                              <div>
                                <div className="w-full h-44 md:h-48 overflow-hidden mb-4 border border-white/5 relative bg-zinc-900">
                                  <img 
                                    src={REAL_PROJECTS[tabletProjIndex].image} 
                                    alt={REAL_PROJECTS[tabletProjIndex].title} 
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover grayscale"
                                  />
                                  <div className="absolute inset-0 bg-black/10" />
                                </div>
                                <div className="flex justify-between items-baseline mb-1">
                                  <h3 className="font-mono text-sm text-white tracking-wide font-semibold">
                                    {REAL_PROJECTS[tabletProjIndex].title}
                                  </h3>
                                  <span className="font-mono text-[9px] text-zinc-500">{REAL_PROJECTS[tabletProjIndex].year}</span>
                                </div>
                                <p className="text-[11px] text-zinc-300 leading-relaxed font-light mb-4 text-justify">
                                  {REAL_PROJECTS[tabletProjIndex].description}
                                </p>
                              </div>
                              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 pt-2 border-t border-white/10 mt-auto">
                                {/* Page Indicator */}
                                <span className="text-zinc-500">
                                  {tabletProjIndex + 1} / {REAL_PROJECTS.length}
                                </span>
                                
                                <a 
                                  href={REAL_PROJECTS[tabletProjIndex].link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-bold uppercase tracking-wider"
                                >
                                  {TEXTS.lookbookExplore[lang]} <ExternalLink size={10} />
                                </a>
                              </div>
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        {/* Next Arrow */}
                        <button 
                          onClick={() => {
                            setTabletProjDir("right");
                            setTabletProjIndex((prev) => (prev + 1) % REAL_PROJECTS.length);
                          }}
                          className="p-3 bg-black/80 border border-white/10 hover:border-white hover:text-white text-zinc-400 transition-all cursor-pointer rounded-none active:scale-95 shrink-0"
                          aria-label="Next project"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>

                      {/* Dot Page indicators */}
                      <div className="flex justify-center gap-2 mt-4">
                        {REAL_PROJECTS.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setTabletProjDir(idx > tabletProjIndex ? "right" : "left");
                              setTabletProjIndex(idx);
                            }}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === tabletProjIndex ? "bg-white w-4" : "bg-white/20"}`}
                            aria-label={`Go to project ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {drawerOpen === "contact" && (
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-lg"
                  >
                    <span className="bg-white/5 text-zinc-400 px-2.5 py-1 text-[9px] font-mono border border-white/10 rounded-none uppercase tracking-widest select-none">
                      {TEXTS.contactLabel[lang]}
                    </span>
                    <h2 className="text-3xl font-serif text-white my-4 select-none">
                      {TEXTS.contactTitle[lang]}
                      <span className="animate-blink inline-block">:</span>
                    </h2>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.5 }}
                      className="text-zinc-400 text-xs mb-6 leading-relaxed font-light select-none"
                    >
                      {TEXTS.contactDesc[lang]}
                    </motion.p>

                    <form onSubmit={handleInquirySubmit} className="space-y-3 mb-6 select-none">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">{TEXTS.contactName[lang]}</label>
                          <input 
                            type="text" 
                            required
                            value={inquiryName}
                            onChange={(e) => setInquiryName(e.target.value)}
                            placeholder={TEXTS.placeholderName[lang]}
                            className="w-full bg-black border border-white/10 rounded-none p-2.5 text-xs focus:outline-none focus:border-white text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">{TEXTS.contactEmail[lang]}</label>
                          <input 
                            type="email" 
                            required
                            value={inquiryEmail}
                            onChange={(e) => setInquiryEmail(e.target.value)}
                            placeholder="exemplo@dominio.com"
                            className="w-full bg-black border border-white/10 rounded-none p-2.5 text-xs focus:outline-none focus:border-white text-white font-mono"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">{TEXTS.contactDetails[lang]}</label>
                        <textarea 
                          rows={3}
                          required
                          value={inquiryMsg}
                          onChange={(e) => setInquiryMsg(e.target.value)}
                          placeholder={TEXTS.placeholderMsg[lang]}
                          className="w-full bg-black border border-white/10 rounded-none p-2.5 text-xs focus:outline-none focus:border-white text-white font-mono resize-none"
                        />
                      </div>
                      
                      <button 
                        type="submit"
                        className="w-full bg-white text-black hover:bg-neutral-200 text-xs font-mono font-bold uppercase tracking-[0.2em] py-3 rounded-none transition-colors border border-white active:scale-98 cursor-pointer font-semibold"
                      >
                        {TEXTS.sendEmail[lang]}
                      </button>
                    </form>

                    {inquirySubmitted && (
                      <div className="bg-emerald-950/20 border border-emerald-800/50 p-3 rounded-none text-xs text-emerald-400 mb-4 flex items-center gap-2 font-mono uppercase tracking-wider">
                        <CheckCircle size={14} className="text-emerald-500 animate-bounce" />
                        <span>{TEXTS.successMsg[lang]}</span>
                      </div>
                    )}

                    {/* WhatsApp Direct */}
                    <div className="border-t border-white/10 pt-4">
                      <a 
                        href="https://w.app/q79kq1" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between bg-emerald-950/10 border border-emerald-900/30 hover:border-emerald-500/50 p-3 rounded-none transition-all group"
                      >
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <h4 className="font-mono text-[10px] uppercase text-emerald-400 tracking-wider font-semibold">{TEXTS.whatsappTitle[lang]}</h4>
                          </div>
                          <p className="text-[10px] text-zinc-400 leading-relaxed font-light">
                            {TEXTS.whatsappDesc[lang]}
                          </p>
                        </div>
                        <ArrowRight size={12} className="text-emerald-500 group-hover:translate-x-1.5 transition-transform" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile View: Stacked scroll layout (About, Projects, Tools, Contact sequential flow) */}
            <div className="block sm:hidden space-y-16 py-4">
              {/* SECTION 1: ABOUT */}
              <div id="mob-about" className="relative p-6 border border-white/10 bg-black/40 overflow-hidden shadow-xl rounded-none">
                {/* Local Video background for mobile 'Sobre mim' ONLY */}
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale contrast-125"
                  >
                    <source src="https://i.imgur.com/MEn9nYl.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(15,15,15,0.35)_0%,rgba(0,0,0,0)_80%)] bg-black/30 backdrop-blur-[1px]" />
                </div>

                <div className="relative z-10">
                  <div className="flex flex-col mb-4 font-serif italic text-2xl text-neutral-100 select-none normal-case leading-tight">
                    <span>
                      <AnimateLetters text={TEXTS.subtitle_tagline[lang]} delay={0.05} />
                      <BlinkingColon />
                    </span>
                  </div>

                  <div className="relative mt-2 mb-4 flex items-baseline w-full">
                    <h1 className="font-sans font-black text-6xl leading-none text-white uppercase select-none w-full flex justify-between tracking-tighter">
                      {displayedTitle.toUpperCase().split("").map((char, index) => (
                        <motion.span 
                          key={index} 
                          initial={{ opacity: 0, y: 15 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.04 + 0.1, type: "spring", stiffness: 100 }}
                          className="inline-block"
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))}
                    </h1>
                  </div>

                  <div className="mb-6 select-none">
                    <span className="text-xs font-mono tracking-[0.25em] uppercase text-zinc-400 block leading-relaxed">
                      <AnimateLetters text={TEXTS.softwareEngineerHeader[lang]} delay={0.3} />
                    </span>
                  </div>

                  <div className="relative mb-8">
                    <p className="text-zinc-300 font-light text-sm leading-relaxed tracking-wider font-sans">
                      {currentCategory.paragraph}
                    </p>
                  </div>

                  <div className="mb-10 select-none">
                    <span className="text-[9px] font-mono tracking-[0.3em] text-zinc-500 uppercase block mb-3">
                      <AnimateLetters text={TEXTS.domains[lang]} delay={0.4} />
                    </span>
                    <div className="flex flex-wrap gap-2 items-center">
                      {(lang === "pt" ? ["Designer de Interface", "Full stack", "Elicitação de Requisitos"] : ["Interface Designer", "Full stack", "Requirements Elicitation"]).map((domain, idx) => (
                        <span 
                          key={idx}
                          className="border border-white/10 px-4 py-2 text-xs tracking-wider uppercase font-mono bg-black text-zinc-300 select-none"
                        >
                          {domain}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 mt-4 select-none">
                    <button 
                      onClick={downloadDaviCV}
                      className="w-full bg-white text-black hover:bg-neutral-200 border border-white px-6 py-3.5 rounded-none text-xs font-bold uppercase tracking-[0.2em] font-mono transition-all flex items-center justify-center gap-2 relative shadow-md active:scale-98"
                    >
                      <span>{TEXTS.myResume[lang]}</span>
                      <ArrowRight size={13} />
                    </button>

                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("mob-contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full text-center text-xs uppercase font-mono tracking-[0.25em] text-zinc-400 hover:text-white transition-all py-3 border border-white/10 hover:border-white block cursor-pointer"
                    >
                      <span>{TEXTS.contactMe[lang]}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* SECTION 2: PROJECTS */}
              <div id="mob-projects" className="border border-white/10 p-6 bg-black/60 shadow-xl rounded-none relative">
                <span className="bg-white/5 text-zinc-400 px-2.5 py-1 text-[9px] font-mono border border-white/10 rounded-none uppercase tracking-widest select-none">
                  {TEXTS.lookbookSubtitle[lang]}
                </span>
                <h2 className="text-3xl font-serif text-white tracking-tight my-4 select-none">
                  {TEXTS.lookbookTitle[lang]}
                  <span className="animate-blink inline-block">:</span>
                </h2>
                <p className="text-zinc-400 text-xs mb-6 font-light select-none">
                  {TEXTS.lookbookDesc[lang]}
                </p>
                
                <div className="grid grid-cols-1 gap-6">
                  {REAL_PROJECTS.map((project, index) => (
                    <div key={index} className="bg-black/80 p-4 rounded-none border border-white/10 flex flex-col justify-between group">
                      <div>
                        <div className="w-full h-36 overflow-hidden mb-3 border border-white/5 relative bg-zinc-900">
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover grayscale"
                          />
                        </div>
                        <div className="flex justify-between items-baseline mb-1">
                          <h3 className="font-mono text-sm text-white tracking-wide font-semibold">
                            {project.title}
                          </h3>
                          <span className="font-mono text-[9px] text-zinc-500">{project.year}</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed font-light mb-4">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex justify-end items-center text-[10px] font-mono text-zinc-500 pt-2 border-t border-white/10 mt-auto">
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          {TEXTS.lookbookExplore[lang]} <ExternalLink size={10} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 3: TOOLS STATEMENT */}
              <div id="mob-tools" className="border border-white/10 p-6 bg-black/60 shadow-xl rounded-none relative">
                <div className="flex items-center gap-2 mb-2 select-none">
                  <Code size={14} className="text-zinc-400" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                    {TEXTS.techToolsLabel[lang]}
                  </span>
                </div>
                <h2 className="text-3xl font-serif text-white leading-tight mb-4 select-none">
                  {TEXTS.toolsTitle[lang]}
                  <span className="animate-blink inline-block">:</span>
                </h2>
                <p className="text-zinc-400 text-xs mb-6 leading-relaxed font-sans font-light select-none">
                  {TEXTS.toolsDesc[lang]}
                </p>
                
                <div className="grid grid-cols-1 gap-4 max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
                  {TOOLS.map((pkg, idx) => (
                    <div key={idx} className="bg-black/70 p-4 rounded-none border border-white/10 flex justify-between items-center">
                      <div>
                        <span className="text-[9px] font-mono uppercase bg-white/5 border border-white/10 px-2 py-0.5 text-zinc-400 inline-block mb-1 tracking-wider">
                          {pkg.category}
                        </span>
                        <h4 className="font-mono text-sm text-white tracking-wide font-medium">{pkg.name}</h4>
                        <p className="text-xs text-zinc-400 mt-1 font-light leading-relaxed">{pkg.desc}</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-2.5 ml-4 rounded-none flex items-center justify-center text-zinc-400">
                        {getTechIcon(pkg.name)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 4: CONVERT FORM CONTACT */}
              <div id="mob-contact" className="border border-white/10 p-6 bg-black/60 shadow-xl rounded-none relative">
                <span className="bg-white/5 text-zinc-400 px-2.5 py-1 text-[9px] font-mono border border-white/10 rounded-none uppercase tracking-widest select-none">
                  {TEXTS.contactLabel[lang]}
                </span>
                <h2 className="text-3xl font-serif text-white my-4 select-none">
                  {TEXTS.contactTitle[lang]}
                  <span className="animate-blink inline-block">:</span>
                </h2>
                <p className="text-zinc-400 text-xs mb-6 leading-relaxed font-light select-none">
                  {TEXTS.contactDesc[lang]}
                </p>

                <form onSubmit={handleInquirySubmit} className="space-y-3 mb-6 select-none">
                  <div>
                    <label className="block text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">{TEXTS.contactName[lang]}</label>
                    <input 
                      type="text" 
                      required
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder={TEXTS.placeholderName[lang]}
                      className="w-full bg-black border border-white/10 rounded-none p-2.5 text-xs focus:outline-none focus:border-white text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">{TEXTS.contactEmail[lang]}</label>
                    <input 
                      type="email" 
                      required
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder="exemplo@dominio.com"
                      className="w-full bg-black border border-white/10 rounded-none p-2.5 text-xs focus:outline-none focus:border-white text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">{TEXTS.contactDetails[lang]}</label>
                    <textarea 
                      rows={3}
                      required
                      value={inquiryMsg}
                      onChange={(e) => setInquiryMsg(e.target.value)}
                      placeholder={TEXTS.placeholderMsg[lang]}
                      className="w-full bg-black border border-white/10 rounded-none p-2.5 text-xs focus:outline-none focus:border-white text-white font-mono resize-none"
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-white text-black hover:bg-neutral-200 text-xs font-mono font-bold uppercase tracking-[0.2em] py-3 rounded-none transition-colors border border-white active:scale-98 cursor-pointer font-semibold"
                  >
                    {TEXTS.sendEmail[lang]}
                  </button>
                </form>

                {inquirySubmitted && (
                  <div className="bg-emerald-950/20 border border-emerald-800/50 p-3 rounded-none text-xs text-emerald-400 mb-4 flex items-center gap-2 font-mono uppercase tracking-wider">
                    <CheckCircle size={14} className="text-emerald-500 animate-bounce" />
                    <span>{TEXTS.successMsg[lang]}</span>
                  </div>
                )}

                {/* WhatsApp Direct */}
                <div className="border-t border-white/10 pt-4">
                  <a 
                    href="https://w.app/q79kq1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between bg-emerald-950/10 border border-emerald-900/30 hover:border-emerald-500/50 p-3 rounded-none transition-all group"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <h4 className="font-mono text-[10px] uppercase text-emerald-400 tracking-wider font-semibold">{TEXTS.whatsappTitle[lang]}</h4>
                      </div>
                      <p className="text-[10px] text-zinc-400 leading-relaxed font-light">
                        {TEXTS.whatsappDesc[lang]}
                      </p>
                    </div>
                    <ArrowRight size={12} className="text-emerald-500 group-hover:translate-x-1.5 transition-transform" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </main>

        {/* ----------------- RIGHT COLUMN (NAVIGATION PANEL) ----------------- */}
        <aside id="right-sidebar" className="hidden lg:flex w-[240px] h-full flex-col justify-center pr-8 md:pr-12 lg:pr-16 z-10 select-none bg-black/35 backdrop-blur-xs border-l border-white/10">
          <div className="flex flex-col space-y-10 items-end w-full relative">
            <span className="text-[9px] font-mono tracking-[0.3em] text-zinc-500 uppercase mb-4 text-right pr-1 block">
              {TEXTS.menuDots[lang]}
            </span>
            {[
              { id: "about_me", label: TEXTS.menuAbout[lang], index: "01" },
              { id: "lookbook", label: TEXTS.menuProjects[lang], index: "02" },
              { id: "packaging", label: TEXTS.menuTools[lang], index: "03" },
              { id: "contact", label: TEXTS.menuContact[lang], index: "04" }
            ].map((item) => {
              const isActive = item.id === "about_me" ? (drawerOpen === null) : (drawerOpen === item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === "about_me") {
                      setDrawerOpen(null);
                    } else {
                      setDrawerOpen(item.id as any);
                    }
                  }}
                  className="flex items-center gap-4 group/btn py-2.5 relative w-full justify-end uppercase text-right"
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        layoutId="activeDot"
                        className="w-1.5 h-1.5 rounded-none bg-white absolute right-full mr-4 border border-white/50"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>
                  
                  <span className={`text-[10px] font-mono text-zinc-650 tracking-[0.2em] transition-all duration-300 ${isActive ? 'text-zinc-300' : 'text-zinc-700 font-extralight opacity-50'}`}>
                    {item.index}
                  </span>
                  
                  <span className={`text-sm sm:text-base md:text-lg tracking-[0.1em] font-light transition-all duration-300 ${
                    isActive 
                      ? 'text-white font-semibold pl-2 scale-102 translate-x-[-4px]' 
                      : 'text-zinc-500 hover:text-white hover:translate-x-[-2px]'
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

      </div>

      {/* ----------------- FOOTER ----------------- */}
      <footer id="main-footer" className="w-full min-h-[96px] py-6 px-6 sm:px-12 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 border-t border-white/10 bg-black/60 backdrop-blur-md z-20 relative select-none">
        <div className="text-[10px] font-mono text-zinc-500 tracking-wider text-center sm:text-left">
          {TEXTS.footerCopyright[lang]}
        </div>

        {/* Social networks in the footer on mobile and tablet ONLY */}
        <div className="flex lg:hidden items-center justify-center gap-6">
          <a href="https://linkedin.com/in/davi-rogs1" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors p-1 flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase" title="LinkedIn">
            <Linkedin size={12} />
            <span>LinkedIn</span>
          </a>
          <a href="https://github.com/DaviRogs" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors p-1 flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase" title="GitHub">
            <Github size={12} />
            <span>GitHub</span>
          </a>
          <a href="https://www.instagram.com/davi_rodrgs1/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors p-1 flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase" title="Instagram">
            <Instagram size={12} />
            <span>Instagram</span>
          </a>
        </div>

        {/* Artistic Flair Monospace Meta Info on Right */}
        <div className="hidden lg:flex flex-col text-right font-mono text-[10px] leading-relaxed text-zinc-400 uppercase tracking-widest">
          <span>{TEXTS.footerStatus[lang]}</span>
          <span>{TEXTS.footerLoc[lang]}</span>
        </div>


      </footer>

      {/* ------------------------------------------------------------- */}
      {/* ----------------- SEAMLESS MODAL SLIDE DRAWERS -------------- */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {(drawerOpen && drawerOpen !== "packaging" && drawerOpen !== "lookbook" && drawerOpen !== "contact") && (
          <div className="fixed inset-0 z-50 flex justify-end">
            
            {/* Dark dim overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(null)}
              className="absolute inset-0 bg-black backdrop-blur-xs cursor-crosshair"
            />

            {/* Sidebar window panel */}
            <motion.div 
              initial={{ x: "100%", filter: "brightness(0.5)" }}
              animate={{ x: 0, filter: "brightness(1)" }}
              exit={{ x: "100%", filter: "brightness(0.5)" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="w-full max-w-xl bg-black border-l border-white/10 h-full relative z-10 p-8 md:p-12 shadow-2xl flex flex-col justify-between overflow-y-auto rounded-none"
            >
              
              {/* Close Button top-right */}
              <button 
                onClick={() => setDrawerOpen(null)}
                className="absolute top-6 right-6 p-2.5 rounded-none border border-white/10 bg-black text-zinc-400 hover:text-white hover:border-white transition-colors duration-200"
              >
                <X size={16} />
              </button>

              {/* Drawer Content */}
              <div className="flex-1 mt-8">
                
                {/* 1. TEAM PORTFOLIO DRAWER */}
                {drawerOpen === "team" && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users size={14} className="text-zinc-[400]" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-[400]">{TEXTS.collabNetworks[lang]}</span>
                    </div>
                    <h2 className="text-3xl font-serif mb-6 text-white leading-tight">{TEXTS.teamTitle[lang]}</h2>
                    <p className="text-zinc-400 text-xs sm:text-sm mb-8 leading-relaxed font-sans font-light">
                      {TEXTS.teamSub[lang]}
                    </p>
                    <div className="space-y-4">
                      <div className="bg-black p-4 rounded-none border border-white/10 flex justify-between items-center">
                        <div>
                          <h4 className="font-mono text-xs uppercase text-zinc-300 tracking-wider">Davi Rocha</h4>
                          <p className="text-[10px] text-zinc-[500]">{TEXTS.teamRoleDavi[lang]}</p>
                        </div>
                        <span className="bg-white/5 border border-white/10 text-[9px] px-2.5 py-1 rounded-none text-white font-mono uppercase tracking-widest">{TEXTS.teamLeader[lang]}</span>
                      </div>
                      <div className="bg-black p-4 rounded-none border border-white/10 flex justify-between items-center">
                        <div>
                          <h4 className="font-mono text-xs uppercase text-zinc-300 font-light tracking-wider">AR Shakir</h4>
                          <p className="text-[10px] text-zinc-[650]">{TEXTS.teamRoleMentor[lang]}</p>
                        </div>
                        <span className="bg-white/5 border border-white/10 text-[9px] px-2.5 py-1 rounded-none text-zinc-[500] font-mono uppercase tracking-widest">{TEXTS.teamInspiration[lang]}</span>
                      </div>
                      <div className="bg-black p-4 rounded-none border border-white/10 flex justify-between items-center">
                        <div>
                          <h4 className="font-mono text-xs uppercase text-zinc-[350] font-light tracking-wider">Devs Open Source</h4>
                          <p className="text-[10px] text-zinc-[600]">{TEXTS.teamRoleDevs[lang]}</p>
                        </div>
                        <span className="bg-white/5 border border-white/10 text-[9px] px-2.5 py-1 rounded-none text-zinc-[500] font-mono uppercase tracking-widest">{TEXTS.teamEcosystem[lang]}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. PACKAGING PORTFOLIO DRAWER */}
                {drawerOpen === "packaging" && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Code size={14} className="text-zinc-[400]" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-[400]">{TEXTS.techToolsLabel[lang]}</span>
                    </div>
                    <h2 className="text-3xl font-serif mb-6 text-white leading-tight">{TEXTS.toolsTitle[lang]}<span className="animate-blink inline-block">:</span></h2>
                    <p className="text-zinc-400 text-xs sm:text-sm mb-8 leading-relaxed font-sans font-light">
                      {TEXTS.toolsDesc[lang]}
                    </p>
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                      {TOOLS.map((pkg, idx) => (
                        <div key={idx} className="bg-black p-4.5 rounded-none border border-white/10 flex justify-between items-center hover:border-white/20 transition-all group">
                          <div>
                            <span className="text-[9px] font-mono uppercase bg-white/5 border border-white/10 px-2 py-0.5 text-zinc-400 inline-block mb-1 tracking-wider">
                              {pkg.category}
                            </span>
                            <h4 className="font-mono text-sm text-white tracking-wide font-medium group-hover:text-white transition-colors">{pkg.name}</h4>
                            <p className="text-xs text-zinc-400 mt-1 font-light leading-relaxed">{pkg.desc}</p>
                          </div>
                          <div className="bg-white/5 border border-white/10 p-2.5 ml-4 rounded-none flex items-center justify-center text-zinc-400 group-hover:text-black group-hover:bg-white group-hover:border-white transition-all duration-300 transform group-hover:scale-105">
                            {getTechIcon(pkg.name)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. MANUFACTURING PORTFOLIO DRAWER */}
                {drawerOpen === "manufacturing" && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Settings size={14} className="text-zinc-[400]" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-[400]">{TEXTS.collabNetworks[lang]}</span>
                    </div>
                    <h2 className="text-3xl font-serif mb-6 text-white leading-tight">{TEXTS.mfgTitle[lang]}</h2>
                    <p className="text-zinc-400 text-xs sm:text-sm mb-8 leading-relaxed font-sans font-light">
                      {TEXTS.mfgDesc[lang]}
                    </p>
                    <div className="bg-black p-6 rounded-none border border-white/10 mb-6">
                      <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-300 mb-4 pb-2 border-b border-white/15">{TEXTS.mfgCurrentPl[lang]}</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] font-mono text-zinc-[500] uppercase tracking-widest">Framework</p>
                          <p className="text-xs text-white mt-1">React 19 + TypeScript</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-mono text-zinc-[500] uppercase tracking-widest">{TEXTS.mfgBundler[lang]}</p>
                          <p className="text-xs text-white mt-1">Vite 6 + Esbuild</p>
                        </div>
                        <div className="mt-2">
                          <p className="text-[10px] font-mono text-zinc-[500] uppercase tracking-widest">{TEXTS.mfgStyling[lang]}</p>
                          <p className="text-xs text-white mt-1 font-mono">Tailwind CSS v4 (Pure @import)</p>
                        </div>
                        <div className="mt-2">
                          <p className="text-[10px] font-mono text-zinc-[500] uppercase tracking-widest">{TEXTS.mfgPhysics[lang]}</p>
                          <p className="text-xs text-white mt-1">Motion/React (Physics engines)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. LOOKBOOK DRAWER (PORTFOLIO GALLERY) */}
                {drawerOpen === "lookbook" && (
                  <div className="text-left font-sans">
                    <span className="bg-white/5 text-zinc-400 px-2.5 py-1 text-[9px] font-mono border border-white/10 rounded-none uppercase tracking-widest">
                      {TEXTS.lookbookSubtitle[lang]}
                    </span>
                    <h2 className="text-4xl font-serif text-white tracking-tight my-4">{TEXTS.lookbookTitle[lang]}<span className="animate-blink inline-block">:</span></h2>
                    <p className="text-zinc-400 text-xs sm:text-sm mb-8 font-light max-w-sm">
                      {TEXTS.lookbookDesc[lang]}
                    </p>
                    <div className="space-y-6">
                      {REAL_PROJECTS.map((project, index) => (
                        <div key={index} className="bg-black p-6 rounded-none border border-white/10 group hover:border-white/30 transition-colors flex flex-col justify-between">
                          <div>
                            <div className="w-full h-40 overflow-hidden mb-4 border border-white/10 relative bg-zinc-900">
                              <img 
                                src={project.image} 
                                alt={project.title} 
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                            </div>
                            <div className="flex justify-between items-baseline mb-2">
                              <h3 className="font-mono text-sm text-white group-hover:text-zinc-300 transition-colors tracking-wide font-semibold">
                                {project.title}
                              </h3>
                              <span className="font-mono text-[10px] text-zinc-500">{project.year}</span>
                            </div>
                            <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4">
                              {project.description}
                            </p>
                          </div>
                          <div className="flex justify-end items-center text-[10px] font-mono text-zinc-500 pt-2 border-t border-white/10">
                            <a 
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-zinc-[455] group-hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              {TEXTS.lookbookExplore[lang]} <ExternalLink size={10} />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. CONTACT INQUIRY DRAWER */}
                {drawerOpen === "contact" && (
                  <div>
                    <span className="bg-white/5 text-zinc-400 px-2.5 py-1 text-[9px] font-mono border border-white/10 rounded-none uppercase tracking-widest">
                      {TEXTS.contactLabel[lang]}
                    </span>
                    <h2 className="text-3xl font-serif text-white my-4">{TEXTS.contactTitle[lang]}<span className="animate-blink inline-block">:</span></h2>
                    <p className="text-zinc-400 text-xs mb-8 leading-relaxed font-light">
                      {TEXTS.contactDesc[lang]}
                    </p>

                    <form onSubmit={handleInquirySubmit} className="space-y-4 mb-8">
                      <div>
                        <label className="block text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">{TEXTS.contactName[lang]}</label>
                        <input 
                          type="text" 
                          required
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          placeholder={TEXTS.placeholderName[lang]}
                          className="w-full bg-black border border-white/10 rounded-none p-3 text-xs focus:outline-none focus:border-white text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">{TEXTS.contactEmail[lang]}</label>
                        <input 
                          type="email" 
                          required
                          value={inquiryEmail}
                          onChange={(e) => setInquiryEmail(e.target.value)}
                          placeholder="exemplo@dominio.com"
                          className="w-full bg-black border border-white/10 rounded-none p-3 text-xs focus:outline-none focus:border-white text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">{TEXTS.contactDetails[lang]}</label>
                        <textarea 
                          rows={4}
                          required
                          value={inquiryMsg}
                          onChange={(e) => setInquiryMsg(e.target.value)}
                          placeholder={TEXTS.placeholderMsg[lang]}
                          className="w-full bg-black border border-white/10 rounded-none p-3 text-xs focus:outline-none focus:border-white text-white font-mono resize-none"
                        />
                      </div>
                      
                      <button 
                        type="submit"
                        className="w-full bg-white text-black hover:bg-zinc-200 text-xs font-mono font-bold uppercase tracking-[0.2em] py-4 rounded-none transition-colors border border-white active:scale-98"
                      >
                        {TEXTS.sendEmail[lang]}
                      </button>
                    </form>

                    {inquirySubmitted && (
                      <div className="bg-emerald-950/20 border border-emerald-800 p-4 rounded-none text-xs text-emerald-400 mb-6 flex items-center gap-2 font-mono uppercase tracking-wider">
                        <CheckCircle size={14} className="text-emerald-500 animate-bounce" />
                        <span>{TEXTS.successMsg[lang]}</span>
                      </div>
                    )}

                    {/* WhatsApp Direct Contact Option */}
                    <div className="mt-8 pt-8 border-t border-white/10">
                      <span className="text-[9px] font-mono tracking-[0.3em] text-zinc-500 uppercase block mb-3">
                        {TEXTS.instantContact[lang]}
                      </span>
                      <a 
                        href="https://w.app/q79kq1" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between bg-emerald-950/15 border border-emerald-800/30 hover:border-emerald-500/60 p-4.5 rounded-none transition-all group"
                      >
                        <div>
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <h4 className="font-mono text-xs uppercase text-emerald-400 tracking-wider font-semibold">{TEXTS.whatsappTitle[lang]}</h4>
                          </div>
                          <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
                            {TEXTS.whatsappDesc[lang]}
                          </p>
                        </div>
                        <ArrowRight size={14} className="text-emerald-500 group-hover:translate-x-1.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                )}

                {/* 6. CHARACTER PRECISION AUDIT DRAWERS (THE CORE SOUL) */}
                {drawerOpen === "audit" && (
                  <div>
                    <span className="bg-white/5 text-zinc-400 px-2.5 py-1 text-[9px] font-mono border border-white/10 rounded-none uppercase tracking-widest flex items-center gap-1.5 w-fit">
                      <Sparkles size={11} className="text-amber-400 animate-pulse" />
                      <span>{TEXTS.auditLabel[lang]}</span>
                    </span>
                    <h2 className="text-3xl font-serif text-white my-4 leading-tight">{TEXTS.auditTitle[lang]}</h2>
                    <p className="text-zinc-400 text-xs mb-6 leading-relaxed font-sans font-light">
                      {TEXTS.auditDesc[lang]}
                    </p>

                    <div className="space-y-4">
                      
                      {/* Subtitle Check */}
                      <div className="bg-black p-4 rounded-none border border-white/10">
                        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 mb-2">
                          <span className="tracking-wider">{TEXTS.auditDesignerSub[lang]}</span>
                          <span className="text-emerald-[450] font-bold bg-emerald-950/20 px-2 py-0.5 rounded-none border border-emerald-800 text-[10px] tracking-wider uppercase">{TEXTS.passed[lang]}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">{TEXTS.auditOriginal[lang]} (AR SHAKIR)</p>
                            <p className="font-mono text-zinc-400 mt-1">{targetCounts.subtitle.original}</p>
                            <p className="text-[10px] text-zinc-500 font-mono mt-1">{TEXTS.auditChars[lang]}: {targetCounts.subtitle.originalLen}</p>
                          </div>
                          <div className="border-l border-white/10 pl-3">
                            <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">{TEXTS.auditSub[lang]} (Davi)</p>
                            <span className="font-mono text-white italic tracking-wide mt-1 block">{targetCounts.subtitle.label}</span>
                            <p className="text-[10px] text-white font-mono mt-1">{TEXTS.auditChars[lang]}: {targetCounts.subtitle.targetLen}</p>
                          </div>
                        </div>
                      </div>

                      {/* Title Check */}
                      <div className="bg-black p-4 rounded-none border border-white/10">
                        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 mb-2">
                          <span className="tracking-wider">{TEXTS.auditMainBrand[lang]}</span>
                          <span className="text-emerald-[450] font-bold bg-emerald-950/20 px-2 py-0.5 rounded-none border border-emerald-800 text-[10px] tracking-wider uppercase">{TEXTS.passed[lang]}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">{TEXTS.auditOriginal[lang]} (Tooni)</p>
                            <p className="font-serif text-zinc-400 text-lg uppercase leading-none mt-1">{targetCounts.title.original}</p>
                            <p className="text-[10px] text-zinc-500 font-mono mt-1">{TEXTS.auditChars[lang]}: {targetCounts.title.originalLen}</p>
                          </div>
                          <div className="border-l border-white/10 pl-3">
                            <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">{TEXTS.auditSub[lang]} (Davi)</p>
                            <p className="font-serif text-white text-lg lowercase leading-none mt-1">{targetCounts.title.label}</p>
                            <p className="text-[10px] text-white font-mono mt-1">{TEXTS.auditChars[lang]}: {targetCounts.title.targetLen}</p>
                          </div>
                        </div>
                      </div>

                      {/* Paragraph Check */}
                      <div className="bg-black p-4 rounded-none border border-white/10">
                        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 mb-2">
                          <span className="tracking-wider">{TEXTS.auditMainParagraph[lang]}</span>
                          <span className="text-emerald-[450] font-bold bg-emerald-950/20 px-2 py-0.5 rounded-none border border-emerald-800 text-[10px] tracking-wider uppercase">{TEXTS.flexCompatible[lang]}</span>
                        </div>
                        <p className="text-[9px] font-mono text-zinc-[650] tracking-wider mb-1">{TEXTS.activePreview[lang]}</p>
                        <p className="bg-black text-zinc-300 p-2.5 text-xs rounded-none border border-white/10 font-mono mb-2">
                          "{currentCategory.paragraph}"
                        </p>
                        <div className="flex justify-between text-[10px] font-mono">
                          <span className="text-zinc-[600]">{TEXTS.auditOriginalLen[lang]}</span>
                          <span className="text-white">{TEXTS.daviAdapt[lang]}: {currentCategory.paragraph.length} {TEXTS.auditChars[lang].toLowerCase()}</span>
                        </div>
                      </div>

                      {/* Button Action Check */}
                      <div className="bg-black p-4 rounded-none border border-white/10">
                        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 mb-2">
                          <span className="tracking-wider">{TEXTS.auditButtonAction[lang]}</span>
                          <span className="text-emerald-[450] font-bold bg-emerald-950/20 px-2 py-0.5 rounded-none border border-emerald-800 text-[10px] tracking-wider uppercase">{TEXTS.passed[lang]}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                          <div>
                            <p className="text-[9px] text-zinc-[600] uppercase tracking-widest">{TEXTS.auditOriginal[lang]}</p>
                            <p className="text-zinc-400 text-[10px] mt-1">{targetCounts.actionCart.original}</p>
                            <p className="text-[10px] text-zinc-500 mt-1">{TEXTS.auditChars[lang]}: {targetCounts.actionCart.originalLen}</p>
                          </div>
                          <div className="border-l border-white/10 pl-3">
                            <p className="text-[9px] text-zinc-[650] uppercase tracking-widest">{TEXTS.auditSub[lang]}</p>
                            <p className="text-white text-[10px] mt-1">{targetCounts.actionCart.label}</p>
                            <p className="text-[10px] text-white mt-1">{TEXTS.auditChars[lang]}: {targetCounts.actionCart.targetLen}</p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

              </div>

              {/* Drawer footer link */}
              <div className="pt-8 border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                <span>Davi Rocha - Portfólio 2026</span>
                <button 
                  onClick={() => setDrawerOpen(null)}
                  className="text-white hover:underline"
                >
                  fechar
                </button>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
