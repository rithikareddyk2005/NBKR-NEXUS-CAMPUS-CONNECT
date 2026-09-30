import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Send
} from 'lucide-react';
import { MockQuestion } from '../data/extendedData';

interface MockAssessmentsProps {
  questions: MockQuestion[];
}

export const MockAssessments: React.FC<MockAssessmentsProps> = ({ questions }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQ = questions[currentIdx];

  const handleSelectOption = (qId: number, optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            Campus Placement Preparation &amp; Readiness
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Mock Technical Assessments &amp; Skill Diagnostics
          </h2>
          <p className="text-xs text-slate-300">
            Simulate actual campus screening rounds for TechNova, DataSphere, and top product recruiters.
          </p>
        </div>

        {isSubmitted && (
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Retake Diagnostic Test
          </button>
        )}
      </div>

      {/* Quiz Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Question Navigator */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider">Diagnostic Modules</span>
              <span className="text-amber-400 font-mono">
                {Object.keys(selectedAnswers).length} of {questions.length} Answered
              </span>
            </div>

            <div className="space-y-2">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIdx;
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isCorrect = isSubmitted && selectedAnswers[q.id] === q.correctIndex;
                const isWrong = isSubmitted && isAnswered && !isCorrect;

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      isCurrent
                        ? 'bg-slate-800 border-amber-500 text-white'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-semibold truncate max-w-[170px]">{q.topic}</span>
                    </div>

                    {isSubmitted ? (
                      isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )
                    ) : (
                      isAnswered && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      )
                    )}
                  </button>
                );
              })}
            </div>

            {/* Score Banner when Submitted */}
            {isSubmitted && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Assessment Score</div>
                <div className="text-3xl font-black text-amber-400">
                  {calculateScore()} / {questions.length}
                </div>
                <div className="text-xs text-emerald-400 font-semibold">
                  {calculateScore() >= 4 ? 'Placement Screening Cleared! 🎉' : 'Needs Preparation in Core Topics'}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Question Content */}
        <div className="lg:col-span-8">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                  Question {currentIdx + 1} of {questions.length}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{currentQ.topic}</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                {currentQ.difficulty}
              </span>
            </div>

            {/* Question Text */}
            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentQ.id] === optIdx;
                const isCorrect = currentQ.correctIndex === optIdx;

                let style = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700';

                if (isSubmitted) {
                  if (isCorrect) {
                    style = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold';
                  } else if (isSelected && !isCorrect) {
                    style = 'bg-red-950/40 border-red-500 text-red-300 font-bold';
                  }
                } else if (isSelected) {
                  style = 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold';
                }

                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectOption(currentQ.id, optIdx)}
                    className={`p-3.5 rounded-xl border cursor-pointer text-xs sm:text-sm flex items-center justify-between transition-all ${style}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-mono text-xs">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {isSubmitted && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Explanation box after submission */}
            {isSubmitted && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                <span className="text-amber-400 font-bold uppercase text-[10px] tracking-wider block">
                  Technical Explanation:
                </span>
                <p className="text-slate-300 leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold disabled:opacity-40"
              >
                Previous
              </button>

              <div className="flex items-center gap-2">
                {currentIdx < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIdx(prev => prev + 1)}
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                  >
                    Next Question
                  </button>
                ) : (
                  !isSubmitted && (
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(true)}
                      className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20"
                    >
                      Submit Assessment
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
