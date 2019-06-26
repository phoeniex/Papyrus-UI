import { fade, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

const InputField = withStyles(theme => ({
  input: {
    borderRadius: '4px',
    backgroundColor: '#E5E5E5',
    fontSize: '12px',
    padding: '6px 8px',
    transition: theme.transitions.create(['box-shadow']),
    '&:focus': {
      boxShadow: `${fade('#FCFCFC', 0.2)} 0 0 0 0.1rem`
    },
  },
}))(InputBase);

export default InputField;
