import { Box, Button, Collapse, List, ListItemButton, ListItemIcon, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

export const HeaderBox = styled(Box)({
    width: '100%',
    backgroundColor: '#27272A;',
    display: 'flex',
    alignItems: 'center',
    height: '48px',


    border: '1px solid #424242',

});

export const HeaderButton = styled(Button)({
    maxWidth: '240px',
    width: '100%',
    height:'100%',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'none',
    borderRight: '1px solid #424242',
    borderLeft: '1px solid #424242',
    borderRadius: '0',
    
    

});

export  const HeaderTitle = styled(Typography)({
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:'0 10px',

    width: '100%',
    height: '100%',
    whiteSpace: 'nowrap',
    textTransform: "none",
    color: '#A1A1AA',
    fontWeight: 400,
    fontFamily: 'Roboto',
    fontSize: '14px',
    lineHeight: '100%',
    letterSpacing: '0%',
    '& svg': {
        marginLeft: '8px',
    },
});

export  const ActiveItemTypography = styled(Typography)({
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    padding:'0 10px',
    fontWeight: 400,
    whiteSpace: 'nowrap',
    height: '100% !important',
    color: '#A1A1AA',
    borderRight: '1px solid #424242',
    borderLeft: '1px solid #424242',
});


export  const ListCollapse = styled(Collapse)({
  maxWidth: '240px',
  width:'100%',
  backgroundColor:'#27272A',
});

export  const StyledList = styled(List)({
  padding:0,
  width: '100%',
});

export  const StyledListItemButton = styled(ListItemButton)({
  minHeight: '32px',
  justifyContent: 'flex-start',
  width: '100%',
  boxSizing:'border-box',
  '&.active': {  
    backgroundColor: '#424242',
  },
});

export  const StyledListItemIcon = styled(ListItemIcon)({
  minWidth: 0,
  marginRight: '24px',
  color: '#ffffff',
  display: 'flex',
  justifyContent: 'center',
  overflowY:'hidden', 
});

export const StyledListItemText = styled(Typography)({
  fontWeight: 400,
  color: '#ccc',
  overflowY:'hidden',
});