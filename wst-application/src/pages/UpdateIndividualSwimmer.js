import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../stylesheets/main_style.css';


export function UpdateIndividualSwimmer() {
    // const { swimmerName } = useParams(); // Destructure swimmerName from params
    const swimmerName = decodeURIComponent(window.location.hash.split('/update/')[1]);
    console.log(swimmerName)
    const endpoint_swimmer = `http://34.207.224.1:8000/api/swimmer/${swimmerName}/`; 

    const [values, setValues] = useState({
        swimmer_name: "",
        year: "",
        active: "yes"
    });

    useEffect(() => {
        const fetchSwimmerData = async () => {
            try {
                const response = await axios.get(endpoint_swimmer);
                setValues(response.data); // Set the state with fetched data
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching swimmer:", error);
            }
        };
        fetchSwimmerData();
    }, [endpoint_swimmer]); // Add endpoint_swimmer as a dependency

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
        console.log(name)
    };

    const updateSwimmerInfo = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const { swimmer_name, year, active } = values;
        const body = { swimmer_name, year, active };
        try {
            const response = await axios.put(endpoint_swimmer, body); // Use PUT for updating
            console.log("Update successful:", response.data);
        } catch (error) {
            console.error("Error updating swimmer:", error);
        }
    };

    return (
        <>
            <div className="form_container">
                <form onSubmit={updateSwimmerInfo}>
                    <div className="form-group">
                        <label>Swimmer's Name:</label>
                        <div className="swimmer-name-reg">
                            <input
                                className="input"
                                value={values.swimmer_name}
                                onChange={handleInputChange}
                                name="swimmer_name"
                                placeholder="e.g., John Doe"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Swimmer's Graduation Year:</label>
                        <div className="year-input">
                            <input
                                type="text"
                                name="year"
                                value={values.year}
                                onChange={handleInputChange}
                                pattern="\d{4}"
                                title="Please enter a valid 4-digit year"
                                placeholder="e.g., 2024"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Is the Swimmer currently active?</label>
                        <input
                            type="radio"
                            name="active"
                            value="yes"
                            checked={values.active === "yes"}
                            onChange={handleInputChange}
                        /> Yes
                        <input
                            type="radio"
                            name="active"
                            value="no"
                            checked={values.active === "no"}
                            onChange={handleInputChange}
                        /> No
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}
