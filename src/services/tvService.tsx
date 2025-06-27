// src/services/tvService.js
import apiClient from "../api/apiClient";

export const fetchShows = () => apiClient.get(`/shows`);

export const fetchShowById = (id: number) => apiClient.get(`/shows/${id}`);

export const fetchDetailsById = (id: string, navMenu: string) => {
  if (navMenu === "character") {
    return apiClient.get(`/shows/${id}`);
  } else {
    return apiClient.get(
      `/shows/${id}?embed[]=episodes&embed[]=cast&embed[]=crew&embed[]=images&embed[]=seasons`
    );
  }
};

export const fetchLatestShows = (id: string[]) => {
  return apiClient.get(`/shows/${id}`)
}
