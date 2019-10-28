import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AddRounded, SortRounded } from '@material-ui/icons'
import { Button, Tabs, Tab, Dialog, DialogActions, DialogContent, TextField, DialogTitle }  from '@material-ui/core';

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
  },
  dialogButton: {
    fontSize: 14,
    textTransform: 'none',
  },
}))

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
}))

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
}))

export const ModuleTabs = (props) => {
  const [addDialogOpen, setAddDialogOpen] = React.useState(false)
  const [newModuleName, setNewModuleName] = React.useState('')
  const classes = useStyles()
  const tabsClasses = useTabsStyles()
  const tabClasses = useTabStyles()

  function handleTabChange(event, newValue) {
    console.log('Tab ID:' + newValue)
    props.setPageMode({mode: 'module', id: newValue, moduleId: undefined})
  }

  function handleClickAddNewModule() {
    console.log('Module Name:' + newModuleName)
    ipcRenderer.send('add-module', newModuleName)
    setAddDialogOpen(false)
  }

  const handleClickOpenNewModule = () => {
    setAddDialogOpen(true)
  }

  const handleModuleNameChange = () => event => {
    console.log('Module Name:' + event.target.value)
    setNewModuleName(event.target.value)
  }

  const handleClickCloseNewModule = () => {
    setAddDialogOpen(false)
  }

  function ModuleTabContainer(props) {
    var tabs = []
    props.modules.forEach( (module, index) => {
      tabs.push({label: module['name'], to: '/module/' + index, key: module['name'] + '-' + index })
    })

    if (tabs.length > 0) {
      return <Tabs value={props.pageMode.id} onChange={handleTabChange} classes={tabsClasses} variant='scrollable' scrollButtons='desktop' indicatorColor='primary'>
        {tabs.map(tab => (
          <Tab classes={tabClasses} disableRipple {...tab} />
        ))}
      </Tabs>
    }
    return null
  }

  return (
    <div id='moduleTabs' className={classes.root}>
      <ModuleTabContainer modules={props.modules} pageMode={props.pageMode}/>
      <Button variant='outlined' className={classes.otherButton} onClick={handleClickOpenNewModule}><AddRounded className={classes.icon}/>Add New Module</Button>
      <Button variant='outlined' className={classes.otherButton}><SortRounded className={classes.icon}/>Sort By Date  ▲</Button>
      <Dialog open={addDialogOpen} onClose={handleClickCloseNewModule}>
        <DialogTitle id="formDialogTitle">Add New Module</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='moduleName'
            label='Module Name'
            variant='outlined'
            color='primary'
            value={newModuleName}
            onChange={handleModuleNameChange()}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClickCloseNewModule} className={classes.dialogButton} color='primary'>Cancel</Button>
          <Button variant='contained' onClick={handleClickAddNewModule} className={classes.dialogButton} color='primary'>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
