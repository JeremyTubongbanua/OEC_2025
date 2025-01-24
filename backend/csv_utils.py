import csv
from typing import List
import os

def write_csv_file(file_path: str, data: List[List[str]]) -> None:
    """
    Args:
        file_path (str): The path to the CSV file to be written.
        data (List[List[str]]): The data to be written to the CSV file.
    Write the data to a CSV file. If the file or directory does not exist, create them.

    Examples:
        >>> write_csv_file('/path/to/file.csv', [['Name', 'Age', 'City'], ['Alice', '30', 'New York'], ['Bob', '25', 'Los Angeles']])

    """
    directory = os.path.dirname(file_path)
    if directory and not os.path.exists(directory):
        os.makedirs(directory)
    
    with open(file_path, mode='w') as file:
        csv_writer = csv.writer(file)
        for row in data:
            csv_writer.writerow(row)

def read_csv_file(file_path: str) -> List[List[str]]:
    """
    Args:
        file_path (str): The path to the CSV file to be read.
    Returns:
        List[List[str]]: A list of lists where each inner list represents a row in the CSV file.
    Read a CSV file and return the data as a list of lists.

    Examples:
        >>> read_csv_file('/path/to/file.csv')
        [['Name', 'Age', 'City'], ['Alice', '30', 'New York'], ['Bob', '25', 'Los Angeles']]

    """
    data = []
    with open(file_path, mode='r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            data.append(row)
    return data

def file_exists(file_path: str) -> bool:
    """
    Args:
        file_path (str): The path to the file to check.
    Returns:
        bool: True if the file exists, False otherwise.
    Check if a file exists at the specified path.

    Examples:
        >>> file_exists('/path/to/file.csv')
        True
        >>> file_exists('/path/to/missing_file.csv')
        False

    """
    try:
        with open(file_path, 'r'):
            return True
    except FileNotFoundError:
        return False