# This Dockerfile sets up a Python 3.8 environment for running a Python application.
# It installs the required dependencies from requirements.txt and sets up the working directory.
# The application is configured to run with customizable host and port arguments.
# Example of how to build and run this container:
# 1. Build the Docker image:
#    docker build -t hub .
# 2. Run the Docker container:
#    docker run -p 3000:3000 hub
FROM python:3.8

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

ARG HOST=0.0.0.0
ARG PORT=3000

ENV HOST=${HOST}
ENV PORT=${PORT}

CMD ["python3", "hub.py", "--host", "${HOST}", "--port", "${PORT}"]