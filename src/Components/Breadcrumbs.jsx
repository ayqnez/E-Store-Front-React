import '../Components/breadcrumbs.css'
import { Link } from "react-router-dom";

function Breadcrumps({ item }) {
    return (
        <>
            <div className="breadcrumb">
                <Link to="/">Home</Link>
                <span className="separator">›</span>
                <Link to="/">Catalog</Link>
                <span className="separator">›</span>
                <span className="current">{item}</span>
            </div>
        </>
    )
}

export default Breadcrumps;