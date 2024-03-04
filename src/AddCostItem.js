import React, { useState } from 'react';
import idb from "./idb-module.js";

const AddCostItem = ({ db }) => {
    const [sum, setSum] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cost = { sum: parseInt(sum), category, description, day, month, year };
        try {
            await idb.addCost(cost);
            alert("Cost added successfully");
            setSum('');
            setCategory('');
            setDescription('');
            setDay('');
            setMonth('');
            setYear('');
        } catch (error) {
            alert("Failed to add cost");
        }
    };

   import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const AddCostItem = ({ db }) => {
    const [sum, setSum] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cost = {
            sum: parseInt(sum),
            category,
            description,
            day,
            month,
            year,
        };

        try {
            await db.addCost(cost);
            alert('Cost added successfully');
            setSum('');
            setCategory('');
            setDescription('');
            setDay('');
            setMonth('');
            setYear('');
        } catch (error) {
            console.error('Failed to add cost:', error);
            alert('Failed to add cost');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '700px', margin: 'auto', marginTop: '20px' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <TextField
                    type="number"
                    value={sum}
                    onChange={(e) => setSum(e.target.value)}
                    label="Sum"
                    placeholder="Sum"
                    fullWidth
                    style={{ backgroundColor: 'white', width: '150px' }}
                />
                <FormControl fullWidth style={{ backgroundColor: 'white', width: '150px' }}>
                    <InputLabel>Select Category</InputLabel>
                    <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <MenuItem value="">Select Category</MenuItem>
                        <MenuItem value="FOOD">Food</MenuItem>
                        <MenuItem value="HEALTH">Health</MenuItem>
                        <MenuItem value="EDUCATION">Education</MenuItem>
                        <MenuItem value="TRAVEL">Travel</MenuItem>
                        <MenuItem value="HOUSING">Housing</MenuItem>
                        <MenuItem value="OTHER">Other</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    label="Description"
                    placeholder="Description"
                    fullWidth
                    style={{ backgroundColor: 'white', width: '150px' }}
                />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <TextField
                    type="number"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    label="Day"
                    placeholder="Day"
                    inputProps={{ min: 1, max: 31 }}
                    style={{ backgroundColor: 'white', width: '150px' }}
                />
                <TextField
                    type="number"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    label="Month"
                    placeholder="Month"
                    inputProps={{ min: 1, max: 12 }}
                    style={{ backgroundColor: 'white', width: '150px' }}
                />
                <TextField
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    label="Year"
                    placeholder="Year"
                    inputProps={{ min: 1970, max: 2100 }}
                    style={{ backgroundColor: 'white', width: '150px' }}
                />
            </div>
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px', backgroundColor: 'black'}}>
                Add Cost
            </Button>
        </form>
    );
};


export default AddCostItem;
