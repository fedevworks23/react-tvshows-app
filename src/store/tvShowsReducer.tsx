import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchShows,
  fetchShowById,
  fetchDetailsById,
  fetchLatestShows,
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

// In your tvShowsReducer.tsx
export const getLatestShows = createAsyncThunk(
  "tvShows/fetchLatestShows",
  async (ids: string[]) => {
    const results = await Promise.all(
      ids.map((id: string): Promise<any> => fetchLatestShows([id]))
    );
    return results.map((res) => res.data);
  }
);

// Initial state for the slice
const initialState: TvShowsState = {
  results: [],
  showById: {},
  selectedShow: null,
  status: "idle",
  showDetails: {}, // Reserved for possible future use
  detailsStatus: "idle",
  latestShows: [],
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
        state.showDetails = action.payload;
      })
      .addCase(fetchShowDetailsById.rejected, (state) => {
        state.detailsStatus = "failed";
      })

      // Handle fetching latest show details by ID
      .addCase(getLatestShows.pending, (state) => {
        state.detailsStatus = "loading";
      })
      .addCase(getLatestShows.fulfilled, (state, action) => {
        state.detailsStatus = "succeeded";
        if (Array.isArray(action.payload)) {
          state.latestShows = action.payload;
        } else if (action.payload) {
          state.latestShows = [action.payload];
        }
      })
      .addCase(getLatestShows.rejected, (state) => {
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
