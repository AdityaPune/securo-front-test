import './style.scss';
import { Typography } from '@mui/material';
import {
  Table,
  Paper,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
} from '@mui/material';

function Notifications() {
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
          aria-label="simple tab<le"
          className="table"
        >
          <TableBody className="table-body">
            <TableRow
              key={'telegram'}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className="body-row"
            >
              <TableCell
                component="th"
                scope="row"
              >
                Kelvin
              </TableCell>

              <TableCell className="invest-button">
                <span className="invest">Invest</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Notifications;
