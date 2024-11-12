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
            }
        };
    }

    // Returns the correct API path based on the `ml` mode
    get_path_toplist(ml, type) {
        const api_path = ml ? this.path + this.ml : this.path + this.public;
        return api_path + (type === this.dataTypes.Skills ? this.apiUrls.skillToplist : this.apiUrls.activityToplist);
    }

    get_param_key(ml, type){
        if (!ml){
            return (type === this.dataTypes.Skills ? 'skill-id' : 'minigame-id');
        }else{
            return (type === this.dataTypes.Skills ? 'skill' : 'minigame');
        }
    }
    get_path_users(ml, type) {
        const api_path = ml ? this.path + this.ml : this.path + this.public;
        return api_path + (type === this.dataTypes.Skills ? this.apiUrls.skillUsers : this.apiUrls.activityUsers);

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
                const api_url = this.get_path_toplist(ml,type);
                const response = await fetch(api_url, { credentials: 'include' });
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
                const param_key = this.get_param_key(ml,type);
                const api_url = this.get_path_users(ml,type) + `?${param_key}=${id}`;
                console.log(api_url)

                const response = await fetch(api_url, { credentials: 'include' });
                modeCache.playersData[type][id] = await response.json();
            } catch (error) {
                console.error('Error fetching players data:', error);
            }
        }
        return modeCache.playersData[type][id];
    }
}

export default new LeaderboardService();
