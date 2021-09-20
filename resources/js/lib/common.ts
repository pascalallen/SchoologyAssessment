import _ from 'lodash';
import { AnyObject } from '@/types/common';

type QueryParamsObject = {
  [key: string]:
    | number
    | boolean
    | string
    | any[]
    | {[key: string]: number | boolean | string | any[] | undefined | null}
    | undefined
    | null;
};

export const removeEmptyKeys = (params: QueryParamsObject): QueryParamsObject => {
  _.forEach(params, (value, key) => {
    if (
      _.isNil(value) ||
      _.isUndefined(value) ||
      _.isNaN(value) ||
      (_.isArray(value) && _.isEmpty(value)) ||
      value === ''
    ) {
      delete params[key];
    }
    if (_.isObject(value) || _.isArray(value)) {
      _.forEach(params, (value, key) => {
        if (
          _.isNil(value) ||
          _.isUndefined(value) ||
          _.isNaN(value) ||
          (_.isArray(value) && _.isEmpty(value)) ||
          value === ''
        ) {
          delete params[key];
        }
      });
    }
  });

  return params;
};

export const queryStringify = (params: QueryParamsObject): string => {
  const query = _.chain(params)
    .keys()
    .map(key => {
      const value = params[key];
      if (_.isArray(value)) {
        return `${key}[]=${_.join(value, `&${key}[]=`)}`;
      }
      return `${key}=${value}`;
    })
    .join('&')
    .value();

  return query ? `?${query}` : '';
};
