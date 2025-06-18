#!/bin/sh
# Write runtime config from env var
echo "Writing config.json with cluster=$PENSJON_REGLER_CLUSTER"
echo "{ \"cluster\": \"${PENSJON_REGLER_CLUSTER:-unknown}\" }" > /usr/share/nginx/html/config.json

# Start nginx
exec nginx -g 'daemon off;'
