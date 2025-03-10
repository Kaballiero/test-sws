// src/components/NavBar.tsx
import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import AppsIcon from '@mui/icons-material/Apps';

import { CustomButton, CustomIconButton } from '../MUI/CustomMui';
import { navigationService, ROUTES } from './NavBar.service';

import './NavBar.style.scss';

const NAV_ITEMS = [
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

const NavBar: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigationService.goBack(navigate);
  }, [navigate]);

  const handleNavigation = useCallback(
    (path: typeof ROUTES[keyof typeof ROUTES]) => {
      navigationService.navigateTo(navigate, path);
    },
    [navigate]
  );

  return (
    <nav className="nav-bar">
      <CustomIconButton aria-label="menu" size="medium">
        <AppsIcon fontSize="inherit" />
      </CustomIconButton>

      <CustomIconButton
        aria-label="back"
        size="medium"
        onClick={handleBack}
      >
        <ReplyIcon fontSize="inherit" />
      </CustomIconButton>

      {NAV_ITEMS.map(({ name, label, path }) => (
        <CustomButton
          key={name}
          name={name}
          color="inherit"
          underline="none"
          margin-left="30px"
          active={pathname === path}
          onClick={() => handleNavigation(path)}
        >
          {label}
        </CustomButton>
      ))}
    </nav>
  );
};

export default NavBar;