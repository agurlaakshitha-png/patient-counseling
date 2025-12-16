export interface ConsultationParams {
  patientAge: string;
  diagnosis: string;
  medication: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  STREAMING = 'STREAMING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

export interface MessagePart {
  text: string;
  isError?: boolean;
}