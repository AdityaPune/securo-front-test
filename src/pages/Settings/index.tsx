import ApiKey from '../../components/ApiKey';
import Notifications from '../../components/Notifications';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { SyntheticEvent, useCallback, useState } from 'react';

function Settings() {
  const [view, setView] = useState(0);

  return (
    <div style={{ width: '100%', margin: '2rem' }}>
      <Box
        sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '8px' }}
      >
        <Tabs
          key={view}
          value={view}
          onChange={(e: SyntheticEvent<Element, Event>, newView: number) =>
            setView(newView)
          }
          aria-label="basic tabs example"
        >
          <Tab
            label="API Setup"
            value={0}
          />
          <Tab
            label="Sandbox Setup"
            value={1}
          />
          <Tab
            label="Notifications Settings"
            value={2}
          />
        </Tabs>
      </Box>
      {view === 0 && <ApiKey />}
      {view === 1 && <ApiKey isSandbox={true} />}
      {view === 2 && <Notifications />}
    </div>
  );
}
export default Settings;
