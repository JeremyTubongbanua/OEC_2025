#!/bin/bash

# start up tmux sessions with these commands

# python3 hub.py --host 0.0.0.0 --port 3000

# python3 subhub.py --hub-host 127.0.0.1 --hub-port 3000 --ip 40.233.92.183 --host 0.0.0.0 --port 3001 --id 0 --name Hamitlon --longitude 43.26691127633942 --latitude -79.77373983912754 --radius_km 1183.31

# python3 subhub.py --hub-host 127.0.0.1 --hub-port 3000 --ip 40.233.92.183 --host 0.0.0.0 --port 3002 --id 1 --name Burlington --longitude 43.3255 --latitude 79.7990 --radius_km 1183.31

tmux kill-ses -t hub
tmux kill-ses -t subhub0
tmux kill-ses -t subhub1
tmux kill-ses -t subhub2
tmux kill-ses -t subhub3

tmux new-session -d -s hub 'python3 hub.py --host 0.0.0.0 --port 3000'

sleep 1

tmux new-session -d -s subhub0 'python3 subhub.py --hub-host 127.0.0.1 --hub-port 3000 --ip 40.233.92.183 --host 0.0.0.0 --port 3003 --id 2 --name Dundas --longitude 43.26691127633942 --latitude -79.77373983912754 --radius_km 3'

tmux new-session -d -s subhub1 'python3 subhub.py --hub-host 127.0.0.1 --hub-port 3000 --ip 40.233.92.183 --host 0.0.0.0 --port 3004 --id 3 --name Ancaster --longitude 43.251335599504124 --latitude -79.87690025166192 --radius_km 50'

tmux new-session -d -s subhub2 'python3 subhub.py --hub-host 127.0.0.1 --hub-port 3000 --ip 40.233.92.183 --host 0.0.0.0 --port 3005 --id 4 --name Stoney_Creek --longitude 43.15423471652471 --latitude -79.91809897193221 --radius_km 10'

tmux new-session -d -s subhub3 'python3 subhub.py --hub-host 127.0.0.1 --hub-port 3000 --ip 40.233.92.183 --host 0.0.0.0 --port 3006 --id 5 --name Hamilton_Mountain --longitude 43.22583209403948 --latitude -79.88004385453455 --radius_km 5'

tmux new-session -d -s subhub4 'python3 subhub.py --hub-host 127.0.0.1 --hub-port 3000 --ip 40.233.92.183 --host 0.0.0.0 --port 3007 --id 6 --name Flamborough --longitude 43.23032686621058 --latitude -80.08083395630251 --radius_km 40'