"use client";

import { useState, useEffect } from "react";
import {
  Check,
  ChevronRight,
  Brain,
  Calculator,
  Trophy,
  ArrowRight,
  RefreshCw,
  Info,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Progress } from "../components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { cn } from "../lib/utils";

export default function VedicMathTutorial() {
  const [firstNumber, setFirstNumber] = useState(32);
  const [secondNumber, setSecondNumber] = useState(21);
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [practiceMode, setPracticeMode] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceTotal, setPracticeTotal] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [activeTab, setActiveTab] = useState("learn");

  // Generate new random numbers for practice
  const generatePracticeNumbers = () => {
    const num1 = Math.floor(Math.random() * 90) + 10; // 10-99
    const num2 = Math.floor(Math.random() * 90) + 10; // 10-99
    setFirstNumber(num1);
    setSecondNumber(num2);
    setUserAnswer("");
    setShowAnswer(false);
    setShowHint(false);
  };

  // Check user's answer
  const checkAnswer = () => {
    const correctAnswer = firstNumber * secondNumber;
    const isCorrect = Number.parseInt(userAnswer) === correctAnswer;

    if (practiceMode) {
      setPracticeTotal(practiceTotal + 1);
      if (isCorrect) {
        setPracticeScore(practiceScore + 1);
      }
    }

    setShowAnswer(true);
    return isCorrect;
  };

  // Reset the tutorial
  const resetTutorial = () => {
    setCurrentStep(0);
    setShowAnswer(false);
    setUserAnswer("");
  };

  // Next practice problem
  const nextPractice = () => {
    generatePracticeNumbers();
  };

  // Calculate steps for the current multiplication
  const calculateSteps = () => {
    // Break down the numbers into digits
    const a = Math.floor(firstNumber / 10);
    const b = firstNumber % 10;
    const c = Math.floor(secondNumber / 10);
    const d = secondNumber % 10;

    // Step 1: Multiply the units digits (b × d)
    const step1 = b * d;

    // Step 2: Cross multiply and add (a × d + b × c)
    const step2 = a * d + b * c;

    // Step 3: Multiply the tens digits (a × c)
    const step3 = a * c;

    // Handle carry from step 1 to step 2
    const step1Units = step1 % 10;
    const step1Tens = Math.floor(step1 / 10);

    // Add carry to step 2
    const step2WithCarry = step2 + step1Tens;
    const step2Units = step2WithCarry % 10;
    const step2Tens = Math.floor(step2WithCarry / 10);

    // Add carry to step 3
    const step3WithCarry = step3 + step2Tens;

    // Final result
    const result = step3WithCarry * 100 + step2Units * 10 + step1Units;

    return {
      a,
      b,
      c,
      d,
      step1,
      step2,
      step3,
      step1Units,
      step1Tens,
      step2WithCarry,
      step2Units,
      step2Tens,
      step3WithCarry,
      result,
    };
  };

  const steps = calculateSteps();

  useEffect(() => {
    if (activeTab === "practice") {
      generatePracticeNumbers();
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f12] to-[#1a1a21] text-[#e0c9b1] p-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Vedic Mathematics: Two-Digit Multiplication
          </h1>
          <p className="text-[#e0c9b1]/80">
            Learn the ancient Indian technique of Urdhva Tiryagbhyam (Vertically
            and Crosswise) for rapid mental multiplication
          </p>
        </header>

        <Tabs
          defaultValue="learn"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-8"
        >
          <TabsList className="bg-[#e0c9b1] border border-[#0f0f12]">
            <TabsTrigger
              value="learn"
              className="data-[state=active]:bg-[#0f0f12] data-[state=active]:text-[#e0c9b1]"
            >
              Learn the Method
            </TabsTrigger>
            <TabsTrigger
              value="practice"
              className="data-[state=active]:bg-[#0f0f12] data-[state=active]:text-[#e0c9b1]"
            >
              Practice
            </TabsTrigger>
          </TabsList>

          <TabsContent value="learn" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <Card className="col-span-1 lg:col-span-2 bg-[#e0c9b1] border-[#0f0f12]">
                <CardHeader>
                  <CardTitle className="text-[#0f0f12]">
                    The Technique
                  </CardTitle>
                  <CardDescription className="text-[#0f0f12]/70">
                    Urdhva Tiryagbhyam (Vertically and Crosswise)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-[#0f0f12]">
                    This Vedic mathematics technique breaks down multiplication
                    into simple steps:
                  </p>

                  <div className="space-y-3 mt-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-[#0f0f12]/10 rounded-full p-1.5 mt-0.5">
                        <span className="text-xs font-bold text-[#0f0f12]">
                          1
                        </span>
                      </div>
                      <p className="text-[#0f0f12]">
                        Multiply the units digits (rightmost digits) of both
                        numbers
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-[#0f0f12]/10 rounded-full p-1.5 mt-0.5">
                        <span className="text-xs font-bold text-[#0f0f12]">
                          2
                        </span>
                      </div>
                      <p className="text-[#0f0f12]">
                        Cross multiply and add: (first number's tens × second
                        number's units) + (first number's units × second
                        number's tens)
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-[#0f0f12]/10 rounded-full p-1.5 mt-0.5">
                        <span className="text-xs font-bold text-[#0f0f12]">
                          3
                        </span>
                      </div>
                      <p className="text-[#0f0f12]">
                        Multiply the tens digits of both numbers
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-[#0f0f12]/10 rounded-full p-1.5 mt-0.5">
                        <span className="text-xs font-bold text-[#0f0f12]">
                          4
                        </span>
                      </div>
                      <p className="text-[#0f0f12]">
                        Arrange the results with proper place values, carrying
                        over when needed
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-1 lg:col-span-3 bg-[#e0c9b1] border-[#0f0f12]">
                <CardHeader>
                  <CardTitle className="text-[#0f0f12]">
                    Interactive Example
                  </CardTitle>
                  <CardDescription className="text-[#0f0f12]/70">
                    Follow along with the steps
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-6">
                    <div className="text-center">
                      <div className="flex justify-center items-center gap-4 text-3xl font-bold mb-4">
                        <span className="bg-[#0f0f12]/10 p-3 rounded-lg text-[#0f0f12]">
                          {firstNumber}
                        </span>
                        <span className="text-[#0f0f12]">×</span>
                        <span className="bg-[#0f0f12]/10 p-3 rounded-lg text-[#0f0f12]">
                          {secondNumber}
                        </span>
                      </div>

                      <Progress
                        value={(currentStep / 4) * 100}
                        className="h-1 mb-4 bg-[#0f0f12]/10"
                      />

                      <div className="min-h-[200px] bg-[#0f0f12] rounded-lg p-4 mb-4">
                        {currentStep === 0 && (
                          <div className="space-y-4">
                            <p className="text-[#e0c9b1]">
                              Let's break down the numbers:
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-[#1a1a21] p-3 rounded-lg">
                                <p className="text-sm mb-1 text-[#e0c9b1]">
                                  First Number: {firstNumber}
                                </p>
                                <p className="text-[#e0c9b1]">
                                  Tens: {steps.a}
                                </p>
                                <p className="text-[#e0c9b1]">
                                  Units: {steps.b}
                                </p>
                              </div>
                              <div className="bg-[#1a1a21] p-3 rounded-lg">
                                <p className="text-sm mb-1 text-[#e0c9b1]">
                                  Second Number: {secondNumber}
                                </p>
                                <p className="text-[#e0c9b1]">
                                  Tens: {steps.c}
                                </p>
                                <p className="text-[#e0c9b1]">
                                  Units: {steps.d}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {currentStep === 1 && (
                          <div className="space-y-4">
                            <p className="mb-2 text-[#e0c9b1]">
                              Step 1: Multiply the units digits
                            </p>
                            <div className="flex justify-center items-center gap-2 text-xl">
                              <span className="bg-[#1a1a21] p-2 rounded text-[#e0c9b1]">
                                {steps.b}
                              </span>
                              <span className="text-[#e0c9b1]">×</span>
                              <span className="bg-[#1a1a21] p-2 rounded text-[#e0c9b1]">
                                {steps.d}
                              </span>
                              <span className="text-[#e0c9b1]">=</span>
                              <span className="bg-[#1a1a21] p-2 rounded font-bold text-[#e0c9b1]">
                                {steps.step1}
                              </span>
                            </div>
                            <p className="mt-4 text-[#e0c9b1]">
                              This gives us the units digit of our answer:{" "}
                              <span className="font-bold">
                                {steps.step1Units}
                              </span>
                              {steps.step1Tens > 0 && (
                                <span>
                                  {" "}
                                  and we carry over{" "}
                                  <span className="font-bold">
                                    {steps.step1Tens}
                                  </span>{" "}
                                  to the next step
                                </span>
                              )}
                            </p>
                          </div>
                        )}

                        {currentStep === 2 && (
                          <div className="space-y-4">
                            <p className="mb-2 text-[#e0c9b1]">
                              Step 2: Cross multiply and add
                            </p>
                            <div className="flex flex-col items-center gap-2">
                              <div className="flex items-center gap-2 text-xl">
                                <span className="bg-[#1a1a21] p-2 rounded text-[#e0c9b1]">
                                  {steps.a}
                                </span>
                                <span className="text-[#e0c9b1]">×</span>
                                <span className="bg-[#1a1a21] p-2 rounded text-[#e0c9b1]">
                                  {steps.d}
                                </span>
                                <span className="text-[#e0c9b1]">=</span>
                                <span className="p-2 rounded text-[#e0c9b1]">
                                  {steps.a * steps.d}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xl">
                                <span className="bg-[#1a1a21] p-2 rounded text-[#e0c9b1]">
                                  {steps.b}
                                </span>
                                <span className="text-[#e0c9b1]">×</span>
                                <span className="bg-[#1a1a21] p-2 rounded text-[#e0c9b1]">
                                  {steps.c}
                                </span>
                                <span className="text-[#e0c9b1]">=</span>
                                <span className="p-2 rounded text-[#e0c9b1]">
                                  {steps.b * steps.c}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xl mt-2">
                                <span className="text-[#e0c9b1]">
                                  {steps.a * steps.d}
                                </span>
                                <span className="text-[#e0c9b1]">+</span>
                                <span className="text-[#e0c9b1]">
                                  {steps.b * steps.c}
                                </span>
                                {steps.step1Tens > 0 && (
                                  <>
                                    <span className="text-[#e0c9b1]">+</span>
                                    <span className="text-[#e0c9b1]/70">
                                      (carry) {steps.step1Tens}
                                    </span>
                                  </>
                                )}
                                <span className="text-[#e0c9b1]">=</span>
                                <span className="bg-[#1a1a21] p-2 rounded font-bold text-[#e0c9b1]">
                                  {steps.step2WithCarry}
                                </span>
                              </div>
                            </div>
                            <p className="mt-4 text-[#e0c9b1]">
                              This gives us the tens digit of our answer:{" "}
                              <span className="font-bold">
                                {steps.step2Units}
                              </span>
                              {steps.step2Tens > 0 && (
                                <span>
                                  {" "}
                                  and we carry over{" "}
                                  <span className="font-bold">
                                    {steps.step2Tens}
                                  </span>{" "}
                                  to the next step
                                </span>
                              )}
                            </p>
                          </div>
                        )}

                        {currentStep === 3 && (
                          <div className="space-y-4">
                            <p className="mb-2 text-[#e0c9b1]">
                              Step 3: Multiply the tens digits
                            </p>
                            <div className="flex justify-center items-center gap-2 text-xl">
                              <span className="bg-[#1a1a21] p-2 rounded text-[#e0c9b1]">
                                {steps.a}
                              </span>
                              <span className="text-[#e0c9b1]">×</span>
                              <span className="bg-[#1a1a21] p-2 rounded text-[#e0c9b1]">
                                {steps.c}
                              </span>
                              {steps.step2Tens > 0 && (
                                <>
                                  <span className="text-[#e0c9b1]">+</span>
                                  <span className="text-[#e0c9b1]/70">
                                    (carry) {steps.step2Tens}
                                  </span>
                                </>
                              )}
                              <span className="text-[#e0c9b1]">=</span>
                              <span className="bg-[#1a1a21] p-2 rounded font-bold text-[#e0c9b1]">
                                {steps.step3WithCarry}
                              </span>
                            </div>
                            <p className="mt-4 text-[#e0c9b1]">
                              This gives us the hundreds digits of our answer:{" "}
                              <span className="font-bold">
                                {steps.step3WithCarry}
                              </span>
                            </p>
                          </div>
                        )}

                        {currentStep === 4 && (
                          <div className="space-y-4">
                            <p className="mb-2 text-[#e0c9b1]">
                              Final Result: Combining all steps
                            </p>
                            <div className="flex flex-col items-center gap-4">
                              <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="bg-[#1a1a21] p-2 rounded">
                                  <p className="text-xs mb-1 text-[#e0c9b1]">
                                    Hundreds
                                  </p>
                                  <p className="font-bold text-[#e0c9b1]">
                                    {steps.step3WithCarry}
                                  </p>
                                </div>
                                <div className="bg-[#1a1a21] p-2 rounded">
                                  <p className="text-xs mb-1 text-[#e0c9b1]">
                                    Tens
                                  </p>
                                  <p className="font-bold text-[#e0c9b1]">
                                    {steps.step2Units}
                                  </p>
                                </div>
                                <div className="bg-[#1a1a21] p-2 rounded">
                                  <p className="text-xs mb-1 text-[#e0c9b1]">
                                    Units
                                  </p>
                                  <p className="font-bold text-[#e0c9b1]">
                                    {steps.step1Units}
                                  </p>
                                </div>
                              </div>

                              <div className="text-2xl font-bold mt-2 text-[#e0c9b1]">
                                {firstNumber} × {secondNumber} ={" "}
                                <span className="text-[#e0c9b1]">
                                  {steps.result}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={resetTutorial}
                    disabled={currentStep === 0}
                    className="border-[#0f0f12] text-[#0f0f12] hover:bg-[#0f0f12]/10"
                  >
                    Reset
                  </Button>

                  <Button
                    onClick={() =>
                      currentStep < 4
                        ? setCurrentStep(currentStep + 1)
                        : resetTutorial()
                    }
                    className="bg-[#0f0f12] text-[#e0c9b1] hover:bg-[#0f0f12]/90"
                  >
                    {currentStep < 4 ? (
                      <>
                        Next Step <ChevronRight className="ml-1 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Try Again <RefreshCw className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card className="mt-6 bg-[#e0c9b1] border-[#0f0f12]">
              <CardHeader>
                <CardTitle className="text-[#0f0f12]">
                  Visual Representation
                </CardTitle>
                <CardDescription className="text-[#0f0f12]/70">
                  See how the Vedic method works visually
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-[#0f0f12]">
                      Traditional Method
                    </h3>
                    <div className="bg-[#0f0f12] p-4 rounded-lg">
                      <div className="flex justify-end mb-2">
                        <div className="w-24 text-right">
                          <div className="font-mono text-[#e0c9b1]">
                            {firstNumber}
                          </div>
                          <div className="font-mono text-[#e0c9b1]">
                            × {secondNumber}
                          </div>
                          <Separator className="my-1 bg-[#e0c9b1]/30" />
                          {(secondNumber % 10) * firstNumber !== 0 && (
                            <div className="font-mono text-[#e0c9b1]">
                              {(secondNumber % 10) * firstNumber}
                            </div>
                          )}
                          {Math.floor(secondNumber / 10) * firstNumber !==
                            0 && (
                            <div className="font-mono text-[#e0c9b1]">
                              {Math.floor(secondNumber / 10) * firstNumber}0
                            </div>
                          )}
                          {((secondNumber % 10) * firstNumber !== 0 ||
                            Math.floor(secondNumber / 10) * firstNumber !==
                              0) && (
                            <Separator className="my-1 bg-[#e0c9b1]/30" />
                          )}
                          <div className="font-mono font-bold text-[#e0c9b1]">
                            {firstNumber * secondNumber}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm mt-4 text-[#e0c9b1]/70">
                        The traditional method requires multiple steps of
                        multiplication and addition
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-[#0f0f12]">
                      Vedic Method
                    </h3>
                    <div className="bg-[#0f0f12] p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-sm mb-1 text-[#e0c9b1]">
                            First Number
                          </div>
                          <div className="flex justify-center gap-2">
                            <div className="bg-[#1a1a21] w-10 h-10 flex items-center justify-center rounded text-[#e0c9b1]">
                              {steps.a}
                            </div>
                            <div className="bg-[#1a1a21] w-10 h-10 flex items-center justify-center rounded text-[#e0c9b1]">
                              {steps.b}
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm mb-1 text-[#e0c9b1]">
                            Second Number
                          </div>
                          <div className="flex justify-center gap-2">
                            <div className="bg-[#1a1a21] w-10 h-10 flex items-center justify-center rounded text-[#e0c9b1]">
                              {steps.c}
                            </div>
                            <div className="bg-[#1a1a21] w-10 h-10 flex items-center justify-center rounded text-[#e0c9b1]">
                              {steps.d}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center mb-6">
                        <svg
                          width="200"
                          height="120"
                          viewBox="0 0 200 120"
                          className="text-[#e0c9b1]"
                        >
                          {/* Vertical lines */}
                          <line
                            x1="80"
                            y1="10"
                            x2="80"
                            y2="110"
                            stroke="currentColor"
                            strokeOpacity="0.3"
                          />
                          <line
                            x1="120"
                            y1="10"
                            x2="120"
                            y2="110"
                            stroke="currentColor"
                            strokeOpacity="0.3"
                          />

                          {/* Horizontal lines */}
                          <line
                            x1="40"
                            y1="40"
                            x2="160"
                            y2="40"
                            stroke="currentColor"
                            strokeOpacity="0.3"
                          />
                          <line
                            x1="40"
                            y1="80"
                            x2="160"
                            y2="80"
                            stroke="currentColor"
                            strokeOpacity="0.3"
                          />

                          {/* Diagonal lines for cross multiplication */}
                          <line
                            x1="80"
                            y1="40"
                            x2="120"
                            y2="80"
                            stroke="currentColor"
                            strokeOpacity="0.5"
                            strokeWidth="1.5"
                          />
                          <line
                            x1="120"
                            y1="40"
                            x2="80"
                            y2="80"
                            stroke="currentColor"
                            strokeOpacity="0.5"
                            strokeWidth="1.5"
                          />

                          {/* Numbers */}
                          <text
                            x="60"
                            y="30"
                            textAnchor="middle"
                            fill="currentColor"
                            fontSize="16"
                          >
                            {steps.a}
                          </text>
                          <text
                            x="100"
                            y="30"
                            textAnchor="middle"
                            fill="currentColor"
                            fontSize="16"
                          >
                            {steps.b}
                          </text>
                          <text
                            x="60"
                            y="70"
                            textAnchor="middle"
                            fill="currentColor"
                            fontSize="16"
                          >
                            {steps.c}
                          </text>
                          <text
                            x="100"
                            y="70"
                            textAnchor="middle"
                            fill="currentColor"
                            fontSize="16"
                          >
                            {steps.d}
                          </text>

                          {/* Results */}
                          <text
                            x="60"
                            y="100"
                            textAnchor="middle"
                            fill="currentColor"
                            fontSize="14"
                            fontWeight="bold"
                          >
                            {steps.step3}
                          </text>
                          <text
                            x="100"
                            y="100"
                            textAnchor="middle"
                            fill="currentColor"
                            fontSize="14"
                            fontWeight="bold"
                          >
                            {steps.step2}
                          </text>
                          <text
                            x="140"
                            y="100"
                            textAnchor="middle"
                            fill="currentColor"
                            fontSize="14"
                            fontWeight="bold"
                          >
                            {steps.step1}
                          </text>
                        </svg>
                      </div>

                      <div className="text-center">
                        <div className="text-sm mb-2 text-[#e0c9b1]">
                          Final Result (with carries)
                        </div>
                        <div className="flex justify-center gap-2">
                          <div className="bg-[#1a1a21] w-10 h-10 flex items-center justify-center rounded font-bold text-[#e0c9b1]">
                            {steps.step3WithCarry}
                          </div>
                          <div className="bg-[#1a1a21] w-10 h-10 flex items-center justify-center rounded font-bold text-[#e0c9b1]">
                            {steps.step2Units}
                          </div>
                          <div className="bg-[#1a1a21] w-10 h-10 flex items-center justify-center rounded font-bold text-[#e0c9b1]">
                            {steps.step1Units}
                          </div>
                          <div className="text-xl font-bold flex items-center ml-2 text-[#e0c9b1]">
                            =
                          </div>
                          <div className="bg-[#1a1a21] px-3 h-10 flex items-center justify-center rounded font-bold text-[#e0c9b1]">
                            {steps.result}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="practice" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="col-span-1 lg:col-span-2 bg-[#e0c9b1] border-[#0f0f12]">
                <CardHeader>
                  <CardTitle className="text-[#0f0f12]">
                    Practice Your Skills
                  </CardTitle>
                  <CardDescription className="text-[#0f0f12]/70">
                    Try multiplying these two-digit numbers using the Vedic
                    method
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="flex justify-center items-center gap-4 text-3xl font-bold mb-6">
                      <span className="bg-[#0f0f12]/10 p-3 rounded-lg text-[#0f0f12]">
                        {firstNumber}
                      </span>
                      <span className="text-[#0f0f12]">×</span>
                      <span className="bg-[#0f0f12]/10 p-3 rounded-lg text-[#0f0f12]">
                        {secondNumber}
                      </span>
                    </div>

                    <div className="w-full max-w-xs mb-6">
                      <label
                        htmlFor="answer"
                        className="block text-sm font-medium mb-2 text-[#0f0f12]"
                      >
                        Your Answer
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          id="answer"
                          value={userAnswer}
                          onChange={(e) => setUserAnswer(e.target.value)}
                          className="w-full bg-[#0f0f12] border border-[#e0c9b1]/20 rounded-md px-3 py-2 text-[#e0c9b1] focus:outline-none focus:ring-2 focus:ring-[#e0c9b1]/30"
                          placeholder="Enter your answer"
                          disabled={showAnswer}
                        />
                        {!showAnswer && (
                          <Button
                            onClick={checkAnswer}
                            disabled={!userAnswer}
                            className="bg-[#0f0f12] text-[#e0c9b1] hover:bg-[#0f0f12]/90"
                          >
                            Check
                          </Button>
                        )}
                      </div>
                    </div>

                    {showAnswer && (
                      <div
                        className={cn(
                          "w-full max-w-md p-4 rounded-lg mb-6",
                          Number.parseInt(userAnswer) ===
                            firstNumber * secondNumber
                            ? "bg-[#2d4a3e]/30 border border-[#2d4a3e]"
                            : "bg-[#4a2d2d]/30 border border-[#4a2d2d]"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {Number.parseInt(userAnswer) ===
                          firstNumber * secondNumber ? (
                            <>
                              <Check className="h-5 w-5 text-green-400" />
                              <span className="font-medium text-green-400">
                                Correct!
                              </span>
                            </>
                          ) : (
                            <>
                              <Info className="h-5 w-5 text-red-400" />
                              <span className="font-medium text-red-400">
                                Not quite right. The correct answer is{" "}
                                {firstNumber * secondNumber}
                              </span>
                            </>
                          )}
                        </div>

                        <Button
                          onClick={nextPractice}
                          className="w-full mt-2 bg-[#0f0f12] text-[#e0c9b1] hover:bg-[#0f0f12]/90"
                        >
                          Next Problem <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    )}

                    {!showAnswer && (
                      <Button
                        variant="outline"
                        onClick={() => setShowHint(!showHint)}
                        className="mb-4 border-[#0f0f12] text-[#0f0f12] hover:bg-[#0f0f12]/10"
                      >
                        {showHint ? "Hide Hint" : "Show Hint"}
                      </Button>
                    )}

                    {showHint && !showAnswer && (
                      <div className="w-full max-w-md bg-[#0f0f12] p-4 rounded-lg mb-6">
                        <h4 className="font-medium mb-2 text-[#e0c9b1]">
                          Hint:
                        </h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-[#e0c9b1]">
                          <li>
                            Break down {firstNumber} into{" "}
                            {Math.floor(firstNumber / 10)} and{" "}
                            {firstNumber % 10}
                          </li>
                          <li>
                            Break down {secondNumber} into{" "}
                            {Math.floor(secondNumber / 10)} and{" "}
                            {secondNumber % 10}
                          </li>
                          <li>
                            Multiply the units digits: {firstNumber % 10} ×{" "}
                            {secondNumber % 10}
                          </li>
                          <li>
                            Cross multiply and add: (
                            {Math.floor(firstNumber / 10)} × {secondNumber % 10}
                            ) + ({firstNumber % 10} ×{" "}
                            {Math.floor(secondNumber / 10)})
                          </li>
                          <li>
                            Multiply the tens digits:{" "}
                            {Math.floor(firstNumber / 10)} ×{" "}
                            {Math.floor(secondNumber / 10)}
                          </li>
                        </ol>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#e0c9b1] border-[#0f0f12]">
                <CardHeader>
                  <CardTitle className="text-[#0f0f12]">
                    Your Progress
                  </CardTitle>
                  <CardDescription className="text-[#0f0f12]/70">
                    Track your learning journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-[#0f0f12]">
                      <span>Correct Answers</span>
                      <span className="font-medium">
                        {practiceScore}/{practiceTotal}
                      </span>
                    </div>
                    <Progress
                      value={
                        practiceTotal > 0
                          ? (practiceScore / practiceTotal) * 100
                          : 0
                      }
                      className="h-2 bg-[#0f0f12]/10"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-[#0f0f12] rounded-lg">
                      <div className="bg-[#1a1a21] p-2 rounded-full">
                        <Brain className="h-5 w-5 text-[#e0c9b1]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#e0c9b1]">
                          Learning Progress
                        </div>
                        <div className="text-xs text-[#e0c9b1]/70">
                          Technique mastery
                        </div>
                      </div>
                      <div className="ml-auto font-medium text-[#e0c9b1]">
                        {practiceTotal >= 10
                          ? "Advanced"
                          : practiceTotal >= 5
                          ? "Intermediate"
                          : "Beginner"}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-[#0f0f12] rounded-lg">
                      <div className="bg-[#1a1a21] p-2 rounded-full">
                        <Calculator className="h-5 w-5 text-[#e0c9b1]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#e0c9b1]">
                          Problems Solved
                        </div>
                        <div className="text-xs text-[#e0c9b1]/70">
                          Total attempts
                        </div>
                      </div>
                      <div className="ml-auto font-medium text-[#e0c9b1]">
                        {practiceTotal}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-[#0f0f12] rounded-lg">
                      <div className="bg-[#1a1a21] p-2 rounded-full">
                        <Trophy className="h-5 w-5 text-[#e0c9b1]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[#e0c9b1]">
                          Accuracy Rate
                        </div>
                        <div className="text-xs text-[#e0c9b1]/70">
                          Correct answers
                        </div>
                      </div>
                      <div className="ml-auto font-medium text-[#e0c9b1]">
                        {practiceTotal > 0
                          ? `${Math.round(
                              (practiceScore / practiceTotal) * 100
                            )}%`
                          : "N/A"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
