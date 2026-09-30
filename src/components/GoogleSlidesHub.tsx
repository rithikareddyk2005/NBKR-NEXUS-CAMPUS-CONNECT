import React, { useState, useEffect } from 'react';
import {
  Presentation,
  Plus,
  ExternalLink,
  RefreshCw,
  LogOut,
  Sparkles,
  FileText,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Play,
  Monitor,
  Eye,
  Sliders,
  FolderOpen
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  initAuth,
  googleSignIn,
  googleSignOut,
  getAccessToken
} from '../services/googleAuth';
import {
  googleSlidesService,
  GoogleSlidePresentationItem,
  GooglePresentationDetails
} from '../services/googleSlidesService';

// Fallback demo presentations for immediate exploration
const SAMPLE_CAMPUS_DECKS: GoogleSlidePresentationItem[] = [
  {
    id: 'sample-deck-1',
    name: 'NBKRIST Autonomous B.Tech Capstone Project Defense',
    modifiedTime: new Date().toISOString(),
    webViewLink: 'https://docs.google.com/presentation',
    slideCount: 12
  },
  {
    id: 'sample-deck-2',
    name: 'TechNova Solutions On-Campus Recruitment Pitch',
    modifiedTime: new Date(Date.now() - 86400000).toISOString(),
    webViewLink: 'https://docs.google.com/presentation',
    slideCount: 8
  },
  {
    id: 'sample-deck-3',
    name: 'PARAMA 2026 National Symposium Paper Presentation',
    modifiedTime: new Date(Date.now() - 172800000).toISOString(),
    webViewLink: 'https://docs.google.com/presentation',
    slideCount: 15
  }
];

