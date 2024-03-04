import React, { useEffect, useState } from 'react';
import idb from './idb-module.js';
import AddCostItem from './AddCostItem.js';
import ViewReport from './ViewReport.js';
import './App.css';

const App = () => {
    const [db, setDb] = useState(null);

    useEffect(() => {
        const initializeDB = async () => {
            try {
                const costDb = await idb.openCostsDB("costsdb", 1);
                setDb(costDb);
            } catch (error) {
                console.error("Failed to open database", error);
            }
        };

        initializeDB();
    }, []);

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
            <>
                <AddCostItem db={db}/>
                <ViewReport db={db}/>
            </>
        </div>
    );
};

export default App;
