# This Dockerfile sets up a Python 3.8 environment for running a Python application.
# It installs the required dependencies from requirements.txt and sets up the working directory.
# The application is configured to run with customizable host and port arguments.
# Example of how to build and run this container:
# 1. Build the Docker image 
#    cd backend
#    sudo docker build -t subhub0 -f ./docker/hub/Dockerfile .
# 2. Run the Docker container:
#    docker run -p 3001:3001 subhub0
FROM python:3.8

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

# Set default values for the arguments
ARG HUB_HOST=127.0.0.1
ARG HUB_PORT=3000
ARG IP=40.233.92.183
ARG HOST=0.0.0.0
ARG PORT=3001
ARG ID=2
ARG NAME=Dundas
ARG LONGITUDE=43.26691127633942
ARG LATITUDE=-79.77373983912754
ARG RADIUS_KM=3
ARG EXISTING_DISASTERS=./Dundas/Dundas.csv

# Set environment variables based on the arguments
ENV HUB_HOST=${HUB_HOST}
ENV HUB_PORT=${HUB_PORT}
ENV IP=${IP}
ENV HOST=${HOST}
ENV PORT=${PORT}
ENV ID=${ID}
ENV NAME=${NAME}
ENV LONGITUDE=${LONGITUDE}
ENV LATITUDE=${LATITUDE}
ENV RADIUS_KM=${RADIUS_KM}
ENV EXISTING_DISASTERS=${EXISTING_DISASTERS}

CMD ["python3", "subhub.py", "--hub-host", "${HUB_HOST}", "--hub-port", "${HUB_PORT}", "--ip", "${IP}", "--host", "${HOST}", "--port", "${PORT}", "--id", "${ID}", "--name", "${NAME}", "--longitude", "${LONGITUDE}", "--latitude", "${LATITUDE}", "--radius_km", "${RADIUS_KM}", "--existing-disasters", "${EXISTING_DISASTERS}"]