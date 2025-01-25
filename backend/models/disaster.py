valid_disaster_types = ['natural', 'biological', 'manmade']

class DisasterFactory():
    def create_disaster(self, disaster_id, disaster_type, name, description, longitude, latitude, radius_km):
        if disaster_type == 'natural':
            return DisasterNatural(disaster_id, disaster_type, name, description, longitude, latitude, radius_km)
        elif disaster_type == 'biological':
            return DisasterBiological(disaster_id, disaster_type, name, description, longitude, latitude, radius_km)
        elif disaster_type == 'manmade':
            return DisasterManMade(disaster_id, disaster_type, name, description, longitude, latitude, radius_km)
        else:
            raise ValueError(f"Invalid disaster type: {disaster_type}. Valid types are: {valid_disaster_types}")

class Disaster():
    def __init__(self, disaster_id, disaster_type, name, description, longitude, latitude, radius_km):
        self.disaster_id = disaster_id
        self.disaster_type = disaster_type
        self.name = name
        self.description = description
        self.longitude = longitude
        self.latitude = latitude
        self.radius_km = radius_km

    def to_dict(self):
        return {
            'disaster_id': self.disaster_id,
            'disaster_type': self.disaster_type,
            'name': self.name,
            'description': self.description,
            'longitude': self.longitude,
            'latitude': self.latitude,
            'radius_km': self.radius_km
        }

class DisasterNatural(Disaster):
    def __init__(self, disaster_id, disaster_type, name, description, longitude, latitude, radius_km):
        super().__init__(disaster_id, disaster_type, name, description, longitude, latitude, radius_km)
        self.severity = None
        self.affected_species = None

    def set_severity(self, severity):
        self.severity = severity

    def set_affected_species(self, affected_species):
        self.affected_species = affected_species

        

class DisasterBiological(Disaster):
    def __init__(self, disaster_id, disaster_type, name, description, longitude, latitude, radius_km):
        super().__init__(disaster_id, disaster_type, name, description, longitude, latitude, radius_km)
        self.pathogen = None
        self.transmission_rate = None

    def set_pathogen(self, pathogen):
        self.pathogen = pathogen

    def set_transmission_rate(self, transmission_rate):
        self.transmission_rate = transmission_rate



class DisasterManMade(Disaster):
    def __init__(self, disaster_id, disaster_type, name, description, longitude, latitude, radius_km):
        super().__init__(disaster_id, disaster_type, name, description, longitude, latitude, radius_km)
        self.cause = None
        self.economic_impact = None

    def set_cause(self, cause):
        self.cause = cause

    def set_economic_impact(self, economic_impact):
        self.economic_impact = economic_impact

