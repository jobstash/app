# Builder stage
FROM debian:bullseye as builder

ARG NODE_VERSION=18.13.0
ARG YARN_VERSION=1.22.19

RUN apt-get update; apt install -y curl python-is-python3 pkg-config build-essential
RUN curl https://get.volta.sh | bash
ENV VOLTA_HOME /root/.volta
ENV PATH /root/.volta/bin:$PATH
RUN volta install node@${NODE_VERSION} yarn@${YARN_VERSION}

RUN mkdir /app
WORKDIR /app

# Cache yarn dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the app and build
COPY . .
RUN yarn run build

# Production stage
FROM debian:bullseye

COPY --from=builder /root/.volta /root/.volta
COPY --from=builder /app /app

WORKDIR /app
ENV PATH /root/.volta/bin:$PATH

CMD ["node_modules/.bin/next", "start"]
