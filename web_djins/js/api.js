// =====================================================================
//  ZONA DE ACCESO A LA API
//  Único fichero que conoce las URLs y hace llamadas fetch al backend.
//  Cada función devuelve el JSON de la respuesta, o lanza un Error
//  con el mensaje que envía el backend (ErrorResponse).
// =====================================================================

const DjinnApi = (() => {
    const BASE_URL = 'http://localhost:8080/djinn';

    async function request(url, options) {
        const response = await fetch(url, options);
        const body = await response.json().catch(() => null);

        // 404/405 que NO es un ErrorResponse nuestro (no trae "errors") = el endpoint no existe: lo genera Spring
        const isOwnError = body && Array.isArray(body.errors);
        if ((response.status === 404 || response.status === 405) && !isOwnError) {
            redirectToPendingEndpoint(url, options);
            return new Promise(() => {}); // la página se está descargando: no seguimos
        }

        if (!response.ok) {
            // body = { status, message, errors: [...] }
            const details = body && body.errors && body.errors.length ? ': ' + body.errors.join(', ') : '';
            throw new Error(((body && body.message) || 'Error ' + response.status) + details);
        }
        return body;
    }

    function redirectToPendingEndpoint(url, options) {
        const params = new URLSearchParams({
            method: (options && options.method) || 'GET',
            path: new URL(url).pathname
        });
        window.location.href = 'endpoint-pendiente.html?' + params;
    }

    function jsonOptions(method, data) {
        return {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
    }

    return {
        // GET /djinn
        findAll: () => request(BASE_URL),
        // GET /djinn/{id}  (endpoint pendiente de crear en el backend)
        findById: (id) => request(`${BASE_URL}/${id}`),
        // POST /djinn
        create: (data) => request(BASE_URL, jsonOptions('POST', data)),
        // DELETE /djinn/{id}  (endpoint pendiente de crear en el backend)
        remove: (id) => request(`${BASE_URL}/${id}`, { method: 'DELETE' })
    };
})();
