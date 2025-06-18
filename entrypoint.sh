#!/bin/sh
echo "Starting entrypoint.sh"
echo "PENSJON_REGLER_CLUSTER=$PENSJON_REGLER_CLUSTER"

# Write config to /tmp (writable)
echo "{ \"cluster\": \"${PENSJON_REGLER_CLUSTER:-unknown}\" }" > /tmp/config.json
echo "Config written to /tmp/config.json: $(cat /tmp/config.json)"

# Start nginx
exec nginx -g 'daemon off;'
