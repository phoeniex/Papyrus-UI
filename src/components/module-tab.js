import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AddRounded, SortRounded } from '@material-ui/icons'
import { Button, Tabs, Tab, Dialog, DialogActions, DialogContent, TextField, DialogTitle }  from '@material-ui/core';
import { Link } from 'react-router-dom';

const { ipcRenderer } = window.require('electron')
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    margin: '10px 30px 10px 0px',
    alignItems: 'center',
  },
  otherButton: {
    color: 'rgba(47, 47, 47, 0.6)',
    width: 240,
    textTransform: 'none',
    height: 'fit-content',
    fontWeight: 300,
    fontSize: 12,
    margin: '0 10px',
    padding: '4px 12px',
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: 14,
    cursor: 'pointer',
    marginRight: theme.spacing(1),
  }
}));

const useTabsStyles = makeStyles(theme => ({
  root: {
    justifyContent: 'flex-start',
  },
  indicator: {
    display: 'none',
  },
  scrollButtons: {
    color: 'rgba(47, 47, 47, 0.6)',
    borderRadius: 4,
    margin: theme.spacing(0.5),
  }
}));

const useTabStyles = makeStyles(theme => ({
  root: {
    textTransform: 'none',
    color: 'rgba(47, 47, 47, 0.6)',
    fontWeight: 'normal',
    fontSize: 14,
    minWidth: 'fit-content',
    transition: '0.2s',
  },
  selected: {
    color: '#004DC2',
    fontWeight: 'medium',
    '&:after': {
      content: '" "',
      position: 'absolute',
      bottom: '27%',
      width: '65%',
      borderBottom: '1px dashed #004DC2',
      background: 'transparent',
      boxShadow: '0px 2px 8px 0px #004DC2',
    },
  },
}));



export const ModuleTabs = (props) => {
  const [value, setValue] = React.useState(props.moduleId || 0)
  const [tabs, setTabs] = React.useState([])
  const [addDialogOpen, setAddDialogOpen] = React.useState(false)
  const [moduleName, setModuleName] = React.useState('')
  const classes = useStyles()
  const tabsClasses = useTabsStyles()
  const tabClasses = useTabStyles()

  registerListener()

  function handleChange(event, newValue) {
    console.log('Tab ID:' + newValue)
    setValue(newValue);
  }

  function handleClickAdd() {
    console.log('Module Name:' + moduleName)
    ipcRenderer.send('add-module', moduleName)
    setAddDialogOpen(false)
  }

  const handleClickOpen = () => {
    setAddDialogOpen(true)
  }

  const handleModuleNameChange = () => event => {
    console.log('Module Name:' + event.target.value)
    setModuleName(event.target.value)
  }

  const handleClickClose = () => {
    setAddDialogOpen(false)
  }

  function registerListener() {
    ipcRenderer.on('update-module-tab-bar', (event, modules) => {
      console.log('Update Tab Names')

      let tempTabs = [];
      console.log(modules)
      modules.forEach( (module, index) => {
        tempTabs.push({label: module['name'], to: '/module/' + index, key: module['name'] + '-' + index })
      })

      setTabs(tempTabs)
    })
  }

  function ModuleTabContainer(props) {
    if (tabs.length > 0) {
      return <Tabs value={value} onChange={handleChange} classes={tabsClasses} variant='scrollable' scrollButtons='desktop' indicatorColor='primary'>
        {tabs.map(tab => (
          <Tab classes={tabClasses} disableRipple component={Link} {...tab} />
        ))}
      </Tabs>
    }
    return null
  }

  return (
    <div id='moduleTabs' className={classes.root}>
      <ModuleTabContainer/>
      <Button variant='outlined' className={classes.otherButton} onClick={handleClickOpen}><AddRounded className={classes.icon}/>Add New Module</Button>
      <Button variant='outlined' className={classes.otherButton}><SortRounded className={classes.icon}/>Sort By Date  ▲</Button>
      <Dialog open={addDialogOpen} onClose={handleClickClose}>
        <DialogTitle id="formDialogTitle">Add New Module</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='moduleName'
            label='Module Name'
            value={moduleName}
            onChange={handleModuleNameChange()}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose} color='primary'>Cancel</Button>
          <Button onClick={handleClickAdd} color='primary'>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
