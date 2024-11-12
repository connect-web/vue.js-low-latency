// src/services/ApiService.js
class ApiService {
    constructor() {
        this.data = null;
    }

    async getGlobalStats() {
        if (this.data) {
            // If the data is already fetched, return it
            return this.data;
        }

        try {
            const protocol = import.meta.env.VITE_SSL_ENABLED === 'true' ? 'https' : 'http';
            const backendDomain = import.meta.env.VITE_BACKEND_DOMAIN;

            // Construct the full URL
            const backendUrl = `${protocol}://${backendDomain}`;

            const url = `${backendUrl}/api/v2/user/global-stats`;
            console.log("stats: ", url);
            const response = await fetch(url, {
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            this.data = await response.json(); // Store the fetched data in memory
            return this.data;
        } catch (error) {
            throw new Error('Error fetching data: ' + error.message);
        }
    }
}

// Export a singleton instance of ApiService
export default new ApiService();
