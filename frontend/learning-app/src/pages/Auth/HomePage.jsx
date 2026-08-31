
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 bg-white shadow-sm sticky top-0 z-50">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
          Learnova
        </h1>

        <div className="flex gap-4 items-center">
          <Link
            to="/login"
            className="px-5 py-2 text-gray-700 hover:text-emerald-600 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:opacity-90 transition shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </nav>


      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-28 bg-gradient-to-br from-emerald-50 via-white to-teal-50">

        <div className="mb-6 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
          ✨ AI-Powered Learning Platform
        </div>

        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 max-w-4xl leading-tight">
          Learn Smarter.
          <span className="block bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
            Not Harder.
          </span>
        </h2>

        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
          Learnova transforms your study material into personalized
          notes, flashcards, quizzes, and learning resources using AI.
          Turn your PDFs into an interactive learning experience.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <Link
            to="/register"
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-medium hover:opacity-90 transition shadow-md"
          >
            Start Learning →
          </Link>

          <Link
            to="/login"
            className="px-8 py-3 border border-gray-300 bg-white rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </div>

      </section>


      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-6">

          <div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              AI Powered
            </h3>
            <p className="mt-2 text-gray-600">
              Intelligent learning assistance
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              One Platform
            </h3>
            <p className="mt-2 text-gray-600">
              Notes, flashcards & quizzes
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Learn Anywhere
            </h3>
            <p className="mt-2 text-gray-600">
              Access your learning material anytime
            </p>
          </div>

        </div>
      </section>


      {/* Features Section */}
      <section className="px-8 py-24 bg-gray-50">

        <div className="text-center mb-14">
          <p className="text-emerald-600 font-semibold mb-3">
            FEATURES
          </p>

          <h3 className="text-4xl font-bold text-gray-900">
            Everything You Need to Learn
          </h3>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Learnova combines AI-powered tools into a single platform
            to make studying faster, easier, and more engaging.
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* AI Notes */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-emerald-100 text-2xl mb-6">
              📄
            </div>

            <h4 className="text-xl font-semibold text-gray-900">
              AI Notes
            </h4>

            <p className="mt-4 text-gray-600 leading-relaxed">
              Upload your study material and let AI extract the
              important concepts and generate concise, easy-to-understand
              notes.
            </p>
          </div>


          {/* Flashcards */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-teal-100 text-2xl mb-6">
              🧠
            </div>

            <h4 className="text-xl font-semibold text-gray-900">
              AI Flashcards
            </h4>

            <p className="mt-4 text-gray-600 leading-relaxed">
              Automatically generate flashcards from your study
              material and use them for quick and effective revision.
            </p>
          </div>


          {/* Quizzes */}
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-emerald-100 text-2xl mb-6">
              📝
            </div>

            <h4 className="text-xl font-semibold text-gray-900">
              AI Quizzes
            </h4>

            <p className="mt-4 text-gray-600 leading-relaxed">
              Test your knowledge with AI-generated quizzes based
              directly on the material you are studying.
            </p>
          </div>

        </div>
      </section>


      {/* How It Works */}
      <section className="py-24 px-8 bg-white">

        <div className="text-center mb-14">
          <p className="text-emerald-600 font-semibold mb-3">
            HOW IT WORKS
          </p>

          <h3 className="text-4xl font-bold text-gray-900">
            Start Learning in Three Simple Steps
          </h3>
        </div>


        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

          <div className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex items-center justify-center text-2xl font-bold">
              1
            </div>

            <h4 className="mt-6 text-xl font-semibold">
              Upload Your Material
            </h4>

            <p className="mt-3 text-gray-600">
              Upload your PDF notes, textbooks, or study material
              to Learnova.
            </p>
          </div>


          <div className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex items-center justify-center text-2xl font-bold">
              2
            </div>

            <h4 className="mt-6 text-xl font-semibold">
              Let AI Do the Work
            </h4>

            <p className="mt-3 text-gray-600">
              Learnova processes your material and generates useful
              learning resources using AI.
            </p>
          </div>


          <div className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white flex items-center justify-center text-2xl font-bold">
              3
            </div>

            <h4 className="mt-6 text-xl font-semibold">
              Learn & Test Yourself
            </h4>

            <p className="mt-3 text-gray-600">
              Study your AI-generated notes, revise with flashcards,
              and test yourself with quizzes.
            </p>
          </div>

        </div>

      </section>


      {/* Learning Experience */}
      <section className="py-24 px-8 bg-gradient-to-br from-emerald-50 to-teal-50">

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          <div>
            <p className="text-emerald-600 font-semibold mb-3">
              YOUR PERSONAL LEARNING ASSISTANT
            </p>

            <h3 className="text-4xl font-bold text-gray-900 leading-tight">
              Turn Your Study Material Into an Interactive Experience
            </h3>

            <p className="mt-6 text-gray-600 leading-relaxed">
              Instead of spending hours creating notes and revision
              material manually, let Learnova organize your learning
              content for you.
            </p>

            <div className="mt-8 space-y-4">

              <div className="flex items-start gap-3">
                <span className="text-emerald-500 text-xl">✓</span>
                <p className="text-gray-700">
                  Quickly understand complex study material
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-emerald-500 text-xl">✓</span>
                <p className="text-gray-700">
                  Revise important concepts using flashcards
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-emerald-500 text-xl">✓</span>
                <p className="text-gray-700">
                  Test your understanding with AI-generated quizzes
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-emerald-500 text-xl">✓</span>
                <p className="text-gray-700">
                  Track your learning progress
                </p>
              </div>

            </div>
          </div>


          <div className="bg-white rounded-2xl shadow-lg p-8">

            <div className="space-y-5">

              <div className="p-5 rounded-xl bg-emerald-50">
                <p className="text-sm text-emerald-600 font-semibold">
                  DOCUMENT
                </p>
                <p className="mt-2 font-medium text-gray-800">
                  Operating Systems.pdf
                </p>
              </div>

              <div className="flex justify-center text-gray-400 text-2xl">
                ↓
              </div>

              <div className="p-5 rounded-xl bg-teal-50">
                <p className="text-sm text-teal-600 font-semibold">
                  AI GENERATED
                </p>
                <p className="mt-2 font-medium text-gray-800">
                  Notes + Flashcards + Quiz
                </p>
              </div>

              <div className="flex justify-center text-gray-400 text-2xl">
                ↓
              </div>

              <div className="p-5 rounded-xl bg-gray-50 border">
                <p className="text-sm text-gray-500 font-semibold">
                  LEARNING
                </p>
                <p className="mt-2 font-medium text-gray-800">
                  Study → Practice → Improve
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* CTA Section */}
      <section className="py-24 px-8 bg-white text-center">

        <h3 className="text-4xl md:text-5xl font-bold text-gray-900">
          Ready to Learn Smarter?
        </h3>

        <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
          Upload your study material and let Learnova turn it into
          an intelligent learning experience.
        </p>

        <Link
          to="/register"
          className="inline-block mt-8 px-9 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:opacity-90 transition shadow-md"
        >
          Get Started with Learnova →
        </Link>

      </section>


      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 px-8">

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-5">

          <div>
            <h2 className="text-xl font-bold text-white">
              Learnova
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              AI-powered learning for smarter studying.
            </p>
          </div>

          <div className="flex gap-6 text-sm">
            <Link to="/login" className="hover:text-white">
              Login
            </Link>

            <Link to="/register" className="hover:text-white">
              Register
            </Link>
          </div>

        </div>

        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-500">
          © 2026 Learnova. All rights reserved.
        </div>

      </footer>

    </div>
  );
};

export default HomePage;

