import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from 'src/components/navBar';
import { MenuHeader } from 'src/components/menu/MenuHeader';
import { MenuList } from 'src/components/menu/MenuList';
import styles from './Layout.module.scss';

export function Layout() {
  const [isOpen, setIsOpen] = useState(true);
  const [isListOpen, setIsListOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('Стрингельно-монтажные работы');

  const handleToggleSidebar = () => setIsOpen((prev) => !prev);
  const handleToggleList = () => setIsListOpen((prev) => !prev);
  const handleItemClick = (label: string) => setActiveItem(label);

  return (
    <div className={styles.layout}>
      <NavBar />
      <div className={styles.layout__container}>
        <MenuHeader
          isOpen={isOpen}
          isListOpen={isListOpen}
          activeItem={activeItem}
          onToggleList={handleToggleList}
        />
        <main className={styles.layout__content}>
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
}

export default Layout;