import pytest

def is_point_in_circle(longitude1, latitude1, longitude2, latitude2, radius_km):
    """
    Determines if point2 falls within circle centered at point1
    """
    # Convert degree differences to kilometers
    km_per_degree = 1.0
    distance = (((float(longitude1) - float(longitude2)) * km_per_degree) ** 2 + 
               ((float(latitude1) - float(latitude2)) * km_per_degree) ** 2) ** 0.5
    return distance <= float(radius_km)

def test_point_in_circle():
    assert is_point_in_circle(43.7, 79.4, 43.8, 79.5, 1.0)
    assert is_point_in_circle(0.0, 0.0, 1.0, 0.0, 1.0)
    assert not is_point_in_circle(0.0, 0.0, 2.0, 2.0, 1.0)
    assert is_point_in_circle(1.0, 1.0, 1.0, 1.0, 5.0)
    assert is_point_in_circle(-79.94945268184878, 43.239248083052125, -79.94945268184878, 43.239248083052125, 10.0)
    assert is_point_in_circle(-79.99875589462081, 43.22948633901232, -79.99875589462081, 43.22948633901232, 15.0)
    assert is_point_in_circle(-79.99261723030054, 43.21229344274172, -79.99261723030054, 43.21229344274172, 0.0)
    assert is_point_in_circle(-79.94510767281719, 43.218049051227375, -79.94510767281719, 43.218049051227375, 8.0)

