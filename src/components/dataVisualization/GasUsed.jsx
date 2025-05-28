import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDataView } from "../../context/DataViewContext";

const columns = [
	{ field: "smartContract", headerName: "Smart Contract", width: 400 },
	{ field: "activity", headerName: "Activity", width: 200 },
	{ field: "gasUsed", headerName: "Gas Used", width: 200 },
];

export default function GasUsed() {
	const { data } = useDataView();
	return (
		<div>
			<h1>Gas Used</h1>
			<p>Analysis of total gas consumption per activity</p>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
					gap: 2,
				}}>
				<Box
					sx={{
						width: "100%",
						display: "flex",
						justifyContent: "center",
					}}>
					<PieChart
						series={[
							{
								data: data.map((item, index) => ({
									id: index,
									value: item.gasUsed,
									label: item.activity,
								})),
								innerRadius: 11,
								outerRadius: 100,
								paddingAngle: 1,
								cx: 150,
								cy: 150,
							},
						]}
						width={400}
						height={400}
					/>
				</Box>
				<Box
					sx={{
						width: "100%",
						height: 400,
					}}>
					<DataGrid
						rows={data.map((item, index) => ({
							...item,
							smartContract: item.contract || "N/A",
							id: index,
						}))}
						columns={columns}
					/>
				</Box>
			</Box>
		</div>
	);
}
