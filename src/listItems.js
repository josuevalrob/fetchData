import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import List from '@material-ui/core/List';

export const MainListItems = () => (
  <List>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
  </List>
);

export const SecondaryListItems = ({setFilter}) => (
  <List>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button onClick={()=>setFilter('gender')}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Scores by gender" />
    </ListItem>
    <ListItem button onClick={()=>setFilter('country')}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Scores by country" />
    </ListItem>
  </List>
);
