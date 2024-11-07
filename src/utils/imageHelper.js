// Formats item names into lowercase with underscores (e.g., "Hitpoints Strength" -> "hitpoints_strength")
export function filterFileName(input){
    let output = input.replace(/[^a-zA-Z\s]/g, '');
    output = output.replaceAll(' ', '_')
    return output
}

// Generates the image URL path
export function getImageUrl(type, item) {
    // Choose the image path based on the type
    const iconFolder = (type === 'Skills' ? 'skill_icons' :'minigame_icons');
    item = item.toLowerCase();
    let item_name = (type === 'Skills' ? item : filterFileName(item));
    return `/img/${iconFolder}/${item_name}.png`;
}