import React, { useState } from 'react';
import './DropdownStyles.css';

const Dropdown = ({ options, onSelect, title }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <select className="dropdown-menu" value={selectedOption} onChange={(e) => handleSelect(e.target.value)}>
      <option value="">{title}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;