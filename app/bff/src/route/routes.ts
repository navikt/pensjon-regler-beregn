import {Router} from "express";
import {ensureAuthenticated, fetchApiRequest, postApiRequest} from "../authentication/tokenproxy";
import {logInfo, logInfoLevel} from "../logger/logger";
import {serverConfiguration} from "../environment/config";
import {GuiModel, LogResponse} from "@pensjon/domain";
import {respondWithDownstreamError, setPensjonReglerRequestScopeAndUrlForEnvironment} from "./util";


const expressRouter = Router();

const API_LOG_BY_ID = "/log/:id";
const API_BEREGN = "/:env/beregn";
const API_CONVERT_RESPONSE = "/:env/convertResponse";
const API_ALLE_SATSTABELLER = "/:env/alleSatstabeller";

export default (): Router => {

    if (serverConfiguration.enableAccessControl) {
        expressRouter.use([API_LOG_BY_ID, API_BEREGN, API_CONVERT_RESPONSE, API_ALLE_SATSTABELLER], ensureAuthenticated());
    }

    // Kall til pensjon-regler, skal ikke ha autentisering
    expressRouter.post(API_CONVERT_RESPONSE, async (req, res) => {
        try {
            const { env } = req.params;
            const { requestUrl } = setPensjonReglerRequestScopeAndUrlForEnvironment(env);

            const CONVERT_RESPONSE_URL = `${requestUrl}/api/convertResponse`;
            logInfo(`Kaller pensjon-beregn API på ${CONVERT_RESPONSE_URL}`);

            const response = await postApiRequest(req, {url: CONVERT_RESPONSE_URL, authenticationEnabled: false, query: req.query}, req.body);
            logInfo(`Kall til ${CONVERT_RESPONSE_URL} fullført`);
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

    // Kall til pensjon-regler, skal ikke ha autentisering
    expressRouter.post(API_BEREGN, async (req, res) => {
        try {
            const { env } = req.params;
            const { requestUrl } = setPensjonReglerRequestScopeAndUrlForEnvironment(env);
            const BEREGN_URL = `${requestUrl}/api/beregn`;
            logInfo(`Kaller pensjon-beregn API på ${BEREGN_URL}`);
            const response = await postApiRequest(req, {url: BEREGN_URL, authenticationEnabled: false, query: req.query}, req.body);
            logInfo(`Kall til ${BEREGN_URL} fullført`);
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

    // Kall til pensjon-regler, skal ikke ha autentisering
    expressRouter.get(API_ALLE_SATSTABELLER, async (req, res ) => {
        try {
            const { env } = req.params;
            logInfo(`satstabeller fra miljø: ${env}`);
            const { requestUrl } = setPensjonReglerRequestScopeAndUrlForEnvironment(env);
            logInfo(`Henter satstabeller fra miljø: ${env} med url: ${requestUrl}`);

            const SATSTABELL_URL = `${requestUrl}/alleSatstabeller`;
            logInfo(`Kaller pensjon-beregn API på ${SATSTABELL_URL}`);

            const response = await fetchApiRequest(req, {url: SATSTABELL_URL, authenticationEnabled: false});
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

    // Kall til pensjon-regler-logger, må autentiseres
    expressRouter.get(API_LOG_BY_ID, async (req, res) => {
        try {

            const {id} = req.params;

            const LOGGER_API_URL = `${serverConfiguration.pensjonReglerLoggerAppURI}/api/log/${id}`;
            logInfo(`Kaller logger API på ${LOGGER_API_URL}`);

            // TODO Fjerner ikke enda, da vi trenger trolig noe tilsvarende når vi fristiller Q2 fra EntraID
            // const response = serverConfiguration.enableAccessControl
            //     ? await fetchApiRequest(req, {url: LOGGER_API_URL, scope: serverConfiguration.pensjonReglerLoggerScope, authenticationEnabled: true})
            //     : await fetchApiRequest(req, {url: LOGGER_API_URL, scope: serverConfiguration.pensjonReglerLoggerScope, authenticationEnabled: false});

            const response = await fetchApiRequest(req, {url: LOGGER_API_URL, scope: serverConfiguration.pensjonReglerLoggerScope, authenticationEnabled: true})

            const logResponse: LogResponse = response.data;
            logInfo(`Logger API response: ${JSON.stringify(logResponse)}`);
            return res.status(200).json(logResponse);
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