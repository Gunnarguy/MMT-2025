// ═══════════════════════════════════════════════════════════════════════════════
// DYNAMIC SEARCH SERVICE
// Integrates multiple APIs for comprehensive activity discovery
// ═══════════════════════════════════════════════════════════════════════════════

import { Activity } from '../types/activity';

/**
 * Overpass API - Search OpenStreetMap for places
 * Free, no API key, comprehensive POI data
 */
class OverpassAPI {
  constructor() {
    this.endpoint = 'https://overpass-api.de/api/interpreter';
    this.cache = new Map();
  }
  
  /**
   * Build Overpass QL query
   */
  buildQuery(amenityTypes, bounds, limit = 50) {
    const [south, west, north, east] = bounds;
    const amenityFilter = amenityTypes.map(type => `["amenity"="${type}"]`).join('');
    
    return `
      [out:json][timeout:25];
      (
        node${amenityFilter}(${south},${west},${north},${east});
        way${amenityFilter}(${south},${west},${north},${east});
        relation${amenityFilter}(${south},${west},${north},${east});
      );
      out body ${limit};
      >;
      out skel qt;
    `;
  }
  
  /**
   * Search for places by type and location
   */
  async search(options) {
    const {
      query,
      location, // [lat, lng, radius]
      types = [],
      bounds,
      limit = 50
    } = options;
    
    const cacheKey = JSON.stringify(options);
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }
    
