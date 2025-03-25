import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ProgressProvider } from "./context/ProgressContext";

const Landing = lazy(() => import("./pages/Landing"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Game = lazy(() => import("./pages/Game"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Lesson1 = lazy(() => import("./pages/lessons/Lesson1"));
const Lesson2 = lazy(() => import("./pages/lessons/Lesson2"));
const Lesson3 = lazy(() => import("./pages/lessons/Lesson3"));
const Lesson4 = lazy(() => import("./pages/lessons/Lesson4"));
const Lesson5 = lazy(() => import("./pages/lessons/Lesson5"));

const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <ProgressProvider>
            <Suspense
              fallback={
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f12] to-[#1a1a21]">
                  <div className="animate-spin h-8 w-8 border-4 border-[#e0c9b1] rounded-full border-t-transparent"></div>
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/game"
                  element={
                    <ProtectedRoute>
                      <Game />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/leaderboard"
                  element={
                    <ProtectedRoute>
                      <Leaderboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/lesson/1"
                  element={
                    <ProtectedRoute>
                      <Lesson1 />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/lesson/2"
                  element={
                    <ProtectedRoute>
                      <Lesson2 />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/lesson/3"
                  element={
                    <ProtectedRoute>
                      <Lesson3 />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/lesson/4"
                  element={
                    <ProtectedRoute>
                      <Lesson4 />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/lesson/5"
                  element={
                    <ProtectedRoute>
                      <Lesson5 />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Suspense>
          </ProgressProvider>
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;
