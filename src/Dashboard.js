import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { MainListItems, SecondaryListItems } from './listItems';
import Chart from './Chart';
import ScoreTable from './ScoreTable';
// import 
import styles from './dashboard.styles'
import axios from 'axios'
const useStyles = makeStyles(styles);
export default function Dashboard() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('gender')
  const [isLoading, setLoader] = useState(false);
  const fetchData = async () => {
    setLoader(true)
    const result = await axios('api/people.json');    
    setData(result.data);
    setLoader(false)
  };

  useEffect(()=>{fetchData()}, [])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={()=>setOpen(true)}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Holidu Interview Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <MainListItems />
        <Divider />
        <SecondaryListItems setFilter={setFilter}/>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                <Chart loading={isLoading} rows={data} filterBy={filter}/>
              </Paper>
            </Grid>
            {/* Recent scores */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <ScoreTable loading={isLoading} rows={data} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
