'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BorderBeam } from '@/components/ui/border-beam';

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
    badgeColor: 'bg-white text-black text-[9px] px-2 py-0.5 rounded-full font-bold uppercase',
    title: 'Prevent',
    description: 'Stop friendly fraud, block digital shoplifters & prevent the next chargeback before it happens.',
    href: '#',
    image: '/product/product01.png',
  },
  {
    badge: null,
    badgeColor: '',
    title: 'Automation',
    description: 'Fully automated chargeback recovery with 4x ROI guarantee.',
    href: '#',
    image: '/product/product02.png',
    button: 'LEARN MORE'
  },
  {
    badge: null,
    badgeColor: '',
    title: 'Alerts',
    description: 'Cut 90% of chargebacks before they happen, powered by Visa and Mastercard.',
    href: '#',
    image: '/product/product03.png'
  },
  {
    badge: 'FREE',
    badgeColor: 'bg-[#1D1D1F] text-zinc-300 border border-white/10 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase',
    title: 'Insights',
    description: "Get a bird's-eye view into your payments and chargebacks, all in a single, powerful dashboard.",
    href: '#',
    image: '/product/product04.png'
  },
  {
    badge: 'FOR PLATFORMS',
    badgeColor: 'bg-[#1D1D1F] text-zinc-300 border border-white/10 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase',
    title: 'Connect',
    description: 'Integrate Chargeflow into your platform, either via Embedding, Whitelabel or API.',
    href: '#',
    image: '/product/product05.png'
  },
];

const CUSTOMERS_ITEMS = [
  {
    key: 'all',
    title: 'All Case Studies',
    // description: 'See how leading brands use Chargeflow to win back revenue.',
    href: '#',
    image: '/customer/customer01.svg',
    isWide: true,
  },
  {
    key: 'ecommerce',
    brand: 'obvi.',
    category: 'eCommerce',
    href: '#',
    image: '/customer/customer02.svg',
  },
  {
    key: 'saas',
    brand: 'elementor',
    category: 'SaaS',
    href: '#',
    image: '/customer/customer03.avif',
  },
  {
    key: 'marketplace',
    brand: 'Fanatics',
    category: 'Marketplace',
    href: '#',
    image: '/customer/customer04.svg',
  },
  {
    key: 'travel',
    brand: 'HEXCLAD',
    category: 'Travel',
    href: '#',
    image: '/customer/customer05.avif',
  },
];

const INTEGRATIONS_ITEMS = [
  {
    key: 'all',
    title: 'All Integrations',
    description: 'Choose from hundreds of integrated platforms.',
    href: '#',
    image: '/integration/integration01.svg',
    isWide: true,
    isBanner: true,
  },
  {
    key: 'stripe',
    title: 'Stripe',
    description: '#1 Charge Back Solution For Stripe Merchants',
    href: '#',
    image: '/integration/integration02.avif',
  },
  {
    key: 'shopify',
    title: 'Shopify',
    description: 'Powing 30k+ Shopify Merchants',
    href: '#',
    image: '/integration/integration03.svg',
  },
  {
    key: 'woocommerce',
    title: 'WooCommerce',
    description: 'Native WooCommerce Integration',
    href: '#',
    image: '/integration/integration04.svg',
  },
];

const RESOURCES_CARD_ITEMS = [
  { title: 'Blog', href: '#', image: '/resources/resources01.svg' },
  { title: 'Reports', href: '#', image: '/resources/resources02.svg' },
  { title: 'Podcast', href: '#', image: '/resources/resources03.svg' },
  { title: 'Webinars', href: '#', image: '/resources/resources04.svg' },
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

// ─── Button Component ─────────────────────────────────────────────────────────────

function LearnMoreButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden opacity-0 group-hover:opacity-100 bg-[#2A2A2A]/80 text-white text-[11px] font-bold px-4 py-2 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all duration-500 ease-out transform translate-y-4 group-hover:translate-y-0"
    >
      LEARN MORE
      <BorderBeam
        active={hovered}
        size={40}
        borderWidth={2}
        className="from-transparent via-gray-400 to-transparent"
        transition={{
          type: "spring",
          stiffness: 30,
          damping: 20,
        }}
      />
    </span>
  );
}

// ─── Product Dropdown ───────────────────────────────────────────────────────────

