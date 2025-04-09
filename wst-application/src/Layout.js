import { Navbar } from "./components/Navbar"
import { Outlet } from "react-router-dom"
import { ConnectionStatus } from "./components/ConnectionStatus"

export function Layout() {
    return (
        <>
            <Navbar />
            <ConnectionStatus />
            <main>
                {/* renders all child routes, so layout can 
                be made as the parent to all child routes */}
                <Outlet/>
            </main>
        </>
    )
}