import aircraftImageAvif from "@/assets/aircraft-leasing-business-jet.avif";
import aircraftImage1024Avif from "@/assets/aircraft-leasing-business-jet-1024w.avif";
import aircraftImage640Avif from "@/assets/aircraft-leasing-business-jet-640w.avif";
import aircraftImageWebp from "@/assets/aircraft-leasing-business-jet.webp";
import aircraftImage1024Webp from "@/assets/aircraft-leasing-business-jet-1024w.webp";
import aircraftImage640Webp from "@/assets/aircraft-leasing-business-jet-640w.webp";

import leasingAircraftImageAvif from "@/assets/commercial-aircraft-operating-lease.avif";
import leasingAircraftImage1024Avif from "@/assets/commercial-aircraft-operating-lease-1024w.avif";
import leasingAircraftImage640Avif from "@/assets/commercial-aircraft-operating-lease-640w.avif";
import leasingAircraftImageWebp from "@/assets/commercial-aircraft-operating-lease.webp";
import leasingAircraftImage1024Webp from "@/assets/commercial-aircraft-operating-lease-1024w.webp";
import leasingAircraftImage640Webp from "@/assets/commercial-aircraft-operating-lease-640w.webp";

import cityImageAvif from "@/assets/gift-city-ifsc-gujarat.avif";
import cityImage1024Avif from "@/assets/gift-city-ifsc-gujarat-1024w.avif";
import cityImage640Avif from "@/assets/gift-city-ifsc-gujarat-640w.avif";
import cityImageWebp from "@/assets/gift-city-ifsc-gujarat.webp";
import cityImage1024Webp from "@/assets/gift-city-ifsc-gujarat-1024w.webp";
import cityImage640Webp from "@/assets/gift-city-ifsc-gujarat-640w.webp";

import giftCityAerialAvif from "@/assets/gift-city-ifsc-aerial-skyline.avif";
import giftCityAerial1024Avif from "@/assets/gift-city-ifsc-aerial-skyline-1024w.avif";
import giftCityAerial640Avif from "@/assets/gift-city-ifsc-aerial-skyline-640w.avif";
import giftCityAerialWebp from "@/assets/gift-city-ifsc-aerial-skyline.webp";
import giftCityAerial1024Webp from "@/assets/gift-city-ifsc-aerial-skyline-1024w.webp";
import giftCityAerial640Webp from "@/assets/gift-city-ifsc-aerial-skyline-640w.webp";

import ahmedabadImageAvif from "@/assets/ahmedabad-commercial-aviation-hub.avif";
import ahmedabadImage1024Avif from "@/assets/ahmedabad-commercial-aviation-hub-1024w.avif";
import ahmedabadImage640Avif from "@/assets/ahmedabad-commercial-aviation-hub-640w.avif";
import ahmedabadImageWebp from "@/assets/ahmedabad-commercial-aviation-hub.webp";
import ahmedabadImage1024Webp from "@/assets/ahmedabad-commercial-aviation-hub-1024w.webp";
import ahmedabadImage640Webp from "@/assets/ahmedabad-commercial-aviation-hub-640w.webp";

import suratImageAvif from "@/assets/surat-gujarat-economic-corridor.avif";
import suratImage1024Avif from "@/assets/surat-gujarat-economic-corridor-1024w.avif";
import suratImage640Avif from "@/assets/surat-gujarat-economic-corridor-640w.avif";
import suratImageWebp from "@/assets/surat-gujarat-economic-corridor.webp";
import suratImage1024Webp from "@/assets/surat-gujarat-economic-corridor-1024w.webp";
import suratImage640Webp from "@/assets/surat-gujarat-economic-corridor-640w.webp";

