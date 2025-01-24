import argparse

parser = argparse.ArgumentParser(prog='Sub Hub', description='Run a sub hub instance that users can report to')
parser.add_argument('--id', type=int, help='The id of the sub hub')
parser.add_argument('--name', type=str, help='The name of the sub hub')
parser.add_argument('--longitude', type=float, help='The longitude of the sub hub')
parser.add_argument('--latitude', type=float, help='The latitude of the sub hub')
parser.add_argument('--radius_km', type=float, help='The radius of the sub hub in kilometers')

def args(args: list = None):
    if args is None:
        return parser.parse_args()
    else:
        return parser.parse_args(args)

def subscribe_to_hub(id: int, name: str, longitude: float, latitude: float, radius_km: float):
    # curl http://40.233.92.183:3000/subscribe_to_hub?id=3&name=Kitchener&longitude=43.4504&latitude=80.4832&radius_km=100
    # make API call
    # parameters are id, name, longitude, latitude, radius_km
    # add the subhub
    

parser = args()