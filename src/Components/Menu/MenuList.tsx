import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  ListItem,
  ListItemText,
} from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import { MenuListProps, MenuItem } from './Menu.types';
import { ListCollapse, StyledList, StyledListItemButton, StyledListItemIcon, StyledListItemText } from './Menu.style';
import { MENU_ITEMS } from './Menu.constants';

export const MenuList: React.FC<MenuListProps> = ({
  isOpen,
  isListOpen,
  onToggleSidebar,
  activeItem,
  onItemClick,
}) => {
  return (
    <ListCollapse in={isListOpen} timeout="auto" unmountOnExit >
      <StyledList>
        {MENU_ITEMS.map((item, index) => (
          <ListItem key={item.label} disablePadding>
            <StyledListItemButton
              onClick={() => onItemClick(item.label)}
              className={activeItem === item.label ? 'active' : ''}
            >
              <StyledListItemIcon>

                <GridViewIcon />

              </StyledListItemIcon>
              {isOpen && (
                <ListItemText
                  primary={<StyledListItemText variant="body1">{item.label}</StyledListItemText>}
                />
              )}
            </StyledListItemButton>
          </ListItem>
        ))}
      </StyledList>
    </ListCollapse>
  );
};