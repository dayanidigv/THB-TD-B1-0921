import requests

url = "http://localhost:3002"

response = requests.get(url)

print(response.status_code)
# print(response.json())  # if JSON
