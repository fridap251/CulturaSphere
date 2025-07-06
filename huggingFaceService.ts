interface HuggingFaceResponse {
  generated_text?: string;
  label?: string;
  score?: number;
}

interface CulturalAnalysisResult {
  sentiment: string;
  culturalContext: string[];
  trends: string[];
  recommendations: string[];
}

class HuggingFaceService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY || '';
    this.apiUrl = import.meta.env.VITE_HUGGINGFACE_API_URL || 'https://api-inference.huggingface.co';
  }

  private async makeRequest(model: string, inputs: any, options: any = {}) {
    const response = await fetch(`${this.apiUrl}/models/${model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs,
        options,
      }),
    });

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async generateText(prompt: string, model: string = 'gpt2'): Promise<string> {
    try {
      const response = await this.makeRequest(model, prompt, {
        max_length: 200,
        temperature: 0.7,
      });
      
      return response[0]?.generated_text || '';
    } catch (error) {
      console.error('Text generation error:', error);
      return '';
    }
  }

  async analyzeSentiment(text: string): Promise<{ label: string; score: number }> {
    try {
      const response = await this.makeRequest(
        'cardiffnlp/twitter-roberta-base-sentiment-latest',
        text
      );
      
      return response[0] || { label: 'NEUTRAL', score: 0.5 };
    } catch (error) {
      console.error('Sentiment analysis error:', error);
      return { label: 'NEUTRAL', score: 0.5 };
    }
  }

  async classifyText(text: string, labels: string[]): Promise<Array<{ label: string; score: number }>> {
    try {
      const response = await this.makeRequest(
        'facebook/bart-large-mnli',
        {
          text,
          candidate_labels: labels,
        }
      );
      
      return response.labels?.map((label: string, index: number) => ({
        label,
        score: response.scores[index],
      })) || [];
    } catch (error) {
      console.error('Text classification error:', error);
      return [];
    }
  }

  async generatePersonaInsights(personaData: any): Promise<CulturalAnalysisResult> {
    const prompt = `Analyze the cultural context for a persona with these characteristics:
    Age: ${personaData.age}
    Location: ${personaData.location}
    Interests: ${personaData.interests?.join(', ')}
    Values: ${personaData.values?.join(', ')}
    
    Provide cultural insights, trends, and recommendations:`;

    try {
      const generatedText = await this.generateText(prompt, 'microsoft/DialoGPT-large');
      
      // Parse the generated text to extract insights
      return {
        sentiment: 'positive',
        culturalContext: this.extractCulturalContext(generatedText),
        trends: this.extractTrends(generatedText),
        recommendations: this.extractRecommendations(generatedText),
      };
    } catch (error) {
      console.error('Persona insights generation error:', error);
      return {
        sentiment: 'neutral',
        culturalContext: [],
        trends: [],
        recommendations: [],
      };
    }
  }

  async analyzeCulturalTrend(trendData: any): Promise<any> {
    const prompt = `Analyze this cultural trend:
    Name: ${trendData.name}
    Category: ${trendData.category}
    Region: ${trendData.region}
    Keywords: ${trendData.keywords?.join(', ')}
    
    Provide analysis of cultural significance, growth potential, and strategic recommendations:`;

    try {
      const analysis = await this.generateText(prompt);
      const sentiment = await this.analyzeSentiment(trendData.description || '');
      
      return {
        analysis,
        sentiment: sentiment.label,
        confidence: sentiment.score,
        culturalSignificance: this.extractCulturalSignificance(analysis),
        recommendations: this.extractRecommendations(analysis),
      };
    } catch (error) {
      console.error('Cultural trend analysis error:', error);
      return null;
    }
  }

  private extractCulturalContext(text: string): string[] {
    // Simple extraction logic - in production, this would be more sophisticated
    const contexts = text.match(/cultural?\s+\w+/gi) || [];
    return [...new Set(contexts)].slice(0, 5);
  }

  private extractTrends(text: string): string[] {
    const trends = text.match(/trend\w*\s+\w+/gi) || [];
    return [...new Set(trends)].slice(0, 5);
  }

  private extractRecommendations(text: string): string[] {
    const recommendations = text.match(/recommend\w*\s+[\w\s]+/gi) || [];
    return [...new Set(recommendations)].slice(0, 3);
  }

  private extractCulturalSignificance(text: string): string {
    // Extract cultural significance from generated text
    const significance = text.match(/significance[\w\s:]+/gi)?.[0] || '';
    return significance.slice(0, 200);
  }
}

export const huggingFaceService = new HuggingFaceService();
export default huggingFaceService;