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
            const response = await fetch('http://localhost:4050/api/v2/user/global-stats', {
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
