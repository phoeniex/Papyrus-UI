import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography, InputAdornment, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@material-ui/core';

const { ipcRenderer } = window.require('electron')
const { dialog, nativeImage } = window.require('electron').remote
const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
    display: 'flex',
  },
  icon: {
    width: 36,
    height: 36,
    margin: 0,
    display: 'inline-flex',
  },
  iconButton: {
    padding: 2,
    width: 40,
    minWidth: 40,
  },

  editButton: {
    marginLeft: 4,
    padding: 6,
    borderRadius: 6,
  },
  editButtonIcon: {
    width: 14,
    height: 14,
    fontSize: 14,
    color: '#FCFCFC',
  },

  backButton: {
    padding: 6,
    minWidth: 0,
    marginRight: 40,
  },
  backButtonIcon: {
    width: 24,
    height: 16,
  },

  projectName: {
    padding: '0 0 0 8px',
    fontSize: 14,
    fontWeight: 'bold',
    display: 'inline-flex',
  },
  moduleName: {
    padding: '0 4px 0 4px',
    fontSize: 14,
    fontWeight: 300,
    color: 'rgba(252, 252, 252, 0.6)',
    display: 'inline-flex',
  },

  previewEditButton: {
    padding: 0,
    minWidth: 36,
    minHeight: 36,
    height: 36,
    width: 36,
    borderRadius: 6,
  },

  dialogName: {
    margin: '16px 0',
  },

  dialogButton: {
    fontSize: 14,
    textTransform: 'none',
  },
}))

export const ProjectSettingItem = (props) => {
  const classes = useStyles()
  const [openProjectSetting, setOpenProjectSetting] = React.useState(false)
  const [newProjectSetting, setNewProjectSetting] = React.useState({name: props.project.name, icon: props.project.icon})
  const projectLogoImageLocation = require('./../images/icon-project-default@2x.png')
  const editIconLocation = require('./../images/icon-project-edit@2x.png')

  const handleClickOpenProjectSetting = () => {
    setOpenProjectSetting(true)
  }

  const handleUpdateProjectSetting = () => {
    ipcRenderer.send('update-project-setting', newProjectSetting)
  }

  const handleCloseProjectSetting = () => {
    setOpenProjectSetting(false)
  }

  const handleClickBack = (event) => {
    console.log('Back: ' + props.pageMode.moduleId)
    props.setPageMode({mode: 'module', id: props.pageMode.moduleId, moduleId: undefined})
  }

  const handleChangeProjectSetting = (key) => (event) => {
    setNewProjectSetting({...newProjectSetting, [key]: event.target.value})
  }

  const handleClickFileOpen = () => {
      dialog.showOpenDialog({ filters: [ {name: 'Image File', extensions: ['png']} ] }, (files) => {
        if(files !== undefined) {
          let image = nativeImage.createFromPath(files[0]).resize({width: 36, height: 36, quality: 'best'})
          var projectIcon = document.getElementById('title-project-icon-preview')
          projectIcon.src = image.toDataURL()
        }
      })
  }

  function ModuleName(props) {
    if (props.pageMode.moduleId !== undefined) {
      console.log('Module ID: ' + props.pageMode.moduleId)
      const moduleName = props.project.modules[props.pageMode.moduleId].name || ''
      return <Typography className={classes.moduleName} id='title-module-name'>― {moduleName}</Typography>
    }

    return null
  }

  function DiscloseBack(props) {
    const classes = useStyles()
    const canNavigateBack = props.navigateBack
    const backButton = require('../images/icon-disclose-back@2x.png')

    if(canNavigateBack) {
      return <Button className={classes.backButton} onClick={handleClickBack}><img className={classes.backButtonIcon} src={backButton} alt='Back' /></Button>
    }

    return null
  }

  return (
    <div className={classes.root}>
      <DiscloseBack navigateBack={props.navigateBack} pageMode={props.pageMode}/>
      <img className={classes.icon} id='title-project-icon' src={projectLogoImageLocation} alt="Project Logo" />
      <Typography className={classes.projectName} id='title-project-name'>{props.project.name}</Typography>
      <ModuleName project={props.project} pageMode={props.pageMode}/>
      <IconButton className={classes.editButton} onClick={handleClickOpenProjectSetting}>
        <img className={classes.editButtonIcon} src={editIconLocation} alt="Edit Icon"/>
      </IconButton>
      <Dialog open={openProjectSetting} onClose={handleCloseProjectSetting} aria-labelledby='form-dialog-title' disableBackdropClick>
        <DialogTitle id='form-dialog-title'>Project Information</DialogTitle>
        <DialogContent className={classes.dialogItems}>
          <TextField className={classes.dialogName} variant='outlined' id='name' value={newProjectSetting.name} onChange={handleChangeProjectSetting('name')} label='Project Detail' helperText='Tap on Icon to change it.' color='primary' fullWidth InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Button className={classes.previewEditButton} onClick={handleClickFileOpen}>
                  <img className={classes.icon} id='title-project-icon-preview' src={projectLogoImageLocation} alt='Project Logo' />
                </Button>
              </InputAdornment>
            ),
          }}
          />
          <TextField className={classes.dialogName} variant='outlined' id='name' label='Version' color='primary' />
        </DialogContent>
        <DialogActions>
          <Button className={classes.dialogButton} variant='outlined' onClick={handleCloseProjectSetting} color='primary'>Cancel</Button>
          <Button className={classes.dialogButton} variant='contained' onClick={handleUpdateProjectSetting} color='primary'>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
