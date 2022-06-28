import {
	createFrontendLogger,
	DEFAULT_FRONTENDLOGGER_API_URL
} from '@navikt/frontendlogger';

export const logger = createFrontendLogger('pensjon-regler-beregn', DEFAULT_FRONTENDLOGGER_API_URL);