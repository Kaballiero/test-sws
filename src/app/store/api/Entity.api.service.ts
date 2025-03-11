import { fetchBaseQuery, EndpointBuilder } from '@reduxjs/toolkit/query/react';
import { BASE_URL, getRowReqPath, createRowReqPath, updateRowReqPath, deleteRowReqPath } from '../../../app/routes';
import { IResponse, IOutlayResponse } from '../../../share/Interfaces';
import { ICreateRowResponse, IRequestCreateRows, IRequestUpdateRows, IRequestDeleteRows } from './Entity.api.types';

export function getBaseQuery() {
  return fetchBaseQuery({ baseUrl: BASE_URL });
}

export function getEndpoints(
  build: EndpointBuilder<any, 'outlay', 'entityApiReducer'>
) {
  return {
    getAllRow: build.query<IResponse, void>({
      query: () => ({ url: getRowReqPath() }),
      providesTags: ['outlay'],
    }),

    createRow: build.mutation<ICreateRowResponse, IRequestCreateRows>({
      query: (request: IRequestCreateRows) => ({
        url: createRowReqPath(),
        method: 'POST',
        body: request.body,
      }),
    }),

    updateRow: build.mutation<IOutlayResponse, IRequestUpdateRows>({
      query: (request: IRequestUpdateRows) => ({
        url: updateRowReqPath(request.params.rid),
        method: 'POST',
        body: request.body,
      }),
    }),

    deleteRow: build.mutation<IOutlayResponse, IRequestDeleteRows>({
      query: (request: IRequestDeleteRows) => ({
        url: deleteRowReqPath(request.params.rid),
        method: 'DELETE',
      }),
    }),
  };
}