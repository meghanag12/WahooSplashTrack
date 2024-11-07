import { useState } from 'react';
import axios from 'axios';

export function RegisterPage() {
    const [swimmerName, setSwimmerName] = useState("");
    const [year, setYear] = useState("");
    const [active, setActive] = useState("");
    const [showBanner, setShowBanner] = useState(false); 
    const [bannerMessage, setBannerMessage] = useState(""); 

    const endpoint_swimmer = 'http://3.81.17.35:8000/api/swimmer/';

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const postDataSwimmer = async () => {
        const body = { swimmer_name: swimmerName, year, active };
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
        if (newData) {
            setBannerMessage(`${swimmerName} has been registered successfully!`); 
            setShowBanner(true); 
            setTimeout(() => setShowBanner(false), 3000); 
        }
        // Reset form fields
        setSwimmerName("");
        setYear("");
        setActive("");
    };

    return (
        <div className="form_container">
            {/* Banner message */}
            {showBanner && (
                <div className="banner">
                    {bannerMessage}
                </div>
            )}

            <form onSubmit={handleSendData}>
                <div className="form-group">
                    <label>Enter Swimmer's Name:
                        <input 
                            value={swimmerName} 
                            onChange={handleInputChange(setSwimmerName)} 
                            name="swimmer_name"
                        />
                    </label>
                </div>

                <div className="form-group">
                    <label>Enter Swimmer's Year:
                        <input 
                            value={year} 
                            onChange={handleInputChange(setYear)} 
                            name="year"
                        />
                    </label>
                </div>

                <div className="form-group">
                    <label>Is the Swimmer Active?
                        <input 
                            type="radio" 
                            name="active" 
                            value="yes" 
                            checked={active === "yes"} 
                            onChange={handleInputChange(setActive)} 
                        /> Yes
                        <input 
                            type="radio" 
                            name="active" 
                            value="no" 
                            checked={active === "no"} 
                            onChange={handleInputChange(setActive)} 
                        /> No 
                    </label>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
