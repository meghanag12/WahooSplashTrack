import { useState, useEffect } from 'react';
import axios from 'axios';

export function ProgressTracker() {
    const [swimmers, setSwimmers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchSwimmers = async () => {
            try {
                const response = await axios.get('http://3.81.17.35:8000/api/swimmer/');
                setSwimmers(response.data);
            } catch (error) {
                console.error("Error fetching swimmers:", error);
            }
        };

        fetchSwimmers();
    }, []);

    const filteredSwimmers = swimmers.filter(swimmer =>
        swimmer.swimmer_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="progress-tracker">
            <h1>Progress Tracker</h1>
            
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search swimmers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />

            {/* Display Swimmer Names */}
            <ul className="swimmer-list">
                {filteredSwimmers.length > 0 ? (
                    filteredSwimmers.map((swimmer) => (
                        <li key={swimmer.id} className="swimmer-item">
                            {swimmer.swimmer_name}
                        </li>
                    ))
                ) : (
                    <p>No swimmers found</p>
                )}
            </ul>
        </div>
    );
}
