import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SearchInputField from './search-input-field';
import IconButton from '@material-ui/core/IconButton';
import EditRounded from '@material-ui/icons/EditRounded';

const {app} = window.require('electron').remote;

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#004DC2',
    padding: '13px 54px',
    height: 60,
    color: '#FCFCFC',
    alignItems: 'center',
    margin: 0,
  },

}));

export default function TitleBar() {
  const classes = useStyles();
  const projectName = 'Digital Travel US';
  const projectLogoImageLocation = require('./../images/icon-project-default.png');

  return (
    <Grid container className={classes.root} direction="row" justify="space-between" alignItems="center">
      <Grid item className='title-logo-col'>
        <div className='title-logo' id='title-logo'>PAPYRUS</div>
        <div className="title-version" id="title-version">V {app.getVersion()}</div>
      </Grid>
      <Grid item className='title-project-col'>
        <img className='title-project-icon' id='title-project-icon' src={projectLogoImageLocation} alt="Project Logo" />
        <span className='title-project-name' id='title-project-name'>{projectName}</span>
        <IconButton size='small'>
          <EditRounded fontSize='small' htmlColor='#FCFCFC' />
        </IconButton>
      </Grid>
      <Grid item className="title-search-col">
        <SearchInputField defaultValue="Search For Screen or String" id="titile-search-input" />
      </Grid>
    </Grid>
  )
}
