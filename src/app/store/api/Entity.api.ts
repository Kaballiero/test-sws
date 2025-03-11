import { createApi } from '@reduxjs/toolkit/query/react';
import { getBaseQuery, getEndpoints } from './Entity.api.service';
const entityApi = createApi({
  reducerPath: 'entityApiReducer',
  baseQuery: getBaseQuery(),
  tagTypes: ['outlay'],
  endpoints: getEndpoints,
});

export const {
  useGetAllRowQuery,
  useCreateRowMutation,
  useUpdateRowMutation,
  useDeleteRowMutation,
} = entityApi;

export default entityApi;