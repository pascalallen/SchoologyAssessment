import _ from 'lodash';
import axios, { AxiosInstance } from 'axios';
import { ApiOptions } from '@/types/api';

const apiHeaders = {
  read: { Accept: 'application/json' },
  write: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
};

const create = async (options?: ApiOptions): Promise<AxiosInstance> => {
  const api = axios.create({
    baseURL: '/api/',
    headers: {
      get: apiHeaders.read,
      post: apiHeaders.write,
      put: apiHeaders.write,
      patch: apiHeaders.write,
      delete: apiHeaders.write
    }
  });

  if (options?.headers ?? null) {
    api.interceptors.request.use(config => {
      _.forEach(options?.headers, (val, key) => {
        config.headers[key] = val;
      });
      return config;
    });
  }

  return api;
};

export default Object.freeze({
  create
});
