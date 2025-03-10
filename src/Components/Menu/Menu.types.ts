export interface MenuItem {
    label: string;
  }
  
  export interface MenuHeaderProps {
    isOpen: boolean;
    isListOpen: boolean;
    activeItem: string;
    onToggleList: () => void;
  }
  
  export interface MenuListProps {
    isOpen: boolean;
    isListOpen: boolean;
    onToggleSidebar: () => void;
    activeItem: string;
    onItemClick: (label: string) => void;
  }