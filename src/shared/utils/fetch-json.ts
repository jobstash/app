export const fetchJson = (url: string) => fetch(url).then((r) => r.json());
