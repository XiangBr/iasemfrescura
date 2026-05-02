import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  X,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import { StarsBackground } from './StarsBackground';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [chatPhase, setChatPhase] = useState(0);
  const words = [  "Na Prática","Sem frescura", "De Verdade", "Com Resultado"];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const interval = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const durations = [4000, 1200, 4000, 1200, 4500];
    let phase = 0;
    let tid: ReturnType<typeof setTimeout>;
    const tick = () => {
      phase = (phase + 1) % durations.length;
      setChatPhase(phase);
      tid = setTimeout(tick, durations[phase]);
    };
    tid = setTimeout(tick, durations[0]);
    return () => clearTimeout(tid);
  }, []);

  const testimonialRows = [
    [
      { name: "Ana Paula S.", initials: "AP", color: "#7C3AED", time: "10:23", rotation: -4,
        msgs: ["Gente, o workshop foi INCRÍVEL 😍", "Em 1 dia aprendi mais do que em meses tentando sozinha", "Já criei minha landing page do zero!"] },
      { name: "Carlos M.", initials: "CM", color: "#0891B2", time: "14:45", rotation: 3,
        msgs: ["Valeu cada centavo 🙌", "O funil que montei já converteu 3x o valor investido"] },
      { name: "Fernanda T.", initials: "FT", color: "#059669", time: "09:12", rotation: -2,
        msgs: ["Nunca pensei que ia conseguir criar uma LP completa em um dia", "Michel e Lucas são ÓTIMOS professores 👏", "Muito prático e direto ao ponto"] },
      { name: "Rafael O.", initials: "RO", color: "#DC2626", time: "16:30", rotation: 5,
        msgs: ["Melhor investimento do ano sem dúvida 🔥", "Já apliquei pra 3 clientes e eles amaram"] },
    ],
    [
      { name: "Juliana K.", initials: "JK", color: "#EA580C", time: "11:55", rotation: -3,
        msgs: ["Recomendei pra toda minha equipe!", "O conteúdo é muito denso mas bem explicado", "Replay é essencial, já assisti 2x 🎯"] },
      { name: "Marcos A.", initials: "MA", color: "#0D9488", time: "13:20", rotation: 2,
        msgs: ["A automação de conteúdo mudou meu negócio", "Consigo criar posts, carrosséis e roteiros em minutos 🚀"] },
      { name: "Bianca L.", initials: "BL", color: "#BE185D", time: "18:05", rotation: -5,
        msgs: ["Que workshop incrível!! Muito prático mesmo 🙏", "Saí com tudo pronto no mesmo dia ✅"] },
      { name: "Diego R.", initials: "DR", color: "#1D4ED8", time: "08:44", rotation: 4,
        msgs: ["Achei que ia ser mais teoria, mas não!", "100% mão na massa desde o começo 💪", "Super recomendo para qualquer área!"] },
    ],
  ];

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-[#070D0D] relative selection:bg-brand-tag text-brand-text">
      {/* Artistic Flair Dots Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-screen bg-dots z-0"></div>

      {/* Claude Floaters */}
      <div className="claude-floaters">
        <div className="claude-symbol" style={{ top: '10%', right: '10%', '--dur': '8s', '--delay': '0s', '--spin': '20s' } as any}>
          <img src="/claude_logo.png" alt="star" className="w-8 h-8 md:w-12 md:h-12" />
        </div>
        <div className="claude-symbol" style={{ top: '60%', right: '5%', '--dur': '12s', '--delay': '2s', '--spin': '35s' } as any}>
          <img src="/claude_logo.png" alt="star" className="w-10 h-10 md:w-16 md:h-16" />
        </div>
        <div className="claude-symbol" style={{ bottom: '15%', right: '30%', '--dur': '10s', '--delay': '4s', '--spin': '45s' } as any}>
          <img src="/claude_logo.png" alt="star" className="w-6 h-6 md:w-10 md:h-10" />
        </div>
        <div className="claude-symbol" style={{ top: '25%', left: '5%', '--dur': '9s', '--delay': '1s', '--spin': '30s' } as any}>
          <img src="/claude_logo.png" alt="star" className="w-12 h-12 md:w-20 md:h-20" />
        </div>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
          isScrolled ? 'bg-[#070D0D]/90 backdrop-blur-md border-white/5 shadow-lg py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <img src="/claude_logo.png" alt="Claude" className="w-8 h-8 rounded-lg brightness-110" />
             <a href="#" className="font-serif text-2xl text-brand-accent italic font-semibold">
              Claude Sem Frescura
            </a>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[0.2em] uppercase text-brand-text opacity-70">
            <a href="#workshop" className="hover:text-brand-accent transition-colors">O Workshop</a>
            <a href="#mentores" className="hover:text-brand-accent transition-colors">Mentores</a>
            <a href="#programacao" className="hover:text-brand-accent transition-colors">Programação</a>
            <a href="#preco" className="hover:text-brand-accent transition-colors">Preço</a>
          </div>

          <a
            href="#preco"
            className="bg-brand-accent hover:bg-brand-accent-hover text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-brand-accent/20 active:scale-95"
          >
            Garantir Vaga
          </a>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden noise-overlay min-h-screen flex items-center bg-linear-to-br from-[#070D0D] via-[#3E2723]/20 to-[#420D19]/30">
          <StarsBackground className="absolute inset-0 w-full h-full pointer-events-none" starColor="#FFF7EC" starCount={600} />
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              className="z-20"
            >
              <div className="flex flex-col items-center md:items-start gap-4 mb-8">
                <div className="bg-[#FFF7EC] px-5 py-2.5 rounded-full inline-flex items-center shadow-md shadow-black/20">
                  <img src="/claude_logo_complete.png" alt="Claude" className="h-7 md:h-8" />
                </div>
                <span className="inline-block bg-brand-tag text-brand-accent text-[10px] font-bold tracking-[0.2em] px-4 py-1.5 rounded-full uppercase border border-brand-accent/20">
                  Workshop 100% Prático
                </span>
              </div>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-8xl text-brand-text leading-[0.9] mb-8 tracking-tighter text-center md:text-left">
              Domine o Claude<br />
                <span className="relative inline-block overflow-hidden h-[1.1em] align-top w-full sm:w-auto sm:min-w-[500px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeWordIndex}
                      initial={{ y: 60, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -60, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute italic text-brand-accent w-full text-center md:text-left left-0"
                    >
                      {words[activeWordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h1>

              <p className="text-brand-text/70 text-lg sm:text-xl md:text-2xl mb-12 max-w-lg leading-relaxed font-light text-center md:text-left mx-auto md:mx-0">
                Aprenda Claude do zero ao avançado em 1 dia — com aplicações reais para o seu negócio.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-14 px-4 sm:px-0">
                <a
                  href="#preco"
                  className="bg-brand-accent hover:bg-brand-accent-hover text-white px-8 sm:px-10 py-5 rounded-full text-lg font-bold flex items-center justify-center gap-3 transition-all shadow-2xl shadow-brand-accent/30 hover:scale-105 active:scale-95 w-full sm:w-auto"
                >
                  Quero minha vaga <ArrowRight size={22} />
                </a>
                <a
                  href="#programacao"
                  className="border border-white/10 hover:border-brand-accent/50 text-white px-8 sm:px-10 py-5 rounded-full text-lg font-bold flex items-center justify-center transition-all bg-white/5 backdrop-blur-md w-full sm:w-auto"
                >
                  Ver programação
                </a>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-y-4 gap-x-8 text-[10px] sm:text-[11px] font-bold text-brand-text opacity-40 tracking-[0.1em] uppercase">
                <span className="flex items-center gap-2.5">📅 Online ao vivo</span>
                <span className="flex items-center gap-2.5">⏰ 10h às 18h</span>
                <span className="flex items-center gap-2.5">🎯 100% Prático</span>
                <span className="flex items-center gap-2.5">✅ Replay disponível</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
              className="relative z-20"
            >
              <div className="laptop">
                <div className="laptop__bezel">
                  <div className="laptop__camera"></div>
                  <div className="laptop__screen">
                    <div className="laptop__topbar">
                      <div className="laptop__dot laptop__dot--red"></div>
                      <div className="laptop__dot laptop__dot--yellow"></div>
                      <div className="laptop__dot laptop__dot--green"></div>
                      <div className="laptop__url">claude.ai</div>
                    </div>

                    <div className="laptop__content">
                      <div className="claude-ui__header">
                        <img className="claude-ui__logo" src="/claude_logo.png" alt="Claude logo" />
                        <div>
                          <div className="claude-ui__title italic font-serif">Claude</div>
                          <div className="claude-ui__subtitle uppercase tracking-widest font-bold opacity-60">Seu assistente de IA</div>
                        </div>
                      </div>

                      <AnimatePresence mode="wait">
                        {/* Phase 0: Carousel */}
                        {chatPhase === 0 && (
                          <motion.div key="conv-carousel" className="flex flex-col gap-3"
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.35 }}>
                            <div className="claude-ui__msg claude-ui__msg--user">
                              Crie um carrossel dinâmico para meu Instagram sobre IA para negócios.
                            </div>
                            <div className="claude-ui__msg claude-ui__msg--claude">
                              Aqui estão os slides do seu carrossel:
                            </div>
                            <div className="claude-ui__carousel">
                              <div className="claude-ui__carousel-track">
                                {["🎯 Hook", "😤 Problema", "✅ Solução", "🚀 CTA", "🎯 Hook", "😤 Problema", "✅ Solução", "🚀 CTA"].map((label, i) => (
                                  <div key={i} className="w-[80px] h-[100px] bg-brand-tag/30 rounded-md border border-white/10 flex items-center justify-center p-2 text-center text-[9px] uppercase font-bold text-brand-accent tracking-tighter shrink-0">
                                    {label}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Phase 1 & 3: User typing */}
                        {(chatPhase === 1 || chatPhase === 3) && (
                          <motion.div key="typing" className="flex flex-col gap-3"
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25 }}>
                            <div className="claude-ui__msg claude-ui__msg--user self-end flex gap-1 items-center">
                              {[0, 1, 2].map(i => (
                                <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#FFF7EC]/60"
                                  style={{ animation: `typingBounce 1.2s ease-in-out ${i * 0.15}s infinite` }} />
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Phase 2: Video scripts */}
                        {chatPhase === 2 && (
                          <motion.div key="conv-scripts" className="flex flex-col gap-3"
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.35 }}>
                            <div className="claude-ui__msg claude-ui__msg--user">
                              Gere 3 roteiros de vídeo curtos sobre produtividade com IA.
                            </div>
                            <div className="claude-ui__msg claude-ui__msg--claude flex flex-col gap-1.5">
                              {[
                                "📽 Como economizar 2h/dia com IA",
                                "📽 5 prompts que mudaram meu negócio",
                                "📽 Do zero ao expert em IA: 7 dias"
                              ].map((script, i) => (
                                <div key={i} className="text-[11px] font-medium">{script}</div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Phase 4: Google Drive analysis */}
                        {chatPhase === 4 && (
                          <motion.div key="conv-drive" className="flex flex-col gap-3"
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.35 }}>
                            <div className="claude-ui__msg claude-ui__msg--user">
                              Analise a documentação dos clientes no Drive e traga uma análise de proposta.
                            </div>
                            <div className="claude-ui__msg claude-ui__msg--claude flex items-start gap-2.5">
                              <svg className="w-5 h-5 shrink-0 mt-0.5" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
                                <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
                                <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0-1.2 4.5h27.5z" fill="#00ac47"/>
                                <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
                                <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
                                <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
                                <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 27h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
                              </svg>
                              <div>
                                <div className="text-[11px] font-semibold text-[#e8e8e8] mb-1">Acessando Google Drive...</div>
                                <div className="text-[10px] text-[#888] flex items-center gap-1.5">
                                  <span className="w-3 h-3 border border-[#555] border-t-brand-accent rounded-full animate-spin shrink-0" />
                                  Analisando documentos dos clientes
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
                <div className="laptop__bottom"></div>
                <div className="laptop__base"></div>
                <div className="laptop__shadow"></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* "Para Quem É" Section */}
        <section id="para-quem" className="py-24 bg-[#FFF7EC]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              className="text-center mb-16"
            >
              <span className="inline-block px-3 py-1 bg-brand-tag text-brand-accent text-xs font-bold tracking-widest rounded-full mb-4 border border-brand-accent/20 uppercase">
                PARA QUEM É
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#070D0D] mb-4">Você está no lugar certo se...</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Já usa IA mas ainda faz as mesmas tarefas manualmente",
                "Quer criar landing pages e funis sem depender de dev",
                "Usa ChatGPT básico e quer evoluir de verdade",
                "Precisa automatizar copy, posts e roteiros com qualidade",
                "Quer entender por que o Claude performa melhor que outros modelos",
                "Busca aplicações práticas, não teoria de livro"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#070D0D]/5 p-8 rounded-2xl hover:bg-[#070D0D]/10 hover:translate-y-[-4px] transition-all flex items-start gap-4 border border-[#070D0D]/10"
                >
                  <div className="bg-brand-tag p-1.5 rounded-full text-brand-accent mt-1">
                    <Check size={18} strokeWidth={3} />
                  </div>
                  <p className="text-lg font-medium text-[#070D0D] leading-tight">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* "O Que Você Vai Construir" Section */}
        <section id="workshop" className="py-24 bg-[#0A0F0F] relative overflow-hidden">
          <StarsBackground className="absolute inset-0 w-full h-full pointer-events-none opacity-60" starColor="#FFF7EC" starCount={110} />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              className="text-center mb-16"
            >
              <span className="inline-block px-3 py-1 bg-brand-tag text-brand-accent text-xs font-bold tracking-widest rounded-full mb-4 border border-brand-accent/20 uppercase">
                NO DIA DO WORKSHOP
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Você sai com isso pronto:</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  id: "01",
                  title: "Landing Page Funcional",
                  desc: "Do zero: copy, estrutura e deploy — tudo com Claude"
                },
                {
                  id: "02",
                  title: "Funil de Vendas Automatizado",
                  desc: "Sequência de e-mails e checkout integrado, gerado via IA"
                },
                {
                  id: "03",
                  title: "Máquina de Conteúdo",
                  desc: "Templates de posts, carrosséis e roteiros em segundos"
                },
                {
                  id: "04",
                  title: "Automações Reais",
                  desc: "Conecte Claude a processos do seu negócio sem código"
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group glass3d p-10 rounded-3xl relative overflow-hidden transition-all border border-white/10"
                >
                  {/* single direct child so .glass3d > * z-index rule applies here */}
                  <div className="relative">
                    <span className="font-serif text-7xl text-brand-accent/20 absolute top-0 right-0 font-black group-hover:text-brand-accent/35 transition-colors pointer-events-none select-none">
                      {item.id}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-white mb-4">{item.title}</h3>
                    <p className="text-white/70 text-lg leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Programação */}
        <section id="programacao" className="py-24 bg-[#FFF7EC] relative overflow-hidden">
          <div className="max-w-3xl mx-auto px-6 relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              className="text-center mb-20"
            >
              <span className="inline-block px-3 py-1 bg-brand-tag text-brand-accent text-xs font-bold tracking-widest rounded-full mb-4 border border-brand-accent/20 uppercase">
                PROGRAMAÇÃO
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-[#070D0D] mb-4 italic">Um dia completo, sem enrolação</h2>
            </motion.div>

            <div className="space-y-12">
              {[
                { time: "10h00", title: "Abertura & Fundamentos", desc: "Interface do Claude: chat, projects, cowork e code" },
                { time: "11h00", title: "Claude vs Outros Modelos", desc: "Comparativo prático: quando usar cada um" },
                { time: "13h00", title: "Construindo Landing Pages", desc: "Do briefing ao ar em tempo real" },
                { time: "14h30", title: "Funis, Checkouts e Copy", desc: "Automação completa de um funil de vendas" },
                { time: "16h00", title: "Conteúdo em Escala", desc: "Posts, roteiros e materiais em minutos" },
                { time: "17h30", title: "Automações Avançadas", desc: "Casos práticos + Q&A ao vivo" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 md:gap-10 border-l-2 border-brand-accent/20 pl-8 relative"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-brand-accent border-4 border-[#FFF7EC] shadow-sm shadow-brand-accent/20"></div>
                  <div className="flex-shrink-0 pt-0.5">
                    <span className="text-brand-accent font-bold font-serif text-xl">{item.time}</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#070D0D] mb-2 leading-tight">{item.title}</h4>
                    <p className="text-[#070D0D]/55">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mentors Section */}
        <section id="mentores" className="py-24 md:py-32 bg-[#0A0F0F] relative overflow-hidden">
          <StarsBackground className="absolute inset-0 w-full h-full pointer-events-none opacity-50" starColor="#FFF7EC" starCount={100} />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
             <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={revealVariants}
                className="text-center mb-16 md:20"
              >
                <span className="inline-block px-4 py-1.5 bg-brand-tag text-brand-accent text-[10px] font-bold tracking-[0.2em] rounded-full mb-6 border border-brand-accent/20 uppercase">
                  INSTRUTORES
                </span>
                <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Seus mentores nessa imersão</h2>
                <p className="text-white/50 max-w-2xl mx-auto text-base md:text-lg leading-relaxed px-4">
                  Experiência real em centros de pesquisa alemães e construção de produtos de IA que escalam.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                {/* Michel */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 p-2 rounded-[32px] overflow-hidden group hover:border-brand-accent/30 transition-all duration-500"
                >
                  <div className="bg-[#111] p-8 md:p-10 rounded-[28px] h-full flex flex-col lg:flex-row gap-8 md:gap-10 items-center lg:items-start transition-all group-hover:bg-[#151515]">
                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shrink-0 border-2 border-brand-accent/20 group-hover:border-brand-accent transition-colors">
                      <img src="/michel.png" alt="Michel Hilgemberg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 text-center lg:text-left">
                      <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 italic">Michel Hilgemberg</h3>
                      <div className="w-12 h-1 bg-brand-accent/30 mb-6 group-hover:w-20 transition-all mx-auto lg:mx-0"></div>
                      <ul className="space-y-4 text-left">
                        {[
                          "Engenheiro Mecânico pela UFPR (1° lugar da turma)",
                          "Pós graduado em IA pela FIAP",
                          "Intercâmbio na RWTH - Alemanha",
                          "AI Assistant no Fraunhofer IPT (Instituto Alemão)"
                        ].map((bullet, i) => (
                          <li key={i} className="flex items-start gap-3 text-white/80 leading-snug font-medium">
                            <Check size={18} className="text-brand-accent shrink-0 mt-0.5" />
                            <span className="text-sm">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Lucas */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/5 border border-white/10 p-2 rounded-[32px] overflow-hidden group hover:border-brand-accent/30 transition-all duration-500"
                >
                  <div className="bg-[#111] p-8 md:p-10 rounded-[28px] h-full flex flex-col lg:flex-row gap-8 md:gap-10 items-center lg:items-start transition-all group-hover:bg-[#151515]">
                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden shrink-0 border-2 border-brand-accent/20 group-hover:border-brand-accent transition-colors">
                      <img src="/lucas.png" alt="Lucas Xiang Yu" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 text-center lg:text-left">
                      <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 italic">Lucas Xiang Yu</h3>
                      <div className="w-12 h-1 bg-brand-accent/30 mb-6 group-hover:w-20 transition-all mx-auto lg:mx-0"></div>
                      <ul className="space-y-4 text-left">
                        {[
                          "Engenheiro Mecânico pela UFPR (3° lugar da turma)",
                          "Intercâmbio na RWTH - Alemanha",
                          "Manufacturing Assistant no Fraunhofer IPT (Instituto Alemão)",
                          "Co-founder Dinno.chat"
                        ].map((bullet, i) => (
                          <li key={i} className="flex items-start gap-3 text-white/80 leading-snug font-medium">
                            <Check size={18} className="text-brand-accent shrink-0 mt-0.5" />
                            <span className="text-sm">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section id="depoimentos" className="py-20 bg-[#070D0D] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-14">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              className="text-center"
            >
              <span className="inline-block px-3 py-1 bg-brand-tag text-brand-accent text-xs font-bold tracking-widest rounded-full mb-4 border border-brand-accent/20 uppercase">
                DEPOIMENTOS
              </span>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-3">O que estão falando</h2>
              <p className="text-white/50 text-lg">Prints direto do WhatsApp — sem edição, sem roteiro.</p>
            </motion.div>
          </div>

          <div className="space-y-5">
            {testimonialRows.map((row, rowIndex) => (
              <div key={rowIndex} className="overflow-hidden py-3">
                <div className={`flex gap-5 px-2 ${rowIndex === 0 ? 'testimonials-track-left' : 'testimonials-track-right'}`}>
                  {[...row, ...row].map((t, i) => (
                    <div
                      key={i}
                      className="shrink-0 w-[230px] sm:w-[260px] rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
                      style={{ transform: `rotate(${t.rotation}deg)` }}
                    >
                      <div className="bg-[#075E54] px-3 py-2.5 flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
                          style={{ backgroundColor: t.color }}
                        >
                          {t.initials}
                        </div>
                        <div>
                          <div className="text-white text-[13px] font-semibold leading-none">{t.name}</div>
                          <div className="text-[#B2DFDB] text-[10px] mt-0.5">online</div>
                        </div>
                      </div>
                      <div className="bg-[#E5DDD5] px-3 py-3 space-y-2">
                        {t.msgs.map((msg, mi) => (
                          <div key={mi} className="flex justify-start">
                            <div className="bg-white rounded-xl rounded-tl-[4px] px-3 py-2 max-w-[90%] shadow-sm">
                              <p className="text-[12px] text-gray-800 leading-snug">{msg}</p>
                              <div className="text-[9px] text-gray-400 text-right mt-1">{t.time} ✓✓</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="preco" className="py-24 bg-[#FFF7EC]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
            >
              <h2 className="text-5xl md:text-6xl font-serif mb-16 italic text-[#070D0D]">Garanta sua vaga</h2>

              {/* Two-card layout */}
              <div className="flex flex-col md:flex-row items-start gap-6 max-w-5xl mx-auto mb-10">

                {/* Card 1 — Workshop */}
                <div className="flex-1 w-full bg-white text-[#070D0D] p-8 rounded-3xl relative shadow-xl shadow-[#070D0D]/10 border border-[#070D0D]/10">
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#070D0D] text-white px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase shadow-lg whitespace-nowrap">
                    Workshop
                  </span>

                  <div className="flex flex-wrap items-center justify-center gap-3 mb-2 mt-2">
                    <span className="text-4xl font-bold text-brand-accent">R$ 49,90</span>
                  </div>

                  <hr className="mb-6 mt-6 border-[#070D0D]/10" />

                  <ul className="text-left space-y-3 mb-8 text-sm">
                    <li className="flex items-center gap-3 text-[#070D0D] font-medium">
                      <Check size={16} className="text-brand-accent shrink-0" strokeWidth={3} /> 8h de treinamento ao vivo
                    </li>
                    <li className="flex items-center gap-3 text-[#070D0D] font-medium">
                      <Check size={16} className="text-brand-accent shrink-0" strokeWidth={3} /> Gravação por 12 meses
                    </li>
                    <li className="flex items-center gap-3 text-[#070D0D] font-medium">
                      <Check size={16} className="text-brand-accent shrink-0" strokeWidth={3} /> Materiais e templates
                    </li>
                    <li className="flex items-center gap-3 text-[#070D0D]/30 line-through">
                      <X size={16} className="text-[#070D0D]/30 shrink-0" strokeWidth={2.5} /> Mentoria personalizada
                    </li>
                    <li className="flex items-center gap-3 text-[#070D0D]/30 line-through">
                      <X size={16} className="text-[#070D0D]/30 shrink-0" strokeWidth={2.5} /> Acompanhamento semanal
                    </li>
                    <li className="flex items-center gap-3 text-[#070D0D]/30 line-through">
                      <X size={16} className="text-[#070D0D]/30 shrink-0" strokeWidth={2.5} /> Aplicação no seu negócio
                    </li>
                  </ul>

                  <button className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-brand-accent/20 flex items-center justify-center gap-2 active:scale-95">
                    Quero o ingresso <ArrowRight size={18} />
                  </button>
                  <p className="mt-3 text-[11px] text-[#070D0D]/35 text-center">Pagamento seguro · Garantia de 7 dias</p>
                </div>

                {/* Between-cards text */}
                <div className="w-full md:w-36 shrink-0 md:self-center py-2 md:py-0">
                  <p className="text-sm italic text-[#070D0D]/50 text-center leading-relaxed">
                    "A diferença entre os planos não é o conteúdo — é a velocidade. No Workshop você aprende. Na Mentoria você implementa, com alguém do seu lado."
                  </p>
                </div>

                {/* Card 2 — Workshop + Mentoria */}
                <div className="flex-1 w-full bg-[#070D0D] text-white p-8 rounded-3xl relative shadow-2xl border border-brand-accent/25">
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-accent text-white px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase shadow-lg whitespace-nowrap">
                    Mais Popular
                  </span>

                  <p className="text-sm text-white/55 italic text-center mb-4 mt-2">
                    Menos de R$ 38/semana com um especialista no seu negócio.
                  </p>

                  <div className="flex items-center justify-center gap-3 mb-1">
                    <span className="text-4xl font-bold text-brand-accent">R$ 197</span>
                  </div>
                  <p className="text-white/35 text-[12px] text-center mb-6">Workshop + 2 encontros de mentoria</p>

                  <hr className="mb-6 border-white/10" />

                  <ul className="text-left space-y-3 mb-8 text-sm">
                    <li className="flex items-start gap-3 text-white font-bold">
                      <Check size={16} className="text-brand-accent shrink-0 mt-0.5" strokeWidth={3} /> Tudo do Ingresso, mais:
                    </li>
                    <li className="flex items-start gap-3 text-white/75 font-medium">
                      <Check size={16} className="text-brand-accent shrink-0 mt-0.5" strokeWidth={3} /> 2 encontros ao vivo de 1h com mentor
                    </li>
                    <li className="flex items-start gap-3 text-white/75 font-medium">
                      <Check size={16} className="text-brand-accent shrink-0 mt-0.5" strokeWidth={3} /> Aplicação direta no seu negócio
                    </li>
                    <li className="flex items-start gap-3 text-white/75 font-medium">
                      <Check size={16} className="text-brand-accent shrink-0 mt-0.5" strokeWidth={3} /> Revisão dos seus prompts e automações
                    </li>
                    <li className="flex items-start gap-3 text-white/75 font-medium">
                      <Check size={16} className="text-brand-accent shrink-0 mt-0.5" strokeWidth={3} /> Acesso direto via WhatsApp
                    </li>
                    <li className="flex items-start gap-3 text-white/75 font-medium">
                      <Check size={16} className="text-brand-accent shrink-0 mt-0.5" strokeWidth={3} /> Plano de implementação personalizado
                    </li>
                  </ul>

                  <button className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white py-5 rounded-2xl text-lg font-bold transition-all shadow-xl shadow-brand-accent/30 flex items-center justify-center gap-2 active:scale-95">
                    Quero Workshop + Mentoria <ArrowRight size={20} />
                  </button>
                  <p className="mt-3 text-[11px] text-white/30 text-center">Pagamento seguro · Garantia de 7 dias · Vagas limitadas</p>
                </div>
              </div>

              {/* Below both cards */}
              <p className="text-sm text-[#070D0D]/45 text-center max-w-md mx-auto leading-relaxed">
                🔒 Garantia incondicional de 7 dias. Se não for o que esperava, devolvemos 100% — sem perguntas.
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 bg-[#070D0D]">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-serif text-white text-center mb-16 italic">Perguntas frequentes</h2>

            <div className="space-y-4">
              {[
                { q: "Preciso saber programar para participar?", a: "Não. O workshop é 100% prático e acessível para qualquer pessoa. Nenhuma linha de código é necessária." },
                { q: "O workshop é ao vivo ou gravado?", a: "Ao vivo, das 10h às 18h. A gravação fica disponível por 12 meses." },
                { q: "Funciona para qualquer tipo de negócio?", a: "Sim. Os exemplos cobrem e-commerce, serviços, infoprodutos e B2B." },
                { q: "Qual plano do Claude preciso ter?", a: "O gratuito funciona para acompanhar. O Pro potencializa os resultados." },
                { q: "E se eu não gostar?", a: "Garantia total de 7 dias. Sem perguntas, sem burocracia." }
              ].map((item, i) => (
                <details key={i} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="text-lg font-bold text-white pr-4">{item.q}</span>
                    <ChevronDown className="text-brand-accent transition-transform group-open:rotate-180" size={20} />
                  </summary>
                  <div className="px-6 pb-6 text-white/50 leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-[#FFF7EC]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
               initial={{ scale: 0.95, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               viewport={{ once: true }}
               className="bg-gradient-to-br from-brand-accent to-brand-accent-hover p-12 md:p-20 rounded-[40px] text-center text-white relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10 pointer-events-none noise-overlay"></div>

              <div className="relative z-10 px-4">
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif mb-6 italic leading-tight">Claude Sem Frescura.<br />Resultado de verdade.</h2>
                <p className="text-white/80 text-lg sm:text-xl font-medium mb-12 max-w-xl mx-auto">
                  Uma vaga. Um dia. Uma mudança real no seu negócio.
                </p>
                <button className="bg-white text-brand-accent hover:bg-neutral-100 px-8 sm:px-12 py-4 sm:py-5 rounded-full text-xl sm:text-2xl font-bold transition-all shadow-2xl active:scale-95 w-full sm:w-auto">
                  Garantir minha vaga →
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="py-12 bg-[#070D0D] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold tracking-[0.2em] uppercase text-white/50">
          <div>
            © 2025 Claude Sem Frescura
          </div>
          <div className="flex gap-8 lowercase opacity-50 font-medium font-sans">
            <span>contato@iasemfrescura.com.br</span>
            <span>termos de uso</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
