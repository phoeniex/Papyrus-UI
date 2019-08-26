import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AddRounded, SortRounded } from '@material-ui/icons'
import { Button, Tabs, Tab }  from '@material-ui/core';
import { Link } from 'react-router-dom';

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
  console.log('ID: ', props.moduleId)
  const [value, setValue] = React.useState(props.moduleId || 0);
  const classes = useStyles();
  const tabsClasses = useTabsStyles();
  const tabClasses = useTabStyles();

  const tabs = [
    {label: 'Test 1', to: '/module/0'},
    {label: 'Test 2', to: '/module/1'},
    {label: 'Test 3', to: '/module/2'},
    {label: 'Test 4', to: '/module/3'},
    {label: 'Test 5', to: '/module/4'},
    {label: 'Test 6', to: '/module/5'},
    {label: 'Test 7', to: '/module/6'},
    {label: 'Test 8', to: '/module/7'},
    {label: 'Test 9', to: '/module/8'},
    {label: 'Test 10', to: '/module/9'},
    {label: 'Test 11', to: '/module/10'},
    {label: 'Test 12', to: '/module/11'},
    {label: 'Test 13', to: '/module/12'},
  ];

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <Tabs value={value} onChange={handleChange} classes={tabsClasses} variant='scrollable' scrollButtons='desktop' indicatorColor='primary'>
        {tabs.map(tab => (
          <Tab classes={tabClasses} disableRipple key={tab.label} component={Link} {...tab} />
        ))}
      </Tabs>
      <Button variant='outlined' className={classes.otherButton}><AddRounded className={classes.icon}/>Add New Group</Button>
      <Button variant='outlined' className={classes.otherButton}><SortRounded className={classes.icon}/>Sort By Date ▲</Button>
    </div>
  );
}
