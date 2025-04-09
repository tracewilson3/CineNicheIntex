// types/movie.ts

export interface Movie {
    show_id: number;
    type?: string;
    title: string;
    director?: string;
    cast?: string;
    country?: string;
    release_year?: number;
    rating?: string;
    duration?: string;
    description?: string;
    Action?: number;
    Adventure?: number;
    Anime_Series_International_TV_Shows?: number;
    British_TV_Shows_Docuseries_International_TV_Shows?: number;
    Children?: number;
    Comedies?: number;
    Comedies_Dramas_International_Movies?: number;
    Comedies_International_Movies?: number;
    Comedies_Romantic_Movies?: number;
    Crime_TV_Shows_Docuseries?: number;
    Documentaries?: number;
    Documentaries_International_Movies?: number;
    Docuseries?: number;
    Dramas?: number;
    Dramas_International_Movies?: number;
    Dramas_Romantic_Movies?: number;
    Family_Movies?: number;
    Fantasy?: number;
    Horror_Movies?: number;
    International_Movies_Thrillers?: number;
    International_TV_Shows_Romantic_TV_Shows_TV_Dramas?: number;
    Kids_TV?: number;
    Language_TV_Shows?: number;
    Musicals?: number;
    Nature_TV?: number;
    Reality_TV?: number;
    Spirituality?: number;
    TV_Action?: number;
    TV_Comedies?: number;
    TV_Dramas?: number;
    Talk_Shows_TV_Comedies?: number;
    Thrillers?: number;
  }
  