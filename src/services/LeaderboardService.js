class LeaderboardService {
    constructor() {
        // Determine protocol based on SSL_ENABLED environment variable
        const protocol = import.meta.env.VITE_SSL_ENABLED === 'true' ? 'https' : 'http';
        const backendDomain = import.meta.env.VITE_BACKEND_DOMAIN;

        // Construct the full URL
        const backendUrl = `${protocol}://${backendDomain}`;
        console.log("LeaderboardService: ", backendUrl);

        this.path = `${backendUrl}/api/v2/`;
        this.public = "public/";
        this.ml = "ml/";
        this.recent = "recent/";

        this.apiUrls = {
            skillToplist: 'skill-toplist',
            skillUsers: 'skill-toplist-users',
            activityToplist: 'boss-minigame-toplist',
            activityUsers: 'boss-minigame-toplist-users',


        };
        this.dataTypes = {
            Skills: 'Skills',
            Activities: 'Activities'
        };

        // Separate caches for each mode: `public` and `ml`
        this.dataCache = {
            public: {
                toplistData: {},
                playersData: {}
            },
            ml: {
                toplistData: {},
                playersData: {}
            },
            recent: {
                createdUsers: {},
                bannedUsers: {},
            }
        };
    }

    // Returns the correct API path based on the `ml` mode
    get_path_toplist(ml, type) {
        const api_path = ml ? this.path + this.ml : this.path + this.public;
        return api_path + (type === this.dataTypes.Skills ? this.apiUrls.skillToplist : this.apiUrls.activityToplist);
    }

    get_param_key(ml, type) {
        if (!ml) {
            return (type === this.dataTypes.Skills ? 'skill-id' : 'minigame-id');
        } else {
            return (type === this.dataTypes.Skills ? 'skill' : 'minigame');
        }
    }

    get_path_users(ml, type) {
        const api_path = ml ? this.path + this.ml : this.path + this.public;
        return api_path + (type === this.dataTypes.Skills ? this.apiUrls.skillUsers : this.apiUrls.activityUsers);

    }

    async fetchRecentUsers(id, recentType, type) {
        if (!['createdUsers', 'bannedUsers'].includes(recentType)) {
            throw new Error(`Invalid recent user type: ${recentType}`);
        }

        if (!['Skills', 'Activities'].includes(type)) {
            throw new Error(`Invalid type: ${type}. Allowed types are 'Skills' and 'Activities'.`);
        }

        // Define cache key based on recentType
        const cacheKey = this.dataCache.recent[recentType];

        // If data is already cached, return it
        if (Object.keys(cacheKey).length > 0) {
            return cacheKey;
        }

        try {
            // Determine the endpoint based on recentType and type
            const typePath = type === 'Skills' ? 'skill' : 'minigame';
            const recentPath = recentType === 'createdUsers' ? `created-${typePath}-users` : `banned-${typePath}-users`;
            const params = this.get_param_key(false, type);
            const apiUrl = `${this.path}${this.recent}${recentPath}?${params}=${id}`;

            // Fetch data from the API
            const response = await fetch(apiUrl, { credentials: 'include' });
            const data = await response.json();

            // Cache the fetched data
            this.dataCache.recent[recentType] = data;

            return data;
        } catch (error) {
            console.error(`Error fetching recent users for ${recentType} and ${type}:`, error);
            return {};
        }
    }




    // Fetch toplist data and cache it in the appropriate mode
    async fetchLeaderboard(type, ml = false) {
        const modeCache = ml ? this.dataCache.ml : this.dataCache.public;

        if (!modeCache.toplistData[type]) {
            // Initialize as an empty array if the key does not exist
            modeCache.toplistData[type] = [];
        }

        if (modeCache.toplistData[type].length === 0) {
            try {
                const api_url = this.get_path_toplist(ml, type);
                const response = await fetch(api_url, {credentials: 'include'});
                modeCache.toplistData[type] = await response.json();
            } catch (error) {
                console.error('Error fetching toplist data:', error);
            }
        }
        return modeCache.toplistData[type];
    }

    // Fetch player data for a specific skill ID, with caching by mode and type
    async fetchPlayers(id, type, ml = false) {
        console.log(`id (typeof):`, typeof id); // Logs 'object' if it's an object
        console.log(`id (toString):`, Object.prototype.toString.call(id)); // Provides more detail, e.g., [object Object]
        console.log(`id (structure):`, id); // Logs the actual structure of `id`


        const modeCache = ml ? this.dataCache.ml : this.dataCache.public;

        if (!modeCache.playersData[type]) {
            modeCache.playersData[type] = {};
        }

        if (!modeCache.playersData[type][id]) {
            modeCache.playersData[type][id] = [];
        }

        if (modeCache.playersData[type][id].length === 0) {
            try {
                const param_key = this.get_param_key(ml, type);
                const api_url = this.get_path_users(ml, type) + `?${param_key}=${id}`;
                console.log(api_url)

                const response = await fetch(api_url, {credentials: 'include'});
                modeCache.playersData[type][id] = await response.json();
            } catch (error) {
                console.error('Error fetching players data:', error);
            }
        }
        return modeCache.playersData[type][id];
    }
}

export default new LeaderboardService();
