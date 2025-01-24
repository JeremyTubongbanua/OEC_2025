class DisasterFactory():
    def create_disaster(self, disaster_type, name, longitude, latitude, radius_km):
        if disaster_type == 'natural':
            return DisasterNatural(name, longitude, latitude, radius_km)
        elif disaster_type == 'biological':
            return DisasterBiological(name, longitude, latitude, radius_km)
        elif disaster_type == 'manmade':
            return DisasterManMade(name, longitude, latitude, radius_km)

class Disaster():
    def __init__(self, name, longitude, latitude, radius_km):
        self.name = name
        self.longitude = longitude
        self.latitude = latitude
        self.radius_km = radius_km

class DisasterNatural(Disaster):
    def __init__(self, name, longitude, latitude, radius_km):
        super().__init__(name, longitude, latitude, radius_km)
        

class DisasterBiological(Disaster):
    def __init__(self, name, longitude, latitude, radius_km):
        super().__init__(name, longitude, latitude, radius_km)

class DisasterManMade(Disaster):
    def __init__(self, name, longitude, latitude, radius_km):
        super().__init__(name, longitude, latitude, radius_km)