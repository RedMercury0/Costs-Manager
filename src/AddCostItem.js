
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

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" value={sum} onChange={(e) => setSum(e.target.value)} placeholder="Sum" required />
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Select Category</option>
                <option value="FOOD">Food</option>
                <option value="HEALTH">Health</option>
                <option value="EDUCATION">Education</option>
                <option value="TRAVEL">Travel</option>
                <option value="HOUSING">Housing</option>
                <option value="OTHER">Other</option>
            </select>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
            <input type="number" value={day} onChange={(e) => setDay(e.target.value)} placeholder="Day" min="1" max="31" />
            <input type="number" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="Month" min="1" max="12" />
            <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year" min="1970" max="2100" />
            <button type="submit">Add Cost</button>
        </form>
    );
};

export default AddCostItem;