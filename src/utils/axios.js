import axios from 'axios';

const baseUrl = import.meta.env.VITE_BACKEND_API;

export default {
  async post(url, args, config = 'undefined') {
    return axios.post(baseUrl + url, args, config);
  },

  async get(url, config = 'undefined') {
    return axios.get(baseUrl + url, config);
  },

  async delete(url, config = 'undefined') {
    return axios.delete(baseUrl + url, config);
  },
};
