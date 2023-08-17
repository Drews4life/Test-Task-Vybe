import { Result } from "../types";

type Error = string;

export const post = async <T, F>(url: URL, body: T): Promise<Result<F, Error>> => {
    try {
        const result = await fetch(url, { method: "POST",  body: JSON.stringify(body) });

        if (!result.ok) {
            return { ok: false, value: "Request failed"};
        }
    
        const parsedResult = await result.json() as F;

        return { ok: true, value: parsedResult };
    } catch (err) {
        return { ok: false, value: err instanceof Error ? err.message : err as string };
    }
};

export const constructUrl = (endpoint: string, params?: Record<string, string>) => {
    const url = new URL(endpoint);

    if (params) {
        Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
    }

    return url;
} 