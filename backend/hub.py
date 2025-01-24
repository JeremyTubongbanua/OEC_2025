# python3 hub.py --host 0.0.0.0 --port 3000
from flask import Flask, jsonify, send_file, request
from flask_cors import CORS
from models.subhub_model import SubHub
from csv_utils import write_csv_file, read_csv_file, file_exists
import argparse
import threading

app = Flask(__name__)
CORS(app)

subhub_lock = threading.Lock()
subhubs = []

def euclidian_distance(longitude1, latitude1, longitude2, latitude2):
    return ((float(longitude1) - float(longitude2)) ** 2 + (float(latitude1) - float(latitude2)) ** 2) ** 0.5

# curl http://40.233.92.183:3000/subscribe_to_hub
# POST 
# parameters are id, name, longitude, latitude, radius_km
@app.route('/subscribe_to_hub', methods=['POST'])
def subscribe_to_hub():
    # parameters are id, name, longitude, latitude, radius_km

    ip = request.form.get('ip')
    port = request.form.get('port')
    id = request.form.get('id')
    name = request.form.get('name')
    longitude = request.form.get('longitude')
    latitude = request.form.get('latitude')
    radius_km = request.form.get('radius_km')

    # add the subhub
    print('Appending New Sub Hub: ', ip, port, id, name, longitude, latitude, radius_km)
    subhubs.append(SubHub(ip, port, id, name, longitude, latitude, radius_km))
    print('Appended New Sub Hub: ', ip, port, id, name, longitude, latitude, radius_km)

    return jsonify({'success': True})

# curl -X GET "http://40.233.92.183:3000/get_subhubs?radius_km=100&longitude=43.26691127633942&latitude=-79.77373983912754"
# returns something like [{"id": 1, "name": "Toronto", "longitude": 43.7, "latitude": 79.4, "radius_km": 100}, {"id": 2, "name": "Waterloo", "longitude": 43.5, "latitude": 80.5, "radius_km": 50}]
@app.route('/get_subhubs')
def get_subhubs():
    # parameters are longitude and latitude

    print('Received args:', request.args)

    radius_km = request.args.get('radius_km')
    if radius_km is None:
        return jsonify({'error': 'radius_km parameter is required'}), 400

    longitude = request.args.get('longitude')
    if longitude is None:
        return jsonify({'error': 'longitude parameter is required'}), 400

    latitude = request.args.get('latitude')
    if latitude is None:
        return jsonify({'error': 'latitude parameter is required'}), 400

    print('Received args:', {'radius_km': radius_km, 'longitude': longitude, 'latitude': latitude})

    radius_km = float(radius_km)
    try:
        longitude = float(longitude)
        latitude = float(latitude)
    except ValueError:
        return jsonify({'error': 'longitude and latitude must be valid numbers'}), 400

    closest_subhubs = []

    with subhub_lock:
        for subhub in subhubs:
            if euclidian_distance(subhub.longitude, subhub.latitude, longitude, latitude) <= radius_km:
                closest_subhubs.append(subhub)

        return jsonify([subhub.to_dict() for subhub in closest_subhubs])
    return jsonify([])

@app.route('/autocomplete_disaster')
def autocomplete_disaster():
    # given parameter name of disaster like "COVID-19" give list of recommendations like ["COVID-19 Variant A", "COVID-19 Variant B", "COVID-19 Variant C"]
    disaster_name = request.args.get('name')
    recommendations = []

    # todo logic

    return jsonify(recommendations)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(prog='Hub', description='Run a hub instance that users can report to')
    parser.add_argument('--host', type=str, default='0.0.0.0', help='The host to run the hub on')
    parser.add_argument('--port', type=int, default=3000, help='The port to run the hub on')

    args = parser.parse_args()

    app.run(host=args.host, port=args.port, debug=True)
