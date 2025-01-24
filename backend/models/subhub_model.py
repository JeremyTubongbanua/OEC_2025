class SubHub:
    def __init__(self, ip, port, id, name, longitude, latitude, radius_km):
        self.ip = ip
        self.port = port
        self.id = id
        self.name = name
        self.longitude = longitude
        self.latitude = latitude
        self.radius_km = radius_km

    def to_dict(self):
        return {
            'ip': self.ip,
            'port': self.port,
            'id': self.id,
            'name': self.name,
            'longitude': self.longitude,
            'latitude': self.latitude,
            'radius_km': self.radius_km
        }
