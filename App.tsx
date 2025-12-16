import React, { useState } from 'react';
import { Header } from './components/Header';
import { ConsultationForm } from './components/ConsultationForm';
import { ResultCard } from './components/ResultCard';
import { ConsultationParams, LoadingState } from './types';
import { streamCounseling } from './services/geminiService';

const App: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [resultText, setResultText] = useState('');
  const [currentRequest, setCurrentRequest] = useState<ConsultationParams | null>(null);

  const handleConsultationSubmit = async (params: ConsultationParams) => {
    setLoadingState(LoadingState.LOADING);
    setResultText(''); // Clear previous results
    setCurrentRequest(params);

    try {
      setLoadingState(LoadingState.STREAMING);
      
      await streamCounseling(params, (chunk) => {
        setResultText(prev => prev + chunk);
      });

      setLoadingState(LoadingState.COMPLETE);
    } catch (error) {
      console.error("Error generating counseling:", error);
      setResultText("I'm sorry, I'm having trouble connecting to the pharmacist service right now. Please try again in a moment.");
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-3">Medication Counseling Assistant</h2>
          <p className="text-slate-600">
            Generate warm, empathetic, and clear explanations for patients starting new medications.
            Perfect for pharmacists, students, or caregivers explaining treatment plans.
          </p>
        </div>

        <ConsultationForm 
          onSubmit={handleConsultationSubmit} 
          loadingState={loadingState} 
        />

        <ResultCard 
          content={resultText} 
          loadingState={loadingState} 
          requestDetails={currentRequest}
        />
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} PharmaFriend. Powered by Google Gemini.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;