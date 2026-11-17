/**
 * Site content for the first draft.
 * Sources: abhishekgroup.co.in (group companies, locations) and 2022 press coverage
 * (scrapping facility, HSRP and seat-cooling JVs). Items marked VERIFY need client confirmation.
 */

export type StageKey = 'safety' | 'identity' | 'comfort' | 'recycling';

export interface Business {
  key: StageKey;
  stage: string;
  stageNo: string;
  name: string;
  line: string;
  products: string[];
  partner: string;
}

export const businesses: Business[] = [
  {
    key: 'safety',
    stageNo: '01',
    stage: 'Built',
    name: 'Safety Systems',
    line: 'Seatbelts, airbags and steering wheels engineered into vehicles at the factory.',
    products: ['Seatbelts', 'Airbags', 'Steering wheels'],
    partner: 'with Joyson Safety Systems',
  },
  {
    key: 'identity',
    stageNo: '02',
    stage: 'Registered',
    name: 'Registration Plates',
    line: 'Tamper-proof high-security number plates that give every vehicle its legal identity.',
    products: ['HSRP manufacturing', 'Embossing stations'],
    partner: 'with Sumori Metal',
  },
  {
    key: 'comfort',
    stageNo: '03',
    stage: 'Driven',
    name: 'Seat Comfort',
    line: 'Seat ventilation and cooling designed for the heat and humidity of Indian roads.',
    products: ['Seat ventilation', 'Seat cooling'],
    partner: 'with Elektrosil',
  },
  {
    key: 'recycling',
    stageNo: '04',
    stage: 'Reborn',
    name: 'Vehicle Recycling',
    line: 'Government-registered scrapping that returns end-of-life vehicles to raw material.',
    products: ['Registered scrapping', 'Parts recovery', 'Steel & plastic recycling'],
    partner: 'with Kaiho Sangyo',
  },
];

export const audiences = [
  {
    no: 'A',
    title: 'Vehicle manufacturers',
    body: 'Safety systems and comfort components built to OEM specifications and supplied at scale.',
  },
  {
    no: 'B',
    title: 'Government & transport',
    body: 'Registration plates and registered scrapping, designed around compliance from day one.',
  },
  {
    no: 'C',
    title: 'Fleets & vehicle owners',
    body: 'A legal, documented end of life for every vehicle, with value returned to the owner.',
  },
];

export const stats = [
  { value: '1984', label: 'Founded, starting with seatbelts for Indian carmakers' },
  { value: '1,800', label: 'Vehicles a month our scrapping facility can process' },
  { value: '3M', label: 'Registration plates a month, installed capacity' },
  { value: '21', label: 'Plants, offices and embossing stations across 7 states' },
];

export interface Partner {
  id: string;
  name: string;
  country: string;
  key: StageKey;
  venture: string;
  headline: string;
  body: string;
  facts: string[];
  imageLabel: string;
}

export const partners: Partner[] = [
  {
    id: 'kaiho',
    name: 'Kaiho Sangyo',
    country: 'Japan',
    key: 'recycling',
    venture: 'Abhishek K Kaiho Recyclers',
    headline: 'Japanese recycling discipline, applied to Indian roads.',
    body: 'Our registered vehicle scrapping facility in Haryana recovers reusable components and returns steel and plastic to industry, keeping older, less safe vehicles off the road.',
    facts: ['Opened May 2022', 'Fatehpur, Nuh, Haryana', '~1,800 vehicles / month'],
    imageLabel: 'Photo: RVSF dismantling line, Fatehpur',
  },
  {
    id: 'joyson',
    name: 'Joyson Safety Systems',
    country: 'USA',
    key: 'safety',
    venture: 'Joyson Anand Abhishek Safety Systems',
    headline: 'Where our story started: keeping people safe inside the vehicle.',
    body: 'A joint venture with Joyson Safety Systems and the Anand Group, supplying airbags, seatbelts and steering wheels to vehicle manufacturers across India.',
    facts: ['Airbags & seatbelts', 'Steering wheels', 'Plants in Haryana, Rajasthan & Tamil Nadu'],
    imageLabel: 'Photo: seatbelt assembly line',
  },
  {
    id: 'sumori',
    name: 'Sumori Metal',
    country: 'Japan',
    key: 'identity',
    venture: 'HSRP joint venture',
    headline: 'A century of Japanese plate-making, behind every registration.',
    body: 'High-security registration plates produced on a fully automated line, then embossed and fitted through our network of stations across Gujarat, Maharashtra and Odisha.',
    facts: ['3M plates / month capacity', 'Manesar mother plant', '12 embossing stations'],
    imageLabel: 'Photo: automated HSRP line, Manesar',
  },
  {
    id: 'elektrosil',
    name: 'Elektrosil',
    country: 'Germany',
    key: 'comfort',
    venture: 'Abhishek Elektrosil Auto Components',
    headline: 'German seat-climate engineering, tuned for Indian heat.',
    body: 'Seat ventilation and cooling systems adapted for hot and humid conditions, bringing technology used by European carmakers to vehicles built in India.',
    facts: ['Founded 2022', 'Seat ventilation', 'Gurugram plant'],
    imageLabel: 'Photo: ventilated seat module',
  },
];

