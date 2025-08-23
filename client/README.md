# [GoGoCash Assignment]

A brief, one-sentence description of your project. For example, "A web application for tracking affiliate conversions and managing product feeds."

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Unit Testing](#unit-testing)

---

## Features

- **User Authentication**: Secure signup, login, and logout functionality.
- **Product Feed**: Display a list of products with filtering and sorting options.
- **Conversions Report**: View a report of conversion data with date-based filtering.
- **Responsive Design**: The application is accessible on both desktop and mobile devices.

---

## Technologies

- **Frontend Framework**: Next.js
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (`useState`, `useEffect`, etc.)
- **Data Fetching**: Custom React Hooks for API calls (`useAuth`, `useProducts`, etc.)
- **API Communication**: Axios
- **Authentication**: `js-cookie` for token management

---

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone [repository-url]
    cd [your-project-folder]
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  Create a `.env.local` file in the project root and add your environment variables.

    ```
    # Example .env.local
    NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
    ```

### Running the Project

1.  Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

2.  Open your browser and navigate to `http://localhost:3000`.

---

## Project Structure

├── src/
│   ├── api/          # API service functions
│   ├── components/   # Reusable UI components
│   │   ├── shared/   # Components used across the app (Layout)
│   ├── hooks/        # Custom React Hooks (e.g., useAuth)
│   ├── pages/        # Next.js pages and API routes
│   ├── styles/       # Global styles and Tailwind CSS config
│   └── types/        # TypeScript type declarations
├── jest.config.js    # Jest configuration file
├── jest.setup.js     # Jest setup file for test environment
├── package.json      # Project dependencies and scripts
└── README.md

---

## Unit Testing

The project uses **Jest** and **React Testing Library** for unit testing. Test files are placed alongside the code they test (e.g., `useAuth.test.ts` in the `src/hooks/` folder).

### Running Tests

To run all test suites:

```bash
npm test
# or
yarn test
```

To run tests in watch mode during development:

```npm run test:watch
# or
yarn run test:watch
```