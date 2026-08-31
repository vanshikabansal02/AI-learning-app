import React from 'react';
import { BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom';
import HomePage from './pages/Auth/HomePage'
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import ProtectedRoutes from './components/auth/ProtectedRoutes';
import DocumentDetailPage from './components/documents/DocumentDetailPage';
import DocumentListPage from './pages/Documents/DocumentListPage';
import FlashcardListPage from './pages/Flashcard/FlashcardListPage';
import FlashcardPage from './pages/Flashcard/FlashcardPage';
import QuizTakePage from './pages/Quizzes/QuixTakePage';
import QuizResultPage from './pages/Quizzes/QuizResultPage';
import ProfilePage from './pages/Profile/ProfilePage.jsx';
import { useAuth } from './context/AuthContext';
const App = () => {
  const {isAuthenticated,loading}=useAuth()
 

 
 if(loading){
  return (
    <div className='flex items-center justify-center h-screen'>
      <p>Loading...</p>
    </div>
  )
 }
 return (
  <Router>
    <Routes>
     {/* <Route
      path="/"
      element={isAuthenticated? <Navigate to="/dashboard" replace />:<Navigate to="/" replace/>}
      />*/}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>

      {/*Protected routes*/}
      <Route element={<ProtectedRoutes/>}>
      <Route path='/dashboard' element={<DashboardPage/>}/>
      <Route path='/documents' element={<DocumentListPage/>}/>
      <Route path='/documents/:id' element={<DocumentDetailPage/>}/>
      <Route path='/flashcards' element={<FlashcardListPage/>}/>
      <Route path='/documents/:id/flashcard' element={<FlashcardPage/>}/>
      <Route path='/quizzes/:quizId' element={<QuizTakePage/>}/>
      <Route path='/quizzes/:quizId/results' element={<QuizResultPage/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
      </Route>

      <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
      </Router>
 )
}

export default App
