#!/bin/sh
echo "Starting entrypoint.sh"
echo "PENSJON_REGLER_CLUSTER=$PENSJON_REGLER_CLUSTER"

echo "{ \"cluster\": \"${PENSJON_REGLER_CLUSTER:-unknown}\" }" > /tmp/config.json
echo "Config written to /tmp/config.json: $(cat /tmp/config.json)"

exec nginx -g 'daemon off;'
