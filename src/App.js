import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./Auth/Login";
import PrivateRoute from "./Components/PrivateRoute";
import Register from "./Auth/Register";
import ImageUpload from "./Components/UploadPhoto";
import UserProfile from "./Pages/UserProfile/UserProfile";
import CatalogPage from "./Pages/Catalog/CatalogPage";
import ProductDetailsPage from "./Pages/ProductDetails/ProductDetailsPage";
import CartPage from "./Pages/Cart/CartPage";
import ProductsPage from "./Pages/Products/ProductsPage";
import AboutPage from "./Pages/About/AboutPage";
import UserProfilePage from "./Pages/UserProfile/UserProfilePage";
import NotFound from "./Components/NotFound";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<ProductsPage />} />
          <Route path="/products/:category" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />

          <Route path="/about" element={<AboutPage />} />

          <Route path="/cart" element={<CartPage />} />

          <Route path="/profile" element={
            <PrivateRoute>
              <UserProfilePage />
            </PrivateRoute>
          } />

          <Route path="*" element={<NotFound />} />

          <Route path="/upload" element={<ImageUpload />} />
        </Routes>

      </BrowserRouter>

    </>
  );
}

export default App;
