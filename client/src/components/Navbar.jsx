import React from 'react';

import Logo from './Logo';

const Navbar = () => (
  <nav className="navbar navbar-light bg-dark">
    <a
      href="https://pixelplex.io/"
      className="navbar-brand"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Logo />
    </a>
  </nav>
);

export default Navbar;
