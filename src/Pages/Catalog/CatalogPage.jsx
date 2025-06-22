import '../../Pages/Catalog/catalog.css'

import { useParams } from "react-router-dom";

import Footer from "../../Components/Main/Footer";
import Header from "../../Components/Main/Header";
import CatalogItems from './CatalogItems';
import Breadcrumps from '../../Components/Breadcrumbs';

function CatalogPage() {
    const { category } = useParams();

    return (
        <>
            <Header />
            <Breadcrumps item={category} />
            <CatalogItems category={category} />
            <Footer />
        </>
    );
}

export default CatalogPage;
