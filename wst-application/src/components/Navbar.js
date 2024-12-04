import { Link } from "react-router-dom"


export function Navbar() {
    return (
    <>
        <div className = "navbar">
            <Link to= "/reg">
                <div className = "nav_button">
                    <img src= {require("../register_icon.png")} alt="Icon" style={{ width: "120px", height: "100px", verticalAlign: "middle" }} />
                </div>
            </Link>

            <Link to= "/magnituderecorder">
                <div className = "nav_button">
                    <img src= {require("../swim_icon.png")} alt="Icon" style={{ width: "120px", height: "110px", verticalAlign: "middle" }} />
                </div>
            </Link>

            <Link to= "/progresstracker">
                <div className = "nav_button">
                    <img src= {require("../progress_icon.jpg")} alt="Icon" style={{ width: "120px", height: "100px", verticalAlign: "middle" }} />
                </div>
            </Link>
            
        </div>

    </>
    )
}