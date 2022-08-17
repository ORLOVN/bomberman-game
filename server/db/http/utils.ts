import { isArray, isObject } from "@/utils/checking-utils";

export default function queryStringify(data?: Record<string, unknown>): string {
    if (!isObject(data)) {
        throw new Error('input must be an object');
    }

        return `?${getParams(data).map((arr) => arr.join('=')).join('&')}`;
}

function getParams(data: Record<string, unknown> | unknown[], parentKey = '') {
    const result: Array<[string, string]> = [];

    Object.entries(data).forEach(([key, value]) => {
        const finalKey = parentKey ? `${parentKey}[${key}]` : key;

        if (isObject(value) || isArray(value)) {
            result.push(...getParams(value, finalKey));
        } else {
            result.push([finalKey, encodeURIComponent(String(value))]);
        }
    });

    return result;
}
