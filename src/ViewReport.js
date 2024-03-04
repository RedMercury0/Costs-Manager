import React, { useState } from 'react';
import idb from "./idb-module.js";

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
            console.log("Fetch report");

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
        <div>
            <form onSubmit={handleViewReport}>
                <input type="number" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="Month" min="1" max="12" required />
                <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" min="1970" max="2100" required />
                <button type="submit">View Report</button>
            </form>
            <table className="report-table">
                <thead>
                <tr>
                    <th>Counter</th>
                    <th>Category</th>
                    <th>Sum</th>
                    <th>Description</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {Object.entries(categoryCounter).map(([category, counter]) => (
                    <React.Fragment key={category}>
                        {[...Array(counter)].map((_, index) => {
                            // Filter the report for the current category
                            const categoryReports = report.filter((cost) => cost.category === category);
                            const cost = categoryReports[index];

                            return (
                                <tr key={`${category}-${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{category}</td>
                                    {cost && (
                                        <React.Fragment key={cost.id}>
                                            <td>{cost.sum}</td>
                                            <td>{cost.description}</td>
                                            <td>{`${cost.day}-${cost.month}-${cost.year}`}</td>
                                        </React.Fragment>
                                    )}
                                </tr>
                            );
                        })}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewReport;