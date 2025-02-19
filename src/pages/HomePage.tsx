import { useState, useEffect } from "react"
import { ProductInterface } from "../types/ProductInterface";
import "./css/HomePage.css";

const HomePage = () => {

    // States
    const [products, setProducts] = useState<ProductInterface[] | []>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setloading] = useState(false);

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
                throw new Error("Något gick fel vid hämtning av produkterna");
            } else {
                const data = await response.json();

                setProducts(data);
                setError(null);

            }
        } catch (error) {
            console.log(error);
            setError("Något gick fel vid hämtning av produkterna");
        } finally {
            setloading(false);
        }
    }

    return (
        <div>
            <h1>Välkommen till Kök&Fika!</h1>
            <h2>Våra aktuella produkter</h2>

            {loading && (
                <div className="fetchInfo">
                    <span className="loading-spinner"></span>
                    <p>Hämtar produkter...</p>
                </div>
            )}

            {error && <p className="errorMess">{error}</p>}

            <div className="products-container">
                {
                    products.map((product) => (
                        <section className="product" key={product._id}>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p><strong>{product.price}kr</strong> </p>
                        </section>
                    ))
                }
            </div>
        </div>
    )
}

export default HomePage