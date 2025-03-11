import { IOutlayResponse, IRowResponse } from '../../../share/Interfaces';

export interface IRequestCreateRows {
  body: IOutlayResponse;
}

export interface IRequestUpdateRows {
  params: { rid: number };
  body: IOutlayResponse;
}

export interface IRequestDeleteRows {
  params: { rid: number };
}

export interface ICreateRowResponse {
  current: IRowResponse;
  changed: IRowResponse[];
}