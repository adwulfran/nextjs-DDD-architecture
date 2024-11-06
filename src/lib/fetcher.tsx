export default async function fetcher<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data: T = await response.json() as T; // Cast the response as the generic type T
    return data;
}