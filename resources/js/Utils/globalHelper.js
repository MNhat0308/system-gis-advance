function isEmpty(value) {
    return (
        value === null ||
        value === undefined ||
        (typeof value === 'object' && Object.keys(value).length === 0)
    );
}

function data_get(target, path, fallback = null) {
    if (isEmpty(target)) {
        return null;
    }

    if (isEmpty(path)) {
        return fallback;
    }

    const segments = Array.isArray(path) ? path : path.split('.');

    const [segment, ...rest] = segments;

    let value = target;

    // Single segment (no nesting)
    if (segments.length === 1 && segment !== '*') {
        return (value && value[segment] !== undefined)
            ? value[segment]
            : (typeof fallback === 'function' ? fallback() : fallback);
    }

    // Normal property
    if (segment !== '*') {
        if (value && value[segment] !== undefined) {
            return data_get(value[segment], rest, fallback);
        } else {
            return typeof fallback === 'function' ? fallback() : fallback;
        }
    }

    // Wildcard logic
    if (segment === '*') {
        const partial = rest;

        if (typeof value === 'object') {
            const keys = Object.keys(value);

            const results = keys.map(key => {
                return data_get(value[key], partial, fallback);
            });

            // Flatten one level and remove undefineds
            const flatResults = results.flat().filter(v => v !== undefined);

            // Convert to array if possible (numeric keys only)
            const isNumeric = flatResults.every((_, i) => !isNaN(i));
            return isNumeric ? flatResults : results;
        } else {
            return typeof fallback === 'function' ? fallback() : fallback;
        }
    }

    return typeof fallback === 'function' ? fallback() : fallback;
}

export { data_get };
