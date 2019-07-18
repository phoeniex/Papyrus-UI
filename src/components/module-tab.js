import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AddRounded, SortRounded } from '@material-ui/icons'
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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

export default function ModuleTabs() {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const tabsClasses = useTabsStyles();
  const tabClasses = useTabStyles();
  const tabs = [
    {label: 'Test 1'},
    {label: 'Test 2'},
    {label: 'Test 3'},
    {label: 'Test 4'},
    {label: 'Test 5'},
    {label: 'Test 6'},
    {label: 'Test 7'},
    {label: 'Test 8'},
    {label: 'Test 9'},
    {label: 'Test 10'},
    {label: 'Test 11'},
    {label: 'Test 12'},
    {label: 'Test 13'},
    {label: 'Test 14'},
    {label: 'Test 15'},
    {label: 'Test 16'},
    {label: 'Test 17'},
    {label: 'Test 18'},
    {label: 'Test 19'},
    {label: 'Test 20'},
    {label: 'Test 21'},
    {label: 'Test 22'},
  ];

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <Tabs value={value} onChange={handleChange} classes={tabsClasses} variant='scrollable' scrollButtons='desktop' indicatorColor='primary'>
        {tabs.map(tab => (
          <Tab classes={tabClasses} disableRipple={true} key={tab.label} {...tab} />
        ))}
      </Tabs>
      <Button variant='outlined' className={classes.otherButton}><AddRounded className={classes.icon}/>Add New Group</Button>
      <Button variant='outlined' className={classes.otherButton}><SortRounded className={classes.icon}/>Sort By Date ▲</Button>
    </div>
  );
}
