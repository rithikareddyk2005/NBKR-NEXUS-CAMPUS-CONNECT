import React, { useState } from 'react';
import {
  Search,
  Plus,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Tag,
  Phone,
  HelpCircle
} from 'lucide-react';
import { LostFoundItem } from '../data/extendedData';
import { apiService } from '../services/api';

interface LostAndFoundProps {
  items: LostFoundItem[];
  onRefresh: () => void;
}

export const LostAndFound: React.FC<LostAndFoundProps> = ({ items, onRefresh }) => {
  const [filterType, setFilterType] = useState<'ALL' | 'LOST' | 'FOUND'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'LOST' | 'FOUND'>('FOUND');
  const [newCategory, setNewCategory] = useState<'ELECTRONICS' | 'DOCUMENTS' | 'CLOTHING' | 'ACCESSORIES' | 'OTHER'>('ELECTRONICS');
  const [newLocation, setNewLocation] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newContact, setNewContact] = useState('');

  const filteredItems = items.filter(item => {
    const matchesType = filterType === 'ALL' || item.type === filterType;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newLocation.trim()) return;

    try {
      await apiService.reportLostFound({
        title: newTitle,
        type: newType,
        category: newCategory,
        location: newLocation,
        description: newDescription,
        contactInfo: newContact || 'Reported via campus desk'
      });
      setShowReportModal(false);
      setNewTitle('');
      setNewLocation('');
      setNewDescription('');
      setNewContact('');
      onRefresh();
      alert('Item reported to Campus Lost & Found registry.');
    } catch (e) {
      console.error(e);
    }
  };

  const handleClaim = async (id: string) => {
    try {
      await apiService.claimLostFound(id);
      onRefresh();
      alert('Verification request logged. Please present your student ID at the Department Office to claim.');
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
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            Campus Care &amp; Property Recovery
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Campus Lost &amp; Found Registry
          </h2>
          <p className="text-xs text-slate-300">
            Report lost possessions or turn in discovered belongings across academic blocks, library, cafeteria, and sports grounds.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowReportModal(true)}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          Report Lost or Found Item
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search items, calculators, IDs..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
              filterType === 'ALL' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Items ({items.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('FOUND')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
              filterType === 'FOUND' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Found Belongings
          </button>
          <button
            type="button"
            onClick={() => setFilterType('LOST')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
              filterType === 'LOST' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Lost Inquiries
          </button>
        </div>
      </div>

      {/* Grid of Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    item.type === 'FOUND'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {item.type}
                </span>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.status === 'ACTIVE'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white mb-1.5">{item.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">{item.description}</p>

              <div className="space-y-1.5 text-xs text-slate-400 mb-3 bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>Reported: {item.dateReported}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Reported by: <strong className="text-slate-300">{item.reportedBy}</strong>
                </div>
              </div>

              {item.claimInstructions && (
                <div className="text-[11px] text-amber-300/90 italic mb-2">
                  * {item.claimInstructions}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-500 text-[11px] font-mono">{item.contactInfo}</span>
              {item.type === 'FOUND' && item.status === 'ACTIVE' ? (
                <button
                  type="button"
                  onClick={() => handleClaim(item.id)}
                  className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                >
                  Claim Item
                </button>
              ) : (
                <span className="text-slate-500 text-xs font-semibold">Registered Ticket</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Report Item */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                Report Lost or Found Belonging
              </h3>
              <button
                type="button"
                onClick={() => setShowReportModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReport} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Status Type</label>
                  <select
                    value={newType}
                    onChange={e => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                  >
                    <option value="FOUND">I FOUND an Item</option>
                    <option value="LOST">I LOST an Item</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                  >
                    <option value="ELECTRONICS">Electronics (Calculator, Phone)</option>
                    <option value="DOCUMENTS">Documents &amp; College ID</option>
                    <option value="CLOTHING">Clothing &amp; Lab Coat</option>
                    <option value="ACCESSORIES">Keys &amp; Accessories</option>
                    <option value="OTHER">Other Belongings</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Item Title / Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Casio fx-991EX Calculator / Blue Dell Backpack"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Location Discovered / Lost</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CSE Block Room 204 or Central Library Lawn"
                  value={newLocation}
                  onChange={e => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description &amp; Identifying Details</label>
                <textarea
                  rows={2}
                  placeholder="Color, brand, distinguishing marks, initials..."
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Contact / Handover Office</label>
                <input
                  type="text"
                  placeholder="e.g. Handed to Library Desk or your phone/email"
                  value={newContact}
                  onChange={e => setNewContact(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                >
                  Submit Registry Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
