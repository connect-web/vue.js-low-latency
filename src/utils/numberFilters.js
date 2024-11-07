export function viewLargeNumbers(value) {
    if (typeof value !== 'number') return value;
    if (value >= 1_000_000_000_000) {
        return `${(value / 1_000_000_000_000).toFixed(0)}T`;
    } else if (value >= 1_000_000_000) {
        return `${(value / 1_000_000_000).toFixed(0)}B`;
    } else if (value >= 10_000_000) {
        return `${(value / 1_000_000).toFixed(0)}M`;
    } else if (value >= 100_000) {
        return `${(value / 1_000).toFixed(0)}K`;
    }
    return value.toString();
}

// Parses abbreviations (e.g., "10M", "5K") into numbers
export function parseLargeNumber(value) {
    if (typeof value === 'string') {
        value = value.toLowerCase().trim();

        if (value.endsWith('t')) {
            return parseFloat(value) * 1_000_000_000_000;
        } else if (value.endsWith('b')) {
            return parseFloat(value) * 1_000_000_000;
        } else if (value.endsWith('m')) {
            return parseFloat(value) * 1_000_000;
        } else if (value.endsWith('k')) {
            return parseFloat(value) * 1_000;
        }
    }
    return parseFloat(value) || 0;
}


export function viewTruncatedLargeNumbers(value) {
    if (typeof value !== 'number') return value;
    if (value >= 1_000_000_000_000) {
        return `${(value / 1_000_000_000_000).toFixed(0)}T`;
    } else if (value >= 1_000_000_000) {
        return `${(value / 1_000_000_000).toFixed(0)}B`;
    } else if (value >= 1_000_000) {
        return `${(value / 1_000_000).toFixed(0)}M`;
    } else if (value >= 1000) {
        return `${(value / 1_000).toFixed(0)}K`;
    }
    return value.toString();
}