// ═══════════════════════════════════════════════════════════════════════════════
// TRAVELER PREFERENCE ENGINE
// Matches activities to traveler personalities and preferences
// ═══════════════════════════════════════════════════════════════════════════════

import { PriceRange, Difficulty, CrowdLevel, TimeOfDay } from '../types/activity';

/**
 * Traveler Profile
 */
export class TravelerProfile {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.emoji = data.emoji;
    this.color = data.color;
    
    // Core preferences
    this.favoriteTypes = data.favoriteTypes || [];
    this.interests = data.interests || [];
    this.priceRange = data.priceRange || PriceRange.MODERATE;
    this.maxDifficulty = data.maxDifficulty || Difficulty.MODERATE;
    this.crowdPreference = data.crowdPreference || CrowdLevel.MODERATE;
    this.preferredTimeOfDay = data.preferredTimeOfDay || [TimeOfDay.ANYTIME];
    
    // Personality traits (0-1 scale)
    this.adventurousness = data.adventurousness || 0.5;
    this.spontaneity = data.spontaneity || 0.5;
    this.foodie = data.foodie || 0.5;
    this.cultural = data.cultural || 0.5;
    this.outdoorsy = data.outdoorsy || 0.5;
    this.relaxation = data.relaxation || 0.5;
    
    // Constraints
    this.mustHaves = data.mustHaves || [];
    this.dealBreakers = data.dealBreakers || [];
    this.dietary = data.dietary || [];
    
    // Weighting factors
    this.weights = data.weights || {
      type: 0.3,
      tags: 0.2,
      price: 0.15,
      crowd: 0.1,
      difficulty: 0.1,
      personality: 0.15,
    };
  }
  
  /**
   * Score an activity based on this traveler's preferences
   */
  scoreActivity(activity) {
    let totalScore = 0;
    const breakdown = {};
    
    // Type matching
    const typeScore = this.favoriteTypes.includes(activity.type) ? 1 : 0;
    totalScore += typeScore * this.weights.type;
    breakdown.type = typeScore;
    
    // Tag/interest matching
    const matchingTags = activity.tags.filter(tag => this.interests.includes(tag));
    const tagScore = Math.min(matchingTags.length / 3, 1);
    totalScore += tagScore * this.weights.tags;
    breakdown.tags = tagScore;
    
    // Price matching
    const priceScore = activity.priceRange 
      ? 1 - (Math.abs(this.priceRange - activity.priceRange) / 4)
      : 0.5;
    totalScore += priceScore * this.weights.price;
    breakdown.price = priceScore;
    
    // Crowd level matching
    const crowdMap = { quiet: 1, moderate: 2, busy: 3, very_busy: 4 };
    const preferredCrowd = crowdMap[this.crowdPreference];
    const activityCrowd = crowdMap[activity.crowdLevel];
    const crowdScore = 1 - (Math.abs(preferredCrowd - activityCrowd) / 3);
    totalScore += crowdScore * this.weights.crowd;
    breakdown.crowd = crowdScore;
    
    // Difficulty matching
    const diffMap = { easy: 1, moderate: 2, challenging: 3, strenuous: 4 };
    const maxDiff = diffMap[this.maxDifficulty];
    const activityDiff = diffMap[activity.difficulty];
    const diffScore = activityDiff <= maxDiff ? 1 : 0.5;
    totalScore += diffScore * this.weights.difficulty;
    breakdown.difficulty = diffScore;
    
    // Personality alignment
    const personalityScore = this.getPersonalityScore(activity);
    totalScore += personalityScore * this.weights.personality;
    breakdown.personality = personalityScore;
    
    // Check deal breakers
    for (const dealBreaker of this.dealBreakers) {
      if (activity.tags.includes(dealBreaker)) {
        return { score: 0, breakdown, dealBreaker };
      }
    }
    
    // Boost for must-haves
    for (const mustHave of this.mustHaves) {
      if (activity.tags.includes(mustHave)) {
        totalScore = Math.min(totalScore + 0.15, 1);
        breakdown.mustHave = true;
      }
    }
    
    return { score: totalScore, breakdown };
  }
  
  /**
   * Calculate personality alignment score
   */
  getPersonalityScore(activity) {
    let score = 0;
    let factors = 0;
    
    // Adventure alignment
    if (['hike', 'activity', 'viewpoint'].includes(activity.type)) {
      score += this.adventurousness;
      factors++;
    }
    
    // Food alignment
    if (['restaurant', 'lobster', 'cafe'].includes(activity.type)) {
      score += this.foodie;
      factors++;
    }
    
    // Cultural alignment
    if (['museum', 'attraction', 'town'].includes(activity.type)) {
      score += this.cultural;
      factors++;
    }
    
    // Outdoor alignment
    if (activity.tags.includes('outdoor') || activity.type === 'hike') {
      score += this.outdoorsy;
      factors++;
    } else if (activity.tags.includes('indoor')) {
      score += (1 - this.outdoorsy);
      factors++;
    }
    
    // Relaxation alignment
    if (activity.tags.includes('quiet') || activity.crowdLevel === 'quiet') {
      score += this.relaxation;
      factors++;
    }
    
    return factors > 0 ? score / factors : 0.5;
  }
  
  /**
   * Get recommended activities from a list
   */
  filterRecommendations(activities, minScore = 0.5) {
    return activities
      .map(activity => ({
        activity,
        ...this.scoreActivity(activity)
      }))
      .filter(item => item.score >= minScore)
      .sort((a, b) => b.score - a.score);
  }
  
  /**
   * Find alternatives for an activity
   */
  findAlternatives(activity, allActivities, count = 3) {
    const scored = allActivities
      .filter(a => a.id !== activity.id)
      .filter(a => a.type === activity.type || this.favoriteTypes.includes(a.type))
      .map(a => ({
        activity: a,
        ...this.scoreActivity(a)
      }))
      .sort((a, b) => b.score - a.score);
    
    return scored.slice(0, count).map(s => s.activity);
  }
}

