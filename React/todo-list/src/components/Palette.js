import React from 'react';
import './Palette.css';

const Color = ({ color, active, onClick }) => {
  return (
    <div className={`color ${active && 'active'}`} style={{background: color}} onClick={onClick} />
  )
}

const Palette = ({ colors, selected, onSelect }) => {
  const colorList = colors.map(
    (color) => (<Color color={color} key={color} onClick={() => onSelect(color)} active={selected === color} />)
  )
  return (
    <div className='palette'>
      {colorList}
    </div>
  );
};

export default Palette;