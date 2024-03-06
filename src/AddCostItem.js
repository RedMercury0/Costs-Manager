import React, { useState } from 'react';
import { Input, Button, Select } from 'antd';

const { Option } = Select;

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
            alert(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '700px', margin: 'auto', marginTop: '20px' }}>
            <div style={{ display: 'flex', gap: '10px',justifyContent: 'center', marginBottom: '20px' }}>
                <Input
                    type="number"
                    value={sum}
                    onChange={(e) => setSum(e.target.value)}
                    placeholder="Sum"
                    style={{ width: '150px' }}
                />
                <Select
                    value={category}
                    onChange={(value) => setCategory(value)}
                    placeholder="Select Category"
                    style={{ width: '150px' }}
                >
                    <Option value="">Select Category</Option>
                    <Option value="FOOD">Food</Option>
                    <Option value="HEALTH">Health</Option>
                    <Option value="EDUCATION">Education</Option>
                    <Option value="TRAVEL">Travel</Option>
                    <Option value="HOUSING">Housing</Option>
                    <Option value="OTHER">Other</Option>
                </Select>
                <Input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    style={{ width: '150px' }}
                />
            </div>
            <div style={{ display: 'flex',justifyContent: 'center', gap: '10px' }}>
                <Input
                    type="number"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    placeholder="Day"
                    style={{ width: '150px' }}
                />
                <Input
                    type="number"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    placeholder="Month"
                    style={{ width: '150px' }}
                />
                <Input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Year"
                    style={{ width: '150px' }}
                />
            </div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                <Button type="primary" htmlType="submit" style={{backgroundColor: 'black', borderColor: 'black'}}>
                    Add Cost
                </Button>
            </div>
        </form>
    );
};

export default AddCostItem;
