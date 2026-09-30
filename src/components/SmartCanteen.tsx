import React, { useState } from 'react';
import {
  Coffee,
  Clock,
  Users,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  TrendingDown,
  Info
} from 'lucide-react';
import { CanteenMenuItem } from '../data/extendedData';

interface SmartCanteenProps {
  menu: CanteenMenuItem[];
  crowdStatus: string;
  orderQueueCount: number;
}

export const SmartCanteen: React.FC<SmartCanteenProps> = ({
  menu,
  crowdStatus,
  orderQueueCount
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [orderedItems, setOrderedItems] = useState<string[]>([]);
  const [tokenReceipt, setTokenReceipt] = useState<{ id: string; item: string; pickupTime: string } | null>(null);

  const categories = ['ALL', 'BREAKFAST', 'LUNCH', 'SNACKS', 'BEVERAGES'];

  const filteredMenu = menu.filter(item => {
    return selectedCategory === 'ALL' || item.category === selectedCategory;
  });

  const handleOrder = (item: CanteenMenuItem) => {
    const token = {
      id: `TKN-${Math.floor(100 + Math.random() * 900)}`,
      item: item.name,
      pickupTime: 'Estimated pickup in 8-10 mins'
    };
    setTokenReceipt(token);
    setOrderedItems(prev => [...prev, item.name]);
  };

  return (
    <div className="space-y-6">
      {/* Header and Live Crowd Radar */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-semibold">
            <Coffee className="w-3.5 h-3.5 text-amber-400" />
            Central Cafeteria &amp; Student Dining
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Smart Canteen &amp; Digital Pre-Ordering
          </h2>
          <p className="text-xs text-slate-300">
            Check live kitchen menu, crowd queues, nutritional counts, and skip lines with digital campus meal tokens.
          </p>
        </div>

        {/* Live Crowd & Wait Time Meter */}
        <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800 shrink-0 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Live Wait Radar</div>
            <div className="text-xs font-extrabold text-amber-300">{crowdStatus}</div>
            <div className="text-[11px] text-slate-400">{orderQueueCount} digital tokens in preparation</div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-800 no-scrollbar text-xs">
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMenu.map(item => (
          <div
            key={item.id}
            className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {item.dietary}
                </span>
                <span className="text-xs text-slate-400 font-mono">{item.calories}</span>
              </div>

              <h4 className="text-sm font-bold text-white mb-1.5">{item.name}</h4>
              <p className="text-xs text-slate-400 mb-3 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                Available: {item.timing}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Subsidized Price</span>
                <span className="text-base font-black text-amber-400">₹{item.price}</span>
              </div>

              <button
                type="button"
                onClick={() => handleOrder(item)}
                className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Get Token
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Generated Token Modal or Receipt */}
      {tokenReceipt && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">
                Digital Token Generated: <span className="font-mono text-amber-400">{tokenReceipt.id}</span>
              </div>
              <div className="text-xs text-slate-300">
                Item: <strong>{tokenReceipt.item}</strong> • {tokenReceipt.pickupTime} at Counter #2
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setTokenReceipt(null)}
            className="text-xs text-slate-400 hover:text-white px-2 py-1"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};
