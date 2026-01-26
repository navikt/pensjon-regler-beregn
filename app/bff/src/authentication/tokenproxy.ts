import {NextFunction, Request, Response} from "express";
import {getToken, requestOboToken, validateToken} from "@navikt/oasis";
import axios from "axios";
import {logInfo} from "../logger/logger";

type ApiRequestOptions = {
    url: string;
    scope?: string;
    query?: any;
    authenticationEnabled: boolean;
};

export const ensureAuthenticated = () =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            logInfo("Sjekker userToken")
            const token = getToken(req);
            if (!token) {
                return res.status(401).json({error: "Mangler bearer token"});
            }
            const validationResult = await validateToken(token);
            if (!validationResult.ok) {
                if (validationResult.errorType != "token expired") {
                    return res.status(502).json({error: "Ugyldig token"});
                }
                return res.status(401).json({error: "Token utgått"});
            }
            return next();
        } catch {
            return res.status(502).json({error: "Token validering feilet"});
        }
    };

export const postApiRequest = async (req: Request, options: ApiRequestOptions, body: any) => {
    if (options.authenticationEnabled) {
        try {
            if (!options.scope) {
                const e = new Error("Mangler scope for OBO token");
                (e as any).status = 500;
                throw e;
            }
            const userToken = getToken(req);
            if (!userToken) {
                const e = new Error("Mangler user token");
                (e as any).status = 401;
                throw e;
            }

            const oboResult = await requestOboToken(userToken, options.scope);
            if (!oboResult.ok) {
                const e = new Error(`Feilet ved utveksling av OBO token: ${oboResult.error.message}`);
                (e as any).status = 502;
                throw e;
            }
            return axios.post(options.url, body, {
                headers: {
                    Authorization: `Bearer ${oboResult.token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                params: options.query,
                timeout: 5_000,
                withCredentials: true,
            });
        } catch (error) {
            logInfo(`Feil ved kall til API med autentisering: ${error}`);
            throw error;
        }
    } else {
        logInfo("Kaller API uten autentisering");
        return axios.post(options.url, body, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            params: options.query,
            timeout: 5_000,
            withCredentials: true,
        });
    }
}

export const fetchApiRequest = async (req: Request, options: ApiRequestOptions) => {
    if (options.authenticationEnabled) {
        try {
            if (!options.scope) {
                const e = new Error("Mangler scope for OBO token");
                (e as any).status = 500;
                throw e;
            }
            const userToken = getToken(req);
            if (!userToken) {
                const e = new Error("Mangler user token");
                (e as any).status = 401;
                throw e;
            }

            const oboResult = await requestOboToken(userToken, options.scope);
            if (!oboResult.ok) {
                const e = new Error(`Feilet ved utveksling av OBO token: ${oboResult.error.message}`);
                (e as any).status = 502;
                throw e;
            }
            return axios.get(options.url, {
                headers: {
                    Authorization: `Bearer ${oboResult.token}`,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                params: options.query,
                timeout: 5_000,
                withCredentials: true,
            });
        } catch (error) {
            logInfo(`Feil ved kall til API med autentisering: ${error}`);
            throw error;
        }
    } else {
        logInfo("Kaller API uten autentisering");
        return axios.get(options.url, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            params: options.query,
            timeout: 5_000,
            withCredentials: true,
        });
    }


}