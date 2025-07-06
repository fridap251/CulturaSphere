import qlooService from './qlooService';
import geminiService from './geminiService';

export interface TrendData {
  id: number;
  name: string;
  category: string;
  score: number;
  change: string;
  region: string;
  description: string;
  keywords: string[];
  predictedGrowth: string;
  culturalSignificance?: string;
  aiAnalysis?: any;
}

export interface PersonaData {
  name: string;
  age: number;
  location: string;
  occupation: string;
  income: string;
  education: string;
  demographics: any;
  psychographics: any;
  culturalProfile: any;
  engagement: any;
  aiInsights?: any;
}

class ApiService {
  async fetchTrends(category?: string, region?: string): Promise<TrendData[]> {
    try {
      // Fetch from Qloo API
      const qlooData = await qlooService.getTrends(category, region);
      
      // Enhance with AI analysis
      const enhancedTrends = await Promise.all(
        qlooData.trends?.map(async (trend: any) => {
          const aiAnalysis = await geminiService.analyzeCulturalTrend(trend);
          
          return {
            id: Math.random(),
            name: trend.name,
            category: trend.category || category || 'General',
            score: trend.score || Math.floor(Math.random() * 100),
            change: `+${trend.growth || Math.floor(Math.random() * 20)}%`,
            region: trend.region || region || 'Global',
            description: trend.description || `Emerging trend in ${trend.name}`,
            keywords: trend.keywords || [],
            predictedGrowth: `+${Math.floor(Math.random() * 30)}%`,
            culturalSignificance: aiAnalysis?.culturalSignificance,
            aiAnalysis,
          };
        }) || []
      );

      return enhancedTrends;
    } catch (error) {
      console.error('Error fetching trends:', error);
      // Return mock data as fallback
      return this.getMockTrends();
    }
  }

  async generatePersona(formData: any): Promise<PersonaData> {
    try {
      // Get persona data from Qloo
      const qlooPersona = await qlooService.getPersonaData(
        formData.interests?.split(',') || [],
        {
          age: formData.ageRange,
          region: formData.region,
          industry: formData.industry,
        }
      );

      // Enhance with AI insights
      const aiInsights = await geminiService.generatePersonaInsights(formData);

      return {
        name: this.generatePersonaName(),
        age: this.extractAge(formData.ageRange),
        location: this.getLocationFromRegion(formData.region),
        occupation: this.generateOccupation(formData.industry),
        income: this.generateIncome(),
        education: this.generateEducation(),
        demographics: {
          lifestyle: 'Urban Professional',
          familyStatus: 'Single',
          techSavviness: 'High',
        },
        psychographics: {
          values: formData.values?.split(',') || ['Innovation', 'Sustainability'],
          interests: formData.interests?.split(',') || ['Technology', 'Travel'],
          painPoints: ['Time management', 'Information overload'],
          goals: ['Career advancement', 'Work-life balance'],
        },
        culturalProfile: {
          influences: aiInsights.culturalContext,
          mediaConsumption: ['Social Media', 'Streaming', 'Podcasts'],
          shoppingBehavior: 'Research-driven, values quality',
          brandAffinities: qlooPersona?.preferences?.brands || ['Apple', 'Nike'],
        },
        engagement: {
          preferredChannels: ['Instagram', 'LinkedIn'],
          contentTypes: ['Visual content', 'Educational content'],
          communicationStyle: 'Authentic, informative',
        },
        aiInsights,
      };
    } catch (error) {
      console.error('Error generating persona:', error);
      return this.getMockPersona();
    }
  }

  async getCulturalInsights(filters: any): Promise<any[]> {
    try {
      // Generate insights using Gemini AI
      const query = `Cultural insights for ${filters.category || 'all categories'} in ${filters.region || 'global markets'}`;
      const geminiInsight = await geminiService.generateCulturalInsights(query, filters);

      if (geminiInsight) {
        return [
          {
            id: Date.now(),
            generatedDate: new Date().toISOString().split('T')[0],
            tags: [filters.category, filters.region, 'AI Generated'].filter(Boolean),
            ...geminiInsight
          }
        ];
      }

      return [];
    } catch (error) {
      console.error('Error fetching cultural insights:', error);
      return [];
    }
  }

