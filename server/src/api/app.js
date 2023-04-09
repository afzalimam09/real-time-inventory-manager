import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import compression from "compression";

import indexRouter from "./components/indexRouter.js";
import AppError from "./utils/appError.js";
import globalErrorHandler from "./utils/globalErrorHandler.js";

// Start express app
const app = express();

// Global Middleware

// Implement cors
app.use(cors());
app.options("*", cors());

// Set Security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Limiter to limit the number of request in an hour
const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message:
        "You have reached to the maximum attempt from this IP, Please try after 1 hour!",
});
app.use("/api", limiter);

// Body parser, reading data from body
app.use(express.json({ limit: "10mb" }));
app.use(
    express.urlencoded({
        limit: "10mb",
        extended: true,
    })
);

// Data sanitization against NoSQL Query Injection
app.use(mongoSanitize());

// Data sanitization against XSS - Cross Site Scripting
app.use(xss());

// Prevent parameter polution
app.use(
    hpp({
        whitelist: [],
    })
);

// Compression
app.use(compression());

// Use Index Router
app.use("/api/v1", indexRouter);

// Return 404 if url is not found
app.all("*", (req, res, next) => {
    // Creating and passing error in the next method
    next(new AppError(`Can't find ${req.originalUrl} on our server`, 404));
});

// Handle the global error
app.use(globalErrorHandler);

export default app;
