'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Infinity, Zap } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface NavLink {
  name: string;
  hasDropdown: boolean;
  dropdownKey?: string;
}

// ─── Dropdown Data ──────────────────────────────────────────────────────────────

const PRODUCT_ITEMS = [
  {
    badge: 'NEW',
    badgeColor: 'bg-blue-500 text-white',
    title: 'Prevent',
    description: 'Stop friendly fraud, block digital shoplifters & prevent the next chargeback before it happens.',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-blue-500">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    badge: null,
    title: 'Automation',
    description: 'Fully automated chargeback recovery with 4x ROI guarantee.',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-blue-500">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    badge: null,
    title: 'Alerts',
    description: 'Prevent 90% of chargebacks before they happen, powered by Visa and Mastercard.',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-blue-500">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    badge: 'FREE',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    title: 'Insights',
    description: "Get a bird's-eye view into your payments and chargebacks, all in a single, powerful dashboard.",
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-blue-500">
        <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    badge: 'FOR PLATFORMS',
    badgeColor: 'bg-violet-500/20 text-violet-400 border border-violet-500/30',
    title: 'Connect',
    description: 'Integrate Chargeflow into your platform, either via Embedding, Whitelabel or API.',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-blue-500">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const CUSTOMERS_ITEMS = [
  {
    title: 'All Case Studies',
    description: 'See how leading brands use Chargeflow to win back revenue.',
    href: '#',
    isHighlighted: true,
  },
  { title: 'eCommerce', href: '#', logo: 'OBV' },
  { title: 'SaaS', href: '#', logo: 'ELM' },
  { title: 'Marketplace', href: '#', logo: 'MKT' },
  { title: 'Travel', href: '#', logo: 'TRV' },
];

const INTEGRATIONS_ITEMS = [
  { title: 'All Integrations', href: '#' },
  { title: 'Stripe', href: '#' },
  { title: 'Shopify', href: '#' },
  { title: 'WooCommerce', href: '#' },
];

const RESOURCES_ITEMS = [
  { title: 'Blog', href: '#' },
  { title: 'Webinars', href: '#' },
  { title: 'Reports', href: '#' },
  { title: 'Podcast', href: '#' },
  { title: 'ROI Calculator', href: '#' },
  { title: 'Reason Codes', href: '#' },
];

const COMPANY_ITEMS = [
  { title: 'Who we are', href: '#' },
  { title: 'Brand', href: '#' },
  { title: 'Become a Partner', href: '#' },
  { title: 'Careers', href: '#' },
  { title: 'Contact us', href: '#' },
];

const NAV_LINKS: NavLink[] = [
  { name: 'Product', hasDropdown: true, dropdownKey: 'product' },
  { name: 'Customers', hasDropdown: true, dropdownKey: 'customers' },
  { name: 'Pricing', hasDropdown: false },
  { name: 'Integrations', hasDropdown: true, dropdownKey: 'integrations' },
  { name: 'Resources', hasDropdown: true, dropdownKey: 'resources' },
  { name: 'Company', hasDropdown: true, dropdownKey: 'company' },
];

// ─── Product Dropdown ───────────────────────────────────────────────────────────

function ProductDropdown() {
  return (
    <div className="w-[520px] p-3 grid grid-cols-1 gap-1">
      {PRODUCT_ITEMS.map((item) => (
        <a
          key={item.title}
          href={item.href}
          className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors group"
        >
          <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mt-0.5">
            {item.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[13px] font-semibold text-white group-hover:text-blue-400 transition-colors">
                {item.title}
              </span>
              {item.badge && (
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-2">{item.description}</p>
          </div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400">
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      ))}
    </div>
  );
}

// ─── Customers Dropdown ─────────────────────────────────────────────────────────

function CustomersDropdown() {
  return (
    <div className="w-[320px] p-3 flex flex-col gap-1">
      <a
        href="#"
        className="flex items-start gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors group border border-white/5 mb-1 bg-white/[0.02]"
      >
        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-blue-400">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <div className="text-[13px] font-semibold text-white group-hover:text-blue-400 transition-colors">All Case Studies</div>
          <div className="text-[11px] text-zinc-400 mt-0.5">See how leading brands use Chargeflow</div>
        </div>
      </a>
      <div className="px-1 mb-1">
        <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest px-2 mb-2">By Industry</div>
        {[
          { industry: 'eCommerce', brand: 'Obvi' },
          { industry: 'SaaS', brand: 'Elementor' },
          { industry: 'Marketplace', brand: 'Fanatics' },
          { industry: 'Travel', brand: 'HexClad' },
        ].map((item) => (
          <a
            key={item.industry}
            href="#"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
          >
            <span className="text-[13px] font-medium text-zinc-300 group-hover:text-white transition-colors">{item.industry}</span>
            <span className="text-[11px] text-zinc-500 group-hover:text-zinc-400 transition-colors">{item.brand} →</span>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── Simple Column Dropdown ─────────────────────────────────────────────────────

function SimpleDropdown({ items }: { items: { title: string; href: string }[] }) {
  return (
    <div className="w-[200px] p-2 flex flex-col gap-0.5">
      {items.map((item) => (
        <a
          key={item.title}
          href={item.href}
          className="px-3 py-2.5 rounded-xl text-[13px] font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
        >
          {item.title}
        </a>
      ))}
    </div>
  );
}

// ─── Dropdown Wrapper ───────────────────────────────────────────────────────────

function DropdownContent({ dropdownKey }: { dropdownKey: string }) {
  switch (dropdownKey) {
    case 'product': return <ProductDropdown />;
    case 'customers': return <CustomersDropdown />;
    case 'integrations': return <SimpleDropdown items={INTEGRATIONS_ITEMS} />;
    case 'resources': return <SimpleDropdown items={RESOURCES_ITEMS} />;
    case 'company': return <SimpleDropdown items={COMPANY_ITEMS} />;
    default: return null;
  }
}

// ─── Announcement Banner ────────────────────────────────────────────────────────

function AnnouncementHeader() {
  const [visible, setVisible] = useState(true);
  const marqueeGreenText = "ANNOUNCING OUR $35M SERIES A FUNDING";
  const marqueeWhiteText = "TO TAKE DOWN FRIENDLY FRAUD - READ MORE"

  if (!visible) return null;
  return (
    <div className="relative overflow-hidden bg-slate-950 pt-3">
      <div className="flex animate-scroll whitespace-nowrap gap-8">
        {[0, 1, 2, 3].map((i) => (
          <>
            <div key={i} className="flex items-center gap-2 text-white text-sm font-medium">
              <span className='text-[#C3F967]'>{marqueeGreenText}</span><span className='text-white'>{marqueeWhiteText}</span>
            </div>
            {/* logo */}
            <div>
              <div className="w-5 h-5 flex items-center justify-center shadow-[0_0_12px_rgba(30,90,241,0.5)] group-hover:text-gray-400 transition-all duration-300">
                <svg width="100%" height="100%" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M20.4591 23.996L16.4118 18.3721C16.4118 18.3721 24.1707 12.0345 26.791 6.16874C26.7723 6.14897 17.7054 10.7632 17.7054 10.7632L14.0061 5.62295C20.772 0.983474 24.7214 1.69848 25.7767 3.16527L30.1387 9.22647C31.7551 11.4726 26.029 19.6752 20.4587 23.996H20.4591ZM9.95881 -0.000976563L14.0061 5.62295C14.0061 5.62295 6.24723 11.9605 3.62693 17.8263C3.64561 17.846 12.7126 13.2319 12.7126 13.2319L16.4118 18.3721C9.64591 23.0115 5.69657 22.2965 4.64125 20.8297L0.278806 14.7685C-1.33764 12.5224 4.38893 4.31985 9.95881 -0.000976563Z" fill="currentColor"></path>
                </svg>
              </div>
            </div>
            <div>
              <Zap className="w-5 h-5 text-[#C3F967] flex-shrink-0" />
            </div>
          </>

        ))}
      </div>
    </div>
  );
}

// ─── Logo ───────────────────────────────────────────────────────────────────────

function ChargeflowLogo() {
  return (
    <a href="#" className="flex items-center gap-2 cursor-pointer group flex-shrink-0">
      <div className="w-7 h-7 flex items-center justify-center shadow-[0_0_12px_rgba(30,90,241,0.5)] group-hover:text-gray-400 transition-all duration-300">
        <svg width="100%" height="100%" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M20.4591 23.996L16.4118 18.3721C16.4118 18.3721 24.1707 12.0345 26.791 6.16874C26.7723 6.14897 17.7054 10.7632 17.7054 10.7632L14.0061 5.62295C20.772 0.983474 24.7214 1.69848 25.7767 3.16527L30.1387 9.22647C31.7551 11.4726 26.029 19.6752 20.4587 23.996H20.4591ZM9.95881 -0.000976563L14.0061 5.62295C14.0061 5.62295 6.24723 11.9605 3.62693 17.8263C3.64561 17.846 12.7126 13.2319 12.7126 13.2319L16.4118 18.3721C9.64591 23.0115 5.69657 22.2965 4.64125 20.8297L0.278806 14.7685C-1.33764 12.5224 4.38893 4.31985 9.95881 -0.000976563Z" fill="currentColor"></path>
        </svg>
      </div>
      <span className="font-bold text-white text-2xl tracking-tight group-hover:text-gray-400 transition-all duration-300">chargeflow</span>
    </a>
  );
}

// ─── Main Navbar ────────────────────────────────────────────────────────────────

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasBanner, setHasBanner] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 20);
  });

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleMouseEnter = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  const bannerHeight = hasBanner ? 36 : 0;

  return (
    <>
      {/* Announcement Banner */}
      <AnnouncementHeader />

      {/* Main Nav */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28, delay: 0.1 }}
        style={isScrolled ? { top: 0 } : { top: bannerHeight + 12 }}
        className="fixed left-1/2 -translate-x-1/2 z-50 container mx-auto"
      >
        <div
          className={`
            flex items-center justify-between
            transition-all transform duration-300 ease-in-out
            ${isScrolled
              ? 'scale-95 xl:scale-90 px-4 py-3 rounded-full bg-[#0a0a0a]/85 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.6)]'
              : 'scale-100 pt-1 rounded-full bg-transparent'
            }
          `}
        >
          {/* Logo */}
          <ChargeflowLogo />

          {/* Desktop Nav */}
          <nav className={`hidden lg:flex items-center gap-0.5  backdrop-blur-2xl rounded-full ${isScrolled ? '' : 'border-r border-white/20 bg-[#FFFFFF1A]'}`}>
            {NAV_LINKS?.map((link) => (
              <div
                key={link?.name}
                className="relative"
                onMouseEnter={() => link?.hasDropdown && link?.dropdownKey ? handleMouseEnter(link?.dropdownKey) : undefined}
                onMouseLeave={link?.hasDropdown ? handleMouseLeave : undefined}
              >
                <button
                  className={`relative text-[12.5px] font-semibold tracking-wider transition-colors duration-200 flex items-center gap-1 px-3.5 py-2 rounded-full cursor-pointer
                    ${activeDropdown === link?.dropdownKey
                      ? 'text-white'
                      : 'text-[#a8b0c0] hover:text-white'
                    }`}
                >
                  {link?.name?.toUpperCase()}
                </button>

                {/* Dropdown */}
                {link?.hasDropdown && link?.dropdownKey && (
                  <AnimatePresence>
                    {activeDropdown === link?.dropdownKey && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        onMouseEnter={() => handleMouseEnter(link.dropdownKey!)}
                        onMouseLeave={handleMouseLeave}
                        className={`absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 bg-[#0f0f11]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden z-50`}
                        style={{
                          // Product dropdown is wider — shift it leftward
                          ...(link.dropdownKey === 'product' ? { left: '-80px', transform: 'none' } : {}),
                        }}
                      >
                        {/* Dropdown inner top accent line */}
                        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
                        <DropdownContent dropdownKey={link.dropdownKey} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="#"
              className="hidden lg:block text-[12.5px] font-semibold text-[#a8b0c0] hover:text-white transition-colors"
            >
              SIGN IN
            </a>
            <a
              href="#"
              className="hidden lg:flex items-center gap-1.5 bg-[#1E5AF1] hover:bg-[#1a4fd9] text-white px-5 py-2.5 rounded-full text-[12.5px] font-bold tracking-wider transition-all duration-200 transform hover:scale-[1.03] active:scale-95 shadow-[0_0_20px_rgba(30,90,241,0.35)]"
            >
              SCHEDULE A DEMO
            </a>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.5 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 6 : 0 }}
                transition={{ duration: 0.25 }}
                className="block w-5 h-[2px] bg-current rounded-full origin-center"
              />
              <motion.span
                animate={{ opacity: mobileMenuOpen ? 0 : 1, scaleX: mobileMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="block w-5 h-[2px] bg-current rounded-full"
              />
              <motion.span
                animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -6 : 0 }}
                transition={{ duration: 0.25 }}
                className="block w-5 h-[2px] bg-current rounded-full origin-center"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#060608]/97 backdrop-blur-3xl"
            style={{ paddingTop: bannerHeight + 72 }}
          >
            <div className="h-full overflow-y-auto px-5 pb-10">
              <div className="flex flex-col">
                {NAV_LINKS.map((link) => (
                  <div key={link.name} className="border-b border-white/[0.07]">
                    <button
                      className="w-full text-left py-4 text-[15px] font-semibold text-white tracking-widest flex items-center justify-between"
                      onClick={() =>
                        link.hasDropdown
                          ? setMobileExpanded(mobileExpanded === link.dropdownKey ? null : link.dropdownKey ?? null)
                          : undefined
                      }
                    >
                      {link.name.toUpperCase()}
                      {link.hasDropdown && (
                        <motion.svg
                          animate={{ rotate: mobileExpanded === link.dropdownKey ? 90 : 0 }}
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-zinc-400"
                        >
                          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </motion.svg>
                      )}
                    </button>

                    <AnimatePresence>
                      {link.hasDropdown && mobileExpanded === link.dropdownKey && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="pb-3 pl-2 flex flex-col gap-0.5">
                            {link.dropdownKey === 'product' && PRODUCT_ITEMS.map((item) => (
                              <a
                                key={item.title}
                                href={item.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                              >
                                <span className="text-[13px] font-medium text-zinc-300 group-hover:text-white transition-colors">{item.title}</span>
                                {item.badge && (
                                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${item.badgeColor}`}>{item.badge}</span>
                                )}
                              </a>
                            ))}
                            {link.dropdownKey === 'customers' && (
                              <>
                                <a href="#" className="px-3 py-2.5 text-[13px] font-medium text-zinc-300 hover:text-white transition-colors">All Case Studies</a>
                                {['eCommerce', 'SaaS', 'Marketplace', 'Travel'].map(i => (
                                  <a key={i} href="#" className="px-3 py-2.5 text-[13px] font-medium text-zinc-300 hover:text-white transition-colors">{i}</a>
                                ))}
                              </>
                            )}
                            {link.dropdownKey === 'integrations' && INTEGRATIONS_ITEMS.map(i => (
                              <a key={i.title} href={i.href} className="px-3 py-2.5 text-[13px] font-medium text-zinc-300 hover:text-white transition-colors">{i.title}</a>
                            ))}
                            {link.dropdownKey === 'resources' && RESOURCES_ITEMS.map(i => (
                              <a key={i.title} href={i.href} className="px-3 py-2.5 text-[13px] font-medium text-zinc-300 hover:text-white transition-colors">{i.title}</a>
                            ))}
                            {link.dropdownKey === 'company' && COMPANY_ITEMS.map(i => (
                              <a key={i.title} href={i.href} className="px-3 py-2.5 text-[13px] font-medium text-zinc-300 hover:text-white transition-colors">{i.title}</a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Mobile CTAs */}
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="#"
                  className="w-full bg-[#1E5AF1] text-white py-4 rounded-2xl text-[13px] font-bold tracking-widest text-center block"
                >
                  SCHEDULE A DEMO
                </a>
                <a
                  href="#"
                  className="w-full text-white py-4 rounded-2xl text-[13px] font-bold tracking-widest text-center block border border-white/15 hover:bg-white/5 transition-colors"
                >
                  SIGN IN →
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
