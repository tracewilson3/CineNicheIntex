export interface Movie {
  show_id: number;
  type: string;
  title: string;
  director: string | null;
  cast: string;
  country: string;
  release_year: number;
  rating: string;
  duration: string;
  description: string;

  // Genre flags (1 = belongs to genre, 0 = doesn't)
  action: number;
  adventure: number;
  anime_Series_International_TV_Shows: number;
  british_TV_Shows_Docuseries_International_TV_Shows: number;
  children: number;
  comedies: number;
  comedies_Dramas_International_Movies: number;
  comedies_International_Movies: number;
  comedies_Romantic_Movies: number;
  crime_TV_Shows_Docuseries: number;
  documentaries: number;
  documentaries_International_Movies: number;
  docuseries: number;
  dramas: number;
  dramas_International_Movies: number;
  dramas_Romantic_Movies: number;
  family_Movies: number;
  fantasy: number;
  horror_Movies: number;
  international_Movies_Thrillers: number;
  international_TV_Shows_Romantic_TV_Shows_TV_Dramas: number;
  kids_TV: number;
  language_TV_Shows: number;
  musicals: number;
  nature_TV: number;
  reality_TV: number;
  spirituality: number;
  tV_Action: number;
  tV_Comedies: number;
  tV_Dramas: number;
  talk_Shows_TV_Comedies: number;
  thrillers: number;
}