#!/bin/sh

apt install -y curl jq nodejs npm python3 python3-pip
cat dep.list | while read line; do apt install -y  $line; done
npm i puppeteer
pip3 install telegram-send
