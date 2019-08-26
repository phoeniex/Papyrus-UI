import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { SearchInputField } from './search-input-field';
import { ProjectSettingItem } from './project-setting-item';

const { app } = window.require('electron').remote;

const useStyles = makeStyles(theme => ({
  root: {
    '-webkit-app-region': 'drag',
    backgroundColor: '#004DC2',
    padding: '13px 54px',
    height: 60,
    color: '#FCFCFC',
    display: 'flex',
    alignItems: 'center',
    margin: 0,
  },
  logoItem: {
    width: 190,
    textAlign: 'center',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 1,
  },
  version: {
    fontSize: 8,
    opacity: 0.6,
    lineHeight: 1,
  },
  searchItem: {
    width: 260,
  }
}));

export const TitleBar = (props) => {
  const classes = useStyles();

    return (
    <Grid container className={classes.root} direction='row' justify='space-between' alignItems='center'>
      <Grid item className={classes.logoItem}>
        <Typography className={classes.logo}>PAPYRUS</Typography>
        <Typography className={classes.version} id='title-version'>V {app.getVersion()}</Typography>
      </Grid>
      <Grid item>
        <ProjectSettingItem navigateBack={props.navigateBack} moduleName={props.moduleName}/>
      </Grid>
      <Grid item className={classes.searchItem}>
        <SearchInputField defaultValue="Search For Screen or String" id="titile-search-input" />
      </Grid>
    </Grid>
    );
}
