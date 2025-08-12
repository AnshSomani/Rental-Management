/**
 * @desc    Middleware for handling 404 Not Found errors.
 * This catches any requests that don't match an existing route.
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Passes the error to the next middleware (our errorHandler)
};

/**
 * @desc    General error handling middleware.
 * This catches any errors that occur in the application and sends a structured JSON response.
 */
const errorHandler = (err, req, res, next) => {
  // Sometimes an error might come through with a 200 status code, so we set it to 500 (Server Error) by default.
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    // We only want to show the error stack in development mode for debugging
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