  async getTrendPredictions(trendData: any): Promise<any> {
    try {
      return await geminiService.predictTrendEvolution(trendData);
    } catch (error) {
      console.error('Error getting trend predictions:', error);
      return null;
    }
  }

  async getCollaborationRecommendations(userProfile: any, collaborators: any[]): Promise<any> {
    try {
      return await geminiService.generateCollaborationRecommendations(userProfile, collaborators);
    } catch (error) {
      console.error('Error getting collaboration recommendations:', error);
      return null;
    }
  }
  private getMockTrends(): TrendData[] {
    return [
      {
        id: 1,
        name: 'Sustainable Fashion',
        category: 'Fashion & Beauty',
        score: 94,
        change: '+12%',
        region: 'Europe',
        description: 'Eco-friendly materials and ethical production gaining momentum',
        keywords: ['sustainable', 'eco-friendly', 'ethical fashion'],
        predictedGrowth: '+25%',
      },
      {
        id: 2,
        name: 'Plant-Based Alternatives',
        category: 'Food & Dining',
        score: 87,
        change: '+8%',
        region: 'North America',
        description: 'Growing acceptance of plant-based proteins',
        keywords: ['plant-based', 'vegan', 'protein alternatives'],
        predictedGrowth: '+18%',
      },
    ];
  }

  private getMockPersona(): PersonaData {
    return {
      name: 'Alex Chen',
      age: 28,
      location: 'San Francisco, CA',
      occupation: 'UX Designer',
      income: '$85,000',
      education: 'Bachelor\'s in Design',
      demographics: {
        lifestyle: 'Urban Professional',
        familyStatus: 'Single',
        techSavviness: 'High',
      },
      psychographics: {
        values: ['Innovation', 'Sustainability'],
        interests: ['Design', 'Technology'],
        painPoints: ['Time management'],
        goals: ['Career advancement'],
      },
      culturalProfile: {
        influences: ['Minimalism', 'Tech Culture'],
        mediaConsumption: ['Instagram', 'Design blogs'],
        shoppingBehavior: 'Research-driven',
        brandAffinities: ['Apple', 'Patagonia'],
      },
      engagement: {
        preferredChannels: ['Instagram', 'LinkedIn'],
        contentTypes: ['Visual content'],
        communicationStyle: 'Authentic',
      },
    };
  }

  private generatePersonaName(): string {
    const names = ['Alex Chen', 'Maya Rodriguez', 'Jordan Kim', 'Sam Taylor', 'Riley Johnson'];
    return names[Math.floor(Math.random() * names.length)];
  }

  private extractAge(ageRange: string): number {
    const ranges: { [key: string]: number } = {
      '18-24': 21,
      '25-34': 29,
      '35-44': 39,
      '45-54': 49,
      '55+': 60,
    };
    return ranges[ageRange] || 30;
  }

  private getLocationFromRegion(region: string): string {
    const locations: { [key: string]: string } = {
      'North America': 'New York, NY',
      'Europe': 'London, UK',
      'Asia Pacific': 'Tokyo, Japan',
      'Latin America': 'São Paulo, Brazil',
      'Middle East': 'Dubai, UAE',
      'Africa': 'Cape Town, South Africa',
    };
    return locations[region] || 'Global';
  }

  private generateOccupation(industry: string): string {
    const occupations: { [key: string]: string } = {
      'Technology': 'Software Engineer',
      'Fashion & Beauty': 'Brand Manager',
      'Entertainment': 'Content Creator',
      'Healthcare': 'Healthcare Professional',
      'Education': 'Educator',
    };
    return occupations[industry] || 'Professional';
  }

  private generateIncome(): string {
    const incomes = ['$45,000', '$65,000', '$85,000', '$105,000', '$125,000'];
    return incomes[Math.floor(Math.random() * incomes.length)];
  }

  private generateEducation(): string {
    const educations = ['Bachelor\'s Degree', 'Master\'s Degree', 'High School', 'PhD'];
    return educations[Math.floor(Math.random() * educations.length)];
  }
}

export const apiService = new ApiService();
export default apiService;