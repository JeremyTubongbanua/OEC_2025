# OEC_2025

## Table of Contents

- [OEC_2025](#oec-2025)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Breakdown of Front-end](#breakdown-of-front-end)
  - [Breakdown of Back-end](#breakdown-of-back-end)
    - [hub.py](#hubpy)
      - [API Specification](#api-specification)
        - [Subscribe to Hub](#subscribe-to-hub)
        - [Get Subhubs](#get-subhubs)
    - [subhub.py](#subhubpy)
      - [API Specification](#api-specification-1)
        - [Add New Disaster](#add-new-disaster)
        - [Remove Disaster](#remove-disaster)
        - [Edit Disaster](#edit-disaster)
        - [Get Disasters](#get-disasters)
  - [Technologies Used](#technologies-used)
  - [License](#license)
  - [How To Run It](#how-to-run-it)
    - [1. Using Multiple Terminal Sessions](#1-using-multiple-terminal-sessions)
  - [Authors](#authors)

## Description

National Disaster's Canada Tracker

National Disaster's Canada(NDC) Tracker is a fully encompassing web application where the community can report disasters and catagorize them. This application allows the public to view, report, and edit disasters within a chosen geographical location.

## Breakdown of Front-end

The front-end uses ReactJS, NextJS, TailwindCSS, LeafletJS, Shadcnui, and several libraries. The front-end was built for accessibility with a easy to read color palette.

Libraries used:

- [openstreetmap](https://www.openstreetmap.org/)

## Breakdown of Back-end

There are 2 main python programs: hub and subhub.

### hub.py

The hub acts as a central location where you can find subhubs given a longitude and latitude. It is a Flask API that can be run on a server. The hub is responsible for managing subhubs and disasters. It can also be used to report disasters.

```bash
➜  backend git:(main) ✗ python3 hub.py -h
usage: Hub [-h] [--host HOST] [--port PORT]

Run a hub instance that users can report to

options:
  -h, --help   show this help message and exit
  --host HOST  The host to run the hub on
  --port PORT  The port to run the hub on
➜  backend git:(main) ✗ python3 subhub.py -h
usage: Sub Hub [-h] [--hub-host HUB_HOST] [--hub-port HUB_PORT] [--ip IP] [--host HOST] [--port PORT] [--id ID] [--name NAME] [--longitude LONGITUDE] [--latitude LATITUDE] [--radius_km RADIUS_KM]
               [--existing-disasters EXISTING_DISASTERS]
```

#### API Specification

##### Subscribe to Hub

**Endpoint:** `/subscribe_to_hub`  
**Method:** `POST`  
**Description:** Subscribes a subhub to the main hub.

**Parameters:**

- `ip` (string): The IP address of the subhub.
- `port` (string): The port number of the subhub.
- `id` (string): The unique identifier of the subhub.
- `name` (string): The name of the subhub.
- `longitude` (string): The longitude of the subhub.
- `latitude` (string): The latitude of the subhub.
- `radius_km` (string): The radius in kilometers that the subhub covers.

**Response:**

- `success` (boolean): Indicates if the subscription was successful.

##### Get Subhubs

**Endpoint:** `/get_subhubs`  
**Method:** `GET`  
**Description:** Retrieves a list of subhubs within a specified radius.

**Parameters:**

- `radius_km` (string): The radius in kilometers to search for subhubs.
- `longitude` (string): The longitude of the center point.
- `latitude` (string): The latitude of the center point.

**Response:**

- `subhubs` (list): A list of subhubs within the specified radius.

### subhub.py

This acts as a subhub, which is a distributed server that can be used to report disasters. It is a Flask API that can be run on a different server than the main hub. A subhub represents a specific geographical region, that makes disaster reporting more efficient in a distributed fashion.

```bash
Run a sub hub instance that users can report to

options:
  -h, --help            show this help message and exit
  --hub-host HUB_HOST   The host of the primary hub
  --hub-port HUB_PORT   The port of the primary hub
  --ip IP               The ip of the sub hub that can be accessible and seen by the primary hub
  --host HOST           The host to run the sub hub Flask API on
  --port PORT           The port to run the sub hub Flask on
  --id ID               The id of the sub hub
  --name NAME           The name of the sub hub
  --longitude LONGITUDE
                        The longitude of the sub hub
  --latitude LATITUDE   The latitude of the sub hub
  --radius_km RADIUS_KM
                        The radius of the sub hub in kilometers
  --existing-disasters EXISTING_DISASTERS
                        The path to a CSV file containing existing disasters
```

#### API Specification

##### Add New Disaster

**Endpoint:** `/add_new_disaster`  
**Method:** `POST`  
**Description:** Adds a new disaster to the subhub.

**Parameters:**

- `disaster_type` (string): The type of the disaster.
- `name` (string): The name of the disaster.
- `description` (string): A description of the disaster.
- `longitude` (float): The longitude coordinate of the disaster's location.
- `latitude` (float): The latitude coordinate of the disaster's location.
- `radius_km` (float): The radius in kilometers affected by the disaster.

**Response:**

- `success` (boolean): Indicates if the disaster was successfully added.

##### Remove Disaster

**Endpoint:** `/remove_disaster`  
**Method:** `POST`  
**Description:** Removes a disaster from the subhub.

**Parameters:**

- `disaster_id` (int): The ID of the disaster to be removed.

**Response:**

- `success` (boolean): Indicates if the disaster was successfully removed.

##### Edit Disaster

**Endpoint:** `/edit_disaster`  
**Method:** `POST`  
**Description:** Edits an existing disaster in the subhub.

**Parameters:**

- `disaster_id` (int): The ID of the disaster to be edited.
- `disaster_type` (string, optional): The new type of the disaster.
- `name` (string, optional): The new name of the disaster.
- `description` (string, optional): The new description of the disaster.
- `longitude` (float, optional): The new longitude of the disaster location.
- `latitude` (float, optional): The new latitude of the disaster location.
- `radius_km` (float, optional): The new radius of the disaster area in kilometers.

**Response:**

- `success` (boolean): Indicates if the disaster was successfully edited.

##### Get Disasters

**Endpoint:** `/disasters`  
**Method:** `GET`  
**Description:** Retrieves a list of all disasters reported to the subhub.

**Response:**

- `disasters` (list): A list of all disasters reported to the subhub.

## Technologies Used

ReactJS, NextJS, TailwindCSS, LeafletJS, Shadcnui, Python, Flask, Request Libraries, HTTPS, HTML, CSS, Flaskcores, Docker, CI/CD Github Actions, Unix Shellscripting, Python PIP

## License

BSD 3-Clause License

## How To Run It

There are two ways you can run our application: 1. Using multiple terminal sesssions, 2. Using tmux and unix shell scripting, or 3. Docker

### 1. Using Multiple Terminal Sessions

1. Open three terminal sessions simulatenously.

2. In the first terminal session, run the following command:

```bash
cd backend
pip3 install -r requirements.txt
```

3. Run the main hub

```bash
python3 hub.py --host 0.0.0.0 --port 3000
```

4. In second terminal session, run one subhub:

```bash
# Example:
python3 subhub.py --hub-host 127.0.0.1 --hub-port 3000 --ip 40.233.92.183 --host 0.0.0.0 --port 3001 --id 2 --name Dundas --longitude 43.26691127633942 --latitude -79.77373983912754 --radius_km 3 --existing-disasters ./Dundas/Dundas.csv
```

3. In the third terminal session, run the front end with the following commands:

```bash
cd frontend
npm i
npm run dev
```

4. Open the front end application in your browser by navigating to `localhost:3000`.

#### 2. Using tmux and unix shell scripting

I created a very simple way to rnu the application if you have bash and tmux in your system.

1. Run the backend

```bash
cd backend
./up.sh
```

2. Run the front end and open on localhost:3000

```bash
cd frontend
npm i
npm run dev
```

#### 3. Using Docker

Docker images are provided in case you want to run the application in a containerized environment. This is especially useful since this is a distributed system.

1. Build the docker image and Run the hub backend

```bash
docker build -t hub .
docker run -p 3000:3000 hub
```

2. Build the docker image and Run the subhub backend

```bash
cd backend
sudo docker build -t subhub0 -f ./docker/hub/Dockerfile .
docker run -p 3001:3001 subhub0
```

3. Run the front end and open on localhost:3000

```bash
cd frontend
npm i
npm run dev
```

4. Open on localhost:3000

## Team Name
The Neighbourhood

## Authors

- [Jeremy Mark Tubongbanua](github.com/JeremyTubongbanua)
- [Jerry Shum](github.com/jerryshun)
- [Nehmat Farooq](github.com/Neh2332)
- [Wesley Kyle De Guzman](github.com/wkdgz)
