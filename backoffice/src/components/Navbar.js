import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

export const HOME = '/';
export const TILES = '/tiles';
export const PICTURES = '/pictures';
export const EDIT_INFO = '/edit-info';
export const STATISTICS = '/statistics';

export default function Navbar() {
  const history = useHistory();

  const [activeMenuItem, setActiveMenuItem] = useState(HOME);

  const onMenuItemClick = (_, { name }) => {
    setActiveMenuItem(name);
    history.push(name);
  };

  return (
    <Menu>
      <Menu.Item
        name={HOME}
        active={activeMenuItem === HOME}
        onClick={onMenuItemClick}
      >
        בית
      </Menu.Item>
      <Menu.Item
        name={TILES}
        active={activeMenuItem === TILES}
        onClick={onMenuItemClick}
      >
         אריחים
      </Menu.Item>

      <Menu.Item
        name={PICTURES}
        active={activeMenuItem === PICTURES}
        onClick={onMenuItemClick}
      >
        תמונות
      </Menu.Item>
      <Menu.Item
        name={EDIT_INFO}
        active={activeMenuItem === EDIT_INFO}
        onClick={onMenuItemClick}
      >
        עריכת מידע
      </Menu.Item>

      <Menu.Item
        name={STATISTICS}
        active={activeMenuItem === STATISTICS}
        onClick={onMenuItemClick}
      >
        סטטיסטיקות
      </Menu.Item>
    </Menu>
  );
}
