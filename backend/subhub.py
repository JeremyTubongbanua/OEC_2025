# python3 subhub.py --hub-host 127.0.0.1 --hub-port 3000 --host 0.0.0.0 --port 3001 --id 0 --name Hamitlon --longitude 43.26691127633942 --latitude -79.77373983912754 --radius_km 1183.31
import argparse
import requests
from flask import Flask, jsonify, send_file, request
from flask_cors import CORS
import sys

app = Flask(__name__)
CORS(app)

# this function subscribes this subhub to a primary hub
def subscribe_to_hub(hub_host: str, hub_port: int, host: str, port: int, id: int, name: str, longitude: float, latitude: float, radius_km: float):
    # curl http://40.233.92.183:3000/subscribe_to_hub?id=3&name=Kitchener&longitude=43.4504&latitude=80.4832&radius_km=100
    # make API call
    # parameters are id, name, longitude, latitude, radius_km
    # add the subhub
    # curl http://40.233.92.183:3000/subscribe_to_hub
    # POST 
    # parameters are id, name, longitude, latitude, radius_km
    url = f"http://{hub_host}:{hub_port}/subscribe_to_hub"
    payload = {
        'host': host,
        'port': port,
        'id': id,
        'name': name,
        'longitude': longitude,
        'latitude': latitude,
        'radius_km': radius_km
    }
    response = requests.post(url, data=payload)
    if response.status_code == 200:
        print("Successfully subscribed to hub")
        return True
    else:
        print(f"Failed to subscribe to hub: {response.status_code}, {response.text}")
        return False
    
@app.route('/report')
def report():
    # parameters are disaster_type, name, longitude, latitude
    pass

if __name__ == '__main__':
    parser = argparse.ArgumentParser(prog='Sub Hub', description='Run a sub hub instance that users can report to')
    parser.add_argument('--hub-host', type=str, default='127.0.0.1', help='The host of the primary hub')
    parser.add_argument('--hub-port', type=int, default=3000, help='The port of the primary hub')
    parser.add_argument('--host', type=str, default='0.0.0.0', help='The host to run the sub hub on')
    parser.add_argument('--port', type=int, help='The port to run the sub hub on')
    parser.add_argument('--id', type=int, help='The id of the sub hub')
    parser.add_argument('--name', type=str, help='The name of the sub hub')
    parser.add_argument('--longitude', type=float, help='The longitude of the sub hub')
    parser.add_argument('--latitude', type=float, help='The latitude of the sub hub')
    parser.add_argument('--radius_km', type=float, help='The radius of the sub hub in kilometers')

    args = parser.parse_args()
    success = subscribe_to_hub(
        hub_host=args.hub_host,
        hub_port=args.hub_port,
        host=args.host,
        port=args.port,
        id=args.id,
        name=args.name,
        longitude=args.longitude,
        latitude=args.latitude,
        radius_km=args.radius_km)

    if success:
        print("Sub Hub started successfully")
    else:
        print("Sub Hub failed to start")
        sys.exit(1)

    app.run(host=parser.parse_args().host, port=parser.parse_args().port)

    

    

