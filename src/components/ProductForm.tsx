import { useState, useEffect } from "react";
import * as Yup from "yup";
import { ProductInterface } from "../types/ProductInterface";
import { ErrorInterface } from "../types/ErrorInterface";
import "../components/ProductForm.css";

// Interface för props med vald produkt och funktiner
interface ProductFormProps {
    selectedProduct: ProductInterface | null;       // Null när ingen produkt är vald
    refreshProducts: () => void;                    // Funktion för att uppdatera produkterna
    clearSelectedProduct: () => void;               // Funktion för att rensa vald produkt
}

const ProductForm = ({ selectedProduct, refreshProducts, clearSelectedProduct }: ProductFormProps) => {

    // States
    const [errors, setErrors] = useState<ErrorInterface>({});

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


    // Valideringsschema med yup
    const validationSchema = Yup.object({
        name: Yup.string().trim().required().min(3, "Produktnamn med minst 3 tecken är obligatoriskt"),
        description: Yup.string().required("Beskrivning är obligatoriskt").max(200, "Max 200 tecken"),
        price: Yup.number().required("Pris är obligatoriskt").min(1, "Pris måste vara minst 1 kr"),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProduct({ ...product, [e.target.name]: e.target.value });        // Uppdatera state med nytt värde
    };

    // Submit från formuläret
    const submitForm = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Validering
            await validationSchema.validate(product, { abortEarly: false });
            setErrors({});

            // Url och metod sätts beroende på om det är en ny produkt eller en uppdatering (om selectedProduct finns är det uppdatering)
            const url = selectedProduct ? `http://localhost:5000/products/${selectedProduct._id}` : "http://localhost:5000/products";
            const method = selectedProduct ? "PUT" : "POST";

            // Ta bort både _id och __v från produkten om det är en ny produkt
            const productData = selectedProduct ? { ...product, _id: undefined, __v: undefined } : product;

            // Anrop med metoden från variablerna ovan
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
                credentials: "include"
            });

            if (!response.ok) throw Error("Något gick fel vid skapande av produkten");

            // Alert, beroende på om det är en POST eller PUT
            alert(method === "POST" ? "Produkten har lagts till!" : "Produkten har uppdaterats!");

            refreshProducts();   // Uppdatera produkterna
            clearSelectedProduct(); // Nollställ vald produkt
            setProduct({ name: "", description: "", price: 0 });   // Töm fomruläret igen

        } catch (error) {
            const validationErrors: ErrorInterface = {};

            if (error instanceof Yup.ValidationError) {
                error.inner.forEach((error) => {
                    const prop = error.path as keyof ErrorInterface;
                    validationErrors[prop] = error.message; // Lägg till felmeddelanden för varje input
                });

                setErrors(validationErrors);  // Uppdatera state med felmeddelandena
            }
        }
    };

    // Sidinnehållet
    return (
        <form id="product-form" className="productForm" onSubmit={submitForm}>
            <label htmlFor="name">Produktnamn:</label>
            <input type="text" id="name" name="name" value={product.name} onChange={handleChange} placeholder="Produktnamn" />

            {errors.name && <span className="error-message">{errors.name}</span>}

            <label htmlFor="description">Beskrivning:</label>
            <textarea id="description" name="description" value={product.description} onChange={handleChange} placeholder="Beskrivning" />

            {errors.description && <span className="error-message">{errors.description}</span>}

            <label htmlFor="price">Pris:</label>
            <input type="number" id="price" name="price" value={product.price} onChange={handleChange} placeholder="Pris" />

            {errors.price && <span className="error-message">{errors.price}</span>}
            
            <button type="submit">{selectedProduct ? "Uppdatera" : "Lägg till"} produkt</button>
        </form>
    );
};

export default ProductForm;
