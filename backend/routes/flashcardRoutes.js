import express from 'express';
import {
    getflashcards,
getAllFlashCardSets,
reviewFlashcard,
toggleStarFlashcard,
deleteFlashcardSet
} from '../controllers/flashcardController.js';
import protect from '../middleware/auth.js';

const router=express.Router();
router.use(protect);

router.get('/',getAllFlashCardSets);
router.get('/:documentId',getflashcards);
router.post('/:cardId/review',reviewFlashcard);
router.put('/:cardId/star',toggleStarFlashcard);
router.delete('/:id',deleteFlashcardSet);

export default router;