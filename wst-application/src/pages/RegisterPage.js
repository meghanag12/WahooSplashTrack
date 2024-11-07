import { useEffect, useState } from 'react';
import axios from 'axios';

const initialValues = {
    swimmer_name: "", 
    year: "", 
    active: ""
};

export function RegisterPage() {
    const [values, setValues] = useState(initialValues); 
    const [showBanner, setShowBanner] = useState(false);
    const [bannerMessage, setBannerMessage] = useState("");

    const endpoint_swimmer = 'http://3.81.17.35:8000/api/swimmer/';

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setValues({
            ...values, 
            [name]: value, 
        });
    };

    const postDataSwimmer = async () => {
        const { swimmer_name, year, active } = values;
        const body = { swimmer_name, year, active };

        try {
            const response = await axios.post(endpoint_swimmer, body);
            console.log(response);
            return response.data;
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    const handleSendData = async (e) => {
        e.preventDefault();
        const newData = await postDataSwimmer();

        // Display success banner with swimmer name
        setBannerMessage(`Swimmer "${values.swimmer_name}" has been added successfully`);
        setShowBanner(true);

        // Reset form values
        setValues(initialValues);

        // Hide the banner after a few seconds
        setTimeout(() => setShowBanner(false), 3000);
    };

    return (
        <>
            {/* Title */}
            <h1>Swimmer Registration Page</h1>

            {/* Banner message */}
            {showBanner && (
                <div className="banner">
                    {bannerMessage}
                </div>
            )}

            <div className="form_container">
                <form onSubmit={handleSendData}>
                    <div className="form-group">
                        <label>Enter Swimmer's Name:
                            <input
                                value={values.swimmer_name}
                                onChange={handleInputChange}
                                name="swimmer_name"
                                label="swimmer_name"
                            />
                        </label>
                    </div>

                    <div className="form-group">
                        <label>Enter Swimmer's Year:
                            <input
                                value={values.year}
                                onChange={handleInputChange}
                                name="year"
                                label="year"
                            />
                        </label>
                    </div>

                    <div className="form-group">
                        <label>Is the Swimmer Active?
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
                        </label>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}
