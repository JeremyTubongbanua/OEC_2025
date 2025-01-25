import unittest

def is_point_in_circle(longitude1, latitude1, longitude2, latitude2, radius_km):
    """
    Determines if point2 falls within circle centered at point1
    """
    # Convert degree differences to kilometers
    km_per_degree = 1.0
    distance = (((float(longitude1) - float(longitude2)) * km_per_degree) ** 2 + 
               ((float(latitude1) - float(latitude2)) * km_per_degree) ** 2) ** 0.5
    return distance <= float(radius_km)

class TestPointInCircle(unittest.TestCase):
    def test_point_in_circle(self):
        self.assertTrue(is_point_in_circle(43.7, 79.4, 43.8, 79.5, 1.0))
        self.assertTrue(is_point_in_circle(0.0, 0.0, 1.0, 0.0, 1.0))
        self.assertFalse(is_point_in_circle(0.0, 0.0, 2.0, 2.0, 1.0))
        self.assertTrue(is_point_in_circle(1.0, 1.0, 1.0, 1.0, 5.0))

if __name__ == "__main__":
    unittest.main()