import { useEffect, useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import '../stylesheets/main_style.css';
import { Link } from 'react-router-dom';



const initialValues = {
    swimmer_name: "",
    year: "",
    active: "yes"
};

export function RegisterPage() {
    const [values, setValues] = useState(initialValues);
    const [showBanner, setShowBanner] = useState(false);
    const [bannerMessage, setBannerMessage] = useState("");
    const [bannerType, setBannerType] = useState(""); 
    // const navigate = useNavigate();

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
           <h1>Swimmer Registration Page</h1>

{showBanner && (
    <div className={`banner ${bannerType}`}>
        {bannerMessage}
    </div>
)}

<div className="form_container">
    <form onSubmit={handleSendData}>
        <div className="form-group">
            <label>Swimmer's Name:
                <div className="swimmer-name-reg">
                    <input
                        className="input"
                        value={values.swimmer_name}
                        onChange={handleInputChange}
                        name="swimmer_name"
                        label="swimmer_name"
                        placeholder = "e.g, 'John Doe'"
                        required
                    />
                </div>
            </label>
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
                    placeholder="e.g. 2024"
                    required
                />
            </div>
        </div>

        <div className="form-group">
            <label>Is the Swimmer currently active?
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

    <div class="update-button-container">
        <button class="update-swimmer-button">
        <Link to="/update-swimmer" className="update-swimmer-button">
            Update Swimmer Information
        </Link>
        </button>
    </div>

     </>
    );
}
