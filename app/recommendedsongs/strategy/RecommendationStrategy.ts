export interface RecommendationStrategy {
    getRecommendations(accessToken: string): Promise<any[]>;
}