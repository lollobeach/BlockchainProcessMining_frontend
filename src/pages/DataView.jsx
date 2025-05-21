import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import React from 'react';
import GasUsed from '../components/dataVisualization/GasUsed';
import Events from '../components/dataVisualization/Events';
import Call from '../components/dataVisualization/Call';
import Activity from '../components/dataVisualization/Activity';
import Inputs from '../components/dataVisualization/Inputs';
import MostActiveSenders from '../components/dataVisualization/MostActiveSenders';
import StorageState from '../components/dataVisualization/StorageState';
import Time from '../components/dataVisualization/Time';
const tabs = [
    {
        label: "Gas Used",
        value: 0,
        component: <GasUsed />
    },
    {
        label: "Activity",
        value: 1,
        component: <Activity />
    },
    {
        label: "Most Active Senders",
        value: 2,
        component: <MostActiveSenders />
    },
    {
        label: "Time",
        value: 3,
        component: <Time />
    },
    {
        label: "Inputs",
        value: 4,
        component: <Inputs />
    },
    {
        label: "Events",
        value: 5,
        component: <Events />
    },
    {
        label: "Call",
        value: 6,
        component: <Call />
    },
    {
        label: "Storage State",
        value: 7,
        component: <StorageState />
    },
]

export default function DataViewPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    return (
        <div>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  {tabs.map((tab, index) => (
                      <Tab label={tab.label} {...a11yProps(index)} />
                  ))}
                </Tabs>
            </Box>
            {tabs.map((tab, index) => (
              <CustomTabPanel value={value} index={index}>
                {tab.component}
              </CustomTabPanel>
            ))}
          </Box>
        </div>
    );
}
