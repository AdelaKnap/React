import { useAuth } from "../context/AuthContext"

const AboutPage = () => {

    const { user } = useAuth();

    return (
        <div>
            <h1>Mina sidor</h1>
            <h2> Hej och välkommen {user ? user.username : ""}</h2>
        </div>
    )
}

export default AboutPage