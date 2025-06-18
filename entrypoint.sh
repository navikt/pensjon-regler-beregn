#!/bin/sh
set -e

echo "Starting entrypoint.sh"
echo "PENSJON_REGLER_CLUSTER=$PENSJON_REGLER_CLUSTER"

# Write config to a writable temp location
CONFIG_PATH="/tmp/config.json"
echo "{ \"cluster\": \"${PENSJON_REGLER_CLUSTER:-unknown}\" }" > "$CONFIG_PATH"
echo "Config written to $CONFIG_PATH: $(cat $CONFIG_PATH)"

# Copy config.json to nginx html directory
# Use sudo or adjust ownership if needed (may not be necessary in unprivileged image)
cp "$CONFIG_PATH" /usr/share/nginx/html/config.json
echo "Config copied to /usr/share/nginx/html/config.json"

# Start nginx (foreground)
exec nginx -g 'daemon off;'