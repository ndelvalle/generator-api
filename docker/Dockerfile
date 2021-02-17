FROM ubuntu:20.04

# configure the "generator" user
RUN groupadd generator && \
  useradd generator -s /bin/bash -m -g generator -G sudo && \
  echo 'generator:generator' |chpasswd && \
  mkdir /home/generator/app && \
  export DEBIAN_FRONTEND=noninteractive && \
  export TZ=Europe\Paris && \
  ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && \
  apt-get update && \
  # install utilities
  apt-get --no-install-recommends install -y \
    wget \
    sudo && \
  # install node.js
  wget https://nodejs.org/dist/v12.18.4/node-v12.18.4-linux-x64.tar.gz -O /tmp/node.tar.gz && \
  tar -C /usr/local --strip-components 1 -xzf /tmp/node.tar.gz && \
  # upgrade npm
  npm install -g npm && \
  # install yeoman
  npm install -g yo && \
  # cleanup
  apt-get clean && \
  rm -rf \
    /home/generator/.cache/ \
    /var/lib/apt/lists/* \
    /tmp/* \
    /var/tmp/*

RUN \
  # install the generator
  npm install -g generator-api && \
  # fix generator user permissions
  chown -R generator:generator \
    /home/generator \
    /usr/local/lib/node_modules && \
  # cleanup
  rm -rf \
    /home/generator/.cache/ \
    /var/lib/apt/lists/* \
    /tmp/* \
    /var/tmp/*

# expose the working directory
USER generator
ENV PATH $PATH:/usr/bin
WORKDIR /home/generator/app
VOLUME ["/home/generator/app"]
CMD ["yo", "api"]