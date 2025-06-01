# BioSample Management Mini-App

## Overview

This is a simple full-stack application for managing biological samples. The application allows users to create, view, update, and delete (CRUD) information about biological samples and add comments to them.

**Time taken to complete:** 4 hours

## Tech Stack

- **Backend:**
  - Python
  - Django
  - Django REST Framework
  - Database: SQLite (default for development)
- **Frontend:**
  - React
  - TypeScript
  - React Router DOM (for navigation)
  - Vite (as a build tool/dev server - _si tu as utilisé Vite, sinon adapte_)
- **Package Managers:**
  - `pip` (for Python packages)
  - `npm` or `yarn` (for JavaScript packages)

## Features

- **BioSamples Management:**
  - Create new biological samples with details like sampling location, type, sampling date, and operator.
  - View a list of all biological samples.
  - View details of a specific biological sample.
  - Update existing biological samples.
  - Delete biological samples.
- **Comments:**
  - Add comments to a specific biological sample.
  - View comments associated with a biological sample.
  - (Optionnel, si implémenté) Delete comments.
- **(Bonus, si implémenté)** Pagination for sample lists.

## Project Structure

For this mini-application, a monolithic project structure was chosen as it effectively meets the needs of a small-scale project, promoting simplicity and development efficiency. The project is organized into two main, clearly delineated parts: backend and frontend.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Python (version 3.8+ recommended)
- Pip (Python package installer)
- Node.js (version 16+ recommended)
- NPM or Yarn (Node package manager)

## Setup and Installation

To get the project running locally, follow these steps:

**1. Clone the repository:**

```bash
git clone [https://github.com/dimitri-hoareau/biosample-dashboard](https://github.com/dimitri-hoareau/biosample-dashboard)
cd biosample_project_root

```

**2. Backend setup:**

```bash
# Navigate to the backend directory
cd backend

# Create a virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Apply database migrations
python manage.py migrate

# Start the Django development server
python manage.py runserver
# The backend will typically be running on [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

```

**3. Frontend setup:**

```bash
# Navigate to the frontend directory (from the project root)
cd frontend

# Install JavaScript dependencies
npm install

# Start the React development server
npm run dev

# The frontend will typically be running on http://localhost:5173/ (for Vite)

```

## API Endpoints

The main API endpoints provided by the backend include:

- GET /api/biosamples/: List all biosamples.
- POST /api/biosamples/: Create a new biosample.
- GET /api/biosamples/{id}/: Retrieve details of a specific biosample.
- PUT /api/biosamples/{id}/: Update a specific biosample.
- DELETE /api/biosamples/{id}/: Delete a specific biosample.
- POST /api/biosamples/{id}/comments/: Add a comment to a specific biosample.

## Usage

Once both backend and frontend servers are running:

1. Open your web browser.
2. Navigate to the frontend URL (e.g., http://localhost:3000 or http://localhost:5173).
3. You should see the BioSample listing page. From there, you can navigate to create, view, edit, or delete samples and add comments.

## Known Limitations / Future Enhancements

- Error Handling: Basic error handling is implemented. More comprehensive user-facing error messages could be added.
- Styling: UI styling is intentionally kept minimal to focus on core functionality within the given timeframe. Ant Design was utilized for the table component to rapidly implement a functional data display and avoid extensive manual CSS for that specific element. While this was efficient for the test, for broader styling or more complex projects, a custom 'from scratch' CSS approach is generally preferred for greater modularity and fine-grained control, as comprehensive UI libraries can sometimes pose challenges for deep theme customization (e.g., altering specific brand colors).
- **Server-Side Pagination:** The list currently utilizes client-side pagination (default behavior of the Ant Design Table). To enhance performance and scalability, especially with a large number of samples, server-side pagination would be a key future improvement.
- Data Model for Sampling Operator: The sampling_operator field in the BioSample model is currently a CharField. For improved data integrity, consistency, and to potentially store more details about operators, this could be refactored to a ForeignKey referencing a dedicated Operator or User model.
- Testing: No automated tests are included in this version. Unit and integration tests would be a valuable addition.
- User Authentication: The application is currently open; user authentication and authorization could be implemented for a production environment.

## Author

- Name: Dimitri Hoareau
- GitHub: [https://github.com/dimitri-hoareau](https://github.com/dimitri-hoareau)
