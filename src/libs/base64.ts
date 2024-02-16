export function urlSafeBase64Encode(str: string): string {
    return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

export function urlSafeBase64Decode(str: string): string {
    return atob(str.replace(/-/g, '+').replace(/_/g, '/'));
}
