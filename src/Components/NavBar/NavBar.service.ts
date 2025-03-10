// src/services/navigationService.ts
import { To, NavigateFunction } from 'react-router-dom';

export const navigationService = {
  goBack: (navigate: NavigateFunction) => {
    navigate(-1);
  },

  navigateTo: (navigate: NavigateFunction, path: To) => {
    navigate(path);
  },
};

// Optional: Export route constants if they're used elsewhere
export const ROUTES = {
  HOME: '/',
  MANAGEMENT: '/management',
} as const;

export type RouteKey = keyof typeof ROUTES;