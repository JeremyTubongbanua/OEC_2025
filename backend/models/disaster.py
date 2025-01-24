valid_disaster_types = ['natural', 'biological', 'manmade']

class DisasterFactory():
    def create_disaster(self, disaster_type, name, description, longitude, latitude, radius_km):
        if disaster_type == 'natural':
            return DisasterNatural(name, description, longitude, latitude, radius_km)
        elif disaster_type == 'biological':
            return DisasterBiological(name, description, longitude, latitude, radius_km)
        elif disaster_type == 'manmade':
            return DisasterManMade(name, description, longitude, latitude, radius_km)
        else:
            raise ValueError(f"Invalid disaster type: {disaster_type}. Valid types are: {valid_disaster_types}")

class Disaster():
    def __init__(self, disaster_type, name, description, longitude, latitude, radius_km):
        self.disaster_type = disaster_type
        self.name = name
        self.description = description
        self.longitude = longitude
        self.latitude = latitude
        self.radius_km = radius_km

    def to_dict(self):
        return {
            'disaster_type': self.disaster_type,
            'name': self.name,
            'description': self.description,
            'longitude': self.longitude,
            'latitude': self.latitude,
            'radius_km': self.radius_km
        }

class DisasterNatural(Disaster):
    def __init__(self, disaster_type, name, description, longitude, latitude, radius_km):
        super().__init__(disaster_type, name, description, longitude, latitude, radius_km)
        

class DisasterBiological(Disaster):
    def __init__(self, disaster_type, name, description, longitude, latitude, radius_km):
        super().__init__(disaster_type, name, description, longitude, latitude, radius_km)

class DisasterManMade(Disaster):
    def __init__(self, disaster_type, name, description, longitude, latitude, radius_km):
        super().__init__(disaster_type, name, description, longitude, latitude, radius_km)