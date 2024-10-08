import { Navbar } from "./components/Navbar"
import { Outlet } from "react-router-dom"

export function Layout() {
    return (
        <>
            <Navbar />
            <main>
                {/* renders all child routes, so layout can 
                be made as the parent to all child routes */}
                <Outlet/>
            </main>
        </>
    )
}