import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllShows,
  getLatestShowsByID,
  getPopularShows,
  getShowById,
  getShowDetailsById,
} from "./tvShowsThunks";
import type { TvShowsState } from "../interface/tvShowsInterface";

// Initial state for the slice
const initialState: TvShowsState = {
  results: [],
  showById: {},
  selectedShow: null,
  showDetails: {}, // Reserved for possible future use
  detailsStatus: "idle",
  popularShows: [],
  latestShows: [],
  webChannels: [],
  error: null,
  allShowsFilter: {
    showType: "",
  },
};

// The tvShows slice
const tvShowsSlice = createSlice({
  name: "tvShows",
  initialState,
  reducers: {
    setShowFilters: (
      state,
      action: {
        payload: { name: keyof typeof state.allShowsFilter; value: string };
      }
    ) => {
      state.allShowsFilter[action.payload.name] = action.payload.value;
    },
    clearShowDetails: (state) => {
      state.detailsStatus = "idle";
      // state.showDetails = {};
    },
    // Clear all TV shows and reset status
    clearTvShows: (state) => {
      state.results = [];
      state.selectedShow = null;
      state.detailsStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    // Handle fetching all TV shows
    builder
      .addCase(fetchAllShows.pending, (state) => {
        state.detailsStatus = "loading";
      })
      .addCase(fetchAllShows.fulfilled, (state, action) => {
        state.detailsStatus = "succeeded";
        state.results = action.payload;
      })
      .addCase(fetchAllShows.rejected, (state, action) => {
        state.detailsStatus = "failed";
        state.error = action.payload || "Failed to load show details";
      })
      // Handle fetching a single selected TV show
      .addCase(getShowById.pending, (state) => {
        state.detailsStatus = "loading";
      })
      .addCase(getShowById.fulfilled, (state, action) => {
        state.detailsStatus = "succeeded";
        state.showById = action.payload;
      })
      .addCase(getShowById.rejected, (state, action) => {
        state.detailsStatus = "failed";
        state.error = action.payload || "Failed to load show details";
      })

      // Handle fetching details by ID
      // This is used for episodes, seasons, cast, crew, etc.
      .addCase(getShowDetailsById.pending, (state) => {
        state.detailsStatus = "loading";
      })
      .addCase(getShowDetailsById.fulfilled, (state, action) => {
        state.detailsStatus = "succeeded";
        state.showDetails = action.payload;
      })
      .addCase(getShowDetailsById.rejected, (state, action) => {
        state.detailsStatus = "failed";
        state.error = action.payload || "Failed to load show details";
      })

      // Handle fetching Popular Shows
      .addCase(getPopularShows.pending, (state) => {
        state.detailsStatus = "loading";
      })
      .addCase(getPopularShows.fulfilled, (state, action) => {
        state.detailsStatus = "succeeded";
        state.popularShows = action.payload;
      })
      .addCase(getPopularShows.rejected, (state, action) => {
        state.detailsStatus = "failed";
        state.error = action.payload || "Failed to load show details";
      })

      // Handle fetching latest show details by ID
      .addCase(getLatestShowsByID.pending, (state) => {
        state.detailsStatus = "loading";
      })
      .addCase(getLatestShowsByID.fulfilled, (state, action) => {
        state.detailsStatus = "succeeded";
        if (Array.isArray(action.payload)) {
          state.latestShows = action.payload;
        } else if (action.payload) {
          state.latestShows = [action.payload];
        }
      })
      .addCase(getLatestShowsByID.rejected, (state, action) => {
        state.detailsStatus = "failed";
        state.error = action.payload || "Failed to load show details";
      });
  },
});

// Export actions and reducer
export const { clearShowDetails, clearTvShows, setShowFilters } =
  tvShowsSlice.actions;
export default tvShowsSlice.reducer;
