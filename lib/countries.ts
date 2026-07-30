// Common countries and their major cities for the registration form.
// Prioritises European countries and African countries (likely attendee base).

export interface CountryData {
  name: string;
  cities: string[];
}

export const COUNTRIES: CountryData[] = [
  {
    name: "Netherlands",
    cities: ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven", "Tilburg", "Groningen", "Almere", "Breda", "Nijmegen", "Other"],
  },
  {
    name: "Belgium",
    cities: ["Brussels", "Antwerp", "Ghent", "Charleroi", "Liège", "Bruges", "Namur", "Leuven", "Other"],
  },
  {
    name: "Germany",
    cities: ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart", "Düsseldorf", "Dortmund", "Essen", "Leipzig", "Other"],
  },
  {
    name: "United Kingdom",
    cities: ["London", "Birmingham", "Manchester", "Leeds", "Glasgow", "Liverpool", "Bristol", "Sheffield", "Edinburgh", "Cardiff", "Other"],
  },
  {
    name: "France",
    cities: ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Bordeaux", "Lille", "Other"],
  },
  {
    name: "Ireland",
    cities: ["Dublin", "Cork", "Limerick", "Galway", "Waterford", "Other"],
  },
  {
    name: "Italy",
    cities: ["Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Bologna", "Florence", "Other"],
  },
  {
    name: "Spain",
    cities: ["Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza", "Málaga", "Bilbao", "Other"],
  },
  {
    name: "Portugal",
    cities: ["Lisbon", "Porto", "Braga", "Coimbra", "Setúbal", "Other"],
  },
  {
    name: "Switzerland",
    cities: ["Zurich", "Geneva", "Basel", "Bern", "Lausanne", "Other"],
  },
  {
    name: "Austria",
    cities: ["Vienna", "Graz", "Linz", "Salzburg", "Innsbruck", "Other"],
  },
  {
    name: "Sweden",
    cities: ["Stockholm", "Gothenburg", "Malmö", "Uppsala", "Other"],
  },
  {
    name: "Norway",
    cities: ["Oslo", "Bergen", "Trondheim", "Stavanger", "Other"],
  },
  {
    name: "Denmark",
    cities: ["Copenhagen", "Aarhus", "Odense", "Aalborg", "Other"],
  },
  {
    name: "Finland",
    cities: ["Helsinki", "Espoo", "Tampere", "Turku", "Other"],
  },
  {
    name: "Poland",
    cities: ["Warsaw", "Kraków", "Łódź", "Wrocław", "Poznań", "Gdańsk", "Other"],
  },
  {
    name: "Nigeria",
    cities: ["Lagos", "Abuja", "Kano", "Ibadan", "Port Harcourt", "Benin City", "Enugu", "Onitsha", "Owerri", "Aba", "Awka", "Asaba", "Other"],
  },
  {
    name: "Ghana",
    cities: ["Accra", "Kumasi", "Tamale", "Takoradi", "Cape Coast", "Other"],
  },
  {
    name: "Kenya",
    cities: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Other"],
  },
  {
    name: "South Africa",
    cities: ["Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth", "Other"],
  },
  {
    name: "Cameroon",
    cities: ["Yaoundé", "Douala", "Bamenda", "Bafoussam", "Garoua", "Other"],
  },
  {
    name: "Ivory Coast",
    cities: ["Abidjan", "Bouaké", "Daloa", "Korhogo", "Other"],
  },
  {
    name: "United States",
    cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "Other"],
  },
  {
    name: "Canada",
    cities: ["Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Other"],
  },
  {
    name: "Australia",
    cities: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Other"],
  },
  {
    name: "Other",
    cities: ["Other"],
  },
].sort((a, b) => a.name.localeCompare(b.name));

export const COUNTRY_NAMES = COUNTRIES.map((c) => c.name);

export function getCitiesForCountry(country: string): string[] {
  return COUNTRIES.find((c) => c.name === country)?.cities ?? ["Other"];
}