/**
 * Preference Matcher - Match activities to multiple travelers
 */
export class PreferenceMatcher {
  constructor(travelers) {
    this.travelers = travelers; // Map of travelerId -> TravelerProfile
  }
  
  /**
   * Score activities for all travelers
   */
  scoreForAll(activities) {
    return activities.map(activity => {
      const scores = {};
      const overallScores = [];
      
      for (const [travelerId, traveler] of Object.entries(this.travelers)) {
        const result = traveler.scoreActivity(activity);
        scores[travelerId] = result;
        overallScores.push(result.score);
      }
      
      const averageScore = overallScores.reduce((a, b) => a + b, 0) / overallScores.length;
      const minScore = Math.min(...overallScores);
      const maxScore = Math.max(...overallScores);
      const consensus = 1 - (maxScore - minScore); // Higher = more agreement
      
      return {
        activity,
        scores,
        averageScore,
        minScore,
        maxScore,
        consensus,
        universalAppeal: minScore > 0.6, // Everyone likes it
        polarizing: maxScore - minScore > 0.4, // Big disagreement
      };
    });
  }
  
  /**
   * Get personalized recommendations for a traveler
   */
  getPersonalizedRecs(travelerId, activities, limit = 10) {
    const traveler = this.travelers[travelerId];
    if (!traveler) return [];
    
    return traveler.filterRecommendations(activities)
      .slice(0, limit)
      .map(item => ({
        ...item.activity,
        matchScore: item.score,
        matchBreakdown: item.breakdown,
      }));
  }
  
  /**
   * Get activities everyone will enjoy
   */
  getConsensusActivities(activities, minConsensus = 0.7) {
    return this.scoreForAll(activities)
      .filter(item => item.consensus >= minConsensus && item.minScore >= 0.5)
      .sort((a, b) => b.averageScore - a.averageScore);
  }
  
  /**
   * Resolve conflicts when travelers disagree
   */
  resolveConflicts(activities) {
    const scored = this.scoreForAll(activities);
    const conflicts = scored.filter(item => item.polarizing);
    
    return conflicts.map(item => {
      const recommendations = {
        activity: item.activity,
        conflict: true,
        scores: item.scores,
        suggestions: []
      };
      
      // Find who likes it most/least
      const sorted = Object.entries(item.scores)
        .sort((a, b) => b[1].score - a[1].score);
      
      const topFan = sorted[0];
      const notFan = sorted[sorted.length - 1];
      
      recommendations.topFan = {
        travelerId: topFan[0],
        score: topFan[1].score
      };
      
      recommendations.notFan = {
        travelerId: notFan[0],
        score: notFan[1].score
      };
      
      // Suggest alternatives for the not-fan
      const traveler = this.travelers[notFan[0]];
      const alternatives = traveler.findAlternatives(item.activity, activities);
      recommendations.alternatives = alternatives;
      
      // Suggest compromise: do both if time permits
      recommendations.suggestions.push({
        type: 'compromise',
        description: `${this.travelers[topFan[0]].name} does this while ${this.travelers[notFan[0]].name} does one of the alternatives`,
        feasibility: alternatives.length > 0 ? 'high' : 'low'
      });
      
      return recommendations;
    });
  }
  
