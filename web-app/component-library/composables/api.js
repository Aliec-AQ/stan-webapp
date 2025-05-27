import axios from 'axios';

export const urlSite = 'https://www.reseau-stan.com/?type=476';
const baseURL = `${urlSite}`;

export const axiosInstance = axios.create({
  baseURL,
});

export const requests = {
  get: (url, config) => axiosInstance.get(url, config).then(({ data }) => data),
  post: (url, data, config) => axiosInstance.post(url, data, config).then(({ data }) => data),
  put: (url, data) => axiosInstance.put(url, data).then(({ data }) => data),
  delete: (url) => axiosInstance.delete(url).then(({ data }) => data),
};