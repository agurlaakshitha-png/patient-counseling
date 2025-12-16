import React, { useState } from 'react';
import { ConsultationParams, LoadingState } from '../types';

interface ConsultationFormProps {
  onSubmit: (params: ConsultationParams) => void;
  loadingState: LoadingState;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({ onSubmit, loadingState }) => {
  const [patientAge, setPatientAge] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [medication, setMedication] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (patientAge && diagnosis && medication) {
      onSubmit({ patientAge, diagnosis, medication });
    }
  };

  const loadExample = () => {
    setPatientAge('65-year-old');
    setDiagnosis('Type 2 Diabetes');
    setMedication('Metformin');
  };

  const isLoading = loadingState === LoadingState.LOADING || loadingState === LoadingState.STREAMING;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-slate-800">New Consultation</h2>
        <button
          type="button"
          onClick={loadExample}
          className="text-sm text-teal-600 hover:text-teal-700 font-medium hover:underline transition-colors"
          disabled={isLoading}
        >
          Load Example Scenario
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-slate-700 mb-1">Patient Age/Demographic</label>
            <input
              id="age"
              type="text"
              value={patientAge}
              onChange={(e) => setPatientAge(e.target.value)}
              placeholder="e.g. 65-year-old"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="diagnosis" className="block text-sm font-medium text-slate-700 mb-1">New Diagnosis</label>
            <input
              id="diagnosis"
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="e.g. Type 2 Diabetes"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="medication" className="block text-sm font-medium text-slate-700 mb-1">Medication Starting</label>
          <input
            id="medication"
            type="text"
            value={medication}
            onChange={(e) => setMedication(e.target.value)}
            placeholder="e.g. Metformin"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !patientAge || !diagnosis || !medication}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white shadow-sm transition-all flex justify-center items-center
            ${isLoading 
              ? 'bg-teal-400 cursor-not-allowed' 
              : 'bg-teal-600 hover:bg-teal-700 hover:shadow-md'}`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Consulting Pharmacist...
            </>
          ) : (
            'Generate Counseling Script'
          )}
        </button>
      </form>
    </div>
  );
};