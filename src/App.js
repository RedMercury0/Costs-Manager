import React, { useEffect, useState } from 'react';
import idb from './idb-module.js';
import AddCostItem from './AddCostItem.js';
import ViewReport from './ViewReport.js';
import SignUpForm from './SignUpForm.js';
import LoginForm from './LoginForm.js';
import { Button} from '@mui/material';
import './App.css';

const App = () => {
    const [db, setDb] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(true);

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

    const handleLogin = (userData) => {
        // Perform authentication logic here
        // For now, simulate success and set the user
        setIsLoggedIn(true);
        setUser(userData);
        setShowLogin(false); // Hide the login form after successful login
    };

    const handleLogout = () => {
        // Perform logout logic here
        setIsLoggedIn(false);
        setUser(null);
        setShowLogin(true); // Show the login form after logout
    };

    const handleToggleForm = () => {
        // Toggle between login and signup forms
        setShowLogin(!showLogin);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            minHeight: '100vh',
            paddingTop: '10vh',
        }}>
            {isLoggedIn && (
                <Button variant="contained" color="secondary" onClick={handleLogout} style={{ alignSelf: 'flex-end', margin: '10px' }}>
                    Logout
                </Button>
            )}
            <h1>Costs Manager</h1>
            {!isLoggedIn ? (
                <>
                    {showLogin ? (
                        <>
                            <LoginForm onLogin={handleLogin} />
                            <Button variant="text" color="primary" onClick={handleToggleForm}>
                                Switch to Signup
                            </Button>
                        </>
                    ) : (
                        <>
                            <SignUpForm onSignUp={handleLogin} />
                            <Button variant="text" color="primary" onClick={handleToggleForm}>
                                Switch to Login
                            </Button>
                        </>
                    )}
                </>
            ) : (
                <>
                    <AddCostItem db={db} user={user} />
                    <ViewReport db={db} user={user} />
                </>
            )}
        </div>
    );
};

export default App;