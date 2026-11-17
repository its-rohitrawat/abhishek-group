/**
 * Image registry. Every photo is openly licensed (CC0, public domain, CC BY or CC BY-SA)
 * from Wikimedia Commons / Flickr via Openverse, and credited on /image-credits.
 * These are representative images, not photographs of Abhishek Group facilities.
 * Replace `src` with client photography when supplied and remove the credit.
 */
export interface Media {
  src: string;
  alt: string;
  width: number;
  height: number;
  credit: { title: string; creator: string; license: string; licenseUrl: string; source: string } | null;
}

export const media = {
  safetyWebbing: {
    src: "/images/safety-webbing.jpg",
    alt: "Close-up of woven seatbelt webbing",
    width: 1024,
    height: 683,
    credit: {"title": "Macro Mondays: Cloth/Textile - Seatbelt (Explored: 2017/03/27)", "creator": "Max_G6", "license": "CC BY 2.0", "licenseUrl": "https://creativecommons.org/licenses/by/2.0/", "source": "https://www.flickr.com/photos/142702835@N06/33521033382"},
  },
  safetyAirbag: {
    src: "/images/safety-airbag.jpg",
    alt: "SRS airbag marking on a car dashboard",
    width: 1024,
    height: 683,
    credit: {"title": "SRS Airbag", "creator": "hectorir", "license": "CC BY 2.0", "licenseUrl": "https://creativecommons.org/licenses/by/2.0/", "source": "https://www.flickr.com/photos/30806435@N04/3988007164"},
  },
  comfortDetail: {
    src: "/images/comfort-detail.jpg",
    alt: "Stitched leather car seats",
    width: 1600,
    height: 1200,
    credit: {"title": "2007 Maserati Gran Turismo - Flickr - The Car Spy (7)", "creator": "The Car Spy", "license": "CC BY 2.0", "licenseUrl": "https://creativecommons.org/licenses/by/2.0", "source": "https://commons.wikimedia.org/wiki/File:2007_Maserati_Gran_Turismo_-_Flickr_-_The_Car_Spy_(7).jpg"},
  },
  factoryFloor: {
    src: "/images/factory-floor.jpg",
    alt: "Interior of a manufacturing plant",
    width: 1023,
    height: 671,
    credit: {"title": "Toyota Turnover", "creator": "jurvetson", "license": "CC BY 2.0", "licenseUrl": "https://creativecommons.org/licenses/by/2.0/", "source": "https://www.flickr.com/photos/44124348109@N01/5123326759"},
  },
  heroBuilt: {
    src: "/images/hero-built.jpg",
    alt: "Car bodies moving along a modern vehicle assembly line",
    width: 1920,
    height: 1280,
    credit: {"title": "001 Car factory assembly line - Opel factory in Gliwice, Poland", "creator": "Marek Ślusarczyk (Tupungato) olio", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0", "source": "https://commons.wikimedia.org/wiki/File:001_Car_factory_assembly_line_-_Opel_factory_in_Gliwice,_Poland.jpg"},
  },
  heroRegistered: {
    src: "/images/hero-registered.jpg",
    alt: "Indian vehicle registration plate with the IND emblem",
    width: 1920,
    height: 1275,
    credit: {"title": "Indian Vehicle Registration Plate - Kolkata 2011-07-29 4088", "creator": "Biswarup Ganguly", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0", "source": "https://commons.wikimedia.org/wiki/File:Indian_Vehicle_Registration_Plate_-_Kolkata_2011-07-29_4088.JPG"},
  },
  heroDriven: {
    src: "/images/hero-driven.jpg",
    alt: "Leather seats and dashboard inside a car",
    width: 1920,
    height: 1280,
    credit: {"title": "Leather car interior (Unsplash)", "creator": "Pietro De Grandi peter_mc_greats", "license": "CC0", "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en", "source": "https://commons.wikimedia.org/wiki/File:Leather_car_interior_(Unsplash).jpg"},
  },
  heroReborn: {
    src: "/images/hero-reborn.jpg",
    alt: "End-of-life cars stacked for recycling",
    width: 1920,
    height: 1357,
    credit: {"title": "Auto scrapyard 1", "creator": "IFCAR", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:Auto_scrapyard_1.jpg"},
  },
  safetySteering: {
    src: "/images/safety-steering.jpg",
    alt: "Steering wheel with the central airbag module removed",
    width: 1920,
    height: 1280,
    credit: {"title": "Close view of car interior showing steering wheel and dashboard with missing parts in a wo", "creator": "Shixart1985", "license": "CC BY 2.0", "licenseUrl": "https://creativecommons.org/licenses/by/2.0", "source": "https://commons.wikimedia.org/wiki/File:Close_view_of_car_interior_showing_steering_wheel_and_dashboard_with_missing_parts_in_a_workshop_setting.jpg"},
  },
  platesDetail: {
    src: "/images/plates-detail.jpg",
    alt: "Close-up of an Indian registration plate",
    width: 1920,
    height: 432,
    credit: {"title": "Indian Vehicle Registration Plate - Kolkata 2011-07-29 4088 (cropped)", "creator": "Biswarup Ganguly", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0", "source": "https://commons.wikimedia.org/wiki/File:Indian_Vehicle_Registration_Plate_-_Kolkata_2011-07-29_4088_(cropped).JPG"},
  },
  recyclingYard: {
    src: "/images/recycling-yard.jpg",
    alt: "Vehicles waiting in a salvage yard",
    width: 1920,
    height: 959,
    credit: {"title": "Auto scrapyard 3", "creator": "IFCAR", "license": "Public domain", "licenseUrl": "", "source": "https://commons.wikimedia.org/wiki/File:Auto_scrapyard_3.jpg"},
  },
  factoryLine: {
    src: "/images/factory-line.jpg",
    alt: "Vehicles on an automotive assembly line",
    width: 1920,
    height: 1280,
    credit: {"title": "002 Production line - car assembly line in General Motors Manufacturing Poland - Gliwice, ", "creator": "Marek Ślusarczyk (Tupungato) olio", "license": "CC BY 3.0", "licenseUrl": "https://creativecommons.org/licenses/by/3.0", "source": "https://commons.wikimedia.org/wiki/File:002_Production_line_-_car_assembly_line_in_General_Motors_Manufacturing_Poland_-_Gliwice,_Poland.jpg"},
  },
  factoryTeam: {
    src: "/images/factory-team.jpg",
    alt: "Technicians working on an automotive production line",
    width: 1920,
    height: 1277,
    credit: {"title": "G-Class assembly, 2009 (27)", "creator": "Bahnfrend", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0", "source": "https://commons.wikimedia.org/wiki/File:G-Class_assembly,_2009_(27).JPG"},
  },
  indiaExpressway: {
    src: "/images/india-expressway.jpg",
    alt: "An Indian expressway lit up at night",
    width: 1920,
    height: 1080,
    credit: {"title": "Ahmedabad–Vadodara Expressway, India (2015)", "creator": "Ridham Nagralawala ridham", "license": "CC0", "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en", "source": "https://commons.wikimedia.org/wiki/File:Ahmedabad%E2%80%93Vadodara_Expressway,_India_(2015).jpg"},
  },
  chairman: {
    src: "/images/chairman-portrait.jpg",
    alt: "Mr. Dhiraj Dhar Gupta, Chairman of Abhishek Group",
    width: 1536,
    height: 1024,
    // Client's own published portrait (abhishekgroup.co.in/chairman), AI-restored for sharpness.
    // Facial detail was reconstructed: get the client's approval, or replace with an original high-res photo.
    credit: null,
  },
} satisfies Record<string, Media>;

export type MediaKey = keyof typeof media;
