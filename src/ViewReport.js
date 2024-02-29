import React, { useState } from 'react';
import idb from "./idb-module.js";

const ViewReport = ({ db }) => {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [report, setReport] = useState([]);

    const handleViewReport = async (e) => {
        e.preventDefault();
        try {
            // Reset the report state before fetching new data
            setReport([]);

            const costs = await idb.getCostsByMonthAndYear(month, year);
            setReport(costs || []); // Initialize with an empty array if costs is null/undefined
            console.log("Fetch report");

        } catch (error) {
            console.error("Failed to fetch report", error);

        }
    };
    return (
        <div>
            <form onSubmit={handleViewReport}>
                <input type="number" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="Month" min="1" max="12" required />
                <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" min="1970" max="2100" required />
                <button type="submit">View Report</button>
            </form>
            <ul>
                {report.map((cost, index) => (
                    <li key={index}>
                        Sum: {cost.sum}, Category: {cost.category}, Description: {cost.description}, Date: {cost.day}-{cost.month}-{cost.year}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewReport;
