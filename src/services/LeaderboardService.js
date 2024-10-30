class LeaderboardService {
    constructor() {
        this.path = "http://localhost:4050"
        this.apiUrls = {
            toplist: '/api/v2/public/skill-toplist',
            skillUsers: '/api/v2/public/skill-toplist-users',
        };
        this.dataCache = {
            toplistData: [],
            playersData: {},
        };
        this.totalPages = 0;
    }

    // Fetch toplist data and cache it
    async fetchToplistData() {
        if (this.dataCache.toplistData.length === 0) {
            try {
                const response = await fetch(this.path+this.apiUrls.toplist, {credentials: 'include'});
                this.dataCache.toplistData = await response.json();
                // this.totalPages = Math.ceil(jsonData.length / 10);
            } catch (error) {
                console.error('Error fetching toplist data:', error);
            }
        }
        return this.dataCache.toplistData;
    }

    // Fetch player data for a specific skill ID, using caching to avoid redundant API calls
    async fetchPlayersData(skillId) {
        if (!this.dataCache.playersData[skillId]) {
            try {
                const response = await fetch(`${this.path+this.apiUrls.skillUsers}?skill-id=${skillId}`, {credentials: 'include'});
                const jsonData = await response.json();
                this.dataCache.playersData[skillId] = jsonData;
            } catch (error) {
                console.error('Error fetching players data:', error);
            }
        }
        return this.dataCache.playersData[skillId];
    }

    // Method to get cached toplist data directly if needed
    getToplistData() {
        return this.dataCache.toplistData;
    }

    // Method to get cached players data for a specific skill ID
    getPlayersData(skillId) {
        return this.dataCache.playersData[skillId] || [];
    }
}

export default new LeaderboardService();
