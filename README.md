# NUTRICHECK

A Nutrition Assistant to control diet, manage food habits, and keep good health.

## Screenshots
![0001](https://github.com/partheev/nutrition-assistant-webapp/assets/30794881/bc87d92b-abaa-41ef-9fc9-a6cc073a3b9b)

![0002](https://github.com/partheev/nutrition-assistant-webapp/assets/30794881/57b40bb2-4886-4d0b-ba3a-79c3c0d8b6a9)

> Use a mobile device to access the website for a better experience.

## Docker images:

Backend: https://hub.docker.com/r/partheev8/nutri-backend/tags

Frontend: https://hub.docker.com/r/partheev8/nutri-frontend

AI service backend: https://hub.docker.com/r/partheev8/nutri-ai/tags


## Redhat Openshift cluster
![System Architecture](https://github.com/partheev/nutrition-assistant-webapp/assets/30794881/eaa38c29-10b4-47c1-9299-3022878686ea)

## Block Diagram
![Block Diagram](https://github.com/partheev/nutrition-assistant-webapp/assets/30794881/02a4eb58-1668-4f0e-9db8-468a878c2d6c)

## Flowchart
![Flowchart](https://github.com/partheev/nutrition-assistant-webapp/assets/30794881/f16667ae-215c-49ca-b224-d9587ba279cb)




## Project Folder structure

```
├── frontend (React Application)
│
├── backend (Flask application)
│
├── ai-food-detection (Flask application with integration of 3rd party services)
|
├── badges (Team member's badge images)
│
├── project report
│   ├── project report.pdf (Project report document)
│   ├── Flowchart.png
│   ├── System Architecture.png
│   └── Block Diagram.png
│
├─ screenshots
    └── screenshots-pdf.pdf (Screenshots of Nutricheck in mobile view)

```

## How to run the project in your system

Clone the repo

### Run frontend

-   `cd frontend`
-   `npm install`
-   `npm start`

> Note: Node runtime must be installed to run the above commands and change the backend endpoint in the Axios.js file.

### Run backend

-   `cd backend`
-   `pip install -r requirements.txt`
-   `flask run`

> Note: Python must be installed in the system (v3.9+ preferred). Configure env variables

### Run AI Backend Service

-   `cd ai-food-detection`
-   `pip install -r requirements.txt`
-   `flask run`

> Note: Python must be installed in the system (v3.9+ preferred). Configure env variables

You can visit the application at http://localhost:3000 in development mode.
