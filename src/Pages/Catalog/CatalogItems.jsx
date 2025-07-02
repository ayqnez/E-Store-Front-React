import { useEffect, useState, useMemo } from "react";


import { GoHeartFill } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { addToFavorites, fetchFav, removeFromFavorites } from "../../Redux/Reducers/favoriteReducer";
import Pagination from "../../Components/Pagination";

const batteryRanges = [
    { label: '3000–4000', min: 3000, max: 4000 },
    { label: '4001–5000', min: 4001, max: 5000 },
    { label: '5001–6000', min: 5001, max: 6000 }
];

function CatalogItems({ category }) {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedBatteryRanges, setSelectedBatteryRanges] = useState([]);

    const [products, setProducts] = useState([]);

    const [openSections, setOpenSections] = useState({
        brand: false,
        battery: false,
        screenType: false,
        screenDiagonal: false,
        protection: false,
        memory: false,
    });

    const favorites = useSelector((state) => state.favorites.favorites)

    useEffect(() => {
        fetch(`http://localhost:8080/api/products/category?category=${category}`)
            .then(response => response.json())
            .then(data => setProducts(data));
    }, [category]);

    useEffect(() => {
        dispatch(fetchFav())
    }, [dispatch])

    async function handleToggleFavorite(product, isFav) {

        const token = localStorage.getItem("jwtToken");
        if (!token) {
            alert("You need to login");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/favorites/${product.id}?favorite=${!isFav}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                if (isFav) {
                    dispatch(removeFromFavorites(product.id));
                } else {
                    dispatch(addToFavorites(product));
                }
            } else {
                console.error("Ошибка при переключении избранного:", response.status);
            }
        } catch (error) {
            console.error("Сетевая ошибка:", error);
        }
    }

    function toggleDropdown(section) {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section],
        }));
    }

    function handleBrandChange(brand) {
        setSelectedBrands(prev => prev.includes(brand)
            ? prev.filter(b => b !== brand)
            : [...prev, brand]
        );
    }

    function handleBatteryRangeChange(label) {
        setSelectedBatteryRanges(prev =>
            prev.includes(label)
                ? prev.filter(l => l !== label)
                : [...prev, label]
        );
    }

    const filteredProducts = products.filter(product => {
        const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);

        const matchBattery =
            selectedBatteryRanges.length === 0 ||
            selectedBatteryRanges.some(label => {
                const range = batteryRanges.find(r => r.label === label);
                return product.batteryCapacity >= range.min && product.batteryCapacity <= range.max;
            });

        return matchBrand && matchBattery;
    });

    const currentProducts = useMemo(() => {
        const start = (currentPage - 1) * productsPerPage;
        const end = start + productsPerPage;
        return filteredProducts.slice(start, end);
    }, [filteredProducts, currentPage]);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <>
            <div className="catalog-container">

                <div className="catalog-filter">

                    <div className="filter-section">
                        <div className="filter-top" onClick={() => toggleDropdown("brand")}>
                            <p>Brand</p>
                            <IoIosArrowDown
                                style={{
                                    transform: openSections.brand ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s ease',
                                }}
                            />
                        </div>
                        {openSections.brand && (
                            <ul>
                                {['Apple', 'Samsung', 'Xiaomi', 'Google'].map(brand => (
                                    <li key={brand}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={selectedBrands.includes(brand)}
                                                onChange={() => handleBrandChange(brand)}
                                            /> {brand}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="filter-section">
                        <div className="filter-top" onClick={() => toggleDropdown("battery")}>
                            <p>Battery capacity</p>
                            <IoIosArrowDown
                                style={{
                                    transform: openSections.battery ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s ease',
                                }}
                            />
                        </div>
                        {openSections.battery && (
                            <ul>
                                {batteryRanges.map(range => (
                                    <li key={range.label}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={selectedBatteryRanges.includes(range.label)}
                                                onChange={() => handleBatteryRangeChange(range.label)}
                                            /> {range.label} mAh
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="filter-section">
                        <div className="filter-top" onClick={() => toggleDropdown("screenType")}>
                            <p>Screen type</p>
                            <IoIosArrowDown
                                style={{
                                    transform: openSections.screenType ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s ease',
                                }}
                            />
                        </div>
                        {openSections.screenType && (
                            <ul>
                                <li><input type="checkbox" /> AMOLED</li>
                                <li><input type="checkbox" /> LCD</li>
                                <li><input type="checkbox" /> OLED</li>
                            </ul>
                        )}
                    </div>

                    <div className="filter-section">
                        <div className="filter-top" onClick={() => toggleDropdown("screenDiagonal")}>
                            <p>Screen diagonal</p>
                            <IoIosArrowDown
                                style={{
                                    transform: openSections.screenDiagonal ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s ease',
                                }}
                            />
                        </div>
                        {openSections.screenDiagonal && (
                            <ul>
                                <li><input type="checkbox" /> 5.5″–6.0″</li>
                                <li><input type="checkbox" /> 6.1″–6.5″</li>
                                <li><input type="checkbox" /> 6.6″+</li>
                            </ul>
                        )}
                    </div>

                    <div className="filter-section">
                        <div className="filter-top" onClick={() => toggleDropdown("protection")}>
                            <p>Protection class</p>
                            <IoIosArrowDown
                                style={{
                                    transform: openSections.protection ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s ease',
                                }}
                            />
                        </div>
                        {openSections.protection && (
                            <ul>
                                <li><input type="checkbox" /> IP67</li>
                                <li><input type="checkbox" /> IP68</li>
                                <li><input type="checkbox" /> Gorilla Glass</li>
                            </ul>
                        )}
                    </div>

                    <div className="filter-section">
                        <div className="filter-top" onClick={() => toggleDropdown("memory")}>
                            <p>Built-in memory</p>
                            <IoIosArrowDown
                                style={{
                                    transform: openSections.memory ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s ease',
                                }}
                            />
                        </div>
                        {openSections.memory && (
                            <ul>
                                <li><input type="checkbox" /> 64 GB</li>
                                <li><input type="checkbox" /> 128 GB</li>
                                <li><input type="checkbox" /> 256 GB</li>
                            </ul>
                        )}
                    </div>
                </div>

                <div className="catalog-products">
                    <div className="catalog-top">
                        <p>Selected Products: <b>{filteredProducts.length}</b></p>
                        <button>By Rating <IoIosArrowDown /></button>
                    </div>

                    <div className="product-section">
                        {currentProducts.map((product) => (
                            <div className="product-category" key={product.id}>
                                <div
                                    className={`favorite-icon ${localStorage.getItem("jwtToken") ? favorites.some(fav => fav.id === product.id) ? 'isActive' : '' : false}`}
                                    onClick={() => {
                                        const isFav = favorites.some(fav => fav.id === product.id);
                                        handleToggleFavorite(product, isFav);
                                    }}
                                    style={{ cursor: 'pointer' }}
                                    title={favorites.some(fav => fav.id === product.id) ? 'Remove from favorites' : 'Add to favorites'}
                                >
                                    <GoHeartFill size={24} />
                                </div>

                                <Link to={`/product/${product.id}`}>
                                    <img src={`http://localhost:8080/uploads/images/${product.imageUrl}`} alt={product.name} />
                                </Link>

                                <div className="catalog-name">{product.name}</div>
                                <div className="catalog-price">${product.price}</div>
                                <button>Buy Now</button>
                            </div>
                        ))}
                    </div>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
            </div>
        </>
    );
}

export default CatalogItems;
