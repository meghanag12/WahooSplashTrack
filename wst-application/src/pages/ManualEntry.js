import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../stylesheets/manual_entry.css';
import { Link } from 'react-router-dom';



const initialValues = {
    back_force: "0.0",
    front_force: "0.0",
    total_force: "0.0"
};

export function ManualEntry() {
    const [values, setValues] = useState(initialValues);
    const [total_force, set_total_force] = useState('0.0');
    const [front_force, set_front_force] = useState('0.0');
    const [back_force, set_back_force] = useState('0.0');
    const { name } = useParams();
    const [swimmer_name, set_swimmer_name] = useState('');
    const [start_id, set_start_id] = useState('');
    const [date, set_date] = useState('');
    const [showBanner, setShowBanner] = useState(false);
    const [bannerMessage, setBannerMessage] = useState("");
    const [bannerType, setBannerType] = useState(""); 
    const navigate = useNavigate();

    const endpoint_swimmer = 'http://34.207.224.1:8000/api/swimmer/';
    const endpoint_start = 'http://34.207.224.1:8000/api/start/';

    
    const postDataStart = async () => {
        set_swimmer_name(name);
        const body = { swimmer_name, start_id, date, total_force, front_force, back_force };
        try {
          const response = await axios.post(endpoint_start, body);
          console.log(response);
        } catch (error) {
          console.error('Error posting start data:', error);
        }
    };

    const resetValues = () => {
        
    };

    const handleSendStartData = async () => {
        setBannerMessage('Data successfully submitted!');
        setShowBanner(true);
        setTimeout(() => setShowBanner(false), 3000);
        await postDataStart(); 
        resetValues();
    };
    
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSendData = async (e) => {
        e.preventDefault();

        const newData = await postDataStart();
        setBannerMessage(`Start for "${swimmer_name}" has been added successfully`);
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
<div className="Register_Page_Total">
    <div className="button-group">
        <button  onClick={() => navigate(-1)}>Back</button>
    </div>
<div className="form_container">
    <form onSubmit={handleSendData}>
        <div className="form-group-manual-entry">
            <label>Total Force:
                <div className="swimmer-name-reg">
                    <input
                        className="input"
                        value={values.total_force}
                        onChange={handleInputChange}
                        name="total_force"
                        label="total_force"
                        placeholder = "0.0"
                        required
                    />
                </div>
            </label>
        </div>

        <div className="form-group">
            <label>Front Force:</label>
            <div className="year-input">
                <input
                    type="text"
                    name="front_force"
                    value={values.front_force}
                    onChange={handleInputChange}
                    placeholder = "0.0"
                    required
                />
            </div>
        </div>

        <div className="form-group">
            <label>Back Force:</label>
            <div className="year-input">
                <input
                    type="text"
                    name="back_force"
                    value={values.back_force}
                    onChange={handleInputChange}
                    placeholder = "0.0"
                    required
                />
            </div>
        </div>

        <button type="submit" onClick={handleSendStartData}>Submit</button>
    </form>


    </div>
</div>
     </>
    );
}
