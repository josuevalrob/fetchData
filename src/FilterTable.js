import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing(1),
  },
}));

export default function FilterTable({columns, callFilter}) {
  const classes = useStyles();
  const [column, setState] = useState({
    last_name: false,
    first_name: false,
    gender: false,
    city: false,
    country: false,
  });
  const [word, setWord] = useState("")

  const handleChange = name => event => {
    setState({ ...column, [name]: event.target.checked });
  };
  const handleInput = event => {
    setWord(event.target.value);
  };

  useEffect(()=> { //send the props to the parent 📩
    callFilter({word, column})
  },[word, column, callFilter])

  return (
    <FormGroup row>
      <Input
        value={word}
        placeholder="Filter by"
        className={classes.input}
        onChange={handleInput}
      />
      {columns.map(e=>(
        <FormControlLabel 
          key={e.dataKey}
          label={e.label}
          control={
            <Checkbox 
              checked={columns[e.dataKey]} 
              onChange={handleChange(e.dataKey)} 
              value={e.dataKey} />
          }
        />
      ))}
    </FormGroup>
  );
}
