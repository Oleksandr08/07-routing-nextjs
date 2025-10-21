'use client';
import { useState } from 'react';
import css from './TagsMenu.module.css';

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={handleClick}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {/* список тегів */}
          <li className={css.menuItem}>
            <a href={`/notes/filter/All`} className={css.menuLink}>
              All notes
            </a>
          </li>
          <li className={css.menuItem}>
            <a href={`/notes/filter/Work`} className={css.menuLink}>
              Work
            </a>
          </li>
          <li className={css.menuItem}>
            <a href={`/notes/filter/Personal`} className={css.menuLink}>
              Personal
            </a>
          </li>
          <li className={css.menuItem}>
            <a href={`/notes/filter/Meeting`} className={css.menuLink}>
              Meeting
            </a>
          </li>
          <li className={css.menuItem}>
            <a href={`/notes/filter/Shopping`} className={css.menuLink}>
              Shopping
            </a>
          </li>
          <li className={css.menuItem}>
            <a href={`/notes/filter/Todo`} className={css.menuLink}>
              Todo
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}
