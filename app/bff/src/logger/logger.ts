import winston from "winston";
import { Request} from "express";

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.json(),
        }),
    ],
});

const prefix = (req: Request) => {
    return `${req.method} . ${req.originalUrl} `;
};

const extractMetadata = (req: Request, error?: any) => {
    const callId = req.header('nav-call-id');
    const requestId = req.header('x-request-id');

    return {
        ...(callId ? { x_callId: callId } : {}),
        ...(requestId ? { x_requestId: requestId } : {}),
        ...(error ? { error: error } : {})
    };
};

export const logWarn = (message: string, req: Request, error?: any)  => {
    const logMessage = `${prefix(req)} - ${message}`;
    const meta = extractMetadata(req);
    logger.info(logMessage, meta);
};

export const logInfoLevel = (message: string, req: Request, error?: any)  => {
    const logMessage = `${prefix(req)} - ${message}`;
    const meta = extractMetadata(req, error);
    logger.warn(logMessage, meta);
};

export const logInfo = (message: string) => {
    logger.info(message);
}

export const logError = (message: string, req: Request, error?: any)  => {
    const logMessage = `${prefix(req)} - ${message}`;
    const meta = extractMetadata(req, error);
    logger.error(logMessage, meta);
}

export const logDebug = (message: string, req?: Request) => {
    if (req) {
        const logMessage = `${prefix(req)} - ${message}`;
        const meta = extractMetadata(req);
        logger.debug(logMessage, meta);
    } else {
        logger.debug(message);
    }
}

export default logger;