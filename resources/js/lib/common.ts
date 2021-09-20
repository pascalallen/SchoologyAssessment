import _ from 'lodash';
import { AnyObject } from '@/types/common';

export const removeEmptyQueryParams = (obj: AnyObject, ...customValues: (string | number)[]): AnyObject => {
  // removes from the queryParams object any empty value so that is not added to the queryString
  _.forEach(obj, (value, key) => {
    if (
      _.isNil(value) ||
      _.isUndefined(value) ||
      _.isNaN(value) ||
      _.isFunction(value) ||
      _.isObject(value) ||
      value === ''
    ) {
      delete obj[key];
    }

    _.forEach(customValues, cv => {
      if (value === cv) {
        delete obj[key];
      }
    });
  });

  return obj;
};

export const queryStringify = (params: { [key: string]: number | string | string[] | undefined }): string => {
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
