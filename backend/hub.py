from flask import Flask, jsonify, send_file, request
from flask_cors import CORS
from subhub import subhubs
from models.subhub_model import SubHub

subhubs = []

def euclidian_distance(longitude1, latitude1, longitude2, latitude2):
    return ((longitude1 - longitude2) ** 2 + (latitude1 - latitude2) ** 2) ** 0.5

# curl http://40.233.92.183:3000/subscribe_to_hub
@app.route
def subscribe_to_hub():
    # parameters are id, name, longitude, latitude, radius_km

    id = request.args.get('id')
    name = request.args.get('name')
    longitude = request.args.get('longitude')
    latitude = request.args.get('latitude')
    radius_km = request.args.get('radius_km')

    # add the subhub
    subhubs.append(SubHub(id, name, longitude, latitude, radius_km))

    return jsonify({'success': True})

# curl http://40.233.92.183:3000/get_subhubs?radius_km=100&longitude=43.7&latitude=79.4
# returns something like [{"id": 1, "name": "Toronto", "longitude": 43.7, "latitude": 79.4, "radius_km": 100}, {"id": 2, "name": "Waterloo", "longitude": 43.5, "latitude": 80.5, "radius_km": 50}]
@app.route
def get_subhubs():
    # parameters are longitude and latitude

    radius_km = request.args.get('radius_km')

    longitude = request.args.get('longitude')
    latitude = request.args.get('latitude')

    closest_subhubs = []

    for subhub in subhubs:
        if euclidian_distance(subhub.longitude, subhub.latitude, longitude, latitude) <= radius_km:
            closest_subhubs.append(subhub)

    return jsonify(closest_subhubs)
