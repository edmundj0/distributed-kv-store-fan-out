## Introduction
This project is a distributed system that consists of 10 nodes, where users can POST data to the system. The data is sharded out to the 10 nodes based on MD5 hash values. Each node is responsible for storing a portion of the data.

## Getting Started

1. Clone the repository
```
git clone https://github.com/edmundj0/distributed-kv-store-fan-out.git && cd express-sharding
```

2. Start the application
```
docker compose up
```

## Usage

### POST Data
You can POST data to the system using the /add endpoint. Here's an example of how to POST data using curl:
```
curl -X POST -H "Content-Type: application/json" -d '{"key": "example_key", "value": "example_value"}' http://localhost:5002/add

```

The system will hash the key using MD5 and determine which node should store the data based on the hash value. The data will then be forwarded to the appropriate node.

### GET Data

You can retrieve the stored data by making a GET request to the root endpoint /. This will return a JSON object containing all the data stored in the node.
```
curl http://localhost:5002/
```
The nodes are running between ports 5002-5011

## Environment Variables

The project uses environment variables to configure the ports for each node. You can modify the docker-compose.yml file to change the ports and the number of nodes if needed.