export const values = [
  {
    title: 'Safety first, since 1984',
    body: 'Four decades of building the systems that protect people inside the vehicle.',
  },
  {
    title: 'Global technology, Indian execution',
    body: 'Partners from Japan, Germany and the USA, with manufacturing rooted in India.',
  },
  {
    title: 'Compliance by design',
    body: 'Registered, audited and documented at every stage, for regulators and customers alike.',
  },
  {
    title: 'Circular by intent',
    body: 'What leaves the road comes back as material for the next vehicle.',
  },
];

// VERIFY: replace with the client's latest news; current public items are from 2019–2022.
export const milestones = [
  {
    date: 'May 2022',
    key: 'recycling' as StageKey,
    title: 'Registered vehicle scrapping facility opens in Haryana',
    body: 'Inaugurated by the Union Minister of Road Transport & Highways.',
  },
  {
    date: '2022',
    key: 'identity' as StageKey,
    title: 'HSRP joint venture with Sumori Metal of Japan',
    body: 'A fully automated plate line in Manesar with 3 million plates a month capacity.',
  },
  {
    date: '2022',
    key: 'comfort' as StageKey,
    title: 'Abhishek Elektrosil Auto Components is formed',
    body: 'Seat ventilation and cooling, engineered for Indian climates.',
  },
];

export const navLinks = [
  { label: 'Group', href: '#group' },
  { label: 'Businesses', href: '#businesses', mega: true },
  { label: 'Partners', href: '#partners' },
  { label: 'Sustainability', href: '#values' },
  { label: 'Locations', href: '#locations' },
  { label: 'Careers', href: '#contact' },
];

/** From the location records on abhishekgroup.co.in (21 sites). */
export const locations: Record<string, { city: string; type: string; company: string }[]> = {
  Haryana: [
    { city: 'Gurugram', type: 'Head Office', company: 'Abhishek Group' },
    { city: 'Gurugram', type: 'Mother Plant', company: 'Abhishek K Road System' },
    { city: 'Gurugram', type: 'Plant', company: 'Abhishek Elektrosil Auto Components' },
    { city: 'Gurugram', type: 'Plant', company: 'Joyson Anand Abhishek Safety Systems' },
    { city: 'Gurugram', type: 'Plant', company: 'Luster Automotive' },
    { city: 'Fatehpur', type: 'Plant', company: 'Abhishek K Kaiho Recyclers' },
  ],
  Delhi: [{ city: 'New Delhi', type: 'Office', company: 'AWL' }],
  Rajasthan: [{ city: 'Majrakath', type: 'Plant', company: 'Joyson Anand Abhishek Safety Systems' }],
  'Tamil Nadu': [{ city: 'Kancheepuram', type: 'Plant', company: 'Joyson Anand Abhishek Safety Systems' }],
  Gujarat: [
    { city: 'Bharuch', type: 'Embossing Station', company: 'Abhishek K Road System' },
    { city: 'Vadodara', type: 'Embossing Station', company: 'Abhishek K Road System' },
    { city: 'Valsad', type: 'Embossing Station', company: 'Abhishek K Road System' },
  ],
  Maharashtra: [
    { city: 'Kidgaon', type: 'Embossing Station', company: 'Abhishek K Road System' },
    { city: 'Nagaon', type: 'Embossing Station', company: 'Abhishek K Road System' },
    { city: 'Nashik', type: 'Embossing Station', company: 'Abhishek K Road System' },
  ],
  Odisha: [
    { city: 'Bhubaneshwar', type: 'Embossing Station', company: 'Abhishek K Road System' },
    { city: 'Brahmapur', type: 'Embossing Station', company: 'Abhishek K Road System' },
    { city: 'Jalda', type: 'Embossing Station', company: 'Abhishek K Road System' },
    { city: 'Jeypore', type: 'Embossing Station', company: 'Abhishek K Road System' },
    { city: 'Rourkela', type: 'Embossing Station', company: 'Abhishek K Road System' },
    { city: 'Sambalpur', type: 'Embossing Station', company: 'Abhishek K Road System' },
  ],
};
