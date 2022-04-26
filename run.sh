#!/bin/bash

api_key=$(jq -r '.api_key' config.json)
url=$(jq -r '.url' config.json)
slug=$(jq -r '.slug' config.json)
extra_param=$(jq -r '.extra_param' config.json)

rm url.list
rm output/*.png

curl -H Authorization:$api_key $url/api/dashboards/$slug |\
jq -rc '.widgets[].visualization | [.id,.query.id] | @csv'  |
while IFS=,  read -r vid qid; do
    preview=$url/embed/query/"$qid"/visualization/"$vid"?api_key=$api_key"&$extra_param"
    echo $preview >> url.list
done

node screenshot.js

for file in ./output/*.png; do echo sending to tg: $file && telegram-send -i $file; done
