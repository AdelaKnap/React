import { ProductInterface } from "../types/ProductInterface";
import "../components/ProductTable.css";


// Interface för props med produkt och funktioner
interface ProductTableProps {
    products: ProductInterface[];                   // Array med produkter
    onPut: (product: ProductInterface) => void;     // Funktion för att redigera produkt
    refreshProducts: () => void;                    // Uppdatera produkterna efter ändringar
}

// Komponent för tabell med produkter
const ProductTable = ({ products, onPut, refreshProducts }: ProductTableProps) => {

    // Funktion för att radera en produkt
    const handleDelete = async (id: string) => {

        if (!window.confirm("Är du säker på att du vill ta bort produkten?")) return;

        // Fetch-anrop med delete och id
        try {
            const response = await fetch(`http://localhost:5000/products/${id}`,
                {
                    method: "DELETE",
                    credentials: "include"
                });

            if (!response.ok) throw Error("Raderingen misslycakdes");

            // Uppdaterar om delete gick ok
            refreshProducts();

        } catch (error) {
            console.error(error);
        }
    };

    // Funktion för att redigera en produkt
    const handlePut = (product: ProductInterface) => {

        // Anropa funktionen som skickas från föräldrar-komponenten
        onPut(product);

        // "Scrollas" till formuläret
        window.location.hash = "#product-form";
    };

    return (
        <table className="productTable">
            <thead>
                <tr>
                    <th>Namn</th>
                    <th>Beskrivning</th>
                    <th>Pris</th>
                    <th>Hantering</th>
                </tr>
            </thead>

            {/* Loopar igenom alla produkter och skriv ut i tabellen */}
            <tbody>
                {products.map((product) => (
                    <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.price} kr</td>
                        <td>
                            <button onClick={() => handlePut(product)}>Redigera</button>
                            <button onClick={() => handleDelete(product._id!)}>Radera</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductTable;
