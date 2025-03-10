import { Box, Button, Typography } from "@mui/material";
import styled from "styled-components";
import { MenuHeaderProps } from "./Menu.types";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const HeaderBox = styled(Box)({
    width: '100%',
    backgroundColor: '#27272A;', // Assuming same background as before
    display: 'flex',
    alignItems: 'center',
    minHeight: '48px',
  });
  
  const HeaderButton = styled(Button)({
    maxWidth: '240px',
    width:'100%',
    minHeight: '48px',
    padding: 0,
    backgroundColor: '#424242',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textTransform: 'none',
    border:'1px',
    borderStyle:'solid',
    borderColor:'#FFF',
    
  });
  
  const HeaderTitle = styled(Typography)({
    fontWeight: 600,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height:'100%',
    
    whiteSpace: 'nowrap',
    textTransform: "none",
    '& svg': {
      marginLeft: '8px',
    },
  });
  
  const ActiveItemTypography = styled(Typography)({
    fontWeight: 400,
    color: '#ccc',
    padding: '0 20px',
    whiteSpace: 'nowrap',
  });

  export const MenuHeader: React.FC<MenuHeaderProps> = ({
    isOpen,
    isListOpen,
    activeItem,
    onToggleList,
  }) => {
    return (
      <HeaderBox>
        <HeaderButton onClick={onToggleList}>
          <HeaderTitle >
            Название проекта<br />Аббревиатура
            {isListOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </HeaderTitle>
        </HeaderButton>
        {isOpen && (
          <ActiveItemTypography>
            {activeItem}
          </ActiveItemTypography>
        )}
      </HeaderBox>
    );
  };
  