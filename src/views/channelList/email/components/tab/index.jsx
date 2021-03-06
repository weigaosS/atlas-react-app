import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Flex from '@cobalt/react-flex';
import Tab from '@cobalt/react-tab';

export function FnTab({ tabs = [], tabMap = {} }) {
  const location = useLocation();

  const [selectedTab, setSelectedTab] = useState('');
  const handleSelectTab = (tab) => () => setSelectedTab(tab.name);

  useEffect(() => {
    setSelectedTab(tabMap[location.pathname]);
  }, [location.pathname, tabMap]);

  return (
    <Flex paddingX={6}>
      {tabs.map((tab) => (
        <Flex alignX={1} paddingX={1} key={tab.name}>
          <Tab onClick={handleSelectTab(tab)} active={selectedTab === tab.name}>
            <Link to={tab.path}>{tab.name}</Link>
          </Tab>
        </Flex>
      ))}
    </Flex>
  );
}

FnTab.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  tabMap: PropTypes.object.isRequired,
};
