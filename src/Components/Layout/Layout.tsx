// src/components/Layout/Layout.tsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from '../NavBar';
import './Layout.style.scss';
import { MenuHeader, MenuList } from '../Menu/index';


const Layout: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isListOpen, setIsListOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('Стрингельно-монтажные работы');

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleToggleList = () => {
    setIsListOpen(!isListOpen);
  };

  const handleItemClick = (label: string) => {
    setActiveItem(label); 
  };
  return (
    <div className="layout">
      <NavBar />
      <div className="layout__container">
        <MenuHeader
          isOpen={isOpen}
          isListOpen={isListOpen}
          activeItem={activeItem}
          onToggleList={handleToggleList}
        />
        <main className="layout__content">
          <MenuList
            isOpen={isOpen}
            isListOpen={isListOpen}
            onToggleSidebar={handleToggleSidebar}
            activeItem={activeItem}
            onItemClick={handleItemClick}
          />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
