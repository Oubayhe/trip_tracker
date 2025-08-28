# Trip Tracker

A simple GPS tracking application built with **Ionic Angular** frontend and **Java Spring Boot** backend using **Leaflet** maps to display and animate vehicle movement along GPS coordinates.

## Screenshots:
![](./media/image_1.png)
![](./media/image_2.png)

## Features

- Interactive map displaying GPS route with polyline
- Animated marker movement along the route
- Real-time trip information display
- MySQL database for GPS coordinate storage
- RESTful API for data communication

## Prerequisites

Before running this application, ensure you have the following installed on your machine:

- **Java 17** or higher
- **Maven 3.9+** 
- **Node.js 18+**
- **npm 8+**
- **Ionic CLI** (`npm install -g @ionic/cli`)
- **MySQL 8+**

## Quick Start

### 1. Database Setup

Create a new MySQL database:
```sql
CREATE DATABASE trip_tracker;
```

Import the provided data:
```sql
SOURCE database/archive.sql;
```

### 2. Backend Setup (Spring Boot)

Navigate to the backend directory and configure your database connection in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/trip_tracker
spring.datasource.username=root
spring.datasource.password=your_mysql_password
```

Start the backend server:
```bash
mvn spring-boot:run
```

The backend will run on **http://localhost:8081**

### 3. Frontend Setup (Ionic Angular)

Navigate to the frontend directory and install dependencies:
```bash
npm install
```

Start the development server:
```bash
ionic serve
```

The frontend will run on **http://localhost:8100**

## Running the Complete Application

1. **Start MySQL** and ensure the `trip_tracker` database exists with imported data
2. **Run the backend**: `mvn spring-boot:run` (port 8081)
3. **Run the frontend**: `ionic serve` (port 8100)
4. **Open your browser** and navigate to http://localhost:8100