import React, { useState } from 'react';
import { allProductsData } from '../data/productsData';

export default function RssFeedPage() {
  const [isRssExpanded, setIsRssExpanded] = useState(true);
  const [isChannelExpanded, setIsChannelExpanded] = useState(true);
  
  // Default first 2 expanded, rest collapsed, all interactive
  const [expandedItems, setExpandedItems] = useState(() => {
    const initial = {};
    allProductsData.forEach((_, idx) => {
      initial[idx] = idx < 2 || idx === 3;
    });
    return initial;
  });

  const toggleItem = (idx) => {
    setExpandedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const toggleAll = (expand) => {
    const next = {};
    allProductsData.forEach((_, idx) => {
      next[idx] = expand;
    });
    setExpandedItems(next);
  };

  return (
    <div className="min-h-screen bg-black text-[#d4d4d4] font-mono text-[13px] leading-relaxed selection:bg-[#264f78] selection:text-white">
      
      {/* 1. Chrome / Browser Native XML Top Notice Banner */}
      <div className="bg-black text-[#ffffff] font-sans text-[13px] sm:text-[13.5px] px-3.5 py-2.5 border-b border-[#333333] flex items-center justify-between flex-wrap gap-2">
        <div>
          This XML file does not appear to have any style information associated with it. The document tree is shown below.
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <button 
            type="button"
            onClick={() => toggleAll(true)}
            className="px-2 py-0.5 rounded bg-[#222] hover:bg-[#333] text-[#9cdcfe] transition-colors cursor-pointer border border-[#444]"
          >
            Expand All
          </button>
          <button 
            type="button"
            onClick={() => toggleAll(false)}
            className="px-2 py-0.5 rounded bg-[#222] hover:bg-[#333] text-[#9cdcfe] transition-colors cursor-pointer border border-[#444]"
          >
            Collapse All
          </button>
          <a
            href="/"
            className="px-2 py-0.5 rounded bg-[#222] hover:bg-[#333] text-amber-400 transition-colors cursor-pointer border border-[#444] ml-2 font-sans font-medium"
          >
            ← Back to Home
          </a>
        </div>
      </div>

      {/* 2. Interactive Document Tree */}
      <div className="p-3 sm:p-4 text-left overflow-x-auto whitespace-pre font-mono">
        
        {/* <rss> tag */}
        <div className="flex items-start">
          <button
            type="button"
            onClick={() => setIsRssExpanded(!isRssExpanded)}
            className="text-[#999999] hover:text-white cursor-pointer mr-1 select-none text-[11px] leading-[18px] w-3 text-center"
            title={isRssExpanded ? 'Collapse <rss>' : 'Expand <rss>'}
          >
            {isRssExpanded ? '▼' : '▶'}
          </button>
          <span>
            <span className="text-[#569cd6]">&lt;</span>
            <span className="text-[#569cd6]">rss</span>{' '}
            <span className="text-[#9cdcfe]">xmlns:atom</span>
            <span className="text-[#569cd6]">=</span>
            <span className="text-[#ce9178]">"http://www.w3.org/2005/Atom"</span>{' '}
            <span className="text-[#9cdcfe]">version</span>
            <span className="text-[#569cd6]">=</span>
            <span className="text-[#ce9178]">"2.0"</span>
            <span className="text-[#569cd6]">&gt;</span>
          </span>
        </div>

        {isRssExpanded ? (
          <div>
            {/* <channel> tag */}
            <div className="ml-4 flex items-start">
              <button
                type="button"
                onClick={() => setIsChannelExpanded(!isChannelExpanded)}
                className="text-[#999999] hover:text-white cursor-pointer mr-1 select-none text-[11px] leading-[18px] w-3 text-center"
                title={isChannelExpanded ? 'Collapse <channel>' : 'Expand <channel>'}
              >
                {isChannelExpanded ? '▼' : '▶'}
              </button>
              <span>
                <span className="text-[#569cd6]">&lt;</span>
                <span className="text-[#569cd6]">channel</span>
                <span className="text-[#569cd6]">&gt;</span>
              </span>
            </div>

            {isChannelExpanded ? (
              <div className="ml-8">
                {/* atom:link */}
                <div className="ml-4">
                  <span className="text-[#569cd6]">&lt;</span>
                  <span className="text-[#569cd6]">atom:link</span>{' '}
                  <span className="text-[#9cdcfe]">href</span>
                  <span className="text-[#569cd6]">=</span>
                  <span className="text-[#ce9178]">"https://www.skprecast-industries.com/products.rss"</span>{' '}
                  <span className="text-[#9cdcfe]">rel</span>
                  <span className="text-[#569cd6]">=</span>
                  <span className="text-[#ce9178]">"self"</span>{' '}
                  <span className="text-[#9cdcfe]">type</span>
                  <span className="text-[#569cd6]">=</span>
                  <span className="text-[#ce9178]">"application/rss+xml"</span>
                  <span className="text-[#569cd6]">/&gt;</span>
                </div>

                {/* title */}
                <div className="ml-4">
                  <span className="text-[#569cd6]">&lt;title&gt;</span>
                  <span className="text-[#ffffff]">Latest Products</span>
                  <span className="text-[#569cd6]">&lt;/title&gt;</span>
                </div>

                {/* link */}
                <div className="ml-4">
                  <span className="text-[#569cd6]">&lt;link&gt;</span>
                  <a href="https://www.skprecast-industries.com/" target="_blank" rel="noopener noreferrer" className="text-[#58a6ff] hover:underline">
                    https://www.skprecast-industries.com/
                  </a>
                  <span className="text-[#569cd6]">&lt;/link&gt;</span>
                </div>

                {/* description */}
                <div className="ml-4">
                  <span className="text-[#569cd6]">&lt;description&gt;</span>
                  <span className="text-[#ffffff]">Latest Products</span>
                  <span className="text-[#569cd6]">&lt;/description&gt;</span>
                </div>

                {/* lastBuildDate */}
                <div className="ml-4">
                  <span className="text-[#569cd6]">&lt;lastBuildDate&gt;</span>
                  <span className="text-[#ffffff]">Tue, 29 Sep 2026 23:27:11 +0530</span>
                  <span className="text-[#569cd6]">&lt;/lastBuildDate&gt;</span>
                </div>

                {/* language */}
                <div className="ml-4">
                  <span className="text-[#569cd6]">&lt;language&gt;</span>
                  <span className="text-[#ffffff]">en-us</span>
                  <span className="text-[#569cd6]">&lt;/language&gt;</span>
                </div>

                {/* generator */}
                <div className="ml-4">
                  <span className="text-[#569cd6]">&lt;generator&gt;</span>
                  <a href="https://www.skprecast-industries.com/" target="_blank" rel="noopener noreferrer" className="text-[#58a6ff] hover:underline">
                    https://www.skprecast-industries.com/
                  </a>
                  <span className="text-[#569cd6]">&lt;/generator&gt;</span>
                </div>

                {/* Products Items */}
                {allProductsData.map((prod, idx) => {
                  const isExpanded = !!expandedItems[idx];
                  const productUrl = `https://www.skprecast-industries.com/${prod.slug}.htm`;
                  const desc = prod.commercialPitch || prod.description || prod.name;

                  return (
                    <div key={prod.id || idx} className="mt-1">
                      <div className="flex items-start">
                        <button
                          type="button"
                          onClick={() => toggleItem(idx)}
                          className="text-[#999999] hover:text-white cursor-pointer mr-1 select-none text-[11px] leading-[18px] w-3 text-center"
                          title={isExpanded ? `Collapse <item> (${prod.name})` : `Expand <item> (${prod.name})`}
                        >
                          {isExpanded ? '▼' : '▶'}
                        </button>
                        <span>
                          <span className="text-[#569cd6]">&lt;item&gt;</span>
                        </span>
                      </div>

                      {isExpanded ? (
                        <div className="ml-8">
                          {/* title */}
                          <div>
                            <span className="text-[#569cd6]">&lt;title&gt;</span>
                            <span className="text-[#ffffff]">{prod.name}</span>
                            <span className="text-[#569cd6]">&lt;/title&gt;</span>
                          </div>

                          {/* link */}
                          <div>
                            <span className="text-[#569cd6]">&lt;link&gt;</span>
                            <a href={productUrl} target="_blank" rel="noopener noreferrer" className="text-[#58a6ff] hover:underline">
                              {productUrl}
                            </a>
                            <span className="text-[#569cd6]">&lt;/link&gt;</span>
                          </div>

                          {/* guid */}
                          <div>
                            <span className="text-[#569cd6]">&lt;guid&gt;</span>
                            <a href={productUrl} target="_blank" rel="noopener noreferrer" className="text-[#58a6ff] hover:underline">
                              {productUrl}
                            </a>
                            <span className="text-[#569cd6]">&lt;/guid&gt;</span>
                          </div>

                          {/* pubDate */}
                          <div>
                            <span className="text-[#569cd6]">&lt;pubDate&gt;</span>
                            <span className="text-[#ffffff]">Sat, 20 Dec 2025 00:00:00 +0530</span>
                            <span className="text-[#569cd6]">&lt;/pubDate&gt;</span>
                          </div>

                          {/* description */}
                          <div className="break-words whitespace-pre-wrap">
                            <span className="text-[#569cd6]">&lt;description&gt;</span>
                            <span className="text-[#ffffff]">{desc}</span>
                            <span className="text-[#569cd6]">&lt;/description&gt;</span>
                          </div>

                          {/* </item> */}
                          <div>
                            <span className="text-[#569cd6]">&lt;/item&gt;</span>
                          </div>
                        </div>
                      ) : (
                        <div className="ml-8">
                          <div className="text-[#666666] select-none">...</div>
                          <div>
                            <span className="text-[#569cd6]">&lt;/item&gt;</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="ml-8">
                <div className="text-[#666666] select-none">...</div>
                <div>
                  <span className="text-[#569cd6]">&lt;/channel&gt;</span>
                </div>
              </div>
            )}

            {/* Closing </channel> and </rss> */}
            {isChannelExpanded && (
              <div className="ml-4">
                <span className="text-[#569cd6]">&lt;/channel&gt;</span>
              </div>
            )}
            <div>
              <span className="text-[#569cd6]">&lt;/rss&gt;</span>
            </div>
          </div>
        ) : (
          <div className="ml-4">
            <div className="text-[#666666] select-none">...</div>
            <div>
              <span className="text-[#569cd6]">&lt;/rss&gt;</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
