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
  details: {
    episodes: any[];
    seasons: any[];
    cast: any[];
    crew: any[];
  };
}

// Async thunk to fetch all TV shows
export const getTvShows = createAsyncThunk<TvShow[], void>(
  "tvShows/getTvShows",
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

export const getDetailsById = createAsyncThunk<[] | {}, string>(
  "tvShows/getDetailsById",
  async (customPath: string) => {
    const response = await fetchDetailsById(customPath);
    console.log('Response from getDetailsById:');
    
    return response.data;
  }
);

// Initial state for the slice
const initialState: TvShowsState = {
  results: [],
  showById: {},
  selectedShow: null,
  status: "idle",
  showDetails: null, // Reserved for possible future use
  detailsStatus: "idle",
  details: {
    episodes: [],
    seasons: [],
    cast: [],
    crew: [],
  }
  
};

// The tvShows slice
const tvShowsSlice = createSlice({
  name: "tvShows",
  initialState,
  reducers: {
    // Set the selected show manually
    setSelectedShow: (state, action) => {
      state.selectedShow = action.payload;
    },
    clearShowDetails: (state) => {
      console.log(state.detailsStatus);
      state.detailsStatus = "idle";
      state.showDetails = null; // Reset show details
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
      .addCase(getTvShows.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTvShows.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(getTvShows.rejected, (state) => {
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
      .addCase(getDetailsById.pending, (state) => {
        state.detailsStatus = "loading";
      })
      .addCase(getDetailsById.fulfilled, (state, action) => {
        state.detailsStatus = "succeeded";
        console.log(action);
        if (action.type === "tvShows/getDetailsById") {
          console.log('"tvShows/getDetailsById/fulfilled"');
          
        }
        
        state.showDetails = action.payload;
      })
      .addCase(getDetailsById.rejected, (state) => {
        state.detailsStatus = "failed";
      });
  },
});

// Export actions and reducer
export const { setSelectedShow, clearShowDetails, clearTvShows } =
  tvShowsSlice.actions;
export default tvShowsSlice.reducer;
