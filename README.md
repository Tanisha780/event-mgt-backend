# event-mgt-backend
A REST API for managing events, users, and registrations using Node.js, Express, and PostgreSQL.

## Features
- Create events with capacity validation
- User registration for events with constraints
- Cancel registrations
- List upcoming events with sorting
- Event statistics

## Setup Instructions
1. Clone the repo
2. Run `npm install`
3. Setup PostgreSQL database and update `.env` file with DB credentials
4. Run `node init.js` to create tables
5. Start server: `node app.js`
6. Use Postman or other tools to test API endpoints

## API Endpoints
- POST `/users` - Create user
- POST `/events` - Create event
- GET `/events/:id` - Get event details with registered users
- POST `/events/:id/register` - Register user to event
- DELETE `/events/:id/cancel` - Cancel registration
- GET `/events/upcoming/list` - List upcoming events
- GET `/events/:id/stats` - Get event statistics
