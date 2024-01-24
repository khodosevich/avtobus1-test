export function renderGroupItemHeader () {

    let data = JSON.parse(localStorage.getItem("data")) || { groups: [], persons: [] };

    const content = document.getElementById('choose-group');

    let groupsHTML = `<option value="-1">Выберите группу:</option>`;
    if (data.groups  && data.groups.length > 0) {


        for (const key in data.groups) {
            groupsHTML += `
            <option value="${data.groups[key].id}">${data.groups[key].name}</option>`;
        }

        content.innerHTML = groupsHTML;
    } else {
        content.innerHTML = `<h1 class="title-content">Список групп пуст</h1>`;
    }
}