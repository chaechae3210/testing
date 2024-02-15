import axios from "axios";

export type TSearchResultResponse = {
  capital: string[];
  code: string;
  commonName: string;
  flagEmoji: string;
  flagImg: string;
  population: number;
  region: string;
};

export type TCountryResponse = TSearchResultResponse & {
  googleMapURL: string;
  officialName: string;
};

export async function fetchCountries() {
  try {
    const response = await axios.get("https://naras-api.vercel.app/all");
    return response.data;
  } catch (e) {
    return [];
  }
}

export async function fetchSearchResults(
  q: string
): Promise<TSearchResultResponse[]> {
  try {
    const response = await axios.get(`
  https://naras-api.vercel.app/search?q=${q}
  `);
    return response.data;
  } catch (e) {
    return [];
  }
}

export async function fetchCountry(
  code: string
): Promise<TCountryResponse[] | null> {
  try {
    const response = await axios.get(
      `https://naras-api.vercel.app/code/${code}`
    );

    console.log(response.data);
    return response.data;
  } catch (e) {
    return null;
  }
}
