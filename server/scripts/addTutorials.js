const mongoose = require('mongoose');
const ProgrammingLanguage = require('../models/ProgrammingLanguage');
const Tutorial = require('../models/Tutorial');

mongoose.connect('mongodb://localhost:27017/code-editor', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    // Find the programming language
    const java = await ProgrammingLanguage.findOne({ name: 'Java' });
    const python = await ProgrammingLanguage.findOne({ name: 'Python' });
    const c = await ProgrammingLanguage.findOne({ name: 'C' });

    const tutorials = [
      // Java Tutorials
      {
        title: 'Introduction to Java',
        description: 'Learn the basics of Java programming.',
        programmingLanguage: java._id,
        steps: [
          { stepNumber: 1, title: 'Hello World', content: 'Write your first Java program.' },
          { stepNumber: 2, title: 'Variables', content: 'Learn how to use variables in Java.' },
          { stepNumber: 3, title: 'Loops', content: 'Learn about loops in Java.' },
        ],
      },
      {
        title: 'Java OOP Concepts',
        description: 'Understand the basics of Object-Oriented Programming in Java.',
        programmingLanguage: java._id,
        steps: [
          { stepNumber: 1, title: 'Classes and Objects', content: 'Learn about classes and objects in Java.' },
          { stepNumber: 2, title: 'Inheritance', content: 'Understand inheritance in Java.' },
          { stepNumber: 3, title: 'Polymorphism', content: 'Learn about polymorphism in Java.' },
        ],
      },
      {
        title: 'Advanced Java',
        description: 'Explore advanced topics in Java programming.',
        programmingLanguage: java._id,
        steps: [
          { stepNumber: 1, title: 'Streams API', content: 'Learn about the Streams API in Java.' },
          { stepNumber: 2, title: 'Concurrency', content: 'Understand concurrency in Java.' },
          { stepNumber: 3, title: 'Lambda Expressions', content: 'Learn about lambda expressions in Java.' },
        ],
      },
      // Python Tutorials
      {
        title: 'Python Basics',
        description: 'Learn the basics of Python programming.',
        programmingLanguage: python._id,
        steps: [
          { stepNumber: 1, title: 'Hello World', content: 'Write your first Python program.' },
          { stepNumber: 2, title: 'Variables', content: 'Learn how to use variables in Python.' },
          { stepNumber: 3, title: 'Conditions', content: 'Learn about if-else statements in Python.' },
        ],
      },
      {
        title: 'Python Data Structures',
        description: 'Understand data structures in Python.',
        programmingLanguage: python._id,
        steps: [
          { stepNumber: 1, title: 'Lists', content: 'Learn about lists in Python.' },
          { stepNumber: 2, title: 'Dictionaries', content: 'Understand dictionaries in Python.' },
          { stepNumber: 3, title: 'Sets', content: 'Learn about sets in Python.' },
        ],
      },
      {
        title: 'Advanced Python',
        description: 'Explore advanced topics in Python programming.',
        programmingLanguage: python._id,
        steps: [
          { stepNumber: 1, title: 'Decorators', content: 'Learn about decorators in Python.' },
          { stepNumber: 2, title: 'Generators', content: 'Understand generators in Python.' },
          { stepNumber: 3, title: 'Context Managers', content: 'Learn about context managers in Python.' },
        ],
      },
      // C Tutorials
      {
        title: 'Introduction to C',
        description: 'Learn the basics of C programming.',
        programmingLanguage: c._id,
        steps: [
          { stepNumber: 1, title: 'Hello World', content: 'Write your first C program.' },
          { stepNumber: 2, title: 'Variables', content: 'Learn how to use variables in C.' },
          { stepNumber: 3, title: 'Loops', content: 'Learn about loops in C.' },
        ],
      },
      {
        title: 'C Pointers',
        description: 'Understand the basics of pointers in C.',
        programmingLanguage: c._id,
        steps: [
          { stepNumber: 1, title: 'Introduction to Pointers', content: 'Learn about pointers in C.' },
          { stepNumber: 2, title: 'Pointer Arithmetic', content: 'Understand pointer arithmetic in C.' },
          { stepNumber: 3, title: 'Pointers and Arrays', content: 'Learn how pointers and arrays work together in C.' },
        ],
      },
      {
        title: 'Advanced C',
        description: 'Explore advanced topics in C programming.',
        programmingLanguage: c._id,
        steps: [
          { stepNumber: 1, title: 'Memory Management', content: 'Learn about dynamic memory management in C.' },
          { stepNumber: 2, title: 'Structures', content: 'Understand structures in C.' },
          { stepNumber: 3, title: 'File I/O', content: 'Learn about file input/output in C.' },
        ],
      },
    ];

    await Tutorial.insertMany(tutorials);
    console.log('Tutorials added successfully!');
    mongoose.disconnect();
  })
  .catch(error => {
    console.error('Error adding tutorials:', error);
    mongoose.disconnect();
  });
