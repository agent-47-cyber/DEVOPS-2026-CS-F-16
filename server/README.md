# Backend REST API Reference

The server is built with Node.js, Express.js, and MongoDB (via Mongoose). All endpoints are prefixed under `/api`.

## Base URL
```
http://localhost:5000/api
```

---

## Authentication & Error Handling

- Protected endpoints require an `Authorization` header with a valid Bearer token:
  ```
  Authorization: Bearer <jwt_token>
  ```
- Error responses follow a uniform JSON structure:
  ```json
  {
    "error": "Descriptive error message"
  }
  ```

---

## Endpoints Table

| Method | Endpoint | Access | Description | Request Body / Query |
|---|---|---|---|---|
| `GET` | `/api/health` | **Public** | Health check probe (liveness/readiness) | None |
| `POST` | `/api/auth/login` | **Public** | Admin login & JWT token issuance | `{ "username": "...", "password": "..." }` |
| `GET` | `/api/projects` | **Public** | Fetch all projects | Query: `?featured=true` (optional) |
| `GET` | `/api/projects/:id` | **Public** | Fetch a single project by ID | None |
| `POST` | `/api/projects` | **Protected** | Create a new project | `{ "title": "...", "description": "...", "techStack": [...], "repoUrl": "...", "liveUrl": "...", "imageUrl": "...", "featured": false, "order": 0 }` |
| `PUT` | `/api/projects/:id` | **Protected** | Update an existing project | Fields to update |
| `DELETE` | `/api/projects/:id` | **Protected** | Delete a project | None |
| `GET` | `/api/skills` | **Public** | Fetch all skills | None |
| `POST` | `/api/skills` | **Protected** | Create a new skill | `{ "name": "...", "category": "...", "level": "..." }` |
| `PUT` | `/api/skills/:id` | **Protected** | Update a skill | Fields to update |
| `DELETE` | `/api/skills/:id` | **Protected** | Delete a skill | None |
| `POST` | `/api/messages` | **Public** | Submit a contact form message | `{ "name": "...", "email": "...", "message": "..." }` |
| `GET` | `/api/messages` | **Protected** | Fetch all contact form messages | None |
| `PATCH` | `/api/messages/:id/read` | **Protected** | Mark a message as read | None |

---

## Running Locally

```bash
# Seed admin user
npm run seed

# Start server
npm start

# Start server with auto-reload
npm run dev
```
