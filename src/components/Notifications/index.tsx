import './style.scss';
import { Typography, Switch, Button } from '@mui/material';
import {
  Table,
  Paper,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Box,
} from '@mui/material';
import ToggleSwitch from './switch';
import { useState } from 'react';
import Discord from './Discord';
import Telegram from './Telegram';

function Notifications() {
  const [tconnected, setTConnected] = useState(false);
  const [sconnected, setSConnected] = useState(true);
  const [dconnected, setDConnected] = useState(false);

  return (
    <div className="notifs-container">
      <div className="header">
        <Typography className="header-title">Notification Settings</Typography>
        <Typography className="header-subtitle">
          Update your notification settings here.
        </Typography>
      </div>

      <div className="content">
        <Typography className="content-title">Connect your accounts</Typography>
        <Typography className="content-subtitle">
          Connect these accounts and unlock special Securo Finance integrations.
        </Typography>
      </div>

      <TableContainer
        component={Paper}
        className="table-container"
      >
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          className="table"
        >
          <TableBody className="table-body">
            <TableRow
              key={'telegram'}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className="body-row"
            >
              <TableCell className="account">
                <Telegram />
                &nbsp;Telegram
              </TableCell>
              <TableCell className="toggle">
                <ToggleSwitch sx={{ m: 1 }} />
              </TableCell>
              <TableCell className="button">
                <div
                  className={tconnected ? 'active-button' : 'inactive-button'}
                >
                  {tconnected ? <span>Disconnect</span> : <span>Connect</span>}
                </div>
              </TableCell>
            </TableRow>
            <TableRow
              key={'slack'}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className="body-row"
            >
              <TableCell className="account">
                <Telegram />
                &nbsp;Slack
              </TableCell>
              <TableCell className="toggle">
                <ToggleSwitch sx={{ m: 1 }} />
              </TableCell>
              <TableCell className="button">
                <div
                  className={sconnected ? 'active-button' : 'inactive-button'}
                >
                  {sconnected ? <span>Disconnect</span> : <span>Connect</span>}
                </div>
              </TableCell>
            </TableRow>
            <TableRow
              key={'discord'}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className="body-row"
            >
              <TableCell className="account">
                <Discord />
                &nbsp;Discord
              </TableCell>
              <TableCell className="toggle">
                <ToggleSwitch sx={{ m: 1 }} />
              </TableCell>
              <TableCell className="button">
                <div
                  className={dconnected ? 'active-button' : 'inactive-button'}
                >
                  {dconnected ? <span>Disconnect</span> : <span>Connect</span>}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className="email">
        <Typography className="header">Email notificaitions</Typography>
        <div className="property">
          <Typography className="notifs">
            Get emails to find out what's going on when you're not online. You
            can turn them off anytime.
          </Typography>
          <ToggleSwitch />
        </div>
      </div>
    </div>
  );
}

export default Notifications;
