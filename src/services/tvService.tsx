// src/services/tvService.js
import apiClient from "../api/apiClient";

export const fetchShows = () => apiClient.get(`/shows`);

export const fetchShowById = (id: number) => apiClient.get(`/shows/${id}`);

export const fetchDetailsById = (id: string, navMenu: string) => {
  if (navMenu === "") {
    return apiClient.get(`/shows/${id}`);
  } else if(navMenu === 'latest') {
    return apiClient.get(`/shows/${id}`);
  } else {
    return apiClient.get(`/shows/${id}/${navMenu}`);
  }

};
