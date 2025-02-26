import { useState, useEffect } from "react";
import { ProductInterface } from "../types/ProductInterface";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./css/ProductDetails.css";

const ProductDetails = () => {

    // Hämta id från url:en
    const { id } = useParams<{ id: string }>();

    // States
    const [product, setProduct] = useState<ProductInterface | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    //useEffect för att hämta produkten
    useEffect(() => {
        if (id) {
            getProduct(id);
        }
    }, [id]);

    // Hämta produkt
    const getProduct = async (productId: string) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`https://react-mom3-backend.onrender.com/products/${productId}`);

            if (!response.ok) {
                throw new Error("Något gick fel vid hämtning av produkten.");
            }

            const data = await response.json();
            setProduct(data);

        } catch (error) {
            console.log(error);
            setError("Något gick fel vid hämtning av produkten.");
        } finally {
            setLoading(false);
        }
    };

    return (

        <div>
            <h1>Produktdetaljer</h1>

            <div>

                {loading && (
                    <div className="fetchInfo">
                        <span className="loading-spinner"></span>
                        <p><em>Hämtar produkten...</em></p>
                    </div>
                )}

                {error && <p className="errorMess">{error}</p>}

                {product && (
                    <div className="product-container">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p><strong>{product.price}kr</strong></p>


                        <Link to="/">⬅ Tillbaka till startsidan</Link>
                    </div>
                )}

            </div>
        </div>

    )
}

export default ProductDetails