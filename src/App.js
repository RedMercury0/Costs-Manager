
import React, { useEffect, useState } from 'react';
import idb from './idb-module.js';
import AddCostItem from './AddCostItem.js';
import ViewReport from './ViewReport.js';


const App = () => {
    const [db, setDb] = useState(null);

    useEffect(() => {
        const initializeDB = async () => {
            try {
                const db = await idb.openCostsDB("costsdb", 1);
                setDb(db);
            } catch (error) {
                console.error("Failed to open database", error);
            }
        };

        initializeDB();
    }, []);

    return (
        <div>
            <h1>Costs Manager</h1>
            {db && (
                <>
                    <AddCostItem db={db} />
                    <ViewReport db={db} />
                </>
            )}
        </div>
    );
};

export default App;
