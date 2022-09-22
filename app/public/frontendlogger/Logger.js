/*function log(level, data) {
    if (typeof data === 'string') {
        data = { message: data }
    }
    if (level === 'error') {
        // eslint-disable-next-line no-console
        console.error(data)
    } else {
        // eslint-disable-next-line no-console
        console.log(level, data)
    }
}

window.onerror = function(message, url, line, column, error) {
    const json = {
        message: message,
        jsFileUrl: url,
        lineNumber: line,
        column: column,
        messageIndexed: message
    }

    if (error) {
        json.stacktrace = error.stack ? error.stack : error
        json.pinpoint = {
            message,
            url,
            line,
            column,
            error: JSON.stringify(error)
        }
    }

    log('error', json)
}


window.frontendlogger.info = function(data) {
    log('info', data)
}
window.frontendlogger.warn = function(data) {
    log('warn', data)
}
window.frontendlogger.error = function(data) {
    log('error', data)
}*/
const createLogger = () => {
	if (window.location.search.indexOf('log=true') > -1 || process.env.NODE_ENV === 'development') {
	  // eslint-disable-next-line
	  return console.log;
	}
	return () => undefined;
  }

 const Logger = function () {
	this.error = (...args) => {
	  return window.frontendlogger.info(...args);
	};
	this.info = (...args) => {
	  return window.frontendlogger.error(...args);
	};
	this.warn = (...args) => {
	  return window.frontendlogger.warn(...args);
	};
	this.event = (...args) => {
	  return window.frontendlogger.event(...args);
	};
  }

  exports = {createLogger, Logger}