// src/components/NavBar.tsx
import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import AppsIcon from '@mui/icons-material/Apps';

import { navigationService } from './NavBarService';

import './NavBar.style.scss';
import { NAV_ITEMS, ROUTES } from './NanBar.constants';
import { CustomIconButton, CustomButton } from './NavBar.styles';
import { RouteKey } from './NavBar.types';




const NavBar: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigationService.goBack(navigate);
  }, [navigate]);

  const handleNavigation = useCallback(
    (path: typeof ROUTES[RouteKey]) => {
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