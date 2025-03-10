import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import {  MenuListProps, MenuItem } from './Menu.types';

const MENU_ITEMS: MenuItem[] = [
  { label: 'По проекту' },
  { label: 'Объекты' },
  { label: 'РА' },
  { label: 'МТО' },
  { label: 'СМР' },
  { label: 'Графики' },
  { label: 'Мим' },
  { label: 'Рабочие' },
  { label: 'Ключевые' },
  { label: 'Бюджет' },
  { label: 'Финпоказатели' },
  { label: 'Платежи' },
  { label: 'Камеры' },
  { label: 'Португаль' },
  { label: 'Контракты' },
  { label: 'Контрагенты' },
];


const ListCollapse = styled(Collapse)({
  maxWidth: '240px',
  width:'100%',
  backgroundColor:'#27272A',
});

const StyledList = styled(List)({
  padding:0,
  width: '100%',
});

const StyledListItemButton = styled(ListItemButton)({
  minHeight: '32px',
  justifyContent: 'flex-start',
  width: '100%',
  boxSizing:'border-box',
  '&.active': {  
    backgroundColor: '#424242',
  },
});

const StyledListItemIcon = styled(ListItemIcon)({
  minWidth: 0,
  marginRight: '24px',
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  overflowY:'hidden', 
});

const StyledListItemText = styled(Typography)({
  fontWeight: 400,
  color: '#ccc',
  overflowY:'hidden',
});

const StyledIconButton = styled(IconButton)({
  display: 'none', 
  overflowY:'hidden',
});


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