// =====================================================================
//  Página "endpoint pendiente"
//  Recibe por query string el método y la ruta que devolvieron 404
//  (los pone api.js al redirigir) y muestra la guía de lo que falta.
// =====================================================================

const PENDING_ENDPOINTS = [
    {
        method: 'DELETE',
        pattern: /^\/djinn\/[^/]+$/,
        path: '/djinn/{id}',
        title: 'Borrar un djinn',
        summary: 'La web ya sabe pedir el borrado de un djinn, pero el API todavía no tiene el endpoint que lo atiende.',
        params: ['<code>id</code> (Long), en la ruta: identificador del djinn a borrar.', 'No lleva cuerpo (body).'],
        response: ['<code>204 No Content</code> si se borra.', '<code>404</code> con un <code>ErrorResponse</code> si no existe ningún djinn con ese id.'],
        steps: [
            'En <code>DjinnController</code>, crear un método con <code>@DeleteMapping("/{id}")</code> que reciba el id con <code>@PathVariable</code>.',
            'En <code>DjinnService</code>, comprobar que el djinn existe y pedir su borrado al repositorio.',
            'En <code>DjinnRepository</code>, añadir un método que elimine el djinn del almacén en memoria.',
            'Lanzar una excepción propia si no existe y gestionarla en el advice para devolver el 404.'
        ]
    },
    {
        method: 'GET',
        pattern: /^\/djinn\/[^/]+$/,
        path: '/djinn/{id}',
        title: 'Ver un djinn',
        summary: 'La barra lateral de detalle necesita consultar un único djinn, pero el API todavía no tiene el endpoint que lo devuelve.',
        params: ['<code>id</code> (Long), en la ruta: identificador del djinn a consultar.', 'No lleva cuerpo (body).'],
        response: ['<code>200 OK</code> con un <code>DjinnResponse</code> en JSON.', '<code>404</code> con un <code>ErrorResponse</code> si no existe ningún djinn con ese id.'],
        steps: [
            'En <code>DjinnController</code>, crear un método con <code>@GetMapping("/{id}")</code> que reciba el id con <code>@PathVariable</code>.',
            'En <code>DjinnService</code>, buscar el djinn y convertirlo a <code>DjinnResponse</code> usando el mapper.',
            'En <code>DjinnRepository</code>, añadir un <code>findById</code> que devuelva un <code>Optional&lt;Djinn&gt;</code>.',
            'Lanzar una excepción propia si no existe y gestionarla en el advice para devolver el 404.'
        ]
    }
];

function fillList(element, items, ordered) {
    const list = document.createElement(ordered ? 'ol' : 'ul');
    for (const item of items) {
        const li = document.createElement('li');
        li.innerHTML = item;
        list.appendChild(li);
    }
    element.appendChild(list);
}

function render() {
    const query = new URLSearchParams(window.location.search);
    const method = (query.get('method') || 'GET').toUpperCase();
    const path = query.get('path') || '';
    const info = PENDING_ENDPOINTS.find(e => e.method === method && e.pattern.test(path));

    document.getElementById('method').textContent = method;

    if (!info) {
        document.getElementById('path').textContent = path || '(desconocido)';
        document.getElementById('summary').textContent =
            'El API respondió 404 a esta petición y no hay una guía preparada para ella. Revisa que el endpoint exista y que la ruta y el método coincidan.';
        document.getElementById('params').textContent = '-';
        document.getElementById('response').textContent = '-';
        document.getElementById('steps').textContent = '-';
        return;
    }

    document.getElementById('title').textContent = info.title;
    document.getElementById('summary').textContent = info.summary;
    document.getElementById('path').textContent = info.path;
    fillList(document.getElementById('params'), info.params, false);
    fillList(document.getElementById('response'), info.response, false);
    fillList(document.getElementById('steps'), info.steps, true);
}

render();
