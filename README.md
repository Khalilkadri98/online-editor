# MERN Code Editor with Tutorial Management

This project is a comprehensive web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides a platform for users to write, execute, and manage code for different programming languages directly in the browser. Additionally, the application supports tutorial creation, updating, and deletion, allowing users to create step-by-step guides for learning purposes.

## Features

- **User Authentication**: Secure user authentication using JWT and bcrypt.js.
- **Code Editing**: Advanced code editor integration using `react-monaco-editor`.
- **Code Execution**: Execute code for multiple programming languages in isolated Docker containers.
- **Tutorial Management**: Create, update, and delete tutorials with multiple steps.
- **Dynamic Rendering**: Render and execute React components dynamically within an iframe.
- **Form Integration**: Auto-detect phone country codes and integrate with Wati for WhatsApp and ActiveCampaign for email handling.

## Getting Started

### Prerequisites

- Node.js
- Docker
- MongoDB

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/mern-code-editor.git
    cd mern-code-editor
    ```

2. Install server dependencies:

    ```bash
    cd server
    npm install
    ```

3. Install client dependencies:

    ```bash
    cd ../client
    npm install
    ```

4. Set up environment variables for the server:

    Create a `.env` file in the `server` directory and add your configuration settings.

5. Run the MongoDB server locally or use a cloud-based MongoDB service.

### Running the Application

1. Start the Docker containers for programming languages:

    Navigate to the `server/utils` directory and run the following command:

    ```bash
    cd server/utils
    docker-compose up --build
    ```

    This command will build and start containers for Python, Node.js, and Java. The containers are configured to run scripts or commands as specified in the `docker-compose.yml` file.

2. Start the server:

    ```bash
    cd server
    npm start
    ```

3. Start the client:

    ```bash
    cd client
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3000` to access the application.

## Tutorial Management

### Creating a Tutorial

To create a new tutorial, fill out the form with the tutorial title, description, programming language, and steps. Each step should have a step number, title, and content.

### Updating a Tutorial

To update an existing tutorial, select the tutorial from the list, edit the desired fields, and save the changes.

### Deleting a Tutorial

To delete a tutorial, select the tutorial from the list and confirm the deletion.

## Running Code in Containers

The application uses Docker containers to run code for different programming languages. The containers are defined in the `docker-compose.yml` file located in the `server/utils` directory. The following containers are available:

- **Python**: Runs Python scripts.
- **Node.js**: Runs Node.js scripts.
- **Java**: Runs Java programs.

### Adding a New Language

To add support for a new programming language, follow these steps:

1. Create a new directory for the language in the `server/utils` directory.
2. Add a `Dockerfile` to the new directory.
3. Update the `docker-compose.yml` file to include the new service.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by various online code editors and tutorial platforms.
- Thanks to the open-source community for providing the tools and libraries used in this project.
