function waitFor(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function retry(promise, onRetry, maxRetries) {
    async function retryWithBackoff(retries) {
        try {
            // Make sure we don't wait on the first attempt
            if (retries > 0) {
                const timeToWait = 2 ** retries * 100;
                console.log(`waiting for ${timeToWait}ms...`);
                await waitFor(timeToWait);
            }
            return await promise();
        } catch (e) {
            if (retries < maxRetries) {
                onRetry();
                return retryWithBackoff(retries + 1);
            } else {
                console.warn("Max retries reached. Bubbling the error up");
                throw e;
            }
        }
    }

    return retryWithBackoff(0);
}