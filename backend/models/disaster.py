class DisasterFactory():
    def create_disaster(self, disaster_type, name, description, longitude, latitude, radius_km):
        if disaster_type == 'natural':
            return DisasterNatural(name, description, longitude, latitude, radius_km)
        elif disaster_type == 'biological':
            return DisasterBiological(name, description, longitude, latitude, radius_km)
        elif disaster_type == 'manmade':
            return DisasterManMade(name, description, longitude, latitude, radius_km)

class Disaster():
    def __init__(self, name, description, longitude, latitude, radius_km):
        self.name = name
        self.description = description
        self.longitude = longitude
        self.latitude = latitude
        self.radius_km = radius_km

class DisasterNatural(Disaster):
    def __init__(self, name, description, longitude, latitude, radius_km):
        super().__init__(name, description, longitude, latitude, radius_km)
        

class DisasterBiological(Disaster):
    def __init__(self, name, description, longitude, latitude, radius_km):
        super().__init__(name, description, longitude, latitude, radius_km)

class DisasterManMade(Disaster):
    def __init__(self, name, description, longitude, latitude, radius_km):
        super().__init__(name, description, longitude, latitude, radius_km)