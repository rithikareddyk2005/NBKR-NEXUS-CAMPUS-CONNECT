import React, { useState } from 'react';
import {
  Sparkles,
  ThumbsUp,
  MessageSquare,
  Plus,
  CheckCircle2,
  Clock,
  Filter,
  Lightbulb,
  Award
} from 'lucide-react';
import { StudentIdea } from '../data/extendedData';
import { apiService } from '../services/api';

interface IdeasAndFeedbackProps {
  ideas: StudentIdea[];
  onRefresh: () => void;
}

export const IdeasAndFeedback: React.FC<IdeasAndFeedbackProps> = ({ ideas, onRefresh }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'ACADEMICS' | 'FACILITIES' | 'TECHNOLOGY' | 'DINING' | 'CAMPUS_LIFE'>('FACILITIES');
  const [newDescription, setNewDescription] = useState('');
  const [upvotedIds, setUpvotedIds] = useState<string[]>([]);

  const categories = ['ALL', 'ACADEMICS', 'FACILITIES', 'TECHNOLOGY', 'DINING', 'CAMPUS_LIFE'];

  const filteredIdeas = ideas.filter(idea => {
    return selectedCategory === 'ALL' || idea.category === selectedCategory;
  });

  const handleUpvote = async (id: string) => {
    if (upvotedIds.includes(id)) return;
    try {
      await apiService.upvoteIdea(id);
      setUpvotedIds(prev => [...prev, id]);
      onRefresh();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    try {
      await apiService.submitIdea({
        title: newTitle,
        category: newCategory,
        description: newDescription,
        submittedBy: 'Student Voice'
      });
      setShowSubmitModal(false);
      setNewTitle('');
      setNewDescription('');
      onRefresh();
      alert('Your idea has been published to the Campus Innovation Box.');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-semibold">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            Campus Voice &amp; Innovation Crowdsourcing
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Student Ideas &amp; Campus Feedback Box
          </h2>
          <p className="text-xs text-slate-300">
            Propose institutional improvements, upvote peer proposals, and track official administration implementation responses.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowSubmitModal(true)}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          Propose Campus Idea
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-800 no-scrollbar text-xs">
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Grid of Ideas */}
      <div className="space-y-4">
        {filteredIdeas.map(idea => {
          const hasUpvoted = upvotedIds.includes(idea.id);

          return (
            <div
              key={idea.id}
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start justify-between gap-4"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {idea.category}
                  </span>

                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      idea.status === 'APPROVED' || idea.status === 'IMPLEMENTED'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : idea.status === 'IN_DEVELOPMENT'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    ● {idea.status.replace('_', ' ')}
                  </span>

                  <span className="text-[11px] text-slate-400">
                    Proposed by {idea.submittedBy} • {idea.dateSubmitted}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white">{idea.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{idea.description}</p>

                {idea.adminResponse && (
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 text-xs mt-2">
                    <span className="text-emerald-400 font-bold block text-[10px] uppercase tracking-wider mb-0.5">
                      Official Administration Action:
                    </span>
                    <span className="text-slate-300">{idea.adminResponse}</span>
                  </div>
                )}
              </div>

              {/* Upvote Button Column */}
              <div className="shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => handleUpvote(idea.id)}
                  disabled={hasUpvoted}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
                    hasUpvoted
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 cursor-default'
                      : 'bg-slate-950 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${hasUpvoted ? 'text-amber-400 fill-amber-400' : ''}`} />
                  <span>{idea.upvotes} Upvotes</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Submit Idea */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                Propose Campus Improvement Idea
              </h3>
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                >
                  <option value="ACADEMICS">ACADEMICS (Curriculum, Labs, Exams)</option>
                  <option value="FACILITIES">FACILITIES (Hostels, Power, Library)</option>
                  <option value="TECHNOLOGY">TECHNOLOGY (Wi-Fi, Nexus Portal, LMS)</option>
                  <option value="DINING">DINING (Cafeteria Menu, Pricing)</option>
                  <option value="CAMPUS_LIFE">CAMPUS LIFE (Sports, Clubs, Events)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Proposal Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Set up 24/7 quiet study stacks in Library"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Detailed Explanation &amp; Benefits</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your suggestion and how it benefits students and faculty..."
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                >
                  Post Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
