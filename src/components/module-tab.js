import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderBottom: '1px dash #1CA7EC',
    '& > div': {
      width: '100%',
      color: '#1CA7EC'
    },
  },
})(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    color: '#2F2F2F',
    opacity: 0.6,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: 14,
    marginRight: theme.spacing(1),
    '&:hover': {
      color: '#2F2F2F',
      opacity: 1,
    },
    '&$selected': {
      color: '#2F2F2F',
      fontWeight: theme.typography.fontWeightMedium,
      opacity: 1,
    },
    '&:focus': {
      color: '#2F2F2F',
      opacity: 1,
    },
  },
}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  typography: {
    padding: theme.spacing(3),
  },
}));

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function ModuleTab() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <StyledTabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto">
          <StyledTab label="Item One" />
          <StyledTab label="Item Two" />
          <StyledTab label="Item Three" />
          <StyledTab label="Item Four" />
          <StyledTab label="Item Five" />
          <StyledTab label="Item Six" />
          <StyledTab label="Item Seven" />
          <StyledTab label="Item Eight" />
          <StyledTab label="Item Nine" />
          <StyledTab label="Item Ten" />
        </StyledTabs>
      </AppBar>
      {value === 0 && <TabContainer>Item One</TabContainer>}
      {value === 1 && <TabContainer>Item Two</TabContainer>}
      {value === 2 && <TabContainer>Item Three</TabContainer>}
      {value === 3 && <TabContainer>Item Four</TabContainer>}
      {value === 4 && <TabContainer>Item Five</TabContainer>}
      {value === 5 && <TabContainer>Item Six</TabContainer>}
      {value === 6 && <TabContainer>Item Seven</TabContainer>}
      {value === 7 && <TabContainer>Item Eight</TabContainer>}
      {value === 8 && <TabContainer>Item Nine</TabContainer>}
      {value === 9 && <TabContainer>Item Ten</TabContainer>}
    </div>
  );
}
