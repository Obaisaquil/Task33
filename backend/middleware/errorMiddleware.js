const errorHandler = (err, req, res, next) => {
    console.error(err);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    if (err.name === "ValidationError") {
        statusCode = 400;
        message = err.message;
    }

    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid ID or data format";
    }

    res.status(statusCode).json({
        success: false,
        message
    });
};

module.exports = errorHandler;