    try {
      // Calculate bounds from location if not provided
      const searchBounds = bounds || this.calculateBounds(location);
      
      // Map types to OSM amenity tags
      const amenityTypes = this.mapTypesToAmenities(types);
      
      const queryStr = this.buildQuery(amenityTypes, searchBounds, limit);
      
      const response = await fetch(this.endpoint, {
        method: 'POST',
        body: queryStr,
        headers: { 'Content-Type': 'text/plain' }
      });
      
      if (!response.ok) throw new Error('Overpass API error');
      
      const data = await response.json();
      const results = this.parseResults(data.elements, query);
      
      this.cache.set(cacheKey, results);
      return results;
      
    } catch (error) {
      console.error('Overpass search error:', error);
      return [];
    }
  }
  
  /**
   * Calculate bounding box from center point
   */
  calculateBounds([lat, lng, radius]) {
    const latDelta = radius / 69; // ~69 miles per degree latitude
    const lngDelta = radius / (69 * Math.cos(lat * Math.PI / 180));
    return [
      lat - latDelta,
      lng - lngDelta,
      lat + latDelta,
      lng + lngDelta
    ];
  }
  
  /**
   * Map activity types to OSM amenity tags
   */
  mapTypesToAmenities(types) {
    const mapping = {
      restaurant: ['restaurant', 'fast_food'],
      lobster: ['restaurant', 'seafood'],
      cafe: ['cafe', 'coffee'],
      bar: ['bar', 'pub'],
      attraction: ['attraction', 'viewpoint', 'artwork'],
      museum: ['museum', 'gallery'],
      hike: ['trailhead', 'nature_reserve'],
      viewpoint: ['viewpoint'],
      park: ['park'],
      shopping: ['marketplace', 'shop'],
      lodging: ['hotel', 'guest_house', 'hostel'],
    };
    
    if (types.length === 0) {
      return ['restaurant', 'cafe', 'attraction', 'museum', 'viewpoint', 'park'];
    }
    
    return types.flatMap(type => mapping[type] || [type]);
  }
  
  /**
   * Parse OSM results into Activity objects
   */
  parseResults(elements, query) {
    return elements
      .filter(el => el.type === 'node' || el.type === 'way')
      .filter(el => el.tags && el.tags.name)
      .filter(el => {
        if (!query) return true;
        const searchText = `${el.tags.name} ${el.tags.description || ''} ${el.tags.cuisine || ''}`.toLowerCase();
        return searchText.includes(query.toLowerCase());
      })
      .map(el => this.elementToActivity(el));
  }
  
  /**
   * Convert OSM element to Activity
   */
  elementToActivity(element) {
    const tags = element.tags;
    const lat = element.lat || element.center?.lat;
    const lng = element.lon || element.center?.lon;
    
    return new Activity({
      id: `osm-${element.id}`,
      name: tags.name,
      type: this.inferType(tags),
      location: this.buildLocation(tags),
      address: this.buildAddress(tags),
      coordinates: [lat, lng],
      description: tags.description || '',
      website: tags.website || tags['contact:website'],
      phone: tags.phone || tags['contact:phone'],
      hours: this.parseHours(tags.opening_hours),
      tags: this.extractTags(tags),
      source: 'openstreetmap',
      sourceId: element.id,
    });
  }
  
  /**
   * Infer activity type from OSM tags
   */
  inferType(tags) {
    if (tags.amenity === 'restaurant') {
      if (tags.cuisine?.includes('seafood')) return 'lobster';
      return 'restaurant';
    }
    if (tags.amenity === 'cafe') return 'cafe';
    if (tags.amenity === 'bar' || tags.amenity === 'pub') return 'bar';
    if (tags.tourism === 'museum') return 'museum';
    if (tags.tourism === 'attraction' || tags.tourism === 'viewpoint') return 'attraction';
    if (tags.leisure === 'park') return 'park';
    if (tags.shop) return 'shopping';
    if (tags.tourism === 'hotel' || tags.tourism === 'guest_house') return 'lodging';
    return 'attraction';
  }
  
  /**
   * Build location string
   */
  buildLocation(tags) {
    const parts = [];
    if (tags['addr:city']) parts.push(tags['addr:city']);
    if (tags['addr:state']) parts.push(tags['addr:state']);
    return parts.join(', ') || 'Location';
  }
  
  /**
   * Build address string
   */
  buildAddress(tags) {
    const parts = [];
    if (tags['addr:housenumber']) parts.push(tags['addr:housenumber']);
    if (tags['addr:street']) parts.push(tags['addr:street']);
    if (tags['addr:city']) parts.push(tags['addr:city']);
    if (tags['addr:postcode']) parts.push(tags['addr:postcode']);
    return parts.length > 0 ? parts.join(' ') : null;
  }
  
  /**
   * Parse opening hours (simplified)
   */
  parseHours(hoursString) {
    if (!hoursString) return null;
    // OSM opening_hours is complex - this is simplified
    // Real implementation would use opening_hours.js library
    return null;
  }
  
  /**
   * Extract relevant tags
   */
  extractTags(tags) {
    const tagsList = [];
    if (tags.cuisine) tagsList.push(...tags.cuisine.split(';').map(c => c.trim()));
    if (tags.outdoor_seating === 'yes') tagsList.push('outdoor-seating');
    if (tags.wheelchair === 'yes') tagsList.push('accessible');
    if (tags.takeaway === 'yes') tagsList.push('takeout');
    if (tags.organic === 'yes') tagsList.push('organic');
    if (tags.internet_access === 'wlan') tagsList.push('wifi');
    return tagsList;
  }
}

/**
 * Nominatim API - Geocoding and place search
 */
class NominatimAPI {
  constructor() {
    this.endpoint = 'https://nominatim.openstreetmap.org';
    this.cache = new Map();
  }
  
