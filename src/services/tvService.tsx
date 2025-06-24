// src/services/tvService.js
import apiClient from '../api/apiClient';

export const fetchShows = () =>
  apiClient.get(`/shows`);