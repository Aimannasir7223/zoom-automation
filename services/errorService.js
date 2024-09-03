const logError = async (error) => {
    if (error.response) {
        // Axios error with a response from the server
        return res.status(error.response.status).json({ message: error.response.data });
    } else if (error.request) {
        // Axios error with no response (e.g., network issues)
        return res.status(500).json({ message: 'Network error!' });
    } else {
        // Other errors (e.g., issues setting up the request)
        return res.status(500).json({ message: error.message });
    }
}
module.export={
    logError
}

