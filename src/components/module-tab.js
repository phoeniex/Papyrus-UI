import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const ModuleTabs = withStyles({
  indicator: {
    display: 'none'
  },
})(props => <Tabs {...props} />);

const ModuleTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    color: '#2F2F2F',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(14),
    marginRight: theme.spacing(1),
    opacity: 0.6,
    borderRadius: 4,
    transition: 'all .5s',
    padding: 10,
    height: 'auto',
    margin: 10,
    minWidth: 0,
    '&:hover': {
      opacity: 1,
    },
    '&$selected': {
      '&, &:hover': {
        color: 'white',
        backgroundColor: '#1CA7EC',
        boxShadow: '0 4px 10px rgba(28, 167, 236, 0.4)',
        opacity: 1,
      }
    }
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

export default function CustomizedTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
        <ModuleTabs
          value={value}
          onChange={handleChange}
          variant='scrollable'
          scrollButtons='auto'>
          <ModuleTab label="Workflows" />
          <ModuleTab label="Datasets" />
          <ModuleTab label="Connections" />
          <ModuleTab label="Workflows" />
          <ModuleTab label="Datasets" />
          <ModuleTab label="Connections" />
          <ModuleTab label="Workflows" />
          <ModuleTab label="Datasets" />
          <ModuleTab label="Connections" />
          <ModuleTab label="Workflows" />
          <ModuleTab label="Datasets" />
          <ModuleTab label="Connections" />
        </ModuleTabs>
      </div>
  );
}
