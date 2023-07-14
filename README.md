# Todo-app
### Live app: https://todo-frontend-flame-beta.vercel.app/
Todo backend is deployed on **Render**. **Render** automatically stops the server after a few minutes of inactivity. So, it will take upto 2 minutes for the server to get up and running. 

## Backend Setup Instructions
- cd into todo-backend
- Run ```npm install```
- Create .env file in the root directory
- Add following environment variables to .env file:
    - DB_CONNECTION_STRING
    - PORT
    - SECRET_KEY
- Run node app.js to start the server


## Frontend Setup Instructions
- cd into todo-frontend
- Run ```npm install```
- Go to src/app/apis/configs/axiosConfig.js and replace baseURL to your http:\\{YOUR_IP_ADDRESS}:{PORT}
- Run ```npm run dev``` to start the frontend
