export function formatTimeSince(lastUpdated) {
    if (lastUpdated === "N/A") {
        return lastUpdated;
    }

    const now = Date.now();
    const lastUpdatedTime = new Date(lastUpdated).getTime();
    const diffInSeconds = Math.floor((now - lastUpdatedTime) / 1000);

    if (diffInSeconds < 3600) {
        // Display in minutes if less than 1 hour (60 minutes)
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} Minute${minutes === 1 ? '' : 's'}`;
    } else if (diffInSeconds < 86400) {
        // Display in hours if less than 24 hours
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} Hour${hours === 1 ? '' : 's'}`;
    } else {
        // Display in days for anything above 24 hours
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} Day${days === 1 ? '' : 's'}`;
    }
}
