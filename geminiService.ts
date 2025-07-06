interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

interface CulturalAnalysis {
  sentiment: string;
  culturalContext: string[];
  trends: string[];
  recommendations: string[];
  confidence: number;
}

class GeminiService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyCZsW8aLINASBfrnsz5U4XQekDIpMtLNy4';
    this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
  }

  private async makeRequest(prompt: string, options: any = {}) {
    const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
          ...options
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    const data: GeminiResponse = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || '';
  }

  async analyzeCulturalTrend(trendData: any): Promise<CulturalAnalysis> {
    const prompt = `As a cultural intelligence expert, analyze this trend:

Trend: ${trendData.name}
Category: ${trendData.category}
Region: ${trendData.region}
Description: ${trendData.description}
Keywords: ${trendData.keywords?.join(', ')}

Please provide a comprehensive analysis including:
1. Cultural significance and context
2. Sentiment analysis (POSITIVE/NEGATIVE/NEUTRAL)
3. Related cultural trends
4. Strategic recommendations for brands
5. Confidence level (0-1)

Format your response as JSON with the following structure:
{
  "sentiment": "POSITIVE/NEGATIVE/NEUTRAL",
  "culturalContext": ["context1", "context2", "context3"],
  "trends": ["trend1", "trend2", "trend3"],
  "recommendations": ["rec1", "rec2", "rec3"],
  "confidence": 0.85,
  "analysis": "detailed analysis text"
}`;

    try {
      const response = await this.makeRequest(prompt);
      const parsed = this.parseJsonResponse(response);
      
      return {
        sentiment: parsed.sentiment || 'NEUTRAL',
        culturalContext: parsed.culturalContext || [],
        trends: parsed.trends || [],
        recommendations: parsed.recommendations || [],
        confidence: parsed.confidence || 0.8,
        ...parsed
      };
    } catch (error) {
      console.error('Gemini cultural trend analysis error:', error);
      return {
        sentiment: 'NEUTRAL',
        culturalContext: [],
        trends: [],
        recommendations: [],
        confidence: 0.5
      };
    }
  }

  async generatePersonaInsights(personaData: any): Promise<any> {
    const prompt = `As a cultural anthropologist and marketing expert, create detailed insights for this persona:

Demographics:
- Age Range: ${personaData.ageRange}
- Region: ${personaData.region}
- Industry: ${personaData.industry}
- Target Market: ${personaData.targetMarket}

Interests: ${personaData.interests}
Values: ${personaData.values}

Please provide:
1. Cultural influences and context
2. Media consumption patterns
3. Brand affinities and preferences
4. Communication style preferences
5. Pain points and motivations
6. Actionable marketing recommendations

Format as JSON:
{
  "culturalContext": ["influence1", "influence2", "influence3"],
  "mediaConsumption": ["platform1", "platform2", "platform3"],
  "brandAffinities": ["brand1", "brand2", "brand3"],
  "communicationStyle": "description",
  "painPoints": ["pain1", "pain2", "pain3"],
  "motivations": ["motivation1", "motivation2"],
  "recommendations": ["rec1", "rec2", "rec3"],
  "culturalNuances": "detailed cultural insights"
}`;

    try {
      const response = await this.makeRequest(prompt);
      return this.parseJsonResponse(response);
    } catch (error) {
      console.error('Gemini persona insights error:', error);
      return {
        culturalContext: ['Global Digital Culture', 'Urban Professional Values'],
        mediaConsumption: ['Social Media', 'Streaming Platforms', 'Professional Networks'],
        brandAffinities: ['Innovation-focused brands', 'Sustainable companies'],
        communicationStyle: 'Direct, authentic, value-driven',
        painPoints: ['Information overload', 'Time constraints'],
        motivations: ['Personal growth', 'Professional success'],
        recommendations: ['Use authentic storytelling', 'Focus on value proposition']
      };
    }
  }

  async generateCulturalInsights(query: string, context: any = {}): Promise<any> {
    const prompt = `As a cultural intelligence analyst, provide insights for:

Query: ${query}
Context: ${JSON.stringify(context)}

Analyze:
1. Current cultural movements and trends
2. Cross-cultural implications
3. Audience behavior patterns
4. Market opportunities
5. Strategic recommendations

Provide actionable insights that brands can use for:
- Content strategy
- Campaign development
- Market expansion
- Cultural localization

Format as JSON:
{
  "title": "insight title",
  "description": "detailed description",
  "category": "category",
  "priority": "High/Medium/Low",
  "impact": "impact type",
  "actionItems": ["action1", "action2", "action3"],
  "metrics": {
    "opportunitySize": "$X.XM",
    "confidence": "XX%",
    "timeline": "X-X months"
  },
  "culturalSignificance": "explanation",
  "recommendations": ["rec1", "rec2"]
}`;

    try {
      const response = await this.makeRequest(prompt);
      return this.parseJsonResponse(response);
    } catch (error) {
      console.error('Gemini cultural insights error:', error);
      return null;
    }
  }

  async predictTrendEvolution(trendData: any): Promise<any> {
    const prompt = `As a trend forecasting expert, predict the evolution of this cultural trend:

Trend: ${trendData.name}
Current Score: ${trendData.score}
Category: ${trendData.category}
Region: ${trendData.region}
Keywords: ${trendData.keywords?.join(', ')}

Predict:
1. Growth trajectory over next 6-12 months
2. Geographic expansion patterns
3. Demographic adoption phases
4. Potential market disruptions
5. Strategic timing recommendations

Format as JSON:
{
  "growthTrajectory": "description",
  "predictedScore": 95,
  "geographicExpansion": ["region1", "region2"],
  "demographicAdoption": {
    "early": ["demo1", "demo2"],
    "mainstream": ["demo3", "demo4"]
  },
  "marketDisruptions": ["disruption1", "disruption2"],
  "timingRecommendations": ["timing1", "timing2"],
  "confidence": 0.87
}`;

    try {
      const response = await this.makeRequest(prompt);
      return this.parseJsonResponse(response);
    } catch (error) {
      console.error('Gemini trend prediction error:', error);
      return null;
    }
  }

  async generateCollaborationRecommendations(userProfile: any, collaborators: any[]): Promise<any> {
    const prompt = `As a collaboration strategist, recommend optimal partnerships:

User Profile: ${JSON.stringify(userProfile)}
Available Collaborators: ${JSON.stringify(collaborators.slice(0, 5))}

Analyze:
1. Cultural compatibility
2. Audience overlap and synergy
3. Creative potential
4. Market expansion opportunities
5. Risk assessment

Provide ranked recommendations with reasoning.

Format as JSON:
{
  "recommendations": [
    {
      "collaboratorId": "id",
      "matchScore": 95,
      "reasoning": "explanation",
      "opportunities": ["opp1", "opp2"],
      "culturalSynergy": "description"
    }
  ],
  "strategicInsights": ["insight1", "insight2"],
  "marketOpportunities": ["market1", "market2"]
}`;

    try {
      const response = await this.makeRequest(prompt);
      return this.parseJsonResponse(response);
    } catch (error) {
      console.error('Gemini collaboration recommendations error:', error);
      return null;
    }
  }

  private parseJsonResponse(response: string): any {
    try {
      // Clean up the response to extract JSON
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // If no JSON found, try to parse the entire response
      return JSON.parse(response);
    } catch (error) {
      console.error('Failed to parse Gemini JSON response:', error);
      // Return a structured fallback
      return {
        error: 'Failed to parse response',
        rawResponse: response
      };
    }
  }
}

export const geminiService = new GeminiService();
export default geminiService;