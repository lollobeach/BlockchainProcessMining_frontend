import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import React, { useRef, useEffect } from "react";
import GasUsed from '../components/dataVisualization/GasUsed';
import Events from '../components/dataVisualization/Events';
import Call from '../components/dataVisualization/Call';
import Activity from '../components/dataVisualization/Activity';
import Inputs from '../components/dataVisualization/Inputs';
import MostActiveSenders from '../components/dataVisualization/MostActiveSenders';
import StorageState from '../components/dataVisualization/StorageState';
import Time from '../components/dataVisualization/Time';
import { Button, TextField, CircularProgress } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getData } from '../api/services';
import { useDataView } from '../context/DataViewContext';

const tabs = [
  {
    label: "Gas Used",
    value: 0,
    type: "gasUsed",
    component: <GasUsed />
  },
  {
    label: "Activity",
    value: 1,
    type: "activity",
    component: <Activity />
  },
  {
    label: "Most Active Senders",
    value: 2,
    type: "mostActiveSenders",
    component: <MostActiveSenders />
  },
  {
    label: "Time",
    value: 3,
    type: "time",
    component: <Time />
  },
  {
    label: "Inputs",
    value: 4,
    type: "inputs",
    component: <Inputs />
  },
  {
    label: "Events",
    value: 5,
    type: "events",
    component: <Events />
  },
  {
    label: "Call",
    value: 6,
    type: "call",
    component: <Call />
  },
  {
    label: "Storage State",
    value: 7,
    type: "storageState",
    component: <StorageState />
  },
]

export default function DataViewPage() {
    const {
			selectedTab,
			setSelectedTabState,
			setLoadingState,
			setErrorState,
			setDataView,
			query,
		} = useDataView();

    const isInitialFetch = useRef(false);

    const onFetchData = async ({ type, queryParams }) => {
      console.log("[DataView] Fetching data with type:", type, "and query:", query);
      setLoadingState(true);
      setErrorState(null);
      try {
        const response = await getData({ type, queryParams });
        console.log("[DataView] Response Data:", response);
        setDataView(response.data);
      } catch (error) {
        setErrorState(error.message || "Failed to fetch data");
      } finally {
        setLoadingState(false);
      }
    }

    useEffect(() => {
      console.log("[DATA VIEW] Selected Tab Changed:", selectedTab);
      if (!isInitialFetch.current) {
        console.log("[DATA VIEW] Initial fetch for tab:", tabs[selectedTab].type);
        onFetchData({ type: tabs[selectedTab].type, query });
        isInitialFetch.current = true;
      }
    }, [selectedTab, query]);

    return (
			<div>
				<Box sx={{ width: "100%" }}>
					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						<Box
							sx={{
								display: "flex",
								flexWrap: "wrap",
								gap: 2,
								p: 2,
								alignItems: "center",
							}}>
							<TextField
								label="Smart Contract Address"
								variant="outlined"
								size="small"
								placeholder="0x..."
								onChange={(e) =>
									setQueryState({ ...query, contractAddress: e.target.value })
								}
								sx={{ minWidth: 250 }}
							/>
							<Box sx={{ display: "flex", gap: 2 }}>
								<DatePicker
									label="Date From"
									slotProps={{ textField: { size: "small" } }}
									onChange={(newValue) =>
										setQueryState({ ...query, dateFrom: newValue })
									}
									renderInput={(props) => <TextField {...props} />}
								/>
								<DatePicker
									label="Date To"
									slotProps={{ textField: { size: "small" } }}
									onChange={(newValue) =>
										setQueryState({ ...query, dateTo: newValue })
									}
									renderInput={(props) => <TextField {...props} />}
								/>
							</Box>
							<Box sx={{ display: "flex", gap: 2 }}>
								<TextField
									label="From Block"
									type="number"
									variant="outlined"
									size="small"
									onChange={(e) =>
										setQueryState({ ...query, fromBlock: e.target.value })
									}
									InputProps={{ inputProps: { min: 0 } }}
								/>
								<TextField
									label="To Block"
									type="number"
									variant="outlined"
									size="small"
									onChange={(e) =>
										setQueryState({ ...query, toBlock: e.target.value })
									}
									InputProps={{ inputProps: { min: 0 } }}
								/>
							</Box>
							<Button
								variant="contained"
								size="small"
								onClick={() =>
									onFetchData({ type: tabs[selectedTab].type, query })
								}>
								Apply Filters
							</Button>
						</Box>
						<Tabs
							value={selectedTab}
							onChange={(_, newValue) => {
                setSelectedTabState(newValue);
                onFetchData({ type: tabs[newValue].type, query });
              }}
							aria-label="basic tabs">
							{tabs.map((tab, index) => (
								<Tab
									key={index}
									label={tab.label}
									{...a11yProps(index)}
								/>
							))}
						</Tabs>
					</Box>
          <TabContent />
				</Box>
			</div>
		);
}

function TabContent () {
  const { loading, data, error, selectedTab } = useDataView();
  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
        }}>
        <p style={{ color: "red" }}>{error}</p>
      </Box>
    );
  }
  if (loading || !data || data.length === 0 || !isNaN(data)) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "400px",
				}}>
				<CircularProgress />
			</Box>
		);
	}

  return (
      <>
        {tabs.map((tab, index) => (
          <CustomTabPanel
            key={index}
            value={selectedTab}
            index={index}>
            {tab.component}
          </CustomTabPanel>
        ))}
      </>);

}
