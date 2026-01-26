import axios from "axios";
import {logError} from "../../logger/logger";

type RouteErrorResult = { status: number; message: string };

const stringifyUnknown = (value: unknown): string => {
    if (typeof value === "string") return value;
    try {
        return JSON.stringify(value);
    } catch {
        return String(value);
    }
};

const extractRouteError = (err: unknown): RouteErrorResult => {
    const error = err as any;
    const isAxiosErr = axios.isAxiosError ? axios.isAxiosError(error) : false;

    const status =
        error?.status ??
        error?.response?.status ??
        (isAxiosErr ? 502 : 500);

    const remoteMessage =
        error?.response?.data?.message ??
        error?.response?.data ??
        null;

    const message =
        (typeof remoteMessage === "string" ? remoteMessage : remoteMessage != null ? stringifyUnknown(remoteMessage) : null) ??
        error?.message ??
        stringifyUnknown(err);

    return { status, message };
};

export const respondWithDownstreamError = (
    req: any,
    res: any,
    err: unknown,
    prefix: string
) => {
    const { status, message } = extractRouteError(err);
    logError(message, req);
    return res.status(status).json({ error: `${prefix}${message}` });
};