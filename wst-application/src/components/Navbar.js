import { Link } from "react-router-dom"

export function Navbar() {
    return (
    <>
    
        <Link to= "/">
            <button>Magnitude Reader</button>
        </Link>
        <Link to= "/progresstracker">
            <button>Progress Tracker</button>
        </Link>
    </>
    )
}