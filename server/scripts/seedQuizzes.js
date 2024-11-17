const mongoose = require('mongoose');
const Quiz = require('../models/Quiz');
const dotenv = require('dotenv');

dotenv.config();

const quizzes = [
  {
    title: "Java Beginner Quiz",
    description: "Test your basic Java knowledge.",
    language: "Java",
    difficulty: "Beginner",
    questions: [
      {
        questionText: "What is the size of int in Java?",
        options: ["2 bytes", "4 bytes", "8 bytes", "Depends on the system"],
        correctAnswer: "4 bytes"
      },
      {
        questionText: "Which of these is not a keyword in Java?",
        options: ["class", "try", "goto", "if"],
        correctAnswer: "goto"
      },
      // Add more questions as needed
    ],
  },
  {
    title: "Java Intermediate Quiz",
    description: "Test your intermediate Java knowledge.",
    language: "Java",
    difficulty: "Intermediate",
    questions: [
      {
        questionText: "What is the default value of a boolean variable?",
        options: ["true", "false", "null", "undefined"],
        correctAnswer: "false"
      },
      {
        questionText: "Which of these classes is synchronized?",
        options: ["Vector", "ArrayList", "LinkedList", "None of the above"],
        correctAnswer: "Vector"
      },
      // Add more questions as needed
    ],
  },
  {
    title: "Java Advanced Quiz",
    description: "Test your advanced Java knowledge.",
    language: "Java",
    difficulty: "Advanced",
    questions: [
      {
        questionText: "Which of the following is not a type of polymorphism in Java?",
        options: ["Compile-time polymorphism", "Run-time polymorphism", "Execution-time polymorphism", "None of the above"],
        correctAnswer: "Execution-time polymorphism"
      },
      {
        questionText: "What is the return type of the hashCode() method in the Object class?",
        options: ["Object", "int", "long", "void"],
        correctAnswer: "int"
      },
      // Add more questions as needed
    ],
  },
  // Add more quizzes for different levels and languages
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Quiz.deleteMany({});
    await Quiz.insertMany(quizzes);

    console.log("Database seeded with quizzes");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
};

seedDB();
