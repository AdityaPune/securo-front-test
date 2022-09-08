import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import ComingSoonIcon from "../../assets/images/common/coming-soon.svg";
import { Paper, TextField, Button, Grid, useMediaQuery } from '@mui/material';

import "./index.scss"
import { useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
  isComingSoon: boolean;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, isComingSoon, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index &&
        <Box style={{ position: "relative" }}>
          {isComingSoon && <ComingsoonOverlay />}
          <Box p={3}>
            {children}
          </Box>
        </Box>
      }
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    //width temporary
    maxWidth: "700px",
  },
  paperStyle: {
    borderRadius: "10px 10px 10px 10px",
    boxShadow: "0 0 2px rgba(0,0,0,0.4)",
    // maxHeight: "320px"
  },
  //temporary
  TabTemporaryStyle: {
    fontWeight: "bold",
    color: "#000",
    fontFamily: "OpenSans",
    width: "50%"
  }
}));


function ComingsoonOverlay() {
  const matches = useMediaQuery('(max-width:600px)')

  const handleRedirect = () => {
    window.open("https://www.securo.finance/early-sign-up.html", "_blank");
  }
  return <div id="coming-soon-overlay">
    <div className='flex-column flex-content-center align-items-center coming-soon-wrapper'>
      <img src={ComingSoonIcon} alt="coming-soon" className='icon' />
      <Typography className='main-text' style={matches ? { fontSize: "16px" } : { fontSize: "20px" }} > Coming Soon!</Typography>
      <Typography className='secondary-text' style={matches ? { fontSize: "16px" } : { fontSize: "20px" }} >For deposit and withdraw <br /> Please contact us.</Typography>
      <Button className='action-button' onClick={() => handleRedirect()} variant="contained">Contact Us</Button>
    </div>
  </div >
}

function InvestTab() {
  const classes = useStyles();
  const [value, setValue] = useState(0)
  const [comingSoon, setIsComingSoon] = useState(true)

  const matches = useMediaQuery('(max-width:600px)')

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box className={classes.root}>
      <Paper className={classes.paperStyle}>
        {/* <Tabs value={value} onChange={handleChange} aria-label="simple tabs example"> */}
        {/* <Tabs onChange={handleChange} aria-label="simple tabs example"> temporary */}
        <Box display="flex" justifyContent="space-around">
          <Tab label="Deposit" {...a11yProps(0)} className={classes.TabTemporaryStyle} />
          <Tab label="Withdraw" {...a11yProps(1)} className={classes.TabTemporaryStyle} />
        </Box>
        {/* </Tabs> */}
        <TabPanel value={value} index={0} isComingSoon={comingSoon}>
          {/* <div style={{ position: "relative" }}> */}

          <Box>
            <TextField variant="outlined" label="amount" fullWidth size={matches ? 'small' : 'medium'} />
          </Box>
          <Box my={2}>
            <Button style={{ "backgroundColor": "#76D1BF" }} fullWidth>Invest</Button>
          </Box>
          <Grid container>
            <Grid item xs={6} style={matches ? { fontSize: "12px" } : { fontSize: "16px" }}>
              Wallet Balance
            </Grid>
            <Grid item xs={6} >
              <Box display="flex" justifyContent="flex-end" style={matches ? { fontSize: "12px" } : { fontSize: "16px" }}>
                <Box >$10000</Box>
              </Box>
            </Grid>
            <Grid item xs={6} style={matches ? { fontSize: "12px" } : { fontSize: "16px" }}>
              Currently Invested
            </Grid>
            <Grid item xs={6} >
              <Box display="flex" justifyContent="flex-end" style={matches ? { fontSize: "12px" } : { fontSize: "16px" }}>
                <Box >$100</Box>
              </Box>
            </Grid>
            <Grid item xs={6} style={matches ? { fontSize: "12px" } : { fontSize: "16px" }}>
              P&L
            </Grid>
            <Grid item xs={6} >
              <Box display="flex" justifyContent="flex-end" style={matches ? { fontSize: "12px" } : { fontSize: "16px" }}>
                <Box >+16.5%</Box>
              </Box>
            </Grid>
          </Grid>
          {/* </div> */}
        </TabPanel>
        <TabPanel value={value} index={1} isComingSoon={comingSoon}>
          <Box>
            <TextField variant="outlined" label="amount" fullWidth size={matches ? 'small' : 'medium'} />
          </Box>
          <Box my={2}>
            <Button style={{ "backgroundColor": "#76D1BF" }} fullWidth>Withdraw</Button>
          </Box>
          <Grid container>
            <Grid item xs={6} style={matches ? { fontSize: "12px" } : { fontSize: "16px" }}>
              Wallet Balance
            </Grid>
            <Grid item xs={6} >
              <Box display="flex" justifyContent="flex-end" style={matches ? { fontSize: "12px" } : { fontSize: "16px" }}>
                <Box >$10000</Box>
              </Box>
            </Grid>
            <Grid item xs={6} style={matches ? { fontSize: "12px" } : { fontSize: "16px" }}>
              Currently Invested
            </Grid>
            <Grid item xs={6} style={matches ? { fontSize: "12px" } : { fontSize: "16px" }}>
              <Box display="flex" justifyContent="flex-end">
                <Box >$100</Box>
              </Box>
            </Grid>
            <Grid item xs={6} style={matches ? { fontSize: "12px" } : { fontSize: "16px" }}>
              P&L
            </Grid>
            <Grid item xs={6} style={matches ? { fontSize: "12px" } : { fontSize: "16px" }}>
              <Box display="flex" justifyContent="flex-end">
                <Box >+16.5%</Box>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </Box >
  );
}

export default InvestTab;