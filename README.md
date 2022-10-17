# NUTRICHECK

A Nutrition Assistant to control diet, manage food habits and keep good health.

Live website URL : [https://nutricheck-frontend-partheev-dev.apps.sandbox.x8i5.p1.openshiftapps.com/](https://nutricheck-frontend-partheev-dev.apps.sandbox.x8i5.p1.openshiftapps.com/)

> Use mobile device to access the website for better experience.

## Docker images:

Backend: https://hub.docker.com/r/partheev8/nutri-backend/tags

Frontend: https://hub.docker.com/r/partheev8/nutri-frontend

AI service backend: https://hub.docker.com/r/partheev8/nutri-ai/tags

## Demonstration video link

[https://drive.google.com/file/d/1xNQtir7lDM0P9NdaWEpyf6RaoBmJmXOR/view?usp=sharing](https://drive.google.com/file/d/1xNQtir7lDM0P9NdaWEpyf6RaoBmJmXOR/view?usp=sharing)

### Course completion badges

Credly links

Partheev: [https://www.credly.com/users/partheev-budarapu](https://www.credly.com/users/partheev-budarapu)

Poornesh: [https://www.credly.com/users/poornesh-chenna](https://www.credly.com/users/poornesh-chenna)

Kiran: [https://www.credly.com/users/yuva-sai-kiran](https://www.credly.com/users/yuva-sai-kiran)

Parshuram: [https://www.credly.com/users/parashuram-yerranagu](https://www.credly.com/users/parashuram-yerranagu)

## Project Folder structure

```
├── frontend (React Application)
│
├── backend (Flask application)
│
├── ai-food-detection (Flask application with integration of 3rd party services)
|
├── badges (Team members badge images)
│
├── project report
│   ├── project report.pdf (Project report document)
│   ├── Flowchart.png
│   ├── System Architecture.png
│   └── Block Diagram.png
│
├─ screenshots
│   └── screenshots-pdf.pdf (Screenshots of Nutricheck in mobile view)
│
└─ Video Demonstration.avi (Solution explaination video)
```

## How to run project in your system

Clone the repo

### Run frontend

-   `cd frontend`
-   `npm install`
-   `npm start`

> Note : Node runtime must be installed to run above commands and change backend endpoint in the Axios.js file.

### Run backend

-   `cd backend`
-   `pip install -r requirements.txt`
-   `flask run`

> Note : Python must be installed in the system (v3.9+ preferred). Configure env variables

### Run AI Backend Service

-   `cd ai-food-detection`
-   `pip install -r requirements.txt`
-   `flask run`

> Note : Python must be installed in the system (v3.9+ preferred). Configure env variables

You can visit the application at http://localhost:3000 in the development mode.
