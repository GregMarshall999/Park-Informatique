document.getElementById('load-entities').addEventListener('click', loadEntities);

async function loadEntities() {
    const entity = document.getElementById('entity-select').value;
    const entityList = document.getElementById('entity-list');
    const response = await fetch(`http://localhost:3000/api/${entity}`);
    const data = await response.json();
    
    let table = `<table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>`;
    
    data.forEach(item => {
        table += `<tr>
            <td>${item._id}</td>
            <td>${item.name || item.username || item.description || 'N/A'}</td>
            <td>
                <button onclick="viewDetails('${entity}', '${item._id}')">View</button>
                <button onclick="editEntity('${entity}', '${item._id}')">Edit</button>
                <button onclick="deleteEntity('${entity}', '${item._id}')">Delete</button>
            </td>
        </tr>`;
    });
    
    table += `</tbody></table>
              <button onclick="addEntity('${entity}')">Add New ${entity.slice(0, -1)}</button>`;
    
    entityList.innerHTML = table;
}

async function viewDetails(entity, id) {
    const response = await fetch(`http://localhost:3000/api/${entity}/${id}`);
    const data = await response.json();
    displayDetails(entity, data, false);
}

async function editEntity(entity, id) {
    const response = await fetch(`http://localhost:3000/api/${entity}/${id}`);
    const data = await response.json();
    displayDetails(entity, data, true);
}

async function deleteEntity(entity, id) {
    await fetch(`http://localhost:3000/api/${entity}/${id}`, {
        method: 'DELETE'
    });
    loadEntities();
}

function addEntity(entity) {
    displayDetails(entity, {}, true);
}

async function saveEntity(entity, id) {
    const form = document.getElementById('entity-form');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:3000/api/${entity}/${id}` : `http://localhost:3000/api/${entity}`;

    await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    loadEntities();
}

function displayDetails(entity, data, isEditable) {
    const entityDetails = document.getElementById('entity-details');
    let form = `<form id="entity-form">
        ${Object.keys(data).map(key => `
            <div>
                <label for="${key}">${key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <input type="${key.includes('password') ? 'password' : 'text'}" id="${key}" name="${key}" value="${data[key] || ''}" ${isEditable ? '' : 'readonly'}>
            </div>`).join('')}
        ${isEditable ? `<button type="button" onclick="saveEntity('${entity}', '${data._id || ''}')">Save</button>` : ''}
        <button type="button" onclick="clearDetails()">Cancel</button>
    </form>`;
    entityDetails.innerHTML = form;
}

function clearDetails() {
    document.getElementById('entity-details').innerHTML = '';
}