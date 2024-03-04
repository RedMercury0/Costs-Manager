import React, { useState } from 'react';
import idb from "./idb-module.js";
import { TextField, Button, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const ViewReport = ({ db }) => {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [report, setReport] = useState([]);
    const [categoryCounter, setCategoryCounter] = useState({});

    const handleViewReport = async (e) => {
        e.preventDefault();
        try {
            setReport([]);
            setCategoryCounter({});

            const costs = await idb.getCostsByMonthAndYear(month, year);
            setReport(costs || []);

            const updatedCategoryCounter = costs.reduce((acc, cost) => {
                const category = cost.category;
                acc[category] = (acc[category] || 0) + 1;
                return acc;
            }, {});
            setCategoryCounter(updatedCategoryCounter);

        } catch (error) {
            console.error("Failed to fetch report", error);
        }
    };

    return (
        <div style={{maxWidth: '700px', margin: 'auto', marginTop: '30px'}}>
            <form onSubmit={handleViewReport}>
                <div style={{display: 'flex', gap: '10px', marginBottom: '40px'}}>
                    <TextField
                        type="number"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        label="Month"
                        placeholder="Month"
                        inputProps={{min: 1, max: 12}}
                        style={{backgroundColor: 'white', width: '150px'}}
                    />
                    <TextField
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        label="Year"
                        placeholder="Year"
                        inputProps={{min: 1970, max: 2100}}
                        style={{backgroundColor: 'white', width: '150px'}}
                    />
                    <Button type="submit" variant="contained" style={{ marginLeft: '10px', backgroundColor: 'black', color: 'white' }}>
                        View Report
                    </Button>
                </div>
            </form>
            <Table className="report-table">
                <TableHead>
                    <TableRow>
                        <TableCell>Counter</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Sum</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(categoryCounter).map(([category, counter]) => (
                        <React.Fragment key={category}>
                            {[...Array(counter)].map((_, index) => {
                                const categoryReports = report.filter((cost) => cost.category === category);
                                const cost = categoryReports[index];

                                return (
                                    <TableRow key={`${category}-${index}`}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{category}</TableCell>
                                        {cost && (
                                            <React.Fragment key={cost.id}>
                                                <TableCell>{cost.sum}</TableCell>
                                                <TableCell>{cost.description}</TableCell>
                                                <TableCell>{`${cost.day}-${cost.month}-${cost.year}`}</TableCell>
                                            </React.Fragment>
                                        )}
                                    </TableRow>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
export default ViewReport;