  /**
   * Search for places by text query
   */
  async search(query, options = {}) {
    const {
      limit = 10,
      boundingBox = null,
      countrycodes = 'us,ca'
    } = options;
    
    const cacheKey = `${query}-${JSON.stringify(options)}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }
    
    try {
      const params = new URLSearchParams({
        q: query,
        format: 'json',
        limit: limit.toString(),
        addressdetails: '1',
        extratags: '1',
        countrycodes
      });
      
      if (boundingBox) {
        params.append('viewbox', boundingBox.join(','));
        params.append('bounded', '1');
      }
      
      const response = await fetch(`${this.endpoint}/search?${params}`, {
        headers: {
          'User-Agent': 'MMT-2025-Trip-Planner/1.0'
        }
      });
      
      if (!response.ok) throw new Error('Nominatim API error');
      
      const data = await response.json();
      const results = data.map(place => this.placeToActivity(place, query));
      
      this.cache.set(cacheKey, results);
      return results;
      
    } catch (error) {
      console.error('Nominatim search error:', error);
      return [];
    }
  }
  
  /**
   * Convert Nominatim place to Activity
   */
  placeToActivity(place, originalQuery) {
    return new Activity({
      id: `nominatim-${place.place_id}`,
      name: place.name || place.display_name.split(',')[0],
      type: this.inferTypeFromClass(place.class, place.type),
      location: this.extractLocation(place),
      address: place.display_name,
      coordinates: [parseFloat(place.lat), parseFloat(place.lon)],
      description: `Found via search: "${originalQuery}"`,
      tags: [place.class, place.type].filter(Boolean),
      source: 'nominatim',
      sourceId: place.place_id,
    });
  }
  
  /**
   * Infer type from OSM class/type
   */
  inferTypeFromClass(osmClass, osmType) {
    const mapping = {
      amenity: {
        restaurant: 'restaurant',
        cafe: 'cafe',
        bar: 'bar',
        pub: 'bar',
        fast_food: 'restaurant',
      },
      tourism: {
        museum: 'museum',
        attraction: 'attraction',
        viewpoint: 'viewpoint',
        hotel: 'lodging',
        guest_house: 'lodging',
      },
      leisure: {
        park: 'park',
        nature_reserve: 'park',
      },
      shop: {
        _default: 'shopping'
      }
    };
    
    return mapping[osmClass]?.[osmType] || mapping[osmClass]?._default || 'attraction';
  }
  
  /**
   * Extract location string
   */
  extractLocation(place) {
    const address = place.address;
    if (!address) return place.display_name.split(',').slice(1, 3).join(',').trim();
    
    const parts = [];
    if (address.city) parts.push(address.city);
    else if (address.town) parts.push(address.town);
    else if (address.village) parts.push(address.village);
    
    if (address.state) parts.push(address.state);
    
    return parts.join(', ') || place.display_name.split(',')[1]?.trim();
  }
}

/**
 * Unified Search Service
 */
export class SearchService {
  constructor() {
    this.overpass = new OverpassAPI();
    this.nominatim = new NominatimAPI();
  }
  
  /**
   * Search for activities using all available sources
   */
  async searchActivities(query, options = {}) {
    const {
      location = null,  // [lat, lng, radius in miles]
      types = [],
      limit = 20,
      source = 'all' // 'all', 'osm', 'nominatim'
    } = options;
    
    const results = [];
    
    try {
      // Use Nominatim for text-based search
      if (source === 'all' || source === 'nominatim') {
        const nominatimResults = await this.nominatim.search(query, {
          limit: Math.ceil(limit / 2),
          boundingBox: location ? this.overpass.calculateBounds(location) : null
        });
        results.push(...nominatimResults);
      }
      
      // Use Overpass for type-based search if location provided
      if ((source === 'all' || source === 'osm') && location && types.length > 0) {
        const overpassResults = await this.overpass.search({
          query,
          location,
          types,
          limit: Math.ceil(limit / 2)
        });
        results.push(...overpassResults);
      }
      
      // Deduplicate by name + location
      const unique = this.deduplicateResults(results);
      
      return unique.slice(0, limit);
      
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  }
  
  /**
   * Search within a specific region
   */
  async searchInRegion(query, region, options = {}) {
    // Define region bounds
    const regions = {
      boston: [42.3601, -71.0589, 25],
      portland: [43.6591, -70.2568, 25],
      maine_coast: [43.5, -70.0, 50],
      vermont: [44.0, -72.5, 40],
      montreal: [45.5017, -73.5673, 20],
      adirondacks: [44.0, -74.0, 50],
      white_mountains: [44.2, -71.5, 30],
    };
    
    const location = regions[region.toLowerCase()] || null;
    
    return this.searchActivities(query, {
      ...options,
      location
    });
  }
  
  /**
   * Deduplicate results by similarity
   */
  deduplicateResults(results) {
    const seen = new Set();
    return results.filter(activity => {
      const key = `${activity.name.toLowerCase()}-${activity.location}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
  
  /**
   * Enrich activity with additional data
   */
  async enrichActivity(activity) {
    // Could add: Google Places API, Yelp, weather, etc.
    return activity;
  }
}

// Singleton instance
export const searchService = new SearchService();
