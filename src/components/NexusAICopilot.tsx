import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  Bot,
  User,
  RefreshCw,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { ChatMessage, StudentProfile, AISourceCitation } from '../types';
import { apiService } from '../services/api';

interface NexusAICopilotProps {
  currentStudent: StudentProfile;
}

export const NexusAICopilot: React.FC<NexusAICopilotProps> = ({ currentStudent }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'assistant',
      content: `### Welcome to NBKR Nexus AI Intelligence Engine 🎓\n\nI am the institutional copilot for **N.B.K.R. Institute of Science & Technology** (Autonomous, affiliated to JNTUA).\n\nI operate under strict data governance: I cite verified sources for institutional queries, and clearly delineate demonstration data.\n\n**Quick inquiries you can ask:**\n* What is the approved 2026–27 intake for B.Tech CSE and AIDS?\n* Who are the Heads of Departments (HODs) and Exam Controller?\n* Evaluate my profile eligibility for the TechNova Solutions placement drive.\n* What campus facilities, library resources, and Wi-Fi infrastructure exist?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: [
        {
          title: 'NBKRIST Official Institutional Portal',
          url: 'https://www.nbkrist.org/',
          data_environment: 'OFFICIAL_NBKR',
          verification_status: 'VERIFIED'
        }
      ]
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputMessage;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await apiService.sendChatMessage(
        query,
        'institutional',
        currentStudent.student_id
      );

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: response.sources
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (e: any) {
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: 'Apologies, an error occurred while connecting to the campus intelligence server.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'What is the approved 2026-27 intake for B.Tech CSE & AIDS?',
    'Who is the HOD of Computer Science & Engineering?',
    'Am I eligible for TechNova Solutions with my profile?',
    'Tell me about campus facilities, library books & Wi-Fi speed',
    'What are the Exam Cell circulars and autonomous regulations?'
  ];

  return (
    <div className="h-[calc(100vh-210px)] min-h-[550px] flex flex-col rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
      {/* Copilot Header */}
      <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-white tracking-tight">Nexus AI Copilot</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Gemini 3.8 Flash RAG
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Grounded on audited NBKRIST institutional records &amp; student intelligence models
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setMessages([messages[0]]);
          }}
          className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors text-xs flex items-center gap-1.5"
          title="Reset conversation"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear Chat</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-3xl ${
              msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold ${
                msg.role === 'user'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              }`}
            >
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble Content */}
            <div className="space-y-2">
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none space-y-2.5'
                }`}
              >
                {/* Parse simple markdown lines */}
                <div className="space-y-1.5 whitespace-pre-wrap">
                  {msg.content.split('\n').map((line, idx) => {
                    if (line.startsWith('### ')) {
                      return <h4 key={idx} className="font-extrabold text-amber-400 text-sm mt-1">{line.replace('### ', '')}</h4>;
                    }
                    if (line.startsWith('* ') || line.startsWith('- ')) {
                      return (
                        <div key={idx} className="flex items-start gap-2 ml-1">
                          <span className="text-amber-400 mt-1">•</span>
                          <span>{line.replace(/^(\*|-)\s+/, '')}</span>
                        </div>
                      );
                    }
                    return <p key={idx}>{line}</p>;
                  })}
                </div>

                <div
                  className={`text-[10px] text-right ${
                    msg.role === 'user' ? 'text-slate-900/70' : 'text-slate-500'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {/* Source-Citation Card (Section 31 & 41 Compliance) */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span>Cited Sources &amp; Governance Verification:</span>
                  </div>

                  {msg.sources.map((src, sIdx) => {
                    const isOfficial = src.data_environment === 'OFFICIAL_NBKR';

                    return (
                      <div
                        key={sIdx}
                        className={`p-2 rounded-lg border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 ${
                          isOfficial
                            ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                            : 'bg-amber-950/20 border-amber-800/40 text-amber-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isOfficial ? (
                            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                          )}
                          <div>
                            <span className="font-bold text-xs">{src.title}</span>
                            <div className="text-[10px] text-slate-400">
                              {isOfficial ? (
                                <span className="text-emerald-400 font-semibold">
                                  Verified Institutional Information
                                </span>
                              ) : (
                                <span className="text-amber-400 font-semibold">
                                  This response uses NBKR Nexus demonstration data
                                </span>
                              )}
                              {src.note && <span> • {src.note}</span>}
                            </div>
                          </div>
                        </div>

                        {src.url && (
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] font-mono text-amber-400 hover:text-amber-300 shrink-0 inline-flex items-center gap-1 underline underline-offset-2"
                          >
                            <span>Inspect Source</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 mr-auto">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-400 text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              Nexus AI is synthesizing grounded response...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 bg-slate-950 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] text-slate-400 font-bold uppercase shrink-0">Prompts:</span>
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(qp)}
            className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 whitespace-nowrap transition-colors"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-4 bg-slate-950 border-t border-slate-800">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask about NBKRIST courses, intake, HODs, facilities, or placement eligibility..."
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !inputMessage.trim()}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all disabled:opacity-50"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
