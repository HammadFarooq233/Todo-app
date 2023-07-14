# Todo-app
### Live app: https://todo-frontend-flame-beta.vercel.app/
Todo backend is deployed on **Render**. **Render** automatically stops the server after a few minutes of inactivity. So, it will take up to 2 minutes for the server to get up and running. 

## Backend Setup Instructions
- cd into todo-backend
- Run ```npm install```
- Create a .env file in the root directory
- Add the following environment variables to the .env file:
    - DB_CONNECTION_STRING
    - PORT
    - SECRET_KEY
- Run node app.js to start the server


## Frontend Setup Instructions
- cd into todo-frontend
- Run ```npm install```
- Go to src/app/apis/configs/axiosConfig.js and replace baseURL to your **http:\\__YOUR_IP_ADDRESS__:__PORT__**
- Run ```npm run dev``` to start the frontend
