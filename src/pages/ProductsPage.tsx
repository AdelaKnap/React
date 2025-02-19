import { useAuth } from "../context/AuthContext"

const ProductPage = () => {

    const { user } = useAuth();

    return (
        <div>
            <h1>Produkthantering</h1>
            <h2> Hej och välkommen {user ? user.username : ""}</h2>
        </div>
    )
}

export default ProductPage