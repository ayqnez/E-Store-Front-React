import './breadcrumbs.css'
import { Link, useLocation } from "react-router-dom";

function Breadcrumbs({ category, productTitle }) {
    const location = useLocation();
    const path = location.pathname;

    const isCategoryPage = path.startsWith("/products/");
    const isProductPage = path.startsWith("/product/");

    return (
        <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="separator">›</span>
            <Link to="/">Catalog</Link>

            {isCategoryPage && category && (
                <>
                    <span className="separator">›</span>
                    <span className="current">{category}</span>
                </>
            )}

            {isProductPage && category && productTitle && (
                <>
                    <span className="separator">›</span>
                    <Link to={`/products/${category.toLowerCase()}`}>{category}</Link>
                    <span className="separator">›</span>
                    <span className="current">{productTitle}</span>
                </>
            )}
        </div>
    );
}

export default Breadcrumbs;
