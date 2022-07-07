from debian:buster-slim

ENV APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=DontWarn
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y apt-utils

RUN apt-get upgrade -y && apt-get install -y gnupg2 wget tzdata
RUN wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | apt-key add -
RUN echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/5.0 main" | tee /etc/apt/sources.list.d/mongodb-org-5.0.list
RUN apt-get update
RUN apt-get install -y mongodb-org=5.0.9 mongodb-org-server=5.0.9 mongodb-org-shell=5.0.9 mongodb-org-mongos=5.0.9 mongodb-org-tools=5.0.9

RUN mkdir -p /home/mongodb
RUN chown -R mongodb:mongodb /home/mongodb

RUN mkdir -p /data/db
RUN mkdir -p /data/log

COPY scripts/ /data/scripts
COPY config/ /data/config
RUN chmod u+x /data/scripts/bash/*.sh

RUN chown -R mongodb:mongodb /data

USER mongodb
WORKDIR /data

EXPOSE 27017
ENTRYPOINT ["/bin/bash", "/data/scripts/bash/bootstrap.sh"]
