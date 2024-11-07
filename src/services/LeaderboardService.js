class LeaderboardService {
    constructor() {
        this.path = "http://localhost:4050/api/v2/public/"
        this.apiUrls = {
            skillToplist: 'skill-toplist',
            skillUsers: 'skill-toplist-users',
            activityToplist: 'boss-minigame-toplist',
            activityUsers: 'boss-minigame-toplist-users',

        };
        this.dataTypes = {
            Skills: 'Skills',
            Activities: 'Activities'
        }
        this.dataCache = {
            toplistData: {},
            playersData: {},
        };
    }

    // Fetch toplist data and cache it
    async fetchLeaderboard(type) {
        if (!this.dataCache.toplistData[type]) {
            // Initialize as an empty array if the key does not exist
            this.dataCache.toplistData[type] = [];
        }

        if (this.dataCache.toplistData[type].length === 0) {
            try {
                const api_url = this.path + (type === this.dataTypes.Skills ? this.apiUrls.skillToplist : this.apiUrls.activityToplist);
                const response = await fetch(api_url, {credentials: 'include'});
                this.dataCache.toplistData[type] = await response.json();

            } catch (error) {
                console.error('Error fetching toplist data:', error);
            }
        }
        return this.dataCache.toplistData[type];
    }

    // Fetch player data for a specific skill ID, using caching to avoid redundant API calls
    async fetchPlayers(id, type) {
        if (!this.dataCache.playersData[type]) {
            // Initialize as an empty array if the type key does not exist
            this.dataCache.playersData[type] = {};
        }

        if (!this.dataCache.playersData[type][id]) {
            // Initialize as an empty array if the id key does not exist
            this.dataCache.playersData[type][id] = [];
        }

        console.log(`dataTypes.Skills=[${this.dataTypes.Skills}] and type=[${type}]`);

        if (this.dataCache.playersData[type][id].length === 0) {
            try {
                const param_key = (type === this.dataTypes.Skills ? 'skill-id' : 'minigame-id');
                const api_url = this.path + (type === this.dataTypes.Skills ? this.apiUrls.skillUsers : this.apiUrls.activityUsers) + `?${param_key}=${id}`;

                const response = await fetch(api_url, {credentials: 'include'});
                this.dataCache.playersData[type][id] = await response.json();
            } catch (error) {
                console.error('Error fetching players data:', error);
            }
        }
        return this.dataCache.playersData[type][id];
    }
}

export default new LeaderboardService();
