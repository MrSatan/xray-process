# IoT X-Ray Data Management System

## Description

This project is a complete IoT data management system built with NestJS. It simulates IoT devices sending X-Ray data, processes this data, stores it in a database, and provides a RESTful API for data retrieval. The entire system is containerized using Docker for easy setup and deployment.

The system consists of two main applications:
- **X-Ray Producer**: A NestJS application that simulates IoT devices by sending sample X-Ray data to a RabbitMQ queue.
- **X-Ray Processor**: A NestJS application that consumes the data from RabbitMQ, processes it, calculates metadata like data length and volume, and stores the final document in a MongoDB database. It also exposes API endpoints to interact with the stored data.

## System Architecture

The project follows a microservices architecture pattern:

1.  **`xray-producer`**: Sends JSON payloads to RabbitMQ.
2.  **`RabbitMQ`**: Acts as a message broker, decoupling the producer from the processor.
3.  **`xray-process`**: Receives messages from RabbitMQ, processes them, and saves them to the database.
4.  **`MongoDB`**: The database used for storing the processed X-Ray signal data.

## Technologies

- **Backend**: NestJS
- **Messaging**: RabbitMQ
- **Database**: MongoDB
- **Containerization**: Docker & Docker Compose

## Getting Started

Follow these instructions to get the entire system up and running on your local machine.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Running the Application

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone https://github.com/MrSatan/xray-process.git
    cd xray-process

2.  **Start the services using Docker Compose**:
    Open a terminal in the project's root directory (where the `docker-compose.yml` file is located) and run the following command:
    ```bash
    docker-compose up --build
    ```
    This command will build the Docker images for the `xray-producer` and `xray-process` applications and start all the required services.

## Services

The `docker-compose.yml` file will launch the following services:

| Service         | Description                                       | Exposed Port(s)        |
| --------------- | ------------------------------------------------- | ---------------------- |
| `xray-producer` | Simulates IoT devices sending data.               | `3000`                 |
| `xray-process`  | Processes and stores data, exposes the API.       | `3001`                 |
| `rabbitmq`      | The message broker.                               | `5672`, `15672` (UI)   |
| `mongodb`       | The database for storing signal data.             | `27017`                |

- **RabbitMQ Management UI**: You can monitor the queues and messages by navigating to [http://localhost:15672](http://localhost:15672) in your web browser. The default credentials are `guest` / `guest`.
- **API Access**: The API endpoints for the `xray-process` service are available at `http://localhost:3001`.
