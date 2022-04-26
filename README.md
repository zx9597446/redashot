## What
get redash (charts/plots/images/visualizations) from dashboard and send them to telegram group.

## Requirmets:
1. jq curl nodejs npm python3 pip3
2. npm install puppeteer 
3. pip3 install telegram-send

see install_dep.sh for details

## Config
modify config.json

## Run
./run.sh

## How
1. try get a visualization list from dashboard url(config.json.url + config.json.slug) using redash API.
2. parse json list to find out queries/visualizations.
3. fetch js rendered images from embed API using headless browser(puppeteer).
4. send saved images at output directory to telegram group by telegram-send.
