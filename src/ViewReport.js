import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';

const ViewReport = ({ db }) => {
    // State variables declaration
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const [report, setReport] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    // useEffect hook to calculate total pages when report changes
    useEffect(() => {
        calculateTotalPages();
    });

    // Calculating the total pages then set the total pages in state
    const calculateTotalPages = () => {
        const pages = Math.ceil(report.length / rowsPerPage);
        setTotalPages(pages);
    };

    const handleViewReport = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            setReport([]); // Clear previous report data
            const costs = await db.getCostsByMonthAndYear(month, year);
            // Sort costs by date in descending order
            const sortedCosts = costs.sort((a, b) => {
                const dateA = new Date(a.year, a.month - 1, a.day);
                const dateB = new Date(b.year, b.month - 1, b.day);
                return dateB - dateA;
            });
            setReport(sortedCosts);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch report", error);
            alert(error);
            setLoading(false);
        }
    };


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    // Setting indexes for last/first rows and slice report data for the current page
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = report.slice(indexOfFirstRow, indexOfLastRow);

    return (
        <div style={{ maxWidth: '700px', margin: 'auto', marginTop: '30px' }}>
            <form onSubmit={handleViewReport}>
                <div style={{display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '40px'}}>
                    <Input
                        type="number"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        placeholder="Month"
                        style={{backgroundColor: 'white', width: '150px'}}
                    />
                    <Input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="Year"
                        style={{backgroundColor: 'white', width: '150px'}}
                    />
                    <Button type="primary" htmlType="submit" style={{backgroundColor: 'black', color: 'white'}}>
                        View Report
                    </Button>
                </div>
            </form>
            {loading ? <p>Loading...</p> : (
                <>
                    {report.length > 0 ? (
                        <>
                            {totalPages > 1 && (
                                <div style={{textAlign: 'center', marginTop: '20px' }}>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <button key={index + 1} onClick={() => handlePageChange(index + 1)} style={{ margin: '0 5px', padding: '5px 10px', backgroundColor: currentPage === index + 1 ? 'black' : 'grey', color: 'white', border: 'none', cursor: 'pointer' }}>
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <table className="report-table" style={{width: '100%', borderCollapse: 'collapse'}}>
                                <thead>
                                <tr>
                                    <th style={{width: '25%'}}>Category</th>
                                    <th style={{width: '25%'}}>Sum</th>
                                    <th style={{width: '30%'}}>Description</th>
                                    <th style={{width: '20%'}}>Date</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentRows.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.category}</td>
                                        <td>{row.sum}</td>
                                        <td>{row.description}</td>
                                        <td>{`${row.day}-${row.month}-${row.year}`}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                        </>
                    ) : null}
                </>
            )}
        </div>
    );
};

export default ViewReport;