  /**
   * Build a balanced itinerary for all travelers
   */
  buildBalancedItinerary(activities, daysCount) {
    const scored = this.scoreForAll(activities);
    const days = Array.from({ length: daysCount }, () => []);
    
    // Track satisfaction per traveler per day
    const dailySatisfaction = {};
    for (const travelerId of Object.keys(this.travelers)) {
      dailySatisfaction[travelerId] = Array(daysCount).fill(0);
    }
    
    // Sort by consensus first, then by average score
    const sorted = scored.sort((a, b) => {
      if (Math.abs(a.consensus - b.consensus) > 0.1) {
        return b.consensus - a.consensus;
      }
      return b.averageScore - a.averageScore;
    });
    
    // Distribute activities to balance daily satisfaction
    for (const item of sorted) {
      // Find day with lowest total satisfaction
      let bestDay = 0;
      let lowestSat = Infinity;
      
      for (let i = 0; i < daysCount; i++) {
        const totalSat = Object.values(dailySatisfaction)
          .reduce((sum, arr) => sum + arr[i], 0);
        if (totalSat < lowestSat) {
          lowestSat = totalSat;
          bestDay = i;
        }
      }
      
      days[bestDay].push(item.activity);
      
      // Update satisfaction scores
      for (const [travelerId, score] of Object.entries(item.scores)) {
        dailySatisfaction[travelerId][bestDay] += score.score;
      }
    }
    
    return {
      days,
      dailySatisfaction,
      balanceScore: this.calculateBalanceScore(dailySatisfaction)
    };
  }
  
  /**
   * Calculate how balanced the itinerary is
   */
  calculateBalanceScore(dailySatisfaction) {
    const travelerScores = Object.values(dailySatisfaction);
    const totalSatisfaction = travelerScores.map(days => 
      days.reduce((a, b) => a + b, 0)
    );
    
    const avg = totalSatisfaction.reduce((a, b) => a + b, 0) / totalSatisfaction.length;
    const variance = totalSatisfaction.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / totalSatisfaction.length;
    
    // Lower variance = better balance
    return 1 / (1 + variance);
  }
}

/**
 * Create traveler profiles from trip data
 */
export function createTravelerProfiles(travelersData) {
  return travelersData.map(data => new TravelerProfile({
    id: data.id,
    name: data.name,
    emoji: data.emoji,
    color: data.color,
    
    // Infer preferences from trip data
    favoriteTypes: inferFavoriteTypes(data),
    interests: data.preferences || [],
    priceRange: inferPriceRange(data),
    maxDifficulty: inferMaxDifficulty(data),
    crowdPreference: inferCrowdPreference(data),
    
    // Infer personality from descriptions
    adventurousness: data.tripFocus?.includes('adventure') ? 0.8 : 0.5,
    spontaneity: data.planStyle === 'Adventure Curator' ? 0.8 : 0.4,
    foodie: data.tripFocus?.includes('food') || data.tripFocus?.includes('lobster') ? 0.9 : 0.5,
    cultural: data.priorities?.includes('History walks') ? 0.8 : 0.5,
    outdoorsy: data.priorities?.includes('hikes') ? 0.8 : 0.5,
    relaxation: data.priorities?.includes('Cozy') ? 0.7 : 0.5,
  }));
}

function inferFavoriteTypes(traveler) {
  const types = [];
  const focus = traveler.tripFocus?.toLowerCase() || '';
  const priorities = traveler.priorities?.join(' ').toLowerCase() || '';
  
  if (focus.includes('lobster') || priorities.includes('lobster')) types.push('lobster', 'restaurant');
  if (focus.includes('town') || priorities.includes('town')) types.push('town');
  if (focus.includes('photo') || priorities.includes('view')) types.push('viewpoint', 'attraction');
  if (priorities.includes('food')) types.push('restaurant', 'cafe');
  if (priorities.includes('history')) types.push('museum', 'attraction');
  
  return types.length > 0 ? types : ['attraction', 'restaurant'];
}

function inferPriceRange(traveler) {
  const style = traveler.planStyle?.toLowerCase() || '';
  if (style.includes('luxury')) return PriceRange.LUXURY;
  if (style.includes('budget')) return PriceRange.BUDGET;
  return PriceRange.MODERATE;
}

function inferMaxDifficulty(traveler) {
  const priorities = traveler.priorities?.join(' ').toLowerCase() || '';
  if (priorities.includes('hike') || priorities.includes('adventure')) return Difficulty.CHALLENGING;
  if (priorities.includes('walk')) return Difficulty.MODERATE;
  return Difficulty.EASY;
}

function inferCrowdPreference(traveler) {
  const priorities = traveler.priorities?.join(' ').toLowerCase() || '';
  if (priorities.includes('cozy') || priorities.includes('quiet')) return CrowdLevel.QUIET;
  if (priorities.includes('bustling')) return CrowdLevel.BUSY;
  return CrowdLevel.MODERATE;
}
