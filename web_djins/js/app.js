// =====================================================================
//  ZONA DE INTERFAZ
//  Gestiona el formulario y la tabla. Para hablar con el backend usa
//  únicamente DjinnApi (js/api.js).
// =====================================================================

const form = document.getElementById('djinn-form');
const list = document.getElementById('djinn-list');
const emptyText = document.getElementById('empty');
const messageBox = document.getElementById('message');

let djinnCache = [];

function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = 'message ' + type;
    messageBox.hidden = false;
}

function readForm() {
    return {
        name: document.getElementById('name').value,
        element: document.getElementById('element').value,
        game: document.getElementById('game').value,
        location: document.getElementById('location').value,
        effect: document.getElementById('effect').value,
        summonPower: Number(document.getElementById('summonPower').value)
    };
}

function resetForm() {
    form.reset();
}

function createCell(text, className) {
    const td = document.createElement('td');
    td.textContent = text;
    if (className) {
        td.className = className;
    }
    return td;
}

function createImageCell(djinn) {
    const td = document.createElement('td');
    const img = document.createElement('img');
    img.className = 'djinn-img';
    img.src = 'img/' + djinn.element.toLowerCase() + '.png';
    img.alt = djinn.name + ' (' + djinn.element + ')';
    // desfase aleatorio para que no floten todos a la vez
    img.style.animationDelay = '-' + (Math.random() * 2.4).toFixed(2) + 's';
    td.appendChild(img);
    return td;
}

const panel = document.getElementById('detail-panel');
const backdrop = document.getElementById('backdrop');
const detailStatus = document.getElementById('detail-status');
const detailContent = document.getElementById('detail-content');

const DETAIL_FIELDS = [
    ['ID', 'id'],
    ['Nombre', 'name'],
    ['Elemento', 'element'],
    ['Juego', 'game'],
    ['Ubicación', 'location'],
    ['Efecto', 'effect'],
    ['Poder de invocación', 'summonPower'],
    ['Estado', 'state'],
    ['Nombre completo', 'displayName']
];

function openPanel() {
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    backdrop.hidden = false;
}

function closePanel() {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    backdrop.hidden = true;
}

function renderDetail(djinn) {
    const img = document.getElementById('detail-img');
    img.src = 'img/' + djinn.element.toLowerCase() + '.png';
    img.alt = djinn.name;

    const fields = document.getElementById('detail-fields');
    fields.innerHTML = '';
    for (const [label, key] of DETAIL_FIELDS) {
        const dt = document.createElement('dt');
        dt.textContent = label;
        const dd = document.createElement('dd');
        dd.textContent = djinn[key];
        fields.appendChild(dt);
        fields.appendChild(dd);
    }
}

async function viewDjinn(id) {
    openPanel();
    detailContent.hidden = true;
    detailStatus.textContent = 'Cargando...';
    detailStatus.hidden = false;
    try {
        const djinn = await DjinnApi.findById(id);
        renderDetail(djinn);
        detailStatus.hidden = true;
        detailContent.hidden = false;
    } catch (e) {
        detailStatus.textContent = e.message;
    }
}

async function deleteDjinn(djinn) {
    if (!confirm('¿Borrar a ' + djinn.name + '?')) {
        return;
    }
    try {
        await DjinnApi.remove(djinn.id);
        showMessage('Djinn borrado correctamente', 'ok');
        await document.getElementById('detail-close').addEventListener('click', closePanel);
backdrop.addEventListener('click', closePanel);
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closePanel();
    }
});

loadDjinn();
    } catch (e) {
        showMessage(e.message, 'error');
    }
}

const ICON_VIEW = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>';
const ICON_DELETE = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>';

function createIconButton(icon, label, className, onClick) {
    const btn = document.createElement('button');
    btn.className = 'icon-btn ' + className;
    btn.innerHTML = icon;
    btn.title = label;
    btn.setAttribute('aria-label', label);
    btn.addEventListener('click', onClick);
    return btn;
}

function createActionsCell(djinn) {
    const td = document.createElement('td');
    td.appendChild(createIconButton(ICON_VIEW, 'Ver detalle', 'view', () => viewDjinn(djinn.id)));
    td.appendChild(createIconButton(ICON_DELETE, 'Borrar', 'danger', () => deleteDjinn(djinn)));
    return td;
}

function renderList() {
    list.innerHTML = '';
    emptyText.hidden = djinnCache.length > 0;

    for (const djinn of djinnCache) {
        const row = document.createElement('tr');
        row.appendChild(createImageCell(djinn));
        row.appendChild(createCell(djinn.id));
        row.appendChild(createCell(djinn.name));
        row.appendChild(createCell(djinn.element, 'element ' + djinn.element));
        row.appendChild(createCell(djinn.game));
        row.appendChild(createCell(djinn.location));
        row.appendChild(createCell(djinn.effect));
        row.appendChild(createCell(djinn.summonPower));
        row.appendChild(createCell(djinn.state));
        row.appendChild(createActionsCell(djinn));

        list.appendChild(row);
    }
}

async function loadDjinn() {
    try {
        djinnCache = await DjinnApi.findAll();
        renderList();
    } catch (e) {
        showMessage(e.message, 'error');
    }
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
        await DjinnApi.create(readForm());
        showMessage('Djinn creado correctamente', 'ok');
        resetForm();
        await document.getElementById('detail-close').addEventListener('click', closePanel);
backdrop.addEventListener('click', closePanel);
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closePanel();
    }
});

loadDjinn();
    } catch (e) {
        showMessage(e.message, 'error');
    }
});

document.getElementById('detail-close').addEventListener('click', closePanel);
backdrop.addEventListener('click', closePanel);
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closePanel();
    }
});

loadDjinn();
