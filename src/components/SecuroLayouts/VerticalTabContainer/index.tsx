import * as React from 'react';
import { Tabs, Tab, Box } from '@mui/material';

interface TabProp {
  title: string;
  index: number;
  component: any;
}

interface Props {
  tabs: TabProp[];
}

export default function VerticalTabContainer(props: Props) {
  const [activeTabIndex, setActiveTabIndex] = React.useState(
    props.tabs[0].index
  );

  const handleChange = (event: React.SyntheticEvent, newTabIndex: number) => {
    setActiveTabIndex(newTabIndex);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={activeTabIndex}
        onChange={handleChange}
        aria-label="Vertical Tabs"
        TabIndicatorProps={{
          hidden: true,
        }}
        sx={{
          borderRight: 1,
          borderColor: 'divider',
        }}
        style={{ minWidth: '180px' }}
      >
        {props.tabs.map((tab) => {
          return (
            <Tab
              label={tab.title}
              value={tab.index}
              style={{
                textTransform: 'none',
                borderRadius: '1rem',
                margin: '0 1rem 1rem 0',
              }}
              className={
                tab.index === activeTabIndex ? 'securo-button-gradient' : ''
              }
            />
          );
        })}
      </Tabs>

      {props.tabs.map((tab) => {
        return (
          <div
            role="tabpanel"
            hidden={tab.index !== activeTabIndex}
            id={`vertical-tabpanel-${tab.index}`}
            aria-labelledby={`vertical-tab-${tab.index}`}
            style={{ width: '100%', overflow: 'auto' }}
          >
            {activeTabIndex === tab.index && (
              <Box sx={{ px: 3, width: '100%' }}>{tab.component}</Box>
            )}
          </div>
        );
      })}
    </Box>
  );
}
