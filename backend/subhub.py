# python3 subhub.py --hub-host 127.0.0.1 --hub-port 3000 --ip 40.233.92.183 --host 0.0.0.0 --port 3001 --id 0 --name Hamitlon --longitude 43.26691127633942 --latitude -79.77373983912754 --radius_km 1183.31

# python3 subhub.py --hub-host 127.0.0.1 --hub-port 3000 --ip 40.233.92.183 --host 0.0.0.0 --port 3002 --id 1 --name Burlington --longitude 43.3255 --latitude 79.7990 --radius_km 1183.31
import argparse
import requests
from flask import Flask, jsonify, send_file, request
from flask_cors import CORS
import sys
from models.disaster import DisasterFactory, DisasterNatural, DisasterBiological, DisasterManMade, valid_disaster_types
from csv_utils import write_csv_file, read_csv_file, file_exists

import threading
import uuid

disasters_lock = threading.Lock()
disasters = []

app = Flask(__name__)
CORS(app)

# curl -X POST http://40.233.92.183:3001/add_new_disaster \
# -H "Content-Type: application/json" \
# -d '{
#   "disaster_type": "natural",
#   "name": "Earthquake",
#   "description": "Major earthquake",
#   "longitude": -118.2437,
#   "latitude": 34.0522,
#   "radius_km": 50
# }'
@app.route('/add_new_disaster', methods=['POST'])
def add_new_disaster():
    """
    Endpoint to add a new disaster.

    Route: /add_new_disaster
    Method: POST

    Request JSON Parameters:
    - disaster_type (str): The type of the disaster.
    - name (str): The name of the disaster.
    - description (str): A description of the disaster.
    - longitude (float): The longitude coordinate of the disaster's location.
    - latitude (float): The latitude coordinate of the disaster's location.
    - radius_km (float): The radius in kilometers affected by the disaster.

    Responses:
    - 200: Success. Returns a JSON object with {'success': True}.
    - 400: Bad Request. Returns a JSON object with an error message if any required field is missing, if longitude, latitude, or radius_km are not valid numbers, or if the disaster type is invalid.

    Example Response:
    {
        "success": True
    }

    Example Error Response:
    {
        "error": "All fields are required. Missing fields: name, description"
    }
    """
    disaster_id = str(uuid.uuid4())
    disaster_type = request.json.get('disaster_type')
    name = request.json.get('name')
    description = request.json.get('description')
    longitude = request.json.get('longitude')
    latitude = request.json.get('latitude')
    radius_km = request.json.get('radius_km')

    print('Received disaster:', disaster_type, name, description, longitude, latitude, radius_km)

    if not disaster_type or not name or not description or not longitude or not latitude or not radius_km:
        missing_fields = [field for field in ['disaster_type', 'name', 'description', 'longitude', 'latitude', 'radius_km'] if not locals()[field]]
        return jsonify({'error': f"All fields are required. Missing fields: {', '.join(missing_fields)}"}), 400

    try:
        longitude = float(longitude)
        latitude = float(latitude)
        radius_km = float(radius_km)
    except ValueError:
        return jsonify({'error': 'Longitude, latitude, and radius_km must be valid numbers'}), 400

    if disaster_type not in valid_disaster_types:
        return jsonify({'error': f"Invalid disaster type: {disaster_type}. Valid types are: {valid_disaster_types}"}), 400
    disaster = DisasterFactory().create_disaster(
        disaster_id=disaster_id,
        disaster_type=disaster_type,
        name=name,
        description=description,
        longitude=longitude,
        latitude=latitude,
        radius_km=radius_km
    )
    with disasters_lock:
        disasters.append(disaster)
    sync_disasters(args.name)  # Sync disasters after adding a new one
    return jsonify({'success': True}), 200

# curl -X POST http://40.233.92.183:3001/remove_disaster -H "Content-Type: application/json" -d '{"disaster_id": "1"}'
# curl -X POST http://40.233.92.183:3001/remove_disaster \
# -H "Content-Type: application/json" \
# -d '{
#     "disaster_id": 0
#     }'

