// Formats item names into lowercase with underscores (e.g., "Hitpoints Strength" -> "hitpoints_strength")
export function formatFileName(item) {
    return item.replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, '_').toLowerCase();
}

// Generates the image URL path
export function getImageUrl(type, item) {
    const folder = type === 'Skills' ? 'skill_icons' : 'minigame_icons';
    return `/img/${folder}/${formatFileName(item)}.png`;
}
