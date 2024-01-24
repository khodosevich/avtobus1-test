import {createGroupElement} from "./create-group-element.js";
import {renderAllComponents} from "./render-all-components.js";

let data = JSON.parse(localStorage.getItem("data")) || { groups: [], persons: [] };


export function renderGroups() {

    const groupsContainer = document.getElementById('content-sidebar-groups');

    groupsContainer.innerHTML = '';

    if (data.groups && Array.isArray(data.groups)) {

        console.log(data.groups)

        data.groups.forEach(group => {
            const groupElement = createGroupElement(group.name);
            groupsContainer.appendChild(groupElement);
        });
    } else {
        console.error("Ошибка: data.groups не является массивом или отсутствует.");
    }
}