@app.route('/remove_disaster', methods=['POST'])
def remove_disaster():
    """
    Endpoint to remove a disaster from the list of disasters.

    This endpoint expects a JSON payload with a 'disaster_id' key.
    It iterates through the list of disasters and removes the disaster
    with the matching 'disaster_id'. After removal, it synchronizes the
    disasters list.

    Returns:
        Response: A JSON response indicating success or failure.
        - On success: {'success': True}, HTTP status code 200.
        - On failure: {'error': "Disaster with id {disaster_id} not found"}, HTTP status code 404.
    """

    print(request.json)
    disaster_id = request.json.get('disaster_id')

    for disaster in disasters:
        print(disaster.to_dict())
        if str(disaster.disaster_id) == str(disaster_id):
            with disasters_lock:
                disasters.remove(disaster)
            sync_disasters(args.name)  # Sync disasters after removing one
            return jsonify({'success': True}), 200
    return jsonify({'error': f"Disaster with id {disaster_id} not found"}), 404

# Curl Example:
# curl -X POST http://40.233.92.183:3001/edit_disater -H "Content-Type: application/json" -d '{"disaster_id": "1", "disaster_type": "natural", "name": "Earthquake", "description": "Major earthquake", "longitude": -118.2437, "latitude": 34.0522, "radius_km": 50}'
@app.route('/edit_disaster', methods=['POST'])
def edit_disaster():
    """
    Endpoint to edit an existing disaster.

    This endpoint allows the user to edit the details of an existing disaster by providing the disaster ID and the new details.

    Request JSON Parameters:
    - disaster_id (int): The ID of the disaster to be edited. (required)
    - disaster_type (str): The new type of the disaster. (optional)
    - name (str): The new name of the disaster. (optional)
    - description (str): The new description of the disaster. (optional)
    - longitude (float): The new longitude of the disaster location. (optional)
    - latitude (float): The new latitude of the disaster location. (optional)
    - radius_km (float): The new radius of the disaster area in kilometers. (optional)

    Returns:
    - JSON response indicating success or failure.
        - On success: {'success': True}, HTTP status code 200.
        - On failure: {'error': 'Disaster id is required'}, HTTP status code 400.
        - On failure: {'error': f"Disaster with id {disaster_id} not found"}, HTTP status code 404.
    """
    disaster_id = request.json.get('disaster_id')
    disaster_type = request.json.get('disaster_type')
    name = request.json.get('name')
    description = request.json.get('description')
    longitude = request.json.get('longitude')
    latitude = request.json.get('latitude')
    radius_km = request.json.get('radius_km')

    print('Received edit request:', disaster_id, disaster_type, name, description, longitude, latitude, radius_km)

    if not disaster_id:
        return jsonify({'error': 'Disaster id is required'}), 400

    for disaster in disasters:
        if str(disaster.disaster_id) == str(disaster_id):
            with disasters_lock:
                if disaster_type:
                    disaster.disaster_type = disaster_type
                if name:
                    disaster.name = name
                if description:
                    disaster.description = description
                if longitude:
                    disaster.longitude = longitude
                if latitude:
                    disaster.latitude = latitude
                if radius_km:
                    disaster.radius_km = radius_km
            sync_disasters(args.name)
            return jsonify({'success': True}), 200
    return jsonify({'error': f"Disaster with id {disaster_id} not found"}), 404

# curl -X GET "http://40.233.92.183:3001/disasters"
@app.route('/disasters')
def get_disasters():
    """
    Handle GET requests to the /disasters endpoint.

    This function retrieves a list of disasters from the sub hub and returns it
    as a JSON response. The access to the disasters list is synchronized using
    a lock to ensure thread safety.

    Returns:
        Response: A JSON response containing a list of disasters with a status
        code of 200. If the disasters list is empty, an empty list is returned.
    """
    with disasters_lock:
        return jsonify({'disasters': [disaster.to_dict() for disaster in disasters]}), 200
    # get a list of disasters from this sub hub
    return jsonify({'disasters': []}), 200

