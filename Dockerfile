# Use the official GCC image from Docker Hub
FROM gcc:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Command to compile and run the C program
CMD ["sh", "-c", "gcc main.c -o main && ./main"]
