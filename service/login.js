const Login = async (data) => {
    try {
        const response = await fetch("http://localhost:5000/login", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await response.json()

        if (response.ok) {
            console.log("Connexion réussie", result)
        }

        return { response, result }
    } catch (error) {
        console.error(error)
        return { response: { ok: false }, result: { error: 'Impossible de contacter le serveur' } }
    }
}

export default Login