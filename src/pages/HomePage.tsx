import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { ProductInterface } from "../types/ProductInterface";
import "./css/HomePage.css";

const HomePage = () => {

    // States
    const [products, setProducts] = useState<ProductInterface[] | []>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setloading] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState<ProductInterface[]>([]);

    // För att navigera till en specifik produkt med params och id
    const navigate = useNavigate();

    //useEffect för att hämta produkterna
    useEffect(() => {
        getProducts();
    }, []);

    // Hämta produkterna
    const getProducts = async () => {
        try {
            setloading(true);

            const response = await fetch("http://localhost:5000/products");

            if (!response.ok) {
                throw new Error("Något gick fel vid hämtning av produkterna.");
            } else {
                const data = await response.json();

                setProducts(data);
                setFilteredProducts(data);
                setError(null);

            }
        } catch (error) {
            console.log(error);
            setError("Något gick fel vid hämtning av produkterna");
        } finally {
            setloading(false);
        }
    };

    // Filtrera todos med useEffect
    useEffect(() => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase()) // Filtrera utifårn namnet
        );
        setFilteredProducts(filtered);
    }, [search, products]);

    // Sidinnehållet
    return (
        <div>
            <h1>Välkommen till Kök&Fika!</h1>
            <h2>Våra aktuella produkter</h2>

            {loading && (
                <div className="fetchInfo">
                    <span className="loading-spinner"></span>
                    <p><em>Hämtar produkter...</em></p>
                </div>
            )}

            {/* Sökformulär */}
            <form className="search-form">
                <label htmlFor="search"></label>
                <input type="text" placeholder="Sök efter produkt" value={search} onChange={(event) => setSearch(event.target.value)} />
            </form>

            {/* Felmeddelande */}
            {error && <p className="errorMess">{error}</p>}

            <div className="products-container">
                {
                    filteredProducts.map((product) => (
                        <section className="product" key={product._id}>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p><strong>{product.price}kr</strong> </p>
                            <button className="btnReadMore" onClick={() => navigate(`/product/${product._id}`)}>
                                Läs mer...
                            </button>
                        </section>
                    ))
                }
            </div>
        </div>
    )
}

export default HomePage