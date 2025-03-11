import {  BASE_URL, API_PATH, ENTITY_PATH, ENTITY_ID,PATH_SEPARATOR } from './Routes.constats';


function joinPath(...segments: (string | number)[]): string {
  return segments.join(PATH_SEPARATOR);
}

export function getRowReqPath(): string {
  return joinPath(API_PATH, ENTITY_PATH, ENTITY_ID, 'row/list');
}

export function createRowReqPath(): string {
  return joinPath(API_PATH, ENTITY_PATH, ENTITY_ID, 'row/create');
}

export function updateRowReqPath(rID: number): string {
  return joinPath(API_PATH, ENTITY_PATH, ENTITY_ID, 'row', rID, 'update');
}

export function deleteRowReqPath(rID: number): string {
  return joinPath(API_PATH, ENTITY_PATH, ENTITY_ID, 'row', rID, 'delete');
}

export const apiConfig = {
  baseUrl: BASE_URL,
  getRowReqPath,
  createRowReqPath,
  updateRowReqPath,
  deleteRowReqPath,
};