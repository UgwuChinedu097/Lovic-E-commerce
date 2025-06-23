import React from 'react';

const CTAButton = ({ text, className, onClick }) => {
  return (
    <button onClick={onClick} className={`${className}`}>
      {text}
    </button>
  );
};

export default CTAButton;
