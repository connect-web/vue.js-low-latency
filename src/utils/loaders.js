export function loadScript(src) {
    let nonce = null;
    const script = document.createElement('script');
    script.src = `/${src}`;
    if (nonce) {
        script.setAttribute('nonce', nonce); // Apply nonce if provided
    }
    script.async = true;
    document.body.appendChild(script);
}

export function loadCss(href) {
    let nonce = null;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `/${href}`; // Prefix with `/` to ensure it starts from the root
    if (nonce) {
        link.setAttribute('nonce', nonce); // Apply nonce if provided
    }
    document.head.appendChild(link);
}
