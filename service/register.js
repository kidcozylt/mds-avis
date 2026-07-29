const Register = async (data) => {
    try {
        const response = await fetch("http://localhost:5000/register", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const result = await response.json()
        return { response, result }
    } catch (error) {
        console.error(error)
        return { response: { ok: false }, result: { error: 'Impossible de contacter le serveur' } }
    }
}

module.exports = Register