import contactClouds1Avif from "@/assets/aviation-high-altitude-clouds-1.avif";
import contactClouds1_640Avif from "@/assets/aviation-high-altitude-clouds-1-640w.avif";
import contactClouds1Webp from "@/assets/aviation-high-altitude-clouds-1.webp";
import contactClouds1_640Webp from "@/assets/aviation-high-altitude-clouds-1-640w.webp";
import contactClouds2Avif from "@/assets/aviation-high-altitude-clouds-2.avif";
import contactClouds2_640Avif from "@/assets/aviation-high-altitude-clouds-2-640w.avif";
import contactClouds2Webp from "@/assets/aviation-high-altitude-clouds-2.webp";
import contactClouds2_640Webp from "@/assets/aviation-high-altitude-clouds-2-640w.webp";
import contactClouds3Avif from "@/assets/aviation-high-altitude-clouds-3.avif";
import contactClouds3_640Avif from "@/assets/aviation-high-altitude-clouds-3-640w.avif";
import contactClouds3Webp from "@/assets/aviation-high-altitude-clouds-3.webp";
import contactClouds3_640Webp from "@/assets/aviation-high-altitude-clouds-3-640w.webp";

import cpaLogoAvif from "@/assets/cpa-aviation-leasing-capital-logo.avif";
import cpaLogo160Avif from "@/assets/cpa-aviation-leasing-capital-logo-160w.avif";
import cpaLogoWebp from "@/assets/cpa-aviation-leasing-capital-logo.webp";
import cpaLogo160Webp from "@/assets/cpa-aviation-leasing-capital-logo-160w.webp";
import cpaLogoPng from "@/assets/cpa-aviation-leasing-capital-logo.png";

import flightFilm from "@/assets/white-aircraft-flight.mp4.asset.json";
import flightStill from "@/assets/white-aircraft-still.jpg.asset.json";
import type { PublicRoutePath } from "@/lib/seo";

export { flightFilm, flightStill };

export type ResponsivePictureAsset = {
  avifSrcSet: string;
  webpSrcSet: string;
  src: string;
  sizes: string;
  alt: string;
  width: number;
  height: number;
};

export const BRAND_LOGO_ASSET = {
  avifSrcSet: `${cpaLogo160Avif} 160w, ${cpaLogoAvif} 268w`,
  webpSrcSet: `${cpaLogo160Webp} 160w, ${cpaLogoWebp} 268w`,
  fallbackSrc: cpaLogoPng,
  width: 268,
  height: 159,
} as const;

export const AIRCRAFT_ASSETS_VISUAL: ResponsivePictureAsset = {
  avifSrcSet: `${aircraftImage640Avif} 640w, ${aircraftImage1024Avif} 1024w, ${aircraftImageAvif} 1536w`,
  webpSrcSet: `${aircraftImage640Webp} 640w, ${aircraftImage1024Webp} 1024w, ${aircraftImageWebp} 1536w`,
  src: aircraftImageWebp,
  sizes: "(max-width: 1024px) 100vw, 48vw",
  alt: "Illustrative executive aircraft operating above cloud cover representing commercial and business aviation assets",
  width: 1536,
  height: 1024,
};

export const LEASING_AIRCRAFT_VISUAL: ResponsivePictureAsset = {
  avifSrcSet: `${leasingAircraftImage640Avif} 640w, ${leasingAircraftImage1024Avif} 1024w, ${leasingAircraftImageAvif} 1376w`,
  webpSrcSet: `${leasingAircraftImage640Webp} 640w, ${leasingAircraftImage1024Webp} 1024w, ${leasingAircraftImageWebp} 1376w`,
  src: leasingAircraftImageWebp,
  sizes: "(max-width: 1024px) 100vw, 48vw",
  alt: "Illustrative commercial jet aircraft banking smoothly at altitude representing aircraft operating lease activities",
  width: 1376,
  height: 768,
};

export const GIFT_CITY_VISUAL: ResponsivePictureAsset = {
  avifSrcSet: `${cityImage640Avif} 640w, ${cityImage1024Avif} 1024w, ${cityImageAvif} 1536w`,
  webpSrcSet: `${cityImage640Webp} 640w, ${cityImage1024Webp} 1024w, ${cityImageWebp} 1536w`,
  src: cityImageWebp,
  sizes: "(max-width: 1024px) 100vw, 48vw",
  alt: "International financial towers at GIFT City IFSC, Gandhinagar, Gujarat",
  width: 1536,
  height: 1024,
};

