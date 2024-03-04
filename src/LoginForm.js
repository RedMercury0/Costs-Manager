import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (!username || !password) {
            setError('Invalid input. Please check your details.');
            return;
        }

        // Simulate user login (replace with your actual logic)
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.username === username && storedUser.password === password) {
            // Call the onLogin callback with the user data
            onLogin({ username });
            // Reset the form and clear any previous error
            setUsername('');
            setPassword('');
            setError('Login successful'); // Provide feedback to the user
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <Container maxWidth="sm" style={{ backgroundColor: 'black', color: 'white', textAlign: 'center', padding: '20px' }}>
            <form>
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>
                <TextField
                    label="Username"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ backgroundColor: 'white' }}
                />
                <TextField
                    label="Password"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ backgroundColor: 'white' }}
                />
                {error && <Typography color="error">{error}</Typography>}
                <Button onClick={handleLogin} variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </form>
        </Container>
    );
};

export default LoginForm;