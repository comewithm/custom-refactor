import { Link } from "react-router-dom"


export const Home = () => {
    return (
        <div>
            Home:
            <Link to={'/about/2'}>about</Link>
        </div>
    )
}