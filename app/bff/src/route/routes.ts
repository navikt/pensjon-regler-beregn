import {Router} from "express";
import axios from "axios";
import {ensureAuthenticated, fetchApiRequest, postApiRequest} from "../authentication/tokenproxy";
import {logError, logInfo, logInfoLevel} from "../logger/logger";
import {serverConfiguration} from "../environment/config";
import {Metadata, LogResponse, GuiModel} from "@pensjon/domain";
import {setPensjonReglerRequestScopeAndUrlForEnvironment} from "../environment/apihelper";


const expressRouter = Router();
const API_LOG_BY_ID = "/api/log/:id";
const API_BEREGN = "/api/:env/beregn";
const API_CONVERT_RESPONSE = "/api/:env/convertResponse";
const API_ALLE_SATSTABELLER = "/api/:env/alleSatstabeller";

export default (): Router => {

    if (serverConfiguration.enableAccessControl) {
        expressRouter.use([API_LOG_BY_ID, API_BEREGN, API_CONVERT_RESPONSE, API_ALLE_SATSTABELLER], ensureAuthenticated());
    }

    expressRouter.post(API_CONVERT_RESPONSE, async (req, res) => {
        try {
            const { env } = req.params;
            const { className } = req.query;
            const { sats } = req.query;
            const { body } = req;
            const { requestScope, requestUrl } = await setPensjonReglerRequestScopeAndUrlForEnvironment(env);

            logInfoLevel("Fikk request på /api/convertResponse med query:", req);
            const CONVERT_RESPONSE_URL = `${requestUrl}/api/convertResponse`;
            logInfo(`Kaller pensjon-beregn API på ${CONVERT_RESPONSE_URL}`);
            logInfo(`Med className: ${className}, sats: ${sats}`);
            logInfo(`body: ${JSON.stringify(body)}`);

            const response = serverConfiguration.enableAccessControl
                ? await postApiRequest(req, {url: CONVERT_RESPONSE_URL, scope: requestScope , authenticationEnabled: true}, req.body)
                : await postApiRequest(req, {url: CONVERT_RESPONSE_URL, scope: requestScope, authenticationEnabled: false}, req.body);
            logInfo(`Kall til ${CONVERT_RESPONSE_URL} med scope: ${requestScope} fullført`);
            logInfo(`Response data: ${JSON.stringify(response.data)}`);
            const guiModel: GuiModel = response.data;
            return res.status(200).json(guiModel);
        } catch (err: unknown) {
            const error = err as any;
            const isAxiosErr = axios.isAxiosError ? axios.isAxiosError(error) : false;
            const status =
                error?.status ??
                error?.response?.status ??
                (isAxiosErr ? 502 : 500);

            const remoteMessage = error?.response?.data?.message ?? error?.response?.data ?? null;
            const message = remoteMessage ?? error?.message ?? String(err);
            logError(message, req);
            return res.status(status).json({error: `En feil oppstod ved konsumering av pensjon-beregn API, detalj: ${message}`});
        }
    });

    expressRouter.post(API_BEREGN, async (req, res) => {
        try {
            const { env } = req.params;
            const { className } = req.query;
            const { sats } = req.query;
            const { body } = req;
            const { requestScope, requestUrl } = await setPensjonReglerRequestScopeAndUrlForEnvironment(env);
            logInfoLevel("Fikk request på /api/beregn med query:", req);
            const BEREGN_URL = `${requestUrl}/api/beregn`;
            logInfo(`Kaller pensjon-beregn API på ${BEREGN_URL}`);
            logInfo(`Med className: ${className}, sats: ${sats}`);
            logInfo(`body: ${JSON.stringify(body)}`);
            const response = serverConfiguration.enableAccessControl
                ? await postApiRequest(req, {url: BEREGN_URL, scope: requestScope, authenticationEnabled: true}, req.body)
                : await postApiRequest(req, {url: BEREGN_URL, scope: requestScope, authenticationEnabled: false}, req.body);
            logInfo(`Kall til ${BEREGN_URL} med scope: ${requestScope} fullført`);
            logInfo(`Response data: ${JSON.stringify(response.data)}`);
            const guiModel: GuiModel = response.data;
            return res.status(200).json(guiModel);
        } catch (err: unknown) {
            const error = err as any;
            const isAxiosErr = axios.isAxiosError ? axios.isAxiosError(error) : false;
            const status =
                error?.status ??
                error?.response?.status ??
                (isAxiosErr ? 502 : 500);

            const remoteMessage = error?.response?.data?.message ?? error?.response?.data ?? null;
            const message = remoteMessage ?? error?.message ?? String(err);
            logError(message, req);
            return res.status(status).json({error: `En feil oppstod ved konsumering av pensjon-beregn API, detalj: ${message}`});
        }
    });

    expressRouter.get(API_ALLE_SATSTABELLER, async (req, res ) => {
        try {
            const { env } = req.params;
            logInfo(`satstabeller fra miljø: ${env}`);
            const { requestUrl, requestScope } = await setPensjonReglerRequestScopeAndUrlForEnvironment(env);

            logInfoLevel("Fikk request på /api/alleSatstabeller med query: ", req);

            const SATSTABELL_URL = `${requestUrl}/api/alleSatstabeller`;
            logInfo(`Kaller pensjon-beregn API på ${SATSTABELL_URL}`);

            const response = serverConfiguration.enableAccessControl
                ? await fetchApiRequest(req, {url: SATSTABELL_URL, scope: requestScope,  authenticationEnabled: true})
                : await fetchApiRequest(req, {url: SATSTABELL_URL, scope: requestScope,  authenticationEnabled: false});
            return res.status(200).json(response.data);
        } catch (err: unknown) {
            const error = err as any;
            const isAxiosErr = axios.isAxiosError ? axios.isAxiosError(error) : false;
            const status =
                error?.status ??
                error?.response?.status ??
                (isAxiosErr ? 502 : 500);

            const remoteMessage = error?.response?.data?.message ?? error?.response?.data ?? null;
            const message = remoteMessage ?? error?.message ?? String(err);
            logError(message, req);
            return res.status(status).json({error: `En feil oppstod ved konsumering av pensjon-beregn API, detalj: ${message}`});
        }
    });

    expressRouter.get(API_LOG_BY_ID, async (req, res) => {
        try {
            logInfoLevel("Fikk request på /api/log/:id med query:", req);

            const {id} = req.params;

            const LOGGER_API_URL = `${serverConfiguration.pensjonReglerLoggerAppURI}/api/log/${id}`;
            logInfo(`Kaller logger API på ${LOGGER_API_URL}`);

            const response = serverConfiguration.enableAccessControl
                ? await fetchApiRequest(req, {url: LOGGER_API_URL, scope: serverConfiguration.pensjonReglerLoggerScope, authenticationEnabled: true})
                : await fetchApiRequest(req, {url: LOGGER_API_URL, scope: serverConfiguration.pensjonReglerLoggerScope, authenticationEnabled: false});

            const logresponse: LogResponse = response.data.map((transaction: any) => ({
                ...transaction,
                metadata: JSON.parse(transaction.metadata) as Metadata,
            }));

            return res.status(200).json({logresponse});
        } catch (err: unknown) {
            const error = err as any;
            const isAxiosErr = axios.isAxiosError ? axios.isAxiosError(error) : false;
            const status =
                error?.status ??
                error?.response?.status ??
                (isAxiosErr ? 502 : 500);

            const remoteMessage = error?.response?.data?.message ?? error?.response?.data ?? null;
            const message = remoteMessage ?? error?.message ?? String(err);

            logError(message, req);
            return res.status(status).json({error: `En feil oppstod ved konsumering av logger API, detalj: ${message}`});
        }
    });


    return expressRouter;
};