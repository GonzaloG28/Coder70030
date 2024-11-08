const errors = {
    error: { message: "Client Error", statusCode: 400 },
    auth: { message: "Invalid Credentials", statusCode: 403 },
    forbidden: { message: "Not Found", statusCode: 404 },
    fatal: { message: "Server Error", statusCode: 500 }
}

export default errors