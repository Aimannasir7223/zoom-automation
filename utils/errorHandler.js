// utils/errorHandler.js

const handleError = (error, res) => {
    // Check if the error is from Axios
    if (error.response) {
        // Axios response error (from server)
        return res.status(error.response.status).json({
            message: error.response.data.message || 'An error occurred',
            status: error.response.status,
            error: error.response.data.error || error.message,
        });
    } else if (error.request) {
        // Axios request error (no response received)
        return res.status(500).json({
            message: 'No response received from server',
            status: 500,
            error: error.message,
        });
    } else {
        // General error (e.g., coding issues)
        return res.status(500).json({
            message: 'An error occurred',
            status: 500,
            error: error.message,
        });
    }
};

module.exports = handleError;
