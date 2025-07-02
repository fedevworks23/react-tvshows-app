import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchShows,
  fetchShowById,
  fetchDetailsById,
  fetchPopularShows,
  fetchLatestShowsById,
} from "../services/tvService";
import type { TvShow, TvShowsState } from "../interface/tvShowsInterface";

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

export const getShowDetailsById = createAsyncThunk<
  [] | {},
  { id: string; navMenu: string }
>("tvShows/fetchShowDetailsById", async ({ id, navMenu }) => {
  const response = await fetchDetailsById(id, navMenu);
  return response.data;
});

export const getPopularShows = createAsyncThunk<
  TvShowsState["popularShows"],
  string[]
>("tvShows/fetchPopularShows", async (currentDate: string[]) => {
  const response = await fetchPopularShows(currentDate);
  return response.data;
});

export const getLatestShowsByID = createAsyncThunk(
  "tvShows/fetchLatestShowsById",
  async (ids: string[]) => {
    const results = await Promise.all(
      ids.map((id: string): Promise<any> => fetchLatestShowsById([id]))
    );
    return results.map((res) => res.data);
  }
);