def sync_disasters(name):
    """
    Synchronizes the current list of disasters by converting them to a dictionary format,
    printing them, and then writing them to a CSV file.
    Args:
        name (str): The name of the directory and file (without extension) where the CSV file will be saved.
    Returns:
        None
    Raises:
        Any exceptions raised by the `write_csv_file` function or file I/O operations.
    Example:
        sync_disasters('disaster_data')
        This will create a CSV file at './disaster_data/disaster_data.csv' containing the disaster information.
    """
    disasters_iterable = []
    with disasters_lock:
        for disaster in disasters:
            disasters_iterable.append(disaster.to_dict())

    print('Syncing disasters:', disasters_iterable)

    # convert to array
    disasters_iterable_array = []
    for disaster in disasters_iterable:
        disasters_iterable_array.append(list(disaster.values()))
    
    write_csv_file(f'./{name}/{name}.csv', disasters_iterable_array)

# this function subscribes this subhub to a primary hub
def subscribe_to_hub(hub_host: str, hub_port: int, ip: str, port: int, id: int, name: str, longitude: float, latitude: float, radius_km: float):
    """
    Subscribes to a hub by sending a POST request with the provided parameters.

    Args:
        hub_host (str): The host address of the hub.
        hub_port (int): The port number of the hub.
        ip (str): The IP address of the subhub.
        port (int): The port number of the subhub.
        id (int): The unique identifier for the subhub.
        name (str): The name of the subhub.
        longitude (float): The longitude coordinate of the subhub.
        latitude (float): The latitude coordinate of the subhub.
        radius_km (float): The radius in kilometers around the subhub.

    Returns:
        bool: True if the subscription was successful, False otherwise.
    """
    # curl http://40.233.92.183:3000/subscribe_to_hub?id=3&name=Kitchener&longitude=43.4504&latitude=80.4832&radius_km=100
    # make API call
    # parameters are id, name, longitude, latitude, radius_km
    # add the subhub
    # curl http://40.233.92.183:3000/subscribe_to_hub
    # POST 
    # parameters are id, name, longitude, latitude, radius_km
    url = f"http://{hub_host}:{hub_port}/subscribe_to_hub"
    payload = {
        'ip': ip,
        'port': port,
        'id': id,
        'name': name,
        'longitude': longitude,
        'latitude': latitude,
        'radius_km': radius_km
    }
    print('Sending payload to hub: ', payload, 'at url: ', url)
    response = requests.post(url, data=payload)
    if response.status_code == 200:
        print("Successfully subscribed to hub")
        return True
    else:
        print(f"Failed to subscribe to hub: {response.status_code}, {response.text}")
        return False

if __name__ == '__main__':
    parser = argparse.ArgumentParser(prog='Sub Hub', description='Run a sub hub instance that users can report to')
    parser.add_argument('--hub-host', type=str, default='127.0.0.1', help='The host of the primary hub')
    parser.add_argument('--hub-port', type=int, default=3000, help='The port of the primary hub')
    parser.add_argument('--ip', type=str, help='The ip of the sub hub that can be accessible and seen by the primary hub')
    parser.add_argument('--host', type=str, default='0.0.0.0', help='The host to run the sub hub on')
    parser.add_argument('--port', type=int, help='The port to run the sub hub on')
    parser.add_argument('--id', type=int, help='The id of the sub hub')
    parser.add_argument('--name', type=str, help='The name of the sub hub')
    parser.add_argument('--longitude', type=float, help='The longitude of the sub hub')
    parser.add_argument('--latitude', type=float, help='The latitude of the sub hub')
    parser.add_argument('--radius_km', type=float, help='The radius of the sub hub in kilometers')
    parser.add_argument('--existing-disasters', type=str, help='The path to a CSV file containing existing disasters')

    args = parser.parse_args()
    success = subscribe_to_hub(
        hub_host=args.hub_host,
        hub_port=args.hub_port,
        ip=args.ip,
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

    if args.existing_disasters:
        if file_exists(args.existing_disasters):
            disasters_from_file = read_csv_file(args.existing_disasters)

            for disaster in disasters_from_file:
                disaster_id, disaster_type, name, description, longitude, latitude, radius_km, *_ = disaster
                disaster = DisasterFactory().create_disaster(
                    disaster_id=disaster_id,
                    disaster_type=disaster_type,
                    name=name,
                    description=description,
                    longitude=longitude,
                    latitude=latitude,
                    radius_km=radius_km
                )
                with disasters_lock:
                    disasters.append(disaster)

            print('Loaded existing disasters:', disasters)
        else:
            print(f"File {args.existing_disasters} does not exist")

    app.run(host=parser.parse_args().host, port=parser.parse_args().port)

    

    

