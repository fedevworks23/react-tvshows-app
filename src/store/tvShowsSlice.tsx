import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchShows } from "../services/tvService";

// Describes the shape of a TV show object (at least id and name).
interface TvShow {
  // Define the properties you expect from a TV show object
  id: number;
  name: string;
  image?: {
    medium?: string;
    original?: string;
  };
  [key: string]: any;
}

// The slice state, with an array of results and a status string.
interface TvShowsState {
  results: TvShow[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

//  An asynchronous thunk that fetches TV shows using the fetchShows service and returns the data.
export const getTvShows = createAsyncThunk<TvShow[], string | undefined>(
  "tvShows/getTvShows",
  async () => {
    const response = await fetchShows();
    return response.data;
  }
);

const initialState: TvShowsState = {
  // Initialize with an empty array for results
  results: [],
  // Tracks the loading state (idle, loading, succeeded, failed).
  status: "idle",
};

const tvShowsSlice = createSlice({
  name: "tvShows",
  initialState,

  reducers: {
    // "clearTvShows" Resets the results and status to initial values.
    clearTvShows: (state) => {
      state.results = [];
      state.status = "idle";
    },
  },

  // "extraReducers" Handles the asynchronous actions defined by createAsyncThunk.
  extraReducers: (builder) => {
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
      });
  },
});

export default tvShowsSlice.reducer;
