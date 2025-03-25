import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ProgressProvider } from "./context/ProgressContext";
import Certificate from "./pages/Certificate";

const Landing = lazy(() => import("./pages/Landing"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Game = lazy(() => import("./pages/Game"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const VedicAIAssistant = lazy(() => import("./pages/VedicAIAssistant"));
const Lesson1 = lazy(() => import("./pages/lessons/Lesson1"));
const Lesson2 = lazy(() => import("./pages/lessons/Lesson2"));
const Lesson3 = lazy(() => import("./pages/lessons/Lesson3"));
const Lesson4 = lazy(() => import("./pages/lessons/Lesson4"));
const Lesson5 = lazy(() => import("./pages/lessons/Lesson5"));

const router = createBrowserRouter(
  [
    { path: "/", element: <Landing /> },
    { path: "/signin", element: <SignIn /> },
    { path: "/signup", element: <SignUp /> },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/game",
      element: (
        <ProtectedRoute>
          <Game />
        </ProtectedRoute>
      ),
    },
    {
      path: "/leaderboard",
      element: (
        <ProtectedRoute>
          <Leaderboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/lesson/1",
      element: (
        <ProtectedRoute>
          <Lesson1 />
        </ProtectedRoute>
      ),
    },
    {
      path: "/lesson/2",
      element: (
        <ProtectedRoute>
          <Lesson2 />
        </ProtectedRoute>
      ),
    },
    {
      path: "/lesson/3",
      element: (
        <ProtectedRoute>
          <Lesson3 />
        </ProtectedRoute>
      ),
    },
    {
      path: "/lesson/4",
      element: (
        <ProtectedRoute>
          <Lesson4 />
        </ProtectedRoute>
      ),
    },
    {
      path: "/lesson/5",
      element: (
        <ProtectedRoute>
          <Lesson5 />
        </ProtectedRoute>
      ),
    },
    {
      path: "/certificate",
      element: (
        <ProtectedRoute>
          <Certificate />
        </ProtectedRoute>
      ),
    },
    {
      path: "/vedic-ai",
      element: (
        <ProtectedRoute>
          <VedicAIAssistant />
        </ProtectedRoute>
      ),
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

const App = () => {
  return (
    <AuthProvider>
      <ProgressProvider>
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f12] to-[#1a1a21]">
              <div className="animate-spin h-8 w-8 border-4 border-[#e0c9b1] rounded-full border-t-transparent"></div>
            </div>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </ProgressProvider>
    </AuthProvider>
  );
};

export default App;
