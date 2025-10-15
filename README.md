# A Project MERN Stack With Docker🐳
<img width="1920" height="948" alt="image" src="https://github.com/user-attachments/assets/69caca81-ca59-4f0a-9e51-76ef73028a15" />


<img width="1920" height="1010" alt="image" src="https://github.com/user-attachments/assets/fd114de8-4278-4575-9a30-7a43767b4654" />
<img width="1920" height="953" alt="image" src="https://github.com/user-attachments/assets/b749cde2-a39c-427e-812a-8b33fff27688" />




### Create a network for the docker containers

`docker network create demo`

### Build the client 

```sh
cd mern/frontend
docker build -t mern-frontend .
```

### Run the client

`docker run --name=frontend --network=demo -d -p 5173:5173 mern-frontend`

### Verify the client is running

Open your browser and type `http://localhost:5173`

### Run the mongodb container

`docker run --network=demo --name mongodb -d -p 27017:27017 -v ~/opt/data:/data/db mongo:latest`

### Build the server

```sh
cd mern/backend
docker build -t mern-backend .
```

### Run the server

`docker run --name=backend --network=demo -d -p 5050:5050 mern-backend`

## Using Docker Compose

`docker compose up -d`


<img width="962" height="89" alt="image" src="https://github.com/user-attachments/assets/9052de75-6c1d-421f-b80d-568dff92ffd4" />






