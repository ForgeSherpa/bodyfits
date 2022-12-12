export default function query(name) {
    const currentUrl = new URL(window.location.href);
    return currentUrl.searchParams.get(name);
}
