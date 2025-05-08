import { useState } from 'react';
import './TopNavBar.css';

const navItems = [
  { id: 'about', label: 'About Me' },
  { id: 'projects', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' }
];

const TopNavBar = ({ onSelect, activeSection, onClose }) => {
  const leftItems = navItems.slice(0, 2);
  const rightItems = navItems.slice(2);

  return (
    <nav className="top-nav-bar">
      <ul className="nav-list">
        {leftItems.map(item => (
          <li
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => onSelect(item.id)}
          >
            {item.label}
          </li>
        ))}

        {/* always render the center star */}
        <li className="nav-center-icon" onClick={onClose}>
          ✦
        </li>

        {rightItems.map(item => (
          <li
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => onSelect(item.id)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TopNavBar;
