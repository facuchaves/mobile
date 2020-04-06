FROM gcr.io/jobs-deployment-manager/navent/jobs/portal/nodejs-10:latest
MAINTAINER Guido Navalesi <gnavalesi@navent.com>

# Variables pasadas al momento de buildear la imagen
ARG APPLICATION_NEXUS_VERSION

# Guardamos los valores como variables de entorno
ENV APPLICATION_NAME_ENV="backend"
ENV APPLICATION_NEXUS_VERSION_ENV=$APPLICATION_NEXUS_VERSION

# Variables pasadas al momento de correr la imagen
ARG ENVIRONMENT
ARG SITE

# Instalo la aplicacion en /application/lib
COPY jobs/output/package/backend.tar.gz /application/lib/backend.tar.gz
WORKDIR /application/lib
RUN tar -zxvf backend.tar.gz
RUN rm backend.tar.gz
RUN npm install
WORKDIR /

# Expongo el puerto y ejecuto la aplicacion
ENV PORT 5000

EXPOSE $PORT
ENTRYPOINT ["/application/bin/setenv.sh"]
CMD cd /application/lib/ && nodejs --max-http-header-size=15000 main.js
