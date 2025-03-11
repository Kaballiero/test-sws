export const ROUTES = {
  HOME: '/',
  MANAGEMENT: '/management',
} as const;

export const NAV_ITEMS = [
    {
      name: 'btn_home',
      label: 'Просмотр',
      path: ROUTES.HOME,
    },
    {
      name: 'btn_admin',
      label: 'Управление',
      path: ROUTES.MANAGEMENT,
    },
  ];