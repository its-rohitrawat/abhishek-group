import type { MediaKey } from "./media";

/**
 * Press coverage as listed in the "News" section of the client's current homepage (abhishekgroup.co.in),
 * reviewed November 2026. All items cover the May 2022 launch of the registered vehicle scrapping facility.
 * The outlets' own article images are not reused (copyright); visuals come from the licensed media registry.
 * Add newer items at the top of the list as the client supplies them.
 */
export interface NewsItem {
  id: string;
  outlet: string;
  date: string;
  title: string;
  url: string;
  image: MediaKey;
}

export const news: NewsItem[] = [
  {
    id: "ani-gadkari",
    outlet: "ANI News",
    date: "May 2022",
    title: "Nitin Gadkari, Minister of Road Transport & Highways, inaugurates new vehicle scrapping facility by Abhishek Group and Kaiho Sangyo Japan",
    url: "https://www.aninews.in/news/business/business/nitin-gadkari-minister-of-road-transport-amp-highways-inaugurates-new-vehicle-scrapping-facility-by-abhishek-group-and-kaiho-sangyo-japan20220512181601",
    image: "heroReborn",
  },
  {
    id: "carandbike-partners",
    outlet: "car&bike",
    date: "May 2022",
    title: "Abhishek Group partners with Kaiho Sangyo to open vehicle scrappage facility",
    url: "https://www.carandbike.com/news/abhishek-group-partners-with-kaiho-sangyo-to-open-vehicle-scrappage-facility-2962004",
    image: "recyclingYard",
  },
  {
    id: "et-infra",
    outlet: "ETInfra",
    date: "May 2022",
    title: "Gadkari inaugurates new vehicle scrapping facility by Abhishek Group and Kaiho Sangyo Japan",
    url: "https://infra.economictimes.indiatimes.com/news/urban-transportation/gadkari-inaugurates-new-vehicle-scrapping-facility-by-abhishek-group-and-kaiho-sangyo-japan/91530404",
    image: "indiaExpressway",
  },
  {
    id: "smestreet",
    outlet: "SMEStreet",
    date: "May 2022",
    title: "Vehicle scrapping facility by Abhishek Group and Kaiho Sangyo Japan inaugurated",
    url: "https://smestreet.in/limelight/vehicle-scrapping-facility-by-abhishek-group-and-kaiho-sangyo-japan-inaugurated/",
    image: "factoryFloor",
  },
];
