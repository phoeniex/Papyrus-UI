import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import { match } from 'autosuggest-highlight/match';
import { parse } from 'autosuggest-highlight/parse';
import { InputBase, IconButton, Paper, MenuItem } from '@material-ui/core';
import { SearchRounded, CloseRounded } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 12px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    flexGrow: 1,
  },
  input: {
    margin: '0 8px',
    flex: 1,
    fontSize: 12,
    color: '#2F2F2F',
  },
  iconButton: {
    padding: 0,
  },
  hidden: {
    display: 'none',
  },
  icon: {
    fontSize: 16,
    color: '#909090',
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
    color: '#2F2F2F',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
}));

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
];

function renderInputComponent(inputProps) {
  const { classes, state, setState, setSuggestions, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <Paper className={classes.root}>
      <SearchRounded className={classes.icon} />
      <InputBase
        className={classes.input}
        placeholder="Search For Any Screen or String "
        inputprops={{
          inputRef: node => {
            ref(node);
            inputRef(node);
          },
          classes: {
            input: classes.input,
          },
        }}
        {...other}
      />
      <IconButton className={ [classes.iconButton, state === '' ? classes.hidden : null ].join(' ') } aria-label="Clear" onClick={ () => { setState(''); setSuggestions([]); } }>
        <CloseRounded className={classes.icon} />
      </IconButton>
    </Paper>
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(part => (
          <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400, fontSize: 12 }}>
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

export const SearchInputField = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState('');
  const [stateSuggestions, setSuggestions] = React.useState([]);

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = (event, { newValue }) => {
    setState(newValue);
  };

  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion,
  };

  return (
    <Autosuggest
      {...autosuggestProps}
      inputProps={{
        classes,
        state,
        setState,
        setSuggestions,
        id: 'search',
        label: 'Search',
        placeholder: 'Search Any For Screen or String ',
        value: state,
        onChange: handleChange,
      }}
      theme={{
        container: classes.container,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion,
      }}
      renderSuggestionsContainer={options => (
        <Paper {...options.containerProps} square>
          {options.children}
        </Paper>
      )}
    />
  );
}
