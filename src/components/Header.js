import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';

class Header extends Component {

  render() {
    const { router } = this.props

    return (
      <nav>
        <div className='nav-wrapper'>
          <a href='#' className='brand-logo'>Mentoring Platform</a>
          <ul id='nav-mobile' className='right hide-on-med-and-down'>
            <li className={router.isActive('/dashboard') ? 'active' : ''}><Link to='/dashboard'>Questions</Link></li>
            <li><a href='/dashboard/tasks'>Tasks</a></li>
            <li><a href='/dashboard/profile'>My Profile</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);