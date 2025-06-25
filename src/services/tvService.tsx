// src/services/tvService.js
import apiClient from '../api/apiClient';

export const fetchShows = () =>
  apiClient.get(`/shows`);

export const fetchShowById = (id: number) =>
  apiClient.get(`/shows/${id}`);

export const fetchDetailsById = (customPath: string) =>
  apiClient.get(`${customPath}`);
