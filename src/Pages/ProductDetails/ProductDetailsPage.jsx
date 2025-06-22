import { useParams } from "react-router-dom";
import Header from "../../Components/Main/Header";
import Review from "../ProductDetails/Review"
import ProductDetails from "../ProductDetails/ProductDetails";
import Footer from "../../Components/Main/Footer";

function ProductDetailsPage() {
    const { id } = useParams();

    return (
        <>
            <Header />
            <ProductDetails id={id} />
            <Review productId={id} />
            <Footer />
        </>
    )
}

export default ProductDetailsPage;