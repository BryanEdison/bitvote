import React from 'react';
import { Menu } from 'semantic-ui-react';
import {Link} from 'react-router-dom'

const BitHeader = () => {

  return (
    <Menu style={{ marginTop: '10px' }}>
    <Link to="/">
    <a className="item">
    BitVote
    </a>
    </Link>
      <Menu.Menu position="right">
      <Link to="/">
      <a className="item">
      Elections
      </a>
      </Link>
      <Link to="/createelection">
      <a className="item">
      Add New Election
      </a>
      </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default BitHeader;
