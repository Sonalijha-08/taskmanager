# Task Manager Application

A full-stack task management application built with React.js frontend, Node.js/Express.js backend, and MongoDB database.

## Features

### Core Functionality
- ✅ Create tasks with title and description
- ✅ View a list of all tasks (sorted by creation date, newest first)
- ✅ Mark tasks as completed
- ✅ Edit task details
- ✅ Delete tasks

### Bonus Features
- ✅ Due dates for tasks
- ✅ Task categorization
- ✅ Responsive design

### Data Persistence & Validation
- ✅ MongoDB database integration
- ✅ Input validation (required titles, character limits)
- ✅ Prevent marking already completed tasks as complete again
- ✅ Graceful error handling with meaningful messages

## Tech Stack

- **Frontend**: React.js 19.2.4
- **Backend**: Node.js, Express.js 5.2.1
- **Database**: MongoDB with Mongoose ODM
- **Additional**: CORS, dotenv for environment variables

## Project Structure

```
task-manager/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── TaskForm.js
│   │   │   ├── TaskList.js
│   │   │   └── TaskItem.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── server/                 # Node.js/Express backend
│   ├── models/
│   │   └── Task.js        # MongoDB Task model
│   ├── routes/
│   │   └── tasks.js       # API routes
│   ├── index.js           # Server entry point
│   ├── .env               # Environment variables
│   └── package.json
├── package.json            # Root package.json with scripts
└── README.md
```

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## Installation

1. **Clone the repository** (if applicable) or navigate to the project directory

2. **Install all dependencies**:
   ```bash
   npm run install-all
   ```
   This will install dependencies for both client and server.

3. **Set up MongoDB**:
   - For local MongoDB: Make sure MongoDB is running on `mongodb://localhost:27017`
   - For MongoDB Atlas: Update the `MONGODB_URI` in `server/.env`

4. **Environment Configuration**:
   - The server comes with a default `.env` file
   - Update `server/.env` if you need to change the MongoDB connection or port

## Running the Application

### Development Mode (Recommended)
Run both frontend and backend concurrently:
```bash
npm run dev
```
This will start:
- Backend server on `http://localhost:5000`
- Frontend React app on `http://localhost:3000`

### Production Mode
```bash
npm run build
npm start
```

### Individual Services
- **Start only the backend**: `npm run server`
- **Start only the frontend**: `npm run client`
- **Start backend in dev mode**: `npm run server:dev`

## API Endpoints

The backend provides the following REST API endpoints:

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/health` - Health check

### Task Data Structure
```json
{
  "_id": "mongodb_object_id",
  "title": "Task title (required, max 100 chars)",
  "description": "Task description (optional, max 500 chars)",
  "completed": false,
  "dueDate": "2024-12-31T00:00:00.000Z",
  "category": "Work/Personal/etc",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Key Design Decisions

### Backend Architecture
- **Express.js**: Lightweight and flexible web framework for Node.js
- **Mongoose**: ODM for MongoDB with built-in validation and schema definition
- **CORS**: Enabled for cross-origin requests from the React frontend
- **Error Handling**: Centralized error handling middleware with meaningful error messages
- **Validation**: Both client-side and server-side validation for data integrity

### Frontend Architecture
- **React Hooks**: Modern React with functional components and hooks (useState, useEffect)
- **Component Structure**: Modular components (TaskForm, TaskList, TaskItem) for maintainability
- **State Management**: Local state management with React hooks (no external state libraries needed)
- **Responsive Design**: CSS with media queries for mobile-friendly interface
- **Error Handling**: User-friendly error messages displayed in the UI

### Database Design
- **Task Schema**: Comprehensive schema with validation rules
- **Timestamps**: Automatic createdAt/updatedAt fields via Mongoose
- **Indexing**: Default indexing on _id for efficient queries
- **Validation**: Schema-level validation for data consistency

### Security Considerations
- Input sanitization and validation
- CORS configuration for controlled cross-origin access
- Environment variables for sensitive configuration
- Error messages that don't expose internal system details

## Usage Instructions

1. **Adding Tasks**:
   - Fill in the title (required)
   - Add optional description, due date, and category
   - Click "Add Task"

2. **Managing Tasks**:
   - **Complete**: Click the "✓ Complete" button (only available for incomplete tasks)
   - **Edit**: Click "✏️ Edit" to modify task details
   - **Delete**: Click "🗑️ Delete" to remove a task

3. **Task States**:
   - Incomplete tasks show normally
   - Completed tasks are visually distinguished (strikethrough text, different styling)
   - Overdue tasks are highlighted in red

4. **Validation**:
   - Titles cannot be empty
   - Due dates cannot be in the past
   - Character limits are enforced
   - Attempting to complete an already completed task shows an error

## Future Enhancements

Potential improvements for future versions:
- User authentication and authorization
- Task filtering and search functionality
- Task prioritization (high/medium/low)
- Email notifications for due dates
- Task sharing and collaboration features
- API rate limiting
- Comprehensive unit and integration tests
- Docker containerization
- CI/CD pipeline setup

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**:
   - Ensure MongoDB is running locally or update connection string
   - Check firewall settings if using MongoDB Atlas

2. **Port Already in Use**:
   - Change PORT in `server/.env` if 5000 is occupied
   - Update REACT_APP_API_URL in client if needed

3. **CORS Errors**:
   - Ensure backend is running and CORS is properly configured
   - Check that API calls use the correct base URL

4. **Build Errors**:
   - Run `npm run install-all` to ensure all dependencies are installed
   - Clear node_modules and reinstall if issues persist

### Development Tips
- Use browser developer tools to inspect network requests
- Check server console for backend errors
- Use React Developer Tools for debugging frontend state
- MongoDB Compass for database inspection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.
