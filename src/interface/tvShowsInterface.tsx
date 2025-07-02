// TV show type definition
export interface TvShow {
  id: number;
  name: string;
  [key: string]: any;
}

// State shape for the tvShows slice
export interface TvShowsState {
  results: TvShow[];
  showById: {}; // Reserved for possible future use
  selectedShow: TvShow | null;
  showDetails: any; // Reserved for possible future use
  detailsStatus: "idle" | "loading" | "succeeded" | "failed";
  popularShows: any[];
  latestShows: any[];
  webChannels: any[];
  error: any;
}
