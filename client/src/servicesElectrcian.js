// client\src\servicesElectrcian.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ServicesElectrcian = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/search/services/electrician');
                setResults(response.data.organic_results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Electricians near you</h1>
            <div className="results">
                {results.map((result, index) => (
                    <div key={index} className="card">
                        <h2>{result.title}</h2>
                        <p>{result.snippet}</p>
                        <a href={result.link} target="_blank" rel="noreferrer">Visit Website</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesElectrcian;
