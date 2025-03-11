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