export const GIFT_CITY_AERIAL_VISUAL: ResponsivePictureAsset = {
  avifSrcSet: `${giftCityAerial640Avif} 640w, ${giftCityAerial1024Avif} 1024w, ${giftCityAerialAvif} 1376w`,
  webpSrcSet: `${giftCityAerial640Webp} 640w, ${giftCityAerial1024Webp} 1024w, ${giftCityAerialWebp} 1376w`,
  src: giftCityAerialWebp,
  sizes: "(max-width: 1024px) 100vw, 48vw",
  alt: "Aerial skyline of the GIFT City IFSC district in Gandhinagar, Gujarat",
  width: 1376,
  height: 768,
};

export type NavItem = {
  label: string;
  to: PublicRoutePath;
  sectionId: string;
};

export const NAVIGATION_ITEMS: readonly NavItem[] = [
  { label: "Home", to: "/", sectionId: "top" },
  { label: "About Us", to: "/about", sectionId: "about" },
  { label: "Aircraft Leasing", to: "/aircraft-leasing", sectionId: "leasing" },
  { label: "Aviation Assets", to: "/aviation-assets", sectionId: "business-scope" },
  { label: "Our Approach", to: "/our-approach", sectionId: "approach" },
  { label: "GIFT City", to: "/gift-city", sectionId: "gift-city" },
] as const;

export const FOOTER_NAVIGATION: readonly NavItem[] = [
  ...NAVIGATION_ITEMS,
  { label: "Contact Us", to: "/contact", sectionId: "contact" },
] as const;

export const REGISTERED_OFFICE_ADDRESS =
  "U.71 S 1-4 GRD FLR 11T2, THE PLATFORM BK11 GIFTSEZ, Gift City, Gandhi Nagar, Gujarat, India, 382050";

export const CORPORATE_PARTICULARS = [
  {
    label: "Legal Name",
    value: "CPA Aviation Leasing Capital IFSC Private Limited",
  },
  {
    label: "Corporate Identification Number (CIN)",
    value: "U66190GJ2026PTC180823",
  },
  {
    label: "Date of Incorporation",
    value: "16 July 2026",
  },
  {
    label: "Company Classification",
    value: "Private Limited Company · IFSC Unit in GIFT SEZ",
  },
  {
    label: "Registered Office",
    value: REGISTERED_OFFICE_ADDRESS,
  },
  {
    label: "Corporate Contact",
    value: "cpaaviationleasing@gmail.com · +91 85277 12949",
  },
] as const;

export const CORPORATE_DOCUMENTS = [
  {
    code: "01",
    title: "Certificate of Incorporation",
    reference: "CIN U66190GJ2026PTC180823 · 16 July 2026",
    summary:
      "Statutory incorporation record confirming registration as a private limited company in Gujarat, India.",
  },
  {
    code: "02",
    title: "Memorandum of Association (MoA)",
    reference: "Stated Corporate Objectives",
    summary:
      "Sets out the company's aviation leasing, financing, and asset ownership objects, with confidential subscriber particulars redacted.",
  },
  {
    code: "03",
    title: "Articles of Association (AoA)",
    reference: "Corporate Constitution & Governance",
    summary:
      "Governing articles establishing corporate share structure, board administration, and statutory company procedures.",
  },
  {
    code: "04",
    title: "Letter of Approval (LoA)",
    reference: "Permitted IFSC Operation",
    summary:
      "Identifies operating lease for aircraft as the authorised operation in GIFT SEZ, subject to applicable regulatory conditions.",
  },
] as const;

