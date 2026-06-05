//<<<<<<< HEAD
import Document from '../models/Document.js'; // Fixed typo here (Documnent -> Document)
import Flashcard from '../models/Quiz.js';
import Quiz from '../models/Quiz.js';

export const getDashboard = async (req, res, next) => {
    try {
        const userId = req.user._id;

        ///get counts
        const totalDocuments = await Document.countDocuments({ userId });
        const totalFlashcardSets = await Flashcard.countDocuments({ userId });
        const totalQuizzes = await Quiz.countDocuments({ userId });
        const completedQuizzes = await Quiz.countDocuments({ userId, completedAt: { $ne: null } });

        //get flashcard statistics
        const flashcardSets = await Flashcard.find({ userId });
        let totalFlashcards = 0;   // Added 's' to match the response object below
        let reviewedFlashcards = 0; // Added 's' to prevent crash in loop
        let starredFlashcards = 0;  // Added 's' to prevent crash in loop

        flashcardSets.forEach(set => {
            totalFlashcards += set.cards.length;
            reviewedFlashcards += set.cards.filter(c => c.reviewCount > 0).length;
            starredFlashcards += set.cards.filter(c => c.isStarred).length;
        });

        //get quiz stats
        const quizzes = await Quiz.find({ userId, completedAt: { $ne: null } });
        const averageScore = quizzes.length > 0
            ? Math.round(quizzes.reduce((sum, q) => sum + q.score, 0) / quizzes.length) : 0;

        //recent activity
        const recentDocuments = await Document.find({ userId })
            .sort({ lastAccessed: -1 })
            .limit(5)
            .select('title fileName lastAccessed status');

        const recentQuizzes = await Quiz.find({ userId })
            .sort({ createdAt: -1 })
            .limit(5) // Fixed typo here (.limits -> .limit)
            .populate('documentId', 'title')
            .select('title score totalQuestions completedAt');

        //study streak
        const studyStreak = Math.floor(Math.random() * 7) + 1;
        
        res.status(200).json({
            success: true,
            data: {
                overview: {
                    totalDocuments,
                    totalFlashcardSets,
                    totalFlashcards,
                    reviewedFlashcards,
                    starredFlashcards,
                    totalQuizzes,
                    completedQuizzes,
                    averageScore, // Included this since you calculated it!
                    studyStreak   // Included this since you calculated it!
                },
                recentActivity: {
                    documents: recentDocuments,
                    quizzes: recentQuizzes
                }
            }
        });
    } catch (error) {
        console.error("DASHBOARD ERROR DETECTED:", error);
        next(error);
    }

/*import Document from "../models/Document.js";
import Flashcard from "../models/Flashcard.js";
import Quiz from "../models/Quiz.js";

export const getDashboard = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Overview counts
    const totalDocuments = await Document.countDocuments({ userId });

    const totalFlashcardSets = await Flashcard.countDocuments({
      userId,
    });

    const totalQuizzes = await Quiz.countDocuments({
      userId,
    });

    const completedQuizzes = await Quiz.countDocuments({
      userId,
      completedAt: { $ne: null },
    });

    // Flashcard statistics
    const flashcardSets = await Flashcard.find({ userId });

    let totalFlashcards = 0;
    let reviewedFlashcards = 0;
    let starredFlashcards = 0;

    flashcardSets.forEach((set) => {
      totalFlashcards += set.cards?.length || 0;

      reviewedFlashcards +=
        set.cards?.filter((card) => card.reviewCount > 0).length || 0;

      starredFlashcards +=
        set.cards?.filter((card) => card.isStarred).length || 0;
    });

    // Quiz statistics
    const quizzes = await Quiz.find({
      userId,
      completedAt: { $ne: null },
    });

    const averageScore =
      quizzes.length > 0
        ? Math.round(
            quizzes.reduce((sum, quiz) => sum + (quiz.score || 0), 0) /
              quizzes.length
          )
        : 0;

    // Recent documents
    const recentDocuments = await Document.find({ userId })
      .sort({ lastAccessed: -1 })
      .limit(5)
      .select("title fileName lastAccessed status");

    // Recent quizzes
    const recentQuizzes = await Quiz.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("documentId", "title")
      .select("title score totalQuestions completedAt createdAt");

    // Study streak (temporary placeholder)
    const studyStreak = Math.floor(Math.random() * 7) + 1;

    return res.status(200).json({
      success: true,
      data: {
        overview: {
          totalDocuments,
          totalFlashcardSets,
          totalFlashcards,
          reviewedFlashcards,
          starredFlashcards,
          totalQuizzes,
          completedQuizzes,
          averageScore,
          studyStreak,
        },
        recentActivity: {
          documents: recentDocuments,
          quizzes: recentQuizzes,
        },
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    next(error);
  }
    */
//>>>>>>> f9e51887f564eb8138d8aa2c8935a098ff3acebd
};