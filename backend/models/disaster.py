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