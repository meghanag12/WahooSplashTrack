import { useEffect, useState } from 'react';
import axios from 'axios';

const initialValues = {
    swimmer_name: "",
    year: "1st",
    active: "yes"
};

export function RegisterPage() {
    const [values, setValues] = useState(initialValues);
    const [showBanner, setShowBanner] = useState(false);
    const [bannerMessage, setBannerMessage] = useState("");
    const [bannerType, setBannerType] = useState(""); 

    const endpoint_swimmer = 'http://3.81.17.35:8000/api/swimmer/';

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const checkDuplicateSwimmer = async () => {
        try {
            const response = await axios.get(endpoint_swimmer);
            const isDuplicate = response.data.some(
                swimmer => swimmer.swimmer_name.toLowerCase() === values.swimmer_name.toLowerCase()
            );
            return isDuplicate;
        } catch (error) {
            console.error('Error checking duplicate swimmer:', error);
            return false;
        }
    };
    

    const postDataSwimmer = async () => {
        const { swimmer_name, year, active } = values;
        const body = { swimmer_name, year, active };

        try {
            const response = await axios.post(endpoint_swimmer, body);
            return response.data;
        } catch (error) {
            console.error('Error posting data:', error);
        }
    };

    const handleSendData = async (e) => {
        e.preventDefault();

        const isDuplicate = await checkDuplicateSwimmer();

        if (isDuplicate) {
            setBannerMessage(`Swimmer "${values.swimmer_name}" is already registered.`);
            setBannerType("error");
            setShowBanner(true);
            setTimeout(() => setShowBanner(false), 3000);
            return;
        }

        const newData = await postDataSwimmer();
        setBannerMessage(`Swimmer "${values.swimmer_name}" has been added successfully`);
        setBannerType("success");
        setShowBanner(true);

        setValues(initialValues);
        setTimeout(() => setShowBanner(false), 3000);
    };

    return (
        <>
            {/* Title */}
            <h1>Swimmer Registration Page</h1>

            {/* Banner message */}
            {showBanner && (
                <div className={`banner ${bannerType}`}>
                    {bannerMessage}
                </div>
            )}

            <div className="form_container">
                <form onSubmit={handleSendData}>
                    <div className="form-group">
                        <label>Enter Swimmer's Name:
                            <div className = "swimmer-name-reg">
                                <input className = "input"
                                    value={values.swimmer_name}
                                    onChange={handleInputChange}
                                    name="swimmer_name"
                                    label="swimmer_name"
                                />
                            </div>
                        </label>
                    </div>

                    <div className="form-group">
                        <label>Swimmer's Year:</label>
                        <div className = "radio-group-swimmer-year">
                            {["1st", "2nd", "3rd", "4th", "5th/Graduate"].map((yearOption) => (
                                <label key={yearOption}>
                                    <input
                                        type="radio"
                                        name="year"
                                        value={yearOption}
                                        checked={values.year === yearOption}
                                        onChange={handleInputChange}
                                    />
                                    {yearOption}
                                </label>
                            ))}
                        </div>
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
