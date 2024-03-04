import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

const SignUpForm = ({ onSignUp }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = () => {
        if (!username || !password || password !== confirmPassword) {
            setError('Invalid input. Please check your details.');
            return;
        }

        // Simulate user registration (replace with your actual logic)
        const user = { username, password };
        localStorage.setItem('user', JSON.stringify(user));

        // Call the onSignUp callback with the user data
        onSignUp({ username });

        // Reset the form and clear any previous error
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setError('Registration successful'); // Provide feedback to the user
    };

    return (
        <Container maxWidth="sm" style={{ backgroundColor: 'black', color: 'white', textAlign: 'center', padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
                Sign Up
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
            <TextField
                label="Confirm Password"
                fullWidth
                margin="normal"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ backgroundColor: 'white' }}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button onClick={handleSignUp} variant="contained" color="primary" fullWidth>
                Sign Up
            </Button>
        </Container>
    );
};

export default SignUpForm;