export const GoogleSlidesHub: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [presentations, setPresentations] = useState<GoogleSlidePresentationItem[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<GoogleSlidePresentationItem | null>(null);
  const [deckDetails, setDeckDetails] = useState<GooglePresentationDetails | null>(null);

  // Confirmation Dialog States (Mandatory requirement for Workspace mutations)
  const [pendingAction, setPendingAction] = useState<{
    type: 'CREATE_DECK' | 'ADD_SLIDE';
    title: string;
    description: string;
    payload?: any;
  } | null>(null);

  const [newDeckTitle, setNewDeckTitle] = useState('NBKRIST Capstone Project Presentation');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = initAuth(
      (currentUser, currentToken) => {
        setUser(currentUser);
        setToken(currentToken);
        fetchUserPresentations(currentToken);
      },
      () => {
        setUser(null);
        setToken(null);
        setPresentations(SAMPLE_CAMPUS_DECKS);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await googleSignIn();
      setUser(result.user);
      setToken(result.accessToken);
      await fetchUserPresentations(result.accessToken);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Google sign-in was interrupted. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await googleSignOut();
    setUser(null);
    setToken(null);
    setSelectedDeck(null);
    setDeckDetails(null);
    setPresentations(SAMPLE_CAMPUS_DECKS);
  };

  const fetchUserPresentations = async (accessToken: string) => {
    setLoading(true);
    setError(null);
    try {
      const items = await googleSlidesService.listPresentations(accessToken);
      if (items.length > 0) {
        setPresentations(items);
        setSelectedDeck(items[0]);
      } else {
        setPresentations(SAMPLE_CAMPUS_DECKS);
      }
    } catch (err: any) {
      console.warn('Could not list drive presentations, falling back to sample campus decks:', err);
      setPresentations(SAMPLE_CAMPUS_DECKS);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDeck = async (deck: GoogleSlidePresentationItem) => {
    setSelectedDeck(deck);
    if (!token || deck.id.startsWith('sample-')) {
      setDeckDetails({
        presentationId: deck.id,
        title: deck.name,
        slides: [
          { objectId: 's1' },
          { objectId: 's2' },
          { objectId: 's3' },
          { objectId: 's4' }
        ]
      });
      return;
    }

    try {
      const details = await googleSlidesService.getPresentation(token, deck.id);
      setDeckDetails(details);
    } catch (e) {
      console.error(e);
    }
  };

  // Trigger Creation with Explicit User Confirmation Dialog
  const triggerCreateDeck = (title: string) => {
    setPendingAction({
      type: 'CREATE_DECK',
      title: 'Create New Google Slides Presentation',
      description: `This will create a new presentation titled "${title}" in your Google Drive account with full edit permissions.`,
      payload: { title }
    });
  };

  // Execute Mutating Operation once confirmed by user
  const executePendingAction = async () => {
    if (!pendingAction || !token) return;

    setLoading(true);
    setError(null);

    try {
      if (pendingAction.type === 'CREATE_DECK') {
        const created = await googleSlidesService.createPresentation(token, pendingAction.payload.title);
        const newItem: GoogleSlidePresentationItem = {
          id: created.presentationId,
          name: created.title,
          modifiedTime: new Date().toISOString(),
          webViewLink: `https://docs.google.com/presentation/d/${created.presentationId}/edit`
        };

        setPresentations(prev => [newItem, ...prev]);
        setSelectedDeck(newItem);
        setPendingAction(null);
        setShowCreateModal(false);
        alert(`Presentation "${created.title}" successfully created in your Google Drive.`);
      }
    } catch (err: any) {
      setError(err.message || 'Operation failed. Please verify your permissions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-semibold">
            <Presentation className="w-3.5 h-3.5 text-amber-400" />
            Google Workspace Presentation Studio
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            NBKR Nexus • Google Slides Hub
          </h2>
          <p className="text-xs text-slate-300">
            Create, present, and collaborate on academic project presentations, seminar slide decks, and recruitment pitch decks directly integrated with your Google Account.
          </p>
        </div>

        {/* Auth Button or Profile Info */}
        <div className="shrink-0">
          {!user ? (
            <button
              type="button"
              onClick={handleSignIn}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center gap-3 shadow-lg shadow-black/40 transition-all border border-slate-300"
            >
              {/* Official Google 'G' Mark SVG */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{loading ? 'Connecting Google...' : 'Sign in with Google'}</span>
            </button>
          ) : (
            <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-950 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs overflow-hidden border border-amber-500/40">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'Google User'} className="w-full h-full object-cover" />
                ) : (
                  user.displayName?.charAt(0) || 'G'
                )}
              </div>
              <div className="text-left text-xs">
                <div className="font-bold text-white truncate max-w-[140px]">{user.displayName || 'Google Account'}</div>
                <div className="text-[10px] text-slate-400 truncate max-w-[140px]">{user.email}</div>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-900 transition-colors"
                title="Disconnect Google"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-xs text-red-300 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Layout: Left Presentations List, Right Deck Viewer & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Presentations List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-amber-400" />
                {user ? 'Google Drive Presentations' : 'Sample Campus Decks'}
              </h3>

              {user && (
                <button
                  type="button"
                  onClick={() => token && fetchUserPresentations(token)}
                  className="p-1 rounded text-slate-400 hover:text-white"
                  title="Refresh list"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Create Button */}
            <button
              type="button"
              onClick={() => {
                if (!user) {
                  alert('Please sign in with your Google account first to create and save presentations in Google Slides.');
                  return;
                }
                setShowCreateModal(true);
              }}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              New Google Slides Presentation
            </button>

            {/* List */}
            <div className="space-y-2 max-h-[480px] overflow-y-auto no-scrollbar">
              {presentations.map(deck => {
                const isSelected = selectedDeck?.id === deck.id;

                return (
                  <div
                    key={deck.id}
                    onClick={() => handleSelectDeck(deck)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-slate-950 border-amber-500 text-white'
                        : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 mb-1.5">
                      <Presentation className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div className="font-semibold text-xs leading-snug line-clamp-2">
                        {deck.name}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pl-6">
                      <span>{deck.modifiedTime ? new Date(deck.modifiedTime).toLocaleDateString() : 'Active'}</span>
                      {deck.webViewLink && (
                        <a
                          href={deck.webViewLink}
                          target="_blank"
                          rel="noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="text-amber-400 hover:underline flex items-center gap-1"
                        >
                          Open in Slides <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Deck Viewer & Presentation Tools */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
            {selectedDeck ? (
              <>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                      Google Slides Presentation
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">{selectedDeck.name}</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedDeck.webViewLink && (
                      <a
                        href={selectedDeck.webViewLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                        Edit in Google Slides
                      </a>
                    )}
                  </div>
                </div>

                {/* Embedded Presentation Canvas Simulator */}
                <div className="relative aspect-video w-full rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center p-8 overflow-hidden shadow-inner group">
                  {selectedDeck.id.startsWith('sample-') ? (
                    <div className="text-center space-y-3 max-w-md">
                      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
                        <Monitor className="w-8 h-8" />
                      </div>
                      <h4 className="text-base font-extrabold text-white">{selectedDeck.name}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Interactive Google Slides Viewer. Connect your Google account to embed and control live presentations, or open directly in Google Workspace.
                      </p>
                      <div className="flex items-center justify-center gap-2 pt-2">
                        <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-[11px] text-slate-300 font-mono">
                          16:9 Widescreen Layout
                        </span>
                        <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-[11px] text-amber-400 font-mono">
                          NBKRIST Academic Template
                        </span>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      src={`https://docs.google.com/presentation/d/${selectedDeck.id}/embed?start=false&loop=false&delayms=3000`}
                      className="w-full h-full border-0 rounded-xl"
                      allowFullScreen
                      title="Google Slides Presentation"
                    />
                  )}
                </div>

                {/* Campus Presentation Quick Templates */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-3">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Generate Campus Standard Slide Decks
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (!user) {
                          alert('Sign in with Google to create this deck in your Google Drive.');
                          return;
                        }
                        triggerCreateDeck('NBKRIST B.Tech Final Year Capstone Defense');
                      }}
                      className="p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-left transition-all"
                    >
                      <div className="font-bold text-xs text-white mb-1">Capstone Defense</div>
                      <div className="text-[11px] text-slate-400">Architecture, Results, Conclusion</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (!user) {
                          alert('Sign in with Google to create this deck in your Google Drive.');
                          return;
                        }
                        triggerCreateDeck('TechNova / Campus Placement Pitch');
                      }}
                      className="p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-left transition-all"
                    >
                      <div className="font-bold text-xs text-white mb-1">Placement Pitch</div>
                      <div className="text-[11px] text-slate-400">Skills, Live Projects, ATS Resume</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (!user) {
                          alert('Sign in with Google to create this deck in your Google Drive.');
                          return;
                        }
                        triggerCreateDeck('PARAMA 2026 Research Symposium Abstract');
                      }}
                      className="p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-left transition-all"
                    >
                      <div className="font-bold text-xs text-white mb-1">Symposium Research</div>
                      <div className="text-[11px] text-slate-400">IEEE Format, Methodology, Data</div>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-16 text-slate-400">
                <Presentation className="w-12 h-12 mx-auto text-slate-600 mb-3" />
                <h4 className="text-sm font-bold text-white">No Slide Deck Selected</h4>
                <p className="text-xs text-slate-400 mt-1">Select a presentation on the left or create a new one.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mandatory User Confirmation Dialog for Workspace Mutations */}
      {pendingAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-amber-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-white">{pendingAction.title}</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {pendingAction.description}
            </p>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
              Target Scope: <span className="font-mono text-amber-300">https://www.googleapis.com/auth/presentations</span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                disabled={loading}
                onClick={() => setPendingAction(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={executePendingAction}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20"
              >
                {loading ? 'Creating...' : 'Confirm & Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create Custom Deck */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Presentation className="w-5 h-5 text-amber-400" />
              New Google Slides Presentation
            </h3>
            <p className="text-xs text-slate-300">
              Enter a title for your presentation. It will be created in your personal Google Drive.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Presentation Title</label>
              <input
                type="text"
                value={newDeckTitle}
                onChange={e => setNewDeckTitle(e.target.value)}
                placeholder="e.g. Distributed Operating Systems Seminar"
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-slate-200"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => triggerCreateDeck(newDeckTitle)}
                className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
