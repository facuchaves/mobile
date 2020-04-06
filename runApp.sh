#!/bin/sh

cd packages/backend-for-frontend/
sudo yarn run $1 &

cd ../../packages/$2
sudo yarn start