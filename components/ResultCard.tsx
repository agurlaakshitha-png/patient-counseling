import React, { useRef, useEffect } from 'react';
import { LoadingState } from '../types';

interface ResultCardProps {
  content: string;
  loadingState: LoadingState;
  requestDetails: {
    medication: string;
  } | null;
}

export const ResultCard: React.FC<ResultCardProps> = ({ content, loadingState, requestDetails }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom while streaming if user is near bottom
    if (loadingState === LoadingState.STREAMING && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [content, loadingState]);

  if (loadingState === LoadingState.IDLE) {
    return (
      <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl p-10 text-center text-slate-500">
        <p className="text-lg">Ready to assist.</p>
        <p className="text-sm mt-2">Enter patient details above to receive a personalized counseling script.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-teal-100 animate-fade-in-up">
      <div className="bg-teal-50 px-6 py-4 border-b border-teal-100 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
          <h3 className="font-semibold text-teal-900">
            Pharmacist's Advice {requestDetails && `for ${requestDetails.medication}`}
          </h3>
        </div>
        {loadingState === LoadingState.COMPLETE && (
          <span className="text-xs font-medium bg-teal-200 text-teal-800 px-2 py-1 rounded-full">Complete</span>
        )}
      </div>
      
      <div className="p-8 prose prose-slate max-w-none prose-p:text-slate-700 prose-headings:text-teal-900 prose-a:text-teal-600 prose-li:text-slate-700">
        <div className="whitespace-pre-wrap leading-relaxed font-sans text-lg">
           {/* 
             The content from Gemini usually comes in Markdown. 
             Since we are using whitespace-pre-wrap, it handles basic formatting.
             For a more polished app, a markdown parser like react-markdown is better, 
             but we will use simple text rendering here to avoid deps as per constraints. 
           */}
           {content.split('\n').map((line, i) => {
             // Simple bolding for lines that look like headers or keys
             if (line.startsWith('**') && line.endsWith('**')) {
                return <h4 key={i} className="font-bold text-teal-800 mt-4 mb-2">{line.replace(/\*\*/g, '')}</h4>
             }
             if (line.trim().startsWith('- ')) {
                return <li key={i} className="ml-4 mb-2 list-disc">{line.replace('- ', '')}</li>
             }
             return <p key={i} className="mb-4 min-h-[1rem]">{line}</p>
           })}
        </div>
        <div ref={scrollRef} />
      </div>

      <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500">
        <p>This is an AI-generated suggestion. Always verify with a real pharmacist.</p>
        <button 
            onClick={() => navigator.clipboard.writeText(content)}
            className="text-teal-600 hover:text-teal-800 font-medium transition-colors"
        >
            Copy Text
        </button>
      </div>
    </div>
  );
};