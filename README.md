# rayka-speedtest

Version: `0.1.0`

Rayka-speedtest is a user-friendly application designed to empower users with the ability to assess their internet connectivity performance. Not only can users test their speed, but they can also revisit their test history to track any improvements or degradations in their service over time.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Directory Structure](#directory-structure)
4. [Getting Started](#getting-started)
5. [Documentation](#documentation)
6. [Development Guidelines](#development-guidelines)
7. [Deployment](#deployment)
8. [Usage](#usage)
9. [Contributing](#contributing)
10. [License](#license)
11. [Support](#support)
12. [Roadmap](#roadmap)

## Features

- **SpeedTest**: Execute a hassle-free internet speed test to get insights into your connection's download and upload speeds.
- **Test History**: No need to jot down or memorize your past results! The app efficiently logs all your tests, enabling users to monitor and compare their connection metrics over time.
- **Dark/Light Theme**: Whether you're a night owl or just prefer softer visuals, toggle between dark and light themes based on your preference for a more comfortable user experience.

## Technologies Used

- **React**: A robust front-end library that ensures an interactive and seamless user interface.
- **React Router**: Enables fluid in-app navigation and routing, making sure the user gets where they want, when they want.
- **Vite**: A build tool and development server.
- **@mui/material**: A well-established UI framework that infuses the application with stylish, responsive, and intuitive components.

## Directory Structure

- **navbar**: Navigation components.
- **speedtest**: Components related to speed testing.
- **testHistory**: Components for managing and displaying test histories.

## Getting Started

### Prerequisites

Before diving into the app setup, ensure your environment meets the following prerequisites:

- [Node.js](https://nodejs.org/): A runtime environment that lets you run JavaScript on your machine.
- [npm](https://www.npmjs.com/): The default package manager for Node.js, used for managing and sharing JavaScript codes with others.

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/sina-ss/rayka-speedtest.git
   ```
2. **Navigate to the Project Directory**:

   ```bash
   cd rayka-speedtest
   cd client-app
   ```
3. **Install Dependencies**:

   ```bash
   npm install
   ```
4. **Start the Development Server**:

   ```bash
   npm run dev
   ```

This will get your application up and running on [http://localhost:5173](http://localhost:5173). Enjoy the experience!

### Backend Installation

1. **Navigate to the Project Directory**:

   ```bash
   cd rayka-speedtest
   cd backend-app
   ```
2. **Install Composer**

   ```bash
      https://getcomposer.org/download/
   ```
3. **Install Dependencies**:

   ```bash
   composer install
   ```
4. **Run Migration**:

   ```bash
   php artisan migrate
   ```
5. **Insert Test Servers**
   ```bash
   INSERT INTO `rst_servers` (`id`,`name`,`location`,`url`) VALUES (1,'زیر ساخت','تهران','http://server.sample');
   ```
4. **Start the Development Server**:

   ```bash
   php artisan serve
   ```

This will get your application up and running on [http://localhost:8000](http://localhost:8000). Enjoy the experience!

## Documentation

### Project Architecture

Provide a high-level overview of the project architecture, including how components interact, data flow, and any state management solutions in place.

### Component Documentation

Each component in the `components` directory should have its documentation, explaining its props, state, and any side effects (such as API calls).

For example:

- **Navbar.jsx**: This component handles the navigation bar. It accepts a `user` prop to display user-specific options and interacts with the `auth` context for login/logout functionality.

### API Endpoints

If the project interacts with APIs (either internal or third-party), list the main endpoints, their methods, expected payloads, and responses.

For example:

- **POST /api/user/login**: Authenticates a user.
  - Payload: `{ "username": "string", "password": "string" }`
  - Response: `{ "token": "string", "user": { ... } }`

### Common Patterns and Best Practices

Describe any coding patterns, utilities, or best practices your team should be aware of when developing for the project. This could include guidelines for error handling, logging, or specific coding paradigms you're following.

### Troubleshooting

Detailed steps or checks to resolve common issues that arise during development or deployment.

## Development Guidelines

### Code Standards

- Follow the established coding standards and conventions.
- Ensure code is commented for clarity.
- Always pull the latest changes from the main branch before starting new work.

### Component Development

- When creating a new component, ensure it's placed in the appropriate directory within `src/components`.
- Update the component's documentation as necessary.

### Testing

- Write unit tests for new components and functionalities.
- Ensure all tests pass before merging changes.

## Deployment

[Instructions for deploying or updating the application in various environments.]

## Contact

For any questions or issues, please contact:

- [Team Lead Name] - [Email]
- [Developer Name] - [Email]

## Usage

After setting up, you can easily:

1. **Run a Speed Test**: Simply click on the 'Start Test' button and wait for results.
2. **Check Past Results**: Navigate to 'Test History' from the navbar to view your past speed test results.
3. **Switch Themes**: Click on the theme toggle button, usually represented by a sun/moon icon on the navbar.

## Contributing

Interested in making a contribution? We appreciate any and all help! Please read our [Contribution Guidelines](CONTRIBUTING.md) before getting started.

## License

The "rayka-speedtest" application is proprietary software owned by Rayka Inc. All rights reserved. Unauthorized copying, modification, distribution, or any form of exploitation of this software, in whole or in part, is strictly prohibited.

Only authorized members of Rayka Inc. are permitted to develop, modify, or distribute this software. Any contributions or modifications to the project by individuals outside of Rayka Inc. will not be accepted.

## Support

Encountered a bug? Or have a suggestion? Please open a new [issue](https://github.com/sina-ss/rayka-speedtest/issues).

## Roadmap

- [ ] Mobile application support.
- [ ] Real-time global speed test comparisons.
- [ ] Enhanced user profiles with more in-depth metrics.
