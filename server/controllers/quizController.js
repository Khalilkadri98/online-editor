// controllers/quizController.js
const Quiz = require('../models/Quiz');
const UserQuizProgress = require('../models/UserQuizProgress');

const getQuizzesList = async (req, res) => {
    try {
      const quizzes = await Quiz.find({});
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching quizzes' });
    }
  };

  const getQuizById = async (req, res) => {
    const { id } = req.params;
    console.log(`Fetching quiz with ID: ${id}`); // Log the incoming quiz ID
    try {
        const quiz = await Quiz.findById(id);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (error) {
        console.error('Error fetching quiz:', error);
        res.status(500).json({ error: 'Error fetching quiz' });
    }
};


const submitAnswers = async (req, res) => {
    const { quizId, answers, userId } = req.body;

    try {
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        let score = 0;
        quiz.questions.forEach((question, index) => {
            if (question.correctAnswer === answers[index]) {
                score += 1;
            }
        });

        // Calculate passing score (70% of total questions)
        const passingScore = Math.ceil((70 / 100) * quiz.questions.length);

        // Determine if the user passed the quiz
        const completed = score >= passingScore;

        // Update or create the user's progress and score
        const userQuizProgress = await UserQuizProgress.findOneAndUpdate(
            { userId, quizId },
            {
                userId,
                quizId,
                score,
                completed,
                endTime: new Date(), // Set the end time when the quiz is completed
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.json({ score, passed: completed });
    } catch (error) {
        console.error('Error during quiz submission:', error);
        res.status(500).json({ error: 'Error processing request' });
    }
};



const getUserQuizProgress = async (req, res) => {
    const userId = req.user.id; // Assuming the user ID is stored in req.user

    try {
        const progress = await UserQuizProgress.find({ userId }).populate('quizId');
        res.json(progress);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user progress' });
    }
};

module.exports = { getQuizzesList,getQuizById,getUserQuizProgress,submitAnswers };
