import { useState } from 'react';

const Row = ({ id, label, is_required, toggleMappedFields, checked }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const checkboxHandler = e => {
    setIsChecked(!isChecked);
    toggleMappedFields(isChecked, e.target.id);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '10%' }}>{is_required && '*'}</div>
      <div style={{ width: '40%' }}>{label}</div>
      <div style={{ width: '20%' }}>
        <input
          type='checkbox'
          id={id}
          checked={isChecked}
          onChange={checkboxHandler}
        />
      </div>
      <div>{checked.toString()}</div>
    </div>
  );
};

export default Row;
