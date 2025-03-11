import { IconButton, Button, styled } from "@mui/material";
import { CustomLinkProps } from "./NavBar.types";

export const CustomIconButton = styled(IconButton)(({ theme }) => ({
    color: '#a1a1aa',
    '&:hover': {
        color: '#ffffff',
    },
  }));
  
  
 export const CustomButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'active',
  })<CustomLinkProps>(({ theme, active }) => ({
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: active ? '#ffffff' : '#a1a1aa',
    boxSizing: 'border-box',
    borderRadius: '0',
    fontSize: '14px',
    position: 'relative',
  
    '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '2px',
        backgroundColor: active ? '#ffffff' : 'transparent',
        transition: 'background-color 0.3s ease',
    },
  }));