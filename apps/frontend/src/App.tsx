import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SubmissionForm from './components/Submissions/SubmissionForm';
import SubmissionsList from './components/Submissions/SubmissionsList';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <nav className="flex justify-center gap-6 mb-8">
            <Link to="/" className="text-sm font-medium hover:underline underline-offset-4">
              Submit Profile
            </Link>
            <Link
              to="/submissions"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              View Submissions
            </Link>
          </nav>
          <div className="flex flex-row justify-center">
            <Routes>
              <Route path="/" element={<SubmissionForm />} />
              <Route path="/submissions" element={<SubmissionsList />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