function ProductDropdown() {
  return (
    <div className="flex pb-3 gap-3 w-full">
      {PRODUCT_ITEMS.map((item) => (
        <a
          key={item.title}
          href={item.href}
          className="relative flex-1 h-[350px] rounded-[20px] bg-black/80 overflow-hidden group hover:bg-[#1A1A1A] hover:transition-all hover:duration-300 transition-colors flex flex-col shadow-[0_4px_14px_0_rgba(0,0,0,0.05)]"
        >
          {/* Background Image Container */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pt-16">
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-bottom opacity-100 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500 ease-out"
              />
            )}
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-[#111111] via-[rgba(17,17,17,0.6)] to-transparent z-0 h-32 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 p-5 flex flex-col h-full hover:cursor-pointer">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[17px] font-medium text-white group-hover:text-blue-400 transition-colors">
                {item.title}
              </span>
              {item.badge && (
                <span className={item.badgeColor}>
                  {item.badge}
                </span>
              )}
            </div>
            <p className="text-[14px] text-zinc-400 leading-snug">
              {item.description}
            </p>

            <div className="mt-auto self-end">
              <LearnMoreButton />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

// ─── Customers Dropdown ─────────────────────────────────────────────────────────

function CustomersDropdown() {
  return (
    <div className="flex pb-3 gap-3 w-full">
      {CUSTOMERS_ITEMS?.map((item) => {
        const isWide = 'isWide' in item && item.isWide;
        return (
          <a
            key={item.key}
            href={item.href}
            className={`relative ${isWide ? 'flex-[1.8]' : 'flex-[1]'} h-[350px] rounded-[20px] bg-black/80 hover:bg-[#1A1A1A] hover:transition-all hover:duration-300 overflow-hidden group hover:border-white/10 transition-colors flex flex-col shadow-[0_4px_14px_0_rgba(0,0,0,0.05)]`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 flex items-center justify-center">
              <img
                src={item.image}
                alt={'brand' in item ? item.brand : item.title}
                className="w-full h-full object-contain object-center opacity-100 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500 ease-out"
              />
            </div>

            {/* Gradient overlay on top */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#111111] via-[rgba(17,17,17,0.6)] to-transparent z-0 h-32 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 p-5 flex flex-col h-full">
              {isWide ? (
                /* Wide card: All Case Studies */
                <>
                  <span className="text-[17px] font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {(item as typeof CUSTOMERS_ITEMS[0]).title}
                  </span>
                  <div className="mt-auto self-end">
                    <LearnMoreButton />
                  </div>
                </>
              ) : (
                /* Brand stat card */
                <>
                  {'brand' in item && (
                    <div>
                      {/* brand icon */}
                      <span></span>
                      <span className="text-base font-bold text-white tracking-tight">
                        {item.brand}
                      </span>
                    </div>
                  )}
                  <div className="mt-auto self-end">
                    {'category' in item && (
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{item.category}</span>
                    )}
                  </div>
                </>
              )}
            </div>
          </a>
        );
      })}
    </div>
  );
}

// ─── Integrations Dropdown ───────────────────────────────────────────────────────

function IntegrationsDropdown() {
  const banner = INTEGRATIONS_ITEMS.find(i => 'isBanner' in i && i.isBanner);
  const rows = INTEGRATIONS_ITEMS.filter(i => !('isBanner' in i && i.isBanner));

  return (
    <div className="flex pb-3 gap-3 w-full">
      {/* Banner */}
      {banner && (
        <a
          href={banner.href}
          className="relative w-3/5 h-[350px] rounded-[20px] bg-black/80 hover:bg-[#1A1A1A] hover:transition-all hover:duration-300 overflow-hidden group hover:border-white/10 transition-colors flex flex-col shadow-[0_4px_14px_0_rgba(0,0,0,0.05)]"
        >
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-contain object-bottom opacity-100 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500 ease-out"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#111111] via-[rgba(17,17,17,0.6)] to-transparent z-0 h-32 pointer-events-none" />
          <div className="relative z-10 p-5 flex flex-col h-full">
            <span className="text-lg font-semibold text-white">
              {banner?.title}
            </span>
            <span className="w-1/3 text-lg font-semibold text-gray-400 mt-2">
              {banner?.description}
            </span>
            <div className="mt-auto self-end">
              <LearnMoreButton />
            </div>
          </div>
        </a>
      )}

      {/* Rows */}
      <div className="flex flex-col gap-3 flex-1">
        {rows.map(item => (
          <a
            key={item.key}
            href={item.href}
            className="relative flex-1 rounded-[20px] bg-black/80 hover:bg-[#1A1A1A] hover:transition-all hover:duration-300 overflow-hidden group transition-colors flex flex-col justify-center shadow-[0_4px_14px_0_rgba(0,0,0,0.05)]"
          >
            <div className="absolute inset-0 z-0 flex items-end justify-end">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-left grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500 ease-out"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/70 to-transparent z-0 pointer-events-none" />
            <div className="relative z-10 px-5 h-full flex flex-col justify-center">
              <p className="text-lg font-semibold text-white">
                {item.title}
              </p>
              {/* description */}
              <p className="text-sm font-semibold text-gray-400 mt-1">
                {item.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}


// ─── Resources Dropdown ─────────────────────────────────────────────────────────

function ResourcesDropdown() {
  return (
    <div className="flex pb-3 gap-3 w-full">
      {/* Left: 4 cards */}
      {RESOURCES_CARD_ITEMS.map((item) => (
        <a
          key={item.title}
          href={item.href}
          className="relative flex-1 h-[350px] rounded-[18px] bg-[#111111] overflow-hidden group hover:bg-[#181818] transition-colors flex flex-col"
        >
          {/* SVG image centered */}
          <div className="absolute inset-0 bottom-[-100px] right-[-130px]">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-contain opacity-100 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500 ease-out"
            />
          </div>
          {/* Title top-left */}
          <div className="relative z-10 p-4">
            <span className="text-[15px] font-semibold text-white">{item.title}</span>
          </div>
        </a>
      ))}

      {/* Right panel */}
      <div className="flex flex-col gap-3 w-[220px] flex-shrink-0 cursor-pointer">
        {/* ROI Calculator */}
        <div className="h-1/2 bg-linear-to-b from-black/80 via-black/80 to-white/10 rounded-[18px] p-4 flex flex-col justify-between gap-3 backdrop-blur-md shadow-[0_4px_14px_0_rgba(0,0,0,0.05)]">
          <span className="text-[15px] font-semibold text-white">ROI Calculator</span>
          <div className="flex items-center rounded-lg bg-[#1a1a1a] border border-white/8 overflow-hidden">
            <input
              type="text"
              defaultValue="1,020"
              className="flex-1 bg-transparent text-white text-[13px] px-3 py-2 outline-none min-w-0 hover:text-blue-700 cursor-pointer"
              readOnly
            />
            <span className="text-[10px] font-bold text-zinc-400 pr-3 tracking-widest">HOURS</span>
          </div>
          <div className="flex items-center rounded-lg bg-[#1a1a1a] border border-white/8 overflow-hidden">
            <input
              type="text"
              defaultValue="$7,500"
              className="flex-1 bg-transparent text-white text-[13px] px-3 py-2 outline-none min-w-0 hover:text-blue-700 cursor-pointer"
              readOnly
            />
            <span className="text-[10px] font-bold text-zinc-400 pr-3 tracking-widest">USD</span>
          </div>
        </div>

        {/* Reason Codes */}
        <div className="h-1/2 bg-linear-to-b from-black/80 via-black/80 to-white/10 rounded-[18px] p-4 flex flex-col justify-around gap-3 backdrop-blur-md shadow-[0_4px_14px_0_rgba(0,0,0,0.05)]">
          <span className="text-[15px] font-semibold text-white">Reason Codes</span>
          <div className="flex items-center rounded-lg bg-[#1a1a1a] border border-white/8 overflow-hidden">
            <input
              type="text"
              placeholder="Enter Code: 12.7"
              className="flex-1 bg-transparent text-zinc-400 text-[12px] px-3 py-2 outline-none placeholder-zinc-500 min-w-0 hover:text-blue-700 cursor-pointer"
            />
            <button className="pr-3 text-zinc-400 hover:text-white transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Company Dropdown ─────────────────────────────────────────────────────────────

function CompanyDropdown() {
  return (
    <div className="flex pb-3 gap-3 w-full h-[350px]">
      {/* Left wide card */}
      <a
        href="#"
        className="relative flex-[2] rounded-[18px] bg-[#111111] overflow-hidden group hover:bg-[#181818] transition-colors flex flex-col p-6 shadow-[0_4px_14px_0_rgba(0,0,0,0.05)]"
      >
        <div className="absolute inset-[40px]">
          <img
            src="/company/company01.svg"
            alt="Who We Are"
            className="w-full h-full object-cover object-center opacity-100 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500 ease-out"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/80 via-[#111111]/40 to-transparent z-0 h-32 pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-2 max-w-[200px]">
          <span className="text-[17px] font-semibold text-white group-hover:text-blue-400 transition-colors">Who We Are</span>
          <p className="text-base text-zinc-400 leading-snug">The story behind the Chargeflow.</p>
        </div>
        <div className="mt-auto self-end">
          <LearnMoreButton />
        </div>
      </a>

      {/* Right 2x2 grid */}
      <div className="flex-[1.6] grid grid-cols-2 grid-rows-2 gap-3">
        {[
          { title: 'Brand', href: '#', image: '/company/company02.svg' },
          { title: 'Careers', href: '#', image: '/company/company03.svg', badge: "We're Hiring!" },
          { title: 'Become a Partner', href: '#', image: '/company/company04.svg' },
          { title: 'Contact Us', href: '#', image: '/company/company05.svg' },
        ].map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="relative rounded-[18px] bg-[#111111] overflow-hidden group hover:bg-[#181818] transition-colors flex flex-col p-5 shadow-[0_4px_14px_0_rgba(0,0,0,0.05)]"
          >
            <div className="absolute inset-0 flex items-end justify-end">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover opacity-100 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500 ease-out"
              />
            </div>
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[15px] font-semibold text-white group-hover:text-blue-400 transition-colors">{item.title}</span>
              {item.badge && (
                <span className="bg-[#2A2B36] text-[#869CED] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── Dropdown Wrapper ───────────────────────────────────────────────────────────

function DropdownContent({ dropdownKey }: { dropdownKey: string }) {
  switch (dropdownKey) {
    case 'product': return <ProductDropdown />;
    case 'customers': return <CustomersDropdown />;
    case 'integrations': return <IntegrationsDropdown />;
    case 'resources': return <ResourcesDropdown />;
    case 'company': return <CompanyDropdown />;
    default: return null;
  }
}

// ─── Announcement Banner ────────────────────────────────────────────────────────

function AnnouncementHeader({ isNavHovered }: { isNavHovered: boolean | null }) {
  const [visible, setVisible] = useState(true);
  const marqueeGreenText = "ANNOUNCING OUR $35M SERIES A FUNDING";
  const marqueeWhiteText = "TO TAKE DOWN FRIENDLY FRAUD - READ MORE"

  if (!visible) return null;
  return (
    <div className={`${isNavHovered ? 'scale-65 transition-all duration-300' : ''} relative overflow-hidden bg-slate-950 pt-3`}>
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
                  <path fillRule="evenodd" clipRule="evenodd" d="M20.4591 23.996L16.4118 18.3721C16.4118 18.3721 24.1707 12.0345 26.791 6.16874C26.7723 6.14897 17.7054 10.7632 17.7054 10.7632L14.0061 5.62295C20.772 0.983474 24.7214 1.69848 25.7767 3.16527L30.1387 9.22647C31.7551 11.4726 26.029 19.6752 20.4587 23.996H20.4591ZM9.95881 -0.000976563L14.0061 5.62295C14.0061 5.62295 6.24723 11.9605 3.62693 17.8263C3.64561 17.846 12.7126 13.2319 12.7126 13.2319L16.4118 18.3721C9.64591 23.0115 5.69657 22.2965 4.64125 20.8297L0.278806 14.7685C-1.33764 12.5224 4.38893 4.31985 9.95881 -0.000976563Z" fill="currentColor"></path>
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

function ChargeflowLogo({ isScrolled, navHovered }: { isScrolled: boolean, navHovered: boolean | null }) {
  return (
    <a href="#" className="flex items-center gap-2 cursor-pointer group flex-shrink-0">
      <div className="w-7 h-7 flex items-center justify-center shadow-[0_0_12px_rgba(30,90,241,0.5)] group-hover:text-gray-400 transition-all duration-300">
        <svg width="100%" height="100%" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M20.4591 23.996L16.4118 18.3721C16.4118 18.3721 24.1707 12.0345 26.791 6.16874C26.7723 6.14897 17.7054 10.7632 17.7054 10.7632L14.0061 5.62295C20.772 0.983474 24.7214 1.69848 25.7767 3.16527L30.1387 9.22647C31.7551 11.4726 26.029 19.6752 20.4587 23.996H20.4591ZM9.95881 -0.000976563L14.0061 5.62295C14.0061 5.62295 6.24723 11.9605 3.62693 17.8263C3.64561 17.846 12.7126 13.2319 12.7126 13.2319L16.4118 18.3721C9.64591 23.0115 5.69657 22.2965 4.64125 20.8297L0.278806 14.7685C-1.33764 12.5224 4.38893 4.31985 9.95881 -0.000976563Z" fill="currentColor"></path>
        </svg>
      </div>
      <span className={`font-bold text-white text-2xl tracking-tight group-hover:text-gray-400 transition-all duration-300 ${isScrolled || navHovered ? 'hidden' : ''}`}>chargeflow</span>
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
  const [hovered, setHovered] = useState<string | null>(null)
  const [navHovered, setNavHovered] = useState<boolean | null>(null)

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
    setNavHovered(true)
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 120);
    setNavHovered(false)
  };

  const bannerHeight = hasBanner ? 36 : 0;

  return (
    <>
      {/* Announcement Banner */}
      <AnnouncementHeader isNavHovered={navHovered} />

      {/* Main Nav */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28, delay: 0.1 }}
        style={
          isScrolled ? { top: 0 } : { top: bannerHeight }
        }
        className="fixed left-1/2 -translate-x-1/2 z-50 container mx-auto"
      >
        <motion.div
          animate={{
            scale: isScrolled || navHovered ? 0.80 : 1,
          }}
          transition={{ duration: 0.3 }}
          className={`
    flex items-center justify-between
    px-5 py-3 rounded-full
    ${isScrolled || navHovered
              ? 'bg-[#0a0a0a]/85 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.6)]'
              : 'bg-transparent'
            }
  `}
        >
          {/* Logo */}
          <ChargeflowLogo isScrolled={isScrolled} navHovered={navHovered} />

          <div style={isScrolled || navHovered ? { border: "none" } : {
            padding: "1px",
            borderRadius: "99px",
            background: "linear-gradient(to right, #1a1a1a 50%, #2e2e2e 100%, #666 70%, #999 100%)",
          }}>
            <div className={`${isScrolled || navHovered ? 'bg-black' : 'bg-[#1A1A1A]'} rounded-[99px]`}>
              {/* Desktop Nav */}
              <nav className={`hidden lg:flex items-center gap-0.5 backdrop-blur-3xl rounded-full shadow-2xl`}>
                {NAV_LINKS?.map((link) => (
                  <div
                    key={link?.name}
                    className="relative"
                    onMouseEnter={() => link?.hasDropdown && link?.dropdownKey ? handleMouseEnter(link?.dropdownKey) : undefined}
                    onMouseLeave={link?.hasDropdown ? handleMouseLeave : undefined}
                  >
                    <button
                      className={`relative text-sm font-semibold tracking-wider transition-colors duration-200 flex items-center gap-1 px-3.5 py-2 rounded-full cursor-pointer
                    ${activeDropdown === link?.dropdownKey
                          ? 'text-white'
                          : 'text-[#a8b0c0] hover:text-white'
                        }`}
                    >
                      {link?.name?.toUpperCase()}
                    </button>
                  </div>
                ))}
              </nav>

            </div>
          </div>


          {/* Right CTAs */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button onMouseEnter={() => setHovered("SIGN IN")}
              onMouseLeave={() => setHovered(null)}
              className="relative overflow-hidden rounded-full">
              SIGN IN
              {/* arrow icon */}
              <ArrowUpRight className="w-4 h-4" />
              <BorderBeam
                active={hovered === "SIGN IN"}
                size={40}
                borderWidth={2}
                initialOffset={20}
                className="from-transparent via-blue-500 to-transparent"
                transition={{
                  type: "spring",
                  stiffness: 30,
                  damping: 20,
                }}
              />
            </Button>
            <Button onMouseEnter={() => setHovered("SIGN UP")}
              onMouseLeave={() => setHovered(null)}
              className="relative overflow-hidden rounded-full bg-blue-700 hover:bg-blue-900">
              SIGN UP
              {/* arrow icon */}
              <ArrowUpRight className="w-4 h-4" />
              <BorderBeam
                active={hovered === "SIGN UP"}
                size={40}
                borderWidth={2}
                initialOffset={20}
                className="from-transparent via-blue-500 to-transparent"
                transition={{
                  type: "spring",
                  stiffness: 30,
                  damping: 20,
                }}
              />
            </Button>

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
        </motion.div>

        {/* Global Dropdown Container Area */}
        <AnimatePresence>
          {activeDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[80px] left-0 right-0 flex justify-center z-50"
              onMouseEnter={() => handleMouseEnter(activeDropdown)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="w-[1142px] bg-linear-to-t from-white/7 via-white/5 to-black/10 backdrop-blur-5xl rounded-2xl overflow-hidden relative">
                <DropdownContent dropdownKey={activeDropdown} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Background Dim/Blur Overlay when Menu Active */}
      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[80px] inset-0 bg-black/40 backdrop-blur-[6px] z-40 pointer-events-none"
          />
        )}
      </AnimatePresence>

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
                                  <span className={item.badgeColor}>{item.badge}</span>
                                )}
                              </a>
                            ))}
                            {link.dropdownKey === 'customers' && CUSTOMERS_ITEMS.map(i => (
                              <a
                                key={i.key}
                                href={i.href}
                                className="px-3 py-2.5 text-[13px] font-medium text-zinc-300 hover:text-white transition-colors"
                              >
                                {'brand' in i ? i.brand : i.title}
                              </a>
                            ))}
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
