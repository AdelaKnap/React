import { useEffect, useState } from "react";
import { ProductInterface } from "../types/ProductInterface";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

const ProductPage = () => {

    // States
    const [products, setProducts] = useState<ProductInterface[] | []>([]);
    const [selectedProduct, setSelectedProduct] = useState<ProductInterface | null>(null);

    // UseEffect för att hämta produkterna
    useEffect(() => {
        getProducts();
    }, []);

    // Fetch-anrop för att hämta produkterna
    const getProducts = async () => {
        try {
            const response = await fetch("http://localhost:5000/products");

            if (!response.ok) {
                throw new Error("Något gick fel vid hämtning av produkterna.");
            } else {
                const data = await response.json();
                setProducts(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Funktion för att välja produkt att redigera
    const handlePut = (product: ProductInterface) => {
        setSelectedProduct(product);
    };

    // Funktion för att rensa vald produkt
    const clearSelectedProduct = () => {
        setSelectedProduct(null);
    };    

    return (
        <div>
            <h1>Produkthantering</h1>
            <div>
                <ProductForm selectedProduct={selectedProduct} refreshProducts={getProducts} clearSelectedProduct={clearSelectedProduct}  />

                <h2>Aktuella produkter</h2>
                <ProductTable products={products} onPut={handlePut} refreshProducts={getProducts} />
            </div>
        </div>
    )
}

export default ProductPage