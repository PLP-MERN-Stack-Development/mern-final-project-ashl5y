# RAHISI E-COMMERCE 

Rahisi is a full-stack e-commerce platform designed for small and medium-sized businesses in Kenya.<br>Users can browse products, view details and log in securely.<br>The platform is built using the MERN stack with modern design and real-time features.


## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS  
- **Backend**: Node.js + Express  
- **Database**: MongoDB  
- **Authentication**: JWT  
- **Deployment**: Netlify (Frontend) + Render (Backend) 


## Project Structure

rahisi-ecommerce/<br>
├── client/                 # Frontend (React + Vite)<br>
│   ├── src/<br>
│   ├── public/assets/<br>
│   └── ...<br>
├── server/                 # Backend (Express.js)<br>
│   ├── src/<br>
│   └── ...<br>
├── .github/workflows/      # GitHub Actions<br>
├── package.json<br>
├── README.md<br>
├── Week8- Assignment.md


## Features

<ul>
<li> Responsive design</li><br><br>
<li> Authentication & Authorization</li><br><br>
<li> Product listings & search</li> <br><br>
<li> MongoDB integration</li><br><br>
<li> CI/CD with GitHub Actions</li>
</ul>

## Getting Started

Clone the Repository

*bash*<br>
git clone/<br>
cd rahisi-ecommerce


## Backend Setup

cd server<br>
npm install<br>
npm run dev


## Frontend Setup

cd client<br>
npm install<br>
npm run dev


## CI/CD Pipeline
The project includes a GitHub Actions CI/CD pipeline located in:<br><br>
`.github/workflows/main.yml`<br><br>

The pipeline runs:<br>
npm install<br>
npm test<br>
Auto-deployment


## Live Demo

- **Frontend**: [https://ecommercerahisi.netlify.app/](https://ecommercerahisi.netlify.app/)
- **Backend API**: [https://mern-final-project-ashl5y.onrender.com/](https://mern-final-project-ashl5y.onrender.com/)
- **Demo Video**: [Rahisi Ecommerce live demo](https://drive.google.com/file/d/1K8fidR7Jkfd6aDS46JmpT3xg2OPiwcPF/view?usp=sharing)
