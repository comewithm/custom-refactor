import { Link, Outlet } from "react-router-dom"

export const About = () => {
    return (
        <div>
            About:
            <Link to={'/'}>Home</Link>
            
            <Outlet />
        </div>
    )
}