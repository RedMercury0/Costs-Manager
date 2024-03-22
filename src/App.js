import React, { useEffect, useState } from 'react';
import idb from './idb-module.js';
import AddCostItem from './AddCostItem.js';
import ViewReport from './ViewReport.js';
import './App.css';

const App = () => {
    // State variable to hold the database object
    const [db, setDb] = useState(null);

    useEffect(() => {
        const initializeDB = async () => {
            try {
                // Open the IndexedDB costsdb database
                const costDb = await idb.openCostsDB("costsdb", 1);
                setDb(costDb); // Set the database object in state
            } catch (error) {
                console.error("Failed to open database", error);
            }
        };

        initializeDB();
    }, []); // The empty dependency array ensures that the database initialized only once

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            minHeight: '100vh',
            paddingTop: '10vh',
        }}>
            <h1 style={{fontSize: '2rem', fontWeight: 'bold', marginBottom: '10px'}}>Costs Manager</h1>
            <div style={{
                width: '700px',
                maxHeight: '80vh',
            }}>
                {/* Render the AddCostItem component and pass the database object as prop */}
                <AddCostItem db={db}/>
                {/* Render the ViewReport component and pass the database object as prop */}
                <ViewReport db={db}/>
            </div>
        </div>
    );
};

export default App;
