import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchShows,
  fetchShowById,
  fetchDetailsById,
} from "../services/tvService";

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
  status: "idle" | "loading" | "succeeded" | "failed";
  showDetails: any; // Reserved for possible future use
  detailsStatus: "idle" | "loading" | "succeeded" | "failed";
  latestShows: any[];
  details: {
    main: object; // Reserved for possible future use
    episodes: any[];
    seasons: any[];
    cast: any[];
    crew: any[];
    gallery: any[];
  };
}

// Async thunk to fetch all TV shows
export const fetchAllShows = createAsyncThunk<TvShow[], void>(
  "tvShows/fetchAllShows",
  async () => {
    const response = await fetchShows();
    return response.data;
  }
);

// Async thunk to fetch a single TV show by ID
export const getShowById = createAsyncThunk<TvShowsState["showById"], number>(
  "tvShows/getShowById",
  async (id: number) => {
    const response = await fetchShowById(id);
    return response.data;
  }
);

export const fetchShowDetailsById = createAsyncThunk<
  [] | {},
  { id: string; navMenu: string }
>("tvShows/fetchShowDetailsById", async ({ id, navMenu }) => {
  const response = await fetchDetailsById(id, navMenu);
  return response.data;
});

// Initial state for the slice
const initialState: TvShowsState = {
  results: [],
  showById: {},
  selectedShow: null,
  status: "idle",
  showDetails: null, // Reserved for possible future use
  detailsStatus: "idle",
  latestShows: [],
  details: {
    main: {}, // Reserved for possible future use
    episodes: [],
    seasons: [],
    cast: [],
    crew: [],
    gallery: [],
  },
};

// The tvShows slice
const tvShowsSlice = createSlice({
  name: "tvShows",
  initialState,
  reducers: {
    // Set the selected show manually
    setLatestShow: (state, action) => {
      console.log(state);
      state.latestShows.push(action.payload);
    },
    setSelectedShow: (state, action) => {
      state.selectedShow = action.payload;
    },
    clearShowDetails: (state) => {
      state.detailsStatus = "idle";
      // state.showDetails = null; // Reset show details
    },
    // Clear all TV shows and reset status
    clearTvShows: (state) => {
      state.results = [];
      state.selectedShow = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    // Handle fetching all TV shows
    builder
      .addCase(fetchAllShows.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllShows.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(fetchAllShows.rejected, (state) => {
        state.status = "failed";
      })
      // Handle fetching a single selected TV show
      .addCase(getShowById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getShowById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.showById = action.payload;
      })
      .addCase(getShowById.rejected, (state) => {
        state.status = "failed";
      })

      // Handle fetching details by ID
      // This is used for episodes, seasons, cast, crew, etc.
      .addCase(fetchShowDetailsById.pending, (state) => {
        state.detailsStatus = "loading";
      })
      .addCase(fetchShowDetailsById.fulfilled, (state, action) => {
        state.detailsStatus = "succeeded";
        if (action.meta.arg.navMenu === "episodes") {
          state.details.episodes = Array.isArray(action.payload)
            ? action.payload
            : [];
        } else if (action.meta.arg.navMenu === "") {
          state.details.main = action.payload;
        } else if (action.meta.arg.navMenu === "seasons") {
          state.details.seasons = Array.isArray(action.payload)
            ? action.payload
            : [];
        } else if (action.meta.arg.navMenu === "cast") {
          state.details.cast = Array.isArray(action.payload)
            ? action.payload
            : [];
        } else if (action.meta.arg.navMenu === "crew") {
          state.details.crew = Array.isArray(action.payload)
            ? action.payload
            : [];
        } else if (action.meta.arg.navMenu === "images") {
          state.details.gallery = Array.isArray(action.payload)
            ? action.payload
            : [];
        } else if (action.meta.arg.navMenu === "latest") {
          if (Array.isArray(action.payload)) {
            state.latestShows = [
              ...state.latestShows,
              ...action.payload.filter(
                (item: any) =>
                  !state.latestShows.some((s: any) => s.id === item.id)
              ),
            ];
          } else if (action.payload) {
            if (
              !state.latestShows.some((s: any) => s.id === action.payload)
            ) {
              state.latestShows = [...state.latestShows, action.payload];
            }
          }
        }
      })
      .addCase(fetchShowDetailsById.rejected, (state) => {
        state.detailsStatus = "failed";
      });
  },
});

// Export actions and reducer
export const {
  setSelectedShow,
  clearShowDetails,
  clearTvShows,
  setLatestShow,
} = tvShowsSlice.actions;
export default tvShowsSlice.reducer;
