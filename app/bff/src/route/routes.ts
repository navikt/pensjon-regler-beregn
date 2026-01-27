import {Router} from "express";
import {ensureAuthenticated, fetchApiRequest, postApiRequest} from "../authentication/tokenproxy";
import {logInfo, logInfoLevel} from "../logger/logger";
import {serverConfiguration} from "../environment/config";
import {GuiModel, LogResponse, Metadata} from "@pensjon/domain";
import {setPensjonReglerRequestScopeAndUrlForEnvironment, respondWithDownstreamError} from "./util";


const expressRouter = Router();
const DEFAULT_ENV = process.env.APP_ENV === 'prod-gcp' ? 'q0' : 'q2'; // Default environment based on

const API_LOG_BY_ID = "/log/:id";
const API_BEREGN = "/:env/beregn";
const API_CONVERT_RESPONSE = "/:env/convertResponse";
const API_ALLE_SATSTABELLER = "/:env/alleSatstabeller";

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
            const { requestScope, requestUrl } = setPensjonReglerRequestScopeAndUrlForEnvironment(env);

            logInfoLevel("Fikk request på /api/convertResponse med query:", req);
            const CONVERT_RESPONSE_URL = `${requestUrl}/api/convertResponse`;
            logInfo(`Kaller pensjon-beregn API på ${CONVERT_RESPONSE_URL}`);
            logInfo(`Med className: ${className}, sats: ${sats}`);
            logInfo(`body: ${JSON.stringify(body)}`);

            const response = serverConfiguration.enableAccessControl
                ? await postApiRequest(req, {url: CONVERT_RESPONSE_URL, scope: requestScope , authenticationEnabled: true, query: req.query}, req.body)
                : await postApiRequest(req, {url: CONVERT_RESPONSE_URL, scope: requestScope, authenticationEnabled: false, query: req.query}, req.body);
            logInfo(`Kall til ${CONVERT_RESPONSE_URL} med scope: ${requestScope} fullført`);
            logInfo(`Response data: ${JSON.stringify(response.data)}`);
            const guiModel: GuiModel = response.data;
            return res.status(200).json(guiModel);
        } catch (err: unknown) {
            return respondWithDownstreamError(
                req,
                res,
                err,
                "En feil oppstod ved konsumering av pensjon-beregn API, detalj: "
            );
        }
    });

    expressRouter.post(API_BEREGN, async (req, res) => {
        try {
            const { env } = req.params;
            const { className } = req.query;
            const { sats } = req.query;
            const { body } = req;
            const { requestScope, requestUrl } = setPensjonReglerRequestScopeAndUrlForEnvironment(env);
            logInfoLevel("Fikk request på /api/beregn med query:", req);
            const BEREGN_URL = `${requestUrl}/api/beregn`;
            logInfo(`Kaller pensjon-beregn API på ${BEREGN_URL}`);
            logInfo(`Med className: ${className}, sats: ${sats}`);
            logInfo(`body: ${JSON.stringify(body)}`);
            const response = serverConfiguration.enableAccessControl
                ? await postApiRequest(req, {url: BEREGN_URL, scope: requestScope, authenticationEnabled: true, query: req.query}, req.body)
                : await postApiRequest(req, {url: BEREGN_URL, scope: requestScope, authenticationEnabled: false, query: req.query}, req.body);
            logInfo(`Kall til ${BEREGN_URL} med scope: ${requestScope} fullført`);
            logInfo(`Response data: ${JSON.stringify(response.data)}`);
            const guiModel: GuiModel = response.data;
            return res.status(200).json(guiModel);
        } catch (err: unknown) {
            return respondWithDownstreamError(
                req,
                res,
                err,
                "En feil oppstod ved konsumering av pensjon-beregn API, detalj: "
            );
        }
    });

    expressRouter.get(API_ALLE_SATSTABELLER, async (req, res ) => {
        try {
            const { env } = req.params;
            logInfo(`satstabeller fra miljø: ${env}`);
            const { requestUrl, requestScope } = setPensjonReglerRequestScopeAndUrlForEnvironment(env);
            logInfo(`Henter satstabeller fra miljø: ${env} med url: ${requestUrl} og scope: ${requestScope}`);
            logInfoLevel("Fikk request på /api/alleSatstabeller med query: ", req);

            const SATSTABELL_URL = `${requestUrl}/alleSatstabeller`;
            logInfo(`Kaller pensjon-beregn API på ${SATSTABELL_URL}`);

            const response = serverConfiguration.enableAccessControl
                ? await fetchApiRequest(req, {url: SATSTABELL_URL, scope: requestScope,  authenticationEnabled: true})
                : await fetchApiRequest(req, {url: SATSTABELL_URL, scope: requestScope,  authenticationEnabled: false});
            return res.status(200).json(response.data);
        } catch (err: unknown) {
            return respondWithDownstreamError(
                req,
                res,
                err,
                "En feil oppstod ved konsumering av pensjon-beregn API, detalj: "
            );
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

            const logresponse: LogResponse = response.data;
            logInfo('Raw data fra logger API mottatt :' + response.data);
            logInfo(`Logger API response: ${JSON.stringify(logresponse)}`);
            return res.status(200).json({logresponse});
        } catch (err: unknown) {
            return respondWithDownstreamError(
                req,
                res,
                err,
                "En feil oppstod ved konsumering av logger API, detalj: "
            );
        }
    });


    return expressRouter;
};