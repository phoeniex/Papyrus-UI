import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { ScreenCard } from '../components/screen-card';

const { ipcRenderer } = window.require('electron')

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

ipcRenderer.on('update-module-container', (event, modules) => {
  console.log('Update Tab Container')
  // const classes = useStyles();
  // var moduleContainer = document.getElementById('moduleContainer');
  // let innerHTML = ''

  // modules.forEach( (module, index) => {
  //   innerHTML += '<TabPanel className=' + classes.root + ' value=' + moduleContainer.getAttribute('moduleid') + 'index=' + index + '>'
  //   innerHTML += '</TabPanel>'
  // })

  // moduleContainer.innerHTML = innerHTML
})

export const ModuleContainer = (props) => {
  const moduleId = props.moduleId || 0
  const classes = useStyles();
  const [tabs, setTabs] = React.useState([]);

  console.log('Container ID:' + moduleId)
  registerListener()

  function registerListener() {
    ipcRenderer.on('update-module-container', (event, modules) => {
      console.log('Update Tab Container')

      let tempTabs = []
      modules.forEach( (module, index) => {
        let tempScreens = []
        module.screens.forEach( (screen, subIndex) => {
          tempScreens.push({key: index + '-' + subIndex, image: screen.image, name: screen.name, localizedCount: screen.localizes.length})
        })

        tempTabs.push({id: index, screens: tempScreens})
      })

      console.log(tempTabs)
      setTabs(tempTabs)
    })
  }

  return (
    <div moduleid={moduleId} id='moduleContainer'>
      {tabs.map(tab => (
        <TabPanel className={classes.root} key={tab.id} value={moduleId} index={tab.id}>
          {tab.screens.map(screen => (
            <ScreenCard {...screen}/>
          ))}
        </TabPanel>
      ))}
    </div>
  );
}


