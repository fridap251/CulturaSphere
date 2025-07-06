interface QlooTrendData {
  category: string;
  region: string;
  trends: Array<{
    name: string;
    score: number;
    growth: number;
    keywords: string[];
  }>;
}

interface QlooPersonaData {
  demographics: {
    age: string;
    location: string;
    interests: string[];
  };
  preferences: {
    brands: string[];
    categories: string[];
  };
}

class QlooService {
  private apiUrl: string;
  private apiKey: string;

  constructor() {
    this.apiUrl = import.meta.env.VITE_QLOO_API_URL || 'https://hackathon.api.qloo.com';
    this.apiKey = import.meta.env.VITE_QLOO_API_KEY || '';
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.apiUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Qloo API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getTrends(category?: string, region?: string): Promise<QlooTrendData> {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (region) params.append('region', region);

    const endpoint = `/trends${params.toString() ? `?${params.toString()}` : ''}`;
    return this.makeRequest(endpoint);
  }

  async getPersonaData(interests: string[], demographics: any): Promise<QlooPersonaData> {
    return this.makeRequest('/persona', {
      method: 'POST',
      body: JSON.stringify({
        interests,
        demographics,
      }),
    });
  }

  async getCulturalInsights(query: string): Promise<any> {
    return this.makeRequest('/insights', {
      method: 'POST',
      body: JSON.stringify({
        query,
        include_cultural_context: true,
      }),
    });
  }

  async getRecommendations(userId: string, context: any): Promise<any> {
    return this.makeRequest('/recommendations', {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        context,
      }),
    });
  }

  async searchCulturalContent(query: string, filters: any = {}): Promise<any> {
    return this.makeRequest('/search', {
      method: 'POST',
      body: JSON.stringify({
        query,
        filters,
        cultural_context: true,
      }),
    });
  }
}

export const qlooService = new QlooService();
export default qlooService;