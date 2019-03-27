import React from 'react';

const Spinner = () => (
  <div
    className="spinner-border text-danger"
    style={{ width: '5rem', height: '5rem' }}
    role="status"
  >
    <span className="sr-only">Loading...</span>
  </div>
);

export default Spinner;
