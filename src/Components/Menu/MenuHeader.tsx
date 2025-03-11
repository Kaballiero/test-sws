import { MenuHeaderProps } from "./Menu.types";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { HeaderBox, HeaderButton, HeaderTitle, ActiveItemTypography } from "./Menu.style";



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

