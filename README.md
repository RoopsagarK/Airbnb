#Airbnb Clone with PERN Stack

##Overview

This project is a full-stack Airbnb clone built using the PERN stack (PostgreSQL, Express, React, Node.js). It includes user authentication using JWT, booking functionality, and accommodation management features.

##Table of Contents

Features
Tech Stack
Getting Started
Installation
Usage

##Features

JWT Authentication: Secure user authentication for a seamless experience.
Booking Functionality: Users can easily book accommodations and view their bookings.
Accommodation Management: Hosts can add, edit, and manage their own places on the platform.

##Tech Stack

Frontend: React
Backend: Node.js, Express
Database: PostgreSQL
Authentication: JWT

##Getting Started

Prerequisites
Node.js and npm installed
PostgreSQL database

##Installation

###Clone the repository:
git clone https://github.com/your-username/your-repo.git
cd Airbnb

###Install dependencies:
cd client
npm install
cd ../api
npm install

##Set up the database:
Create a PostgreSQL database and update the connection details in server/config/db.js.(Database details will be updated soon)

##Run the application:
cd api
node index.js
cd ../client
npm run dev

Open your browser and navigate to http://localhost:3000 to view the application.

Usage
Register/Login to the platform.
Explore available accommodations, make bookings, and view your bookings.
Hosts can add new accommodations, edit existing ones, and manage bookings.
