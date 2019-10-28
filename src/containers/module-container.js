import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { ScreenCard } from '../components/screen-card';

const useStyles = makeStyles(theme => ({
  root: {
    top: 128,
    left: 0,
    bottom: 0,
    position: 'absolute',
    overflow: 'auto',
    width: '100%',
    backgroundColor: '#FCFCFC',
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      hidden={value !== index}
      id={`simple-modulepanel-${index}`}
      aria-labelledby={`simple-modulepanel-${index}`}
      {...other}
    >
      {children}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export const ModuleContainer = (props) => {
  const classes = useStyles();

  var tabs = []
  props.modules.forEach( (module, index) => {
    let screens = []
    module.screens.forEach( (screen, subIndex) => {
      screens.push({key: index + '-' + subIndex, screenId: subIndex, image: screen.image, name: screen.name, localizedCount: screen.localizes.length})
    })

    tabs.push({id: index, name: module.name, screens: screens})
  })

  return (
    <div id='moduleContainer'>
      {tabs.map(tab => (
        <TabPanel className={classes.root} key={tab.id} value={props.pageMode.id} index={tab.id}>
          {tab.screens.map(screen => (
            <ScreenCard setPageMode={props.setPageMode} moduleId={tab.id} {...screen}/>
          ))}
        </TabPanel>
      ))}
    </div>
  );
}


