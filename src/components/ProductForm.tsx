import { useState, useEffect } from "react";
import { ProductInterface } from "../types/ProductInterface";
import "../components/ProductForm.css";

// Interface för props med vald produkt och funktion, refreshProducts, för att uppdatera efter ändring
interface ProductFormProps {
    selectedProduct: ProductInterface | null;       // Null när ingen produkt är vald
    refreshProducts: () => void;
}

const ProductForm = ({ selectedProduct, refreshProducts }: ProductFormProps) => {

    // State för produkt
    const [product, setProduct] = useState<ProductInterface>({
        name: "",
        description: "",
        price: 0
    });

    // UseEffect för att uppdatera formuläret om en produkt väljs
    useEffect(() => {
        if (selectedProduct) {
            setProduct(selectedProduct);
        }
    }, [selectedProduct]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProduct({ ...product, [e.target.name]: e.target.value });        // Uppdatera state med nytt värde
    };

    // Submit från formuläret
    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        // Url sätts beroende på om det är en ny produkt eller en uppdatering (om selectedProduct finns är det uppdatering)
        const url = selectedProduct ? `http://localhost:5000/products/${selectedProduct._id}` : "http://localhost:5000/products";

        // Metod sätts beroende på om det är en ny produkt eller en uppdatering (om selectedProduct finns är det uppdatering)
        const method = selectedProduct ? "PUT" : "POST";

        // Ta bort både _id och __v från produkten om det är en ny produkt
        const productData = selectedProduct ? { ...product, _id: undefined, __v: undefined } : product;

        // Anrop med metoden från variabeln ovan
        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
                credentials: "include"
            });

            if (!response.ok) throw Error("Något gick fel vid skapande av produkten");

            // Alert, beroende på om det är en POST eller PUT
            if (method === "POST") {
                alert("Produkten har lagts till!");
            } else {
                alert("Produkten har uppdaterats!");
            }

            refreshProducts();   // Uppdatera produkterna
            setProduct({ name: "", description: "", price: 0 });   // Nollställ fomruläret igen

        } catch (error) {
            console.error(error);
        }
    };

    // Sidinnehållet
    return (
        <form id="product-form" className="productForm" onSubmit={submitForm}>
            <label htmlFor="name">Produktnamn:</label>
            <input type="text" id="name" name="name" value={product.name} onChange={handleChange} placeholder="Produktnamn" required />

            <label htmlFor="description">Beskrivning:</label>
            <textarea id="description" name="description" value={product.description} onChange={handleChange} placeholder="Beskrivning" required />

            <label htmlFor="price">Pris:</label>
            <input type="number" id="price" name="price" value={product.price} onChange={handleChange} placeholder="Pris" required />

            <button type="submit">{selectedProduct ? "Uppdatera" : "Lägg till"} produkt</button>
        </form>
    );
};

export default ProductForm;
