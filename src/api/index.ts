import axios, { AxiosResponse } from 'axios';
const ENDPOINTS = {
  BASE_URL: 'https://dummyjson.com/products',
};

const homepageUrl = async (): Promise<AxiosResponse> => {
  return await axios.get(`${ENDPOINTS.BASE_URL}?limit=100`);
};

const productPageUrl = async (id: number): Promise<AxiosResponse> => {
  return await axios.get(`${ENDPOINTS.BASE_URL}/${id}`);
};

export { homepageUrl, productPageUrl, ENDPOINTS };