export const GUJARAT_SCENES = [
  {
    code: "01",
    label: "GIFT City",
    headingTop: "Based in",
    headingAccent: "GIFT City",
    paragraphs: [
      "Located in Gujarat International Finance Tec-City, CPA Aviation Leasing Capital operates from India's dedicated IFSC jurisdiction for cross-border aircraft leasing and aviation finance.",
      "Its presence in GIFT City forms an important part of the company's corporate identity and business structure.",
    ],
    location: "GIFT City, Gandhinagar, Gujarat",
    caption: "GIFT City, Gandhinagar · Architectural visualisation",
    avifSrcSet: `${cityImage640Avif} 640w, ${cityImage1024Avif} 1024w, ${cityImageAvif} 1536w`,
    webpSrcSet: `${cityImage640Webp} 640w, ${cityImage1024Webp} 1024w, ${cityImageWebp} 1536w`,
    image: cityImageWebp,
    alt: "International financial towers at GIFT City IFSC, Gandhinagar, Gujarat",
    width: 1536,
    height: 1024,
  },
  {
    code: "02",
    label: "IFSC District",
    headingTop: "Operating from",
    headingAccent: "IFSC District",
    paragraphs: [
      "Within Gandhinagar's International Financial Services Centre, dedicated commercial and regulatory frameworks support international aircraft leasing structures.",
      "Operating from this IFSC jurisdiction places the company inside India's designated hub for cross-border aviation finance.",
    ],
    location: "GIFT City IFSC Zone · Gandhinagar",
    caption: "GIFT City IFSC Zone, Gandhinagar · Illustrative aerial visual",
    avifSrcSet: `${giftCityAerial640Avif} 640w, ${giftCityAerial1024Avif} 1024w, ${giftCityAerialAvif} 1376w`,
    webpSrcSet: `${giftCityAerial640Webp} 640w, ${giftCityAerial1024Webp} 1024w, ${giftCityAerialWebp} 1376w`,
    image: giftCityAerialWebp,
    alt: "Aerial skyline of the GIFT City IFSC aviation leasing district in Gandhinagar, Gujarat",
    width: 1376,
    height: 768,
  },
  {
    code: "03",
    label: "Ahmedabad",
    headingTop: "Connected to",
    headingAccent: "Ahmedabad",
    paragraphs: [
      "Positioned close to Ahmedabad, GIFT City links India's dedicated IFSC jurisdiction with one of Gujarat's primary commercial and aviation centres.",
      "This proximity supports connectivity with banking, legal, and institutional stakeholders while the company's operations remain anchored in GIFT City.",
    ],
    location: "Ahmedabad · Gujarat Commercial Hub",
    caption: "Ahmedabad, Gujarat · Illustrative Sabarmati skyline visual",
    avifSrcSet: `${ahmedabadImage640Avif} 640w, ${ahmedabadImage1024Avif} 1024w, ${ahmedabadImageAvif} 1376w`,
    webpSrcSet: `${ahmedabadImage640Webp} 640w, ${ahmedabadImage1024Webp} 1024w, ${ahmedabadImageWebp} 1376w`,
    image: ahmedabadImageWebp,
    alt: "Sabarmati Riverfront commercial skyline of Ahmedabad near GIFT City, Gujarat",
    width: 1376,
    height: 768,
  },
  {
    code: "04",
    label: "Surat",
    headingTop: "Anchored in",
    headingAccent: "Gujarat",
    paragraphs: [
      "Across Gujarat's major enterprise centres from Gandhinagar and Ahmedabad to Surat, commercial infrastructure underpins long-term financial activity.",
      "Operating within this corridor aligns the company with a state structured for international trade, aviation services, and enterprise growth.",
    ],
    location: "Surat · Gujarat Economic Corridor",
    caption: "Surat, Gujarat · Illustrative commercial skyline visual",
    avifSrcSet: `${suratImage640Avif} 640w, ${suratImage1024Avif} 1024w, ${suratImageAvif} 1376w`,
    webpSrcSet: `${suratImage640Webp} 640w, ${suratImage1024Webp} 1024w, ${suratImageWebp} 1376w`,
    image: suratImageWebp,
    alt: "Modern commercial skyline along the Surat business corridor in Gujarat, India",
    width: 1376,
    height: 768,
  },
] as const;

export const CHARTER_SKIES = [
  {
    id: "sky-1",
    avifSrcSet: `${contactClouds1_640Avif} 640w, ${contactClouds1Avif} 1376w`,
    webpSrcSet: `${contactClouds1_640Webp} 640w, ${contactClouds1Webp} 1376w`,
    src: contactClouds1Webp,
  },
  {
    id: "sky-2",
    avifSrcSet: `${contactClouds2_640Avif} 640w, ${contactClouds2Avif} 1376w`,
    webpSrcSet: `${contactClouds2_640Webp} 640w, ${contactClouds2Webp} 1376w`,
    src: contactClouds2Webp,
  },
  {
    id: "sky-3",
    avifSrcSet: `${contactClouds3_640Avif} 640w, ${contactClouds3Avif} 1376w`,
    webpSrcSet: `${contactClouds3_640Webp} 640w, ${contactClouds3Webp} 1376w`,
    src: contactClouds3Webp,
  },
] as const;

