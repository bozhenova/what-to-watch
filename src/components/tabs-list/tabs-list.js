import React from 'react';
import { Tabs } from '../../constants';
const shortid = require('shortid');
import PropTypes from 'prop-types';

const TabsList = ({ onTabChange, currentTab }) => {
  const handleClick = e => {
    onTabChange(e.target.dataset.tab);
  };

  return (
    <nav className='movie-nav movie-card__nav'>
      <ul className='movie-nav__list'>
        {Tabs.map(tab => {
          return (
            <li
              key={shortid.generate()}
              className={`movie-nav__item ${
                currentTab === tab ? `movie-nav__item--active` : ``
              }`}
              onClick={handleClick}
            >
              <a className='movie-nav__link' data-tab={tab}>
                {tab}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

TabsList.propTypes = {
  onTabChange: PropTypes.func.isRequired,
  currentTab: PropTypes.string.isRequired
};

export default TabsList;
