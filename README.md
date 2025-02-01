# Social Media REST API

## Overview

This is a RESTful API for a social media platform, built using Node.js, Express, and MongoDB. The API provides endpoints for user authentication, profile management, and social interactions.

## Features

* User authentication using username and password
* User profile management (create, read, update, delete)
* Social interactions (follow, unfollow, get followers, get following)
* Basic error handling and logging

## Endpoints

### User Endpoints

* `POST /api/users` - Create a new user
* `GET /api/users` - Get all users
* `GET /api/users/:id` - Get a user by ID
* `PUT /api/users/:id` - Update a user
* `DELETE /api/users/:id` - Delete a user

### Authentication Endpoints

* `POST /api/auth/login` - Login a user
* `POST /api/auth/logout` - Logout a user

### Social Endpoints

* `POST /api/users/:id/follow` - Follow a user
* `POST /api/users/:id/unfollow` - Unfollow a user
* `GET /api/users/:id/followers` - Get a user's followers
* `GET /api/users/:id/following` - Get a user's following

## Installation

1. Clone the repository: `git clone https://github.com/BlessingLuphahla/social-media-rest-api.git`
2. Install dependencies: `npm install`
3. Start the server: `npm start`

## Environment Variables

* `MONGO_URL`: MongoDB connection string
* `PORT`: Server port (default: 3000)

## Contributing

Contributions are welcome! Please submit a pull request with a clear description of the changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
