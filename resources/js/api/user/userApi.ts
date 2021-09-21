import apiRequest from '@/api/apiRequest';
import httpMethod from '@/constants/httpMethod';
import { queryStringify, removeEmptyKeys } from '@/lib/common';

const getAllBySearchTerm = async (params: { search_term: string }) => {
  const queryString = queryStringify(removeEmptyKeys(params));
  return apiRequest.send({ method: httpMethod.GET, uri: `/users/search${queryString}` });
};

export default Object.freeze({
  getAllBySearchTerm
});