export const LEASING_LIFECYCLE_PILLARS = [
  {
    code: "01",
    title: "Operating Lease Structuring",
    summary:
      "Evaluating commercial terms, lease tenors, redelivery conditions, and maintenance reserves aligned with operator fleet requirements without transferring permanent ownership burden.",
  },
  {
    code: "02",
    title: "Technical & Contractual Governance",
    summary:
      "Maintaining clear documentation standards covering airworthiness records, insurance covenants, registration compliance, and lessee reporting obligations.",
  },
  {
    code: "03",
    title: "GIFT SEZ Permitted Scope",
    summary:
      "Operating strictly in alignment with the GIFT SEZ Letter of Approval for aircraft operating leases and applicable statutory frameworks governing IFSC entities.",
  },
] as const;

export const AVIATION_ASSET_CATEGORIES = [
  {
    code: "01",
    title: "Commercial & Executive Aircraft",
    classification: "Primary Operating Lease Focus",
    summary:
      "Fixed-wing passenger, cargo, and executive aircraft contemplated under the company's aviation leasing mandate and authorised operating lease business scope.",
  },
  {
    code: "02",
    title: "Helicopters & Rotary-Wing Aircraft",
    classification: "Stated MoA Asset Objective",
    summary:
      "Rotary-wing aircraft covered within the Memorandum of Association's broad aviation asset provisions for offshore, regional, and specialised aviation utility.",
  },
  {
    code: "03",
    title: "Aircraft Engines & Propulsion Systems",
    classification: "Stated MoA Asset Objective",
    summary:
      "Turboprop, turbofan, and spare propulsion modules included within the company's stated corporate objects relating to aircraft components and asset support.",
  },
  {
    code: "04",
    title: "Aviation Ground & Support Equipment",
    classification: "Stated MoA Asset Objective",
    summary:
      "Allied aviation equipment and technical assemblies referenced in the Memorandum of Association alongside core airframe and engine asset classes.",
  },
] as const;

export const APPROACH_PILLARS = [
  {
    code: "01",
    title: "Ownership & Entity Discipline",
    summary:
      "Structuring aircraft holding, acquisition, and leasing arrangements with transparent corporate documentation backed by our GIFT City corporate foundation.",
  },
  {
    code: "02",
    title: "Lifecycle Asset Oversight",
    summary:
      "Focusing on long-term asset preservation across acquisition evaluation, lease placement, mid-lease oversight, and redelivery planning.",
  },
  {
    code: "03",
    title: "Counterparty Clarity",
    summary:
      "Direct institutional engagement with operators, technical advisors, legal counsel, and financing participants without intermediary opacity.",
  },
  {
    code: "04",
    title: "Regulatory & Statutory Alignment",
    summary:
      "Distinguishing clearly between authorised GIFT SEZ operating lease activity and stated MoA corporate objectives in all external representations.",
  },
] as const;

export const GIFT_CITY_ADVANTAGES = [
  {
    code: "01",
    title: "International Financial Services Centre",
    summary:
      "GIFT City in Gandhinagar serves as India's dedicated IFSC jurisdiction structured to host cross-border financial and aircraft leasing entities.",
  },
  {
    code: "02",
    title: "GIFT SEZ Framework",
    summary:
      "Operating as an approved unit within GIFT SEZ establishes a clear statutory seat governed by applicable Special Economic Zone and IFSC frameworks.",
  },
  {
    code: "03",
    title: "Gujarat Commercial Corridor",
    summary:
      "Proximity to Ahmedabad and Gujarat's industrial belt connects the registered seat with banking, aviation, legal, and corporate infrastructure.",
  },
  {
    code: "04",
    title: "Registered Institutional Presence",
    summary:
      "Our registered office at THE PLATFORM BK11 GIFTSEZ anchors corporate governance, statutory filings, and institutional correspondence.",
  },
] as const;

