import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    left: '47vw',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    color: 'white'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const MapSelect = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel style={{color: 'white'}} id="program-selector-label">Program</InputLabel>
        <Select
          labelId="program-selector-label"
          id="program-selector"
          value={props.programSelected}
          onChange={props.programSelect}
          autoWidth
          style={{color: 'white'}}
        >
          {
            props.programs.map((program)=>{
              return (
                <MenuItem key={program.id} value={program.id}>{program.id}</MenuItem>
              )
            })
          }
        </Select>
        <FormHelperText style={{color: 'white'}}>Program Select</FormHelperText>
      </FormControl>
    </div>
  );
}

export default MapSelect