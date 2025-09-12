export interface AIAnalysisResult {
    summary: string;
    severity: 'LOW' | 'MED' | 'HIGH' | 'CRITICAL';
    suggestions: string;
}
  
export interface AIProvider {
    analyzeEvent(eventText: string, watchlistTerms: string[]): Promise<AIAnalysisResult>;
}
  