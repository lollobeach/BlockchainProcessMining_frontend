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

export default function DataView() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    return (
        <div>
            <h1>Data Visualization</h1>
            <p>Select the type of data you want to visualize</p>
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


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}
