import { useState, useEffect, useRef, FormEvent } from 'react';
import { 
  Zap, TrendingUp, Clock, MessageSquare, BarChart3,
  Bot, CheckCircle2, ArrowRight, Send, Menu, X,
  Shield, PenTool, Target, ChevronRight, FileText, Search
} from 'lucide-react';
import { ContentProvider, useContent } from './ContentContext';
import { AdminPanel } from './AdminPanel';
import { PrivacyPolicy } from './PrivacyPolicy';

// ============ SCROLL ANIMATION HOOK ============
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const el = ref.current;
    if (!el) return;

    const elements = el.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .stagger-children');
    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, []);

  return ref;
}

// ============ HERO SECTION ============
function Hero() {
  const { content } = useContent();
  return (
    <section className="min-h-screen flex items-center justify-center bg-navy relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-green/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10 mb-8">
          <Zap className="w-4 h-4 text-accent" />
          <span className="text-sm text-white/80 font-medium">{content.hero.badge}</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          {content.hero.title1}<br />
          <span className="text-accent">{content.hero.title2}</span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
          {content.hero.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
          >
            {content.hero.ctaPrimary}
            <ArrowRight className="w-5 h-5" />
          </a>
          <a 
            href="#services" 
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all duration-300"
          >
            {content.hero.ctaSecondary}
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">WB</div>
            <div className="text-xs text-white/50 mt-1">Wildberries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-white">OZ</div>
            <div className="text-xs text-white/50 mt-1">Ozon</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent">AI</div>
            <div className="text-xs text-white/50 mt-1">ИИ-агенты</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ PROBLEMS SECTION ============
function Problems() {
  const ref = useScrollAnimation();
  const { content } = useContent();
  
  const icons = [Clock, TrendingUp, MessageSquare];

  return (
    <section ref={ref} className="py-20 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">{content.problems.sectionLabel}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-graphite mt-3">
            {content.problems.sectionTitle}
          </h2>
        </div>
        
        <div className="stagger-children grid md:grid-cols-3 gap-8">
          {content.problems.items.map((problem, index) => {
            const Icon = icons[index] || Clock;
            return (
              <div key={index} className="p-8 rounded-2xl bg-surface border border-gray-100 hover:border-accent/20 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-graphite mb-3">{problem.title}</h3>
                <p className="text-graphite-light leading-relaxed">{problem.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============ SOLUTIONS SECTION ============
function Solutions() {
  const ref = useScrollAnimation();
  const { content } = useContent();
  
  return (
    <section ref={ref} className="py-20 md:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">{content.solutions.sectionLabel}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-graphite mt-3">
            {content.solutions.sectionTitle}
          </h2>
          <p className="text-graphite-light mt-4 max-w-2xl mx-auto">
            {content.solutions.sectionSubtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="fade-in-left p-8 md:p-10 rounded-2xl bg-white border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
              <BarChart3 className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-graphite mb-4">{content.solutions.format1Title}</h3>
            <p className="text-graphite-light mb-6 leading-relaxed">
              {content.solutions.format1Description}
            </p>
            <ul className="space-y-3">
              {content.solutions.format1Features.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent-green flex-shrink-0" />
                  <span className="text-graphite">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="fade-in-right p-8 md:p-10 rounded-2xl bg-white border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 rounded-xl bg-accent-green/10 flex items-center justify-center mb-6">
              <Bot className="w-7 h-7 text-accent-green" />
            </div>
            <h3 className="text-2xl font-bold text-graphite mb-4">{content.solutions.format2Title}</h3>
            <p className="text-graphite-light mb-6 leading-relaxed">
              {content.solutions.format2Description}
            </p>
            <ul className="space-y-3">
              {content.solutions.format2Features.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent-green flex-shrink-0" />
                  <span className="text-graphite">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ ONE-TIME SERVICES SECTION ============
function OneTimeServices() {
  const ref = useScrollAnimation();
  const { content } = useContent();
  
  const icons = [Search, MessageSquare, Bot];

  return (
    <section ref={ref} className="py-20 md:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">{content.oneTimeServices.sectionLabel}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-graphite mt-3">
            {content.oneTimeServices.sectionTitle}
          </h2>
          <p className="text-graphite-light mt-4 max-w-2xl mx-auto">
            {content.oneTimeServices.sectionSubtitle}
          </p>
        </div>
        
        <div className="stagger-children grid md:grid-cols-3 gap-8">
          {content.oneTimeServices.cards.map((service, index) => {
            const Icon = icons[index] || Search;
            return (
              <div key={index} className="flex flex-col p-8 rounded-2xl bg-white border border-gray-100 hover:border-accent/20 hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-graphite mb-3">{service.title}</h3>
                
                <div className="mb-4">
                  <div className="text-xs font-semibold text-graphite-light uppercase tracking-wider mb-2">Какую боль решает:</div>
                  <p className="text-graphite leading-relaxed">{service.pain}</p>
                </div>
                
                <div className="mb-6 flex-1">
                  <div className="text-xs font-semibold text-graphite-light uppercase tracking-wider mb-2">Что входит:</div>
                  <p className="text-graphite-light leading-relaxed">{service.description}</p>
                </div>
                
                <div className="text-2xl font-bold text-accent mb-4">{service.price}</div>
                
                <a 
                  href="#contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all duration-300"
                >
                  {service.buttonText}
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============ SERVICES SECTION ============
function Services() {
  const ref = useScrollAnimation();
  const { content } = useContent();
  
  return (
    <section ref={ref} id="services" className="py-20 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">{content.services.sectionLabel}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-graphite mt-3">
            {content.services.sectionTitle}
          </h2>
          <p className="text-graphite-light mt-4 max-w-2xl mx-auto">
            {content.services.sectionSubtitle}
          </p>
        </div>
        
        <div className="stagger-children grid md:grid-cols-3 gap-8">
          {content.services.cards.map((service, index) => (
            <div 
              key={index} 
              className={`relative p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl ${
                service.popular 
                  ? 'bg-navy border-navy text-white shadow-2xl scale-105' 
                  : 'bg-white border-gray-200 hover:border-accent/30'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent-green text-white text-sm font-semibold rounded-full">
                  Популярный
                </div>
              )}
              
              <h3 className={`text-xl font-bold mb-2 ${service.popular ? 'text-white' : 'text-graphite'}`}>
                {service.title}
              </h3>
              <div className={`text-2xl font-bold mb-3 ${service.popular ? 'text-accent-green' : 'text-accent'}`}>
                {service.price}
              </div>
              <p className={`text-sm mb-6 leading-relaxed ${service.popular ? 'text-white/70' : 'text-graphite-light'}`}>
                {service.description}
              </p>
              
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${service.popular ? 'text-accent-green' : 'text-accent'}`} />
                    <span className={`text-sm ${service.popular ? 'text-white/90' : 'text-graphite'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a 
                href="#contact"
                className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  service.popular 
                    ? 'bg-accent-green hover:bg-accent-green/90 text-white' 
                    : 'bg-accent hover:bg-accent-hover text-white'
                }`}
              >
                Заказать
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ PROCESS SECTION ============
function Process() {
  const ref = useScrollAnimation();
  const { content } = useContent();
  
  return (
    <section ref={ref} className="py-20 md:py-32 bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">{content.process.sectionLabel}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-graphite mt-3">
            {content.process.sectionTitle}
          </h2>
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-accent/10 rounded-full">
            <PenTool className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent font-medium">{content.process.badgeText}</span>
          </div>
        </div>
        
        <div className="stagger-children grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.process.steps.map((step, index) => (
            <div key={index} className="relative p-6 rounded-2xl bg-white border border-gray-100 hover:border-accent/20 hover:shadow-lg transition-all duration-300">
              <div className="text-4xl font-bold text-accent/20 mb-4">{String(index + 1).padStart(2, '0')}</div>
              <h3 className="text-lg font-bold text-graphite mb-2">{step.title}</h3>
              <p className="text-sm text-graphite-light leading-relaxed">{step.description}</p>
              {index < content.process.steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <ArrowRight className="w-5 h-5 text-accent/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ ADVANTAGES SECTION ============
function Advantages() {
  const ref = useScrollAnimation();
  const { content } = useContent();
  
  const icons = [FileText, Target, Shield];

  return (
    <section ref={ref} className="py-20 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">{content.advantages.sectionLabel}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-graphite mt-3">
            {content.advantages.sectionTitle}
          </h2>
        </div>
        
        <div className="stagger-children grid md:grid-cols-3 gap-8">
          {content.advantages.items.map((advantage, index) => {
            const Icon = icons[index] || Target;
            return (
              <div key={index} className="text-center p-8 rounded-2xl hover:bg-surface transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-graphite mb-3">{advantage.title}</h3>
                <p className="text-graphite-light leading-relaxed">{advantage.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============ CONTACT FORM SECTION ============
function ContactForm() {
  const ref = useScrollAnimation();
  const { content } = useContent();
  const [formData, setFormData] = useState({ name: '', contact: '', task: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Укажите имя';
    if (!formData.contact.trim()) newErrors.contact = 'Укажите контакт';
    else if (!/^[@\w.+/-]+$/i.test(formData.contact) && !formData.contact.includes('@')) {
      newErrors.contact = 'Введите Telegram (@username) или Email';
    }
    if (!formData.task.trim()) newErrors.task = 'Опишите задачу';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    if (validate()) {
      setIsSubmitted(true);
      console.log('Form submitted:', formData);
    }
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 md:py-32 bg-navy">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-accent-green/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-accent-green" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{content.contact.successTitle}</h2>
          <p className="text-white/70 text-lg">{content.contact.successMessage}</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} id="contact" className="py-20 md:py-32 bg-navy">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12 fade-in-up">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">{content.contact.sectionLabel}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
            {content.contact.sectionTitle}
          </h2>
          <p className="text-white/60 mt-4">
            {content.contact.sectionSubtitle}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="fade-in-up space-y-6">
          <div className="absolute left-[-9999px]" aria-hidden="true">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Имя *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                  errors.name ? 'border-red-400' : 'border-white/20'
                }`}
                placeholder="Ваше имя"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Контакт (Telegram или Email) *</label>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent transition-all ${
                  errors.contact ? 'border-red-400' : 'border-white/20'
                }`}
                placeholder="@username или email@mail.ru"
              />
              {errors.contact && <p className="text-red-400 text-sm mt-1">{errors.contact}</p>}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Описание задачи *</label>
            <textarea
              value={formData.task}
              onChange={(e) => setFormData({ ...formData, task: e.target.value })}
              rows={5}
              className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none ${
                errors.task ? 'border-red-400' : 'border-white/20'
              }`}
              placeholder="Расскажите о вашем магазине, задачах и ожиданиях..."
            />
            {errors.task && <p className="text-red-400 text-sm mt-1">{errors.task}</p>}
          </div>
          
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
          >
            <Send className="w-5 h-5" />
            {content.contact.button}
          </button>
          
          <p className="text-center text-white/40 text-sm">
            Нажимая кнопку, вы соглашаетесь с{' '}
            <a 
              href="#privacy" 
              onClick={(e) => { e.preventDefault(); window.location.hash = 'privacy'; }} 
              className="text-white/60 hover:text-white underline transition-colors cursor-pointer"
            >
              политикой конфиденциальности
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

// ============ FOOTER ============
function Footer() {
  const { content } = useContent();
  return (
    <footer className="py-12 bg-graphite border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold">{content.footer.brand}</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-white/60">
            <a href={`mailto:${content.footer.email}`} className="hover:text-white transition-colors">{content.footer.email}</a>
            <a href={content.footer.telegramUrl} className="hover:text-white transition-colors">{content.footer.telegram}</a>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); window.location.hash = 'privacy'; }} className="hover:text-white transition-colors cursor-pointer">Политика конфиденциальности</a>
          </div>
          
          <div className="text-sm text-white/40">
            © {new Date().getFullYear()} {content.footer.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============ HEADER / NAVIGATION ============
function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-navy/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold text-lg">MP + AI</span>
        </a>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm text-white/70 hover:text-white transition-colors">Услуги</a>
          <a href="#contact" className="text-sm text-white/70 hover:text-white transition-colors">Контакты</a>
          <a href="#contact" className="px-5 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-lg transition-all">
            Оставить заявку
          </a>
        </nav>
        
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white p-2"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-navy/98 backdrop-blur-md border-t border-white/10">
          <nav className="flex flex-col p-6 gap-4">
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-white/80 hover:text-white py-2">Услуги</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-white/80 hover:text-white py-2">Контакты</a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="mt-2 px-5 py-3 bg-accent text-white text-center font-semibold rounded-lg">
              Оставить заявку
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

// ============ SITE CONTENT (all sections) ============
function SiteContent() {
  return (
    <div className="font-sans">
      <Header />
      <Hero />
      <Problems />
      <Solutions />
      <OneTimeServices />
      <Services />
      <Process />
      <Advantages />
      <ContactForm />
      <Footer />
    </div>
  );
}

// ============ MAIN APP ============
export default function App() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const handleHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const isAdmin = hash === '#admin';
  const isPrivacy = hash === '#privacy';

  const handleClosePrivacy = () => {
    window.location.hash = '';
    window.scrollTo(0, 0);
  };

  return (
    <ContentProvider>
      {isPrivacy ? (
        <PrivacyPolicy onClose={handleClosePrivacy} />
      ) : (
        <>
          <SiteContent />
          {isAdmin && <AdminPanel />}
        </>
      )}
    </ContentProvider>
  );
}
