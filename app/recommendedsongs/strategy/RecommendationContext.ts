import {RecommendationStrategy} from "./RecommendationStrategy"

export class RecommendationContext {
    private strategy: RecommendationStrategy;

    constructor(strategy: RecommendationStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: RecommendationStrategy) {
        this.strategy = strategy;
    }

    getRecommendations(accessToken: string) {
        return this.strategy.getRecommendations(accessToken);
    }

}