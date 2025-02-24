import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../stylesheets/register_page.css";

const initialValues = {
  swimmer_name: "",
  year: "",
  active: "yes",
};

export function RegisterPage() {
  const [values, setValues] = useState(initialValues);
  const [showBanner, setShowBanner] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("");
  const [bannerType, setBannerType] = useState("");
  const navigate = useNavigate();

  const endpoint_swimmer = "http://34.207.224.1:8000/api/swimmer/";

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
      return response.data.some(
        (swimmer) =>
          swimmer.swimmer_name.toLowerCase() === values.swimmer_name.toLowerCase()
      );
    } catch (error) {
      console.error("Error checking duplicate swimmer:", error);
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
      console.error("Error posting data:", error);
    }
  };

  const handleSendData = async (e) => {
    e.preventDefault();
    const isDuplicate = await checkDuplicateSwimmer();

    if (isDuplicate) {
      setBannerMessage(`Swimmer "${values.swimmer_name}" is already registered.`);
      setBannerType("danger");
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 3000);
      return;
    }

    await postDataSwimmer();
    setBannerMessage(`Swimmer "${values.swimmer_name}" has been added successfully.`);
    setBannerType("success");
    setShowBanner(true);
    setValues(initialValues);
    setTimeout(() => setShowBanner(false), 3000);
  };

  return (
    
    <div className="container d-flex justify-content-center align-items-center vh-100">
    
        {showBanner && (
          <div className={`alert alert-${bannerType} text-center`} role="alert">
            {bannerMessage}
          </div>
        )}

        <form className = "form" onSubmit={handleSendData}>
       
        <div className="login-image mb-10">
                        <img src={require('../WahooSplashTrackLogoNoSignatures-removebg-preview.png')} alt="Login Banner" className="img-fluid" />
          </div>
          <h4> </h4>
        <div className = "text-center"><i> Welcome to Wahoo SplashTrack! </i></div>

          <div className="mb-3">
          
            <label className="form-label">Swimmer's Name</label>
            <input
              className="form-control"
              value={values.swimmer_name}
              onChange={handleInputChange}
              name="swimmer_name"
              placeholder="e.g., John Doe"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Graduation Year</label>
            <input
              type="text"
              className="form-control"
              name="year"
              value={values.year}
              onChange={handleInputChange}
              pattern="\d{4}"
              title="Please enter a valid 4-digit year"
              placeholder="e.g., 2024"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label d-block">Is the Swimmer currently active?</label>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="active"
                value="yes"
                checked={values.active === "yes"}
                onChange={handleInputChange}
              />
              <label className="form-check-label">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="radio"
                className="form-check-input"
                name="active"
                value="no"
                checked={values.active === "no"}
                onChange={handleInputChange}
              />
              <label className="form-check-label">No</label>
            </div>
          </div>
          <div className = "col text-center">
          <button type="submit" className="register-swimmer-button btn btn-primary w-50 ">
            Register Swimmer
          </button>
          </div>
          <div className="mt-3 text-center">
          <Link to="/update-swimmer" className ="link-secondary">
           Need to update a Swimmer's Info?
          </Link>
        </div>
        </form>

        
    </div>
  );
}
