import {renderAllComponents} from "./render-all-components.js";

let data = JSON.parse(localStorage.getItem("data")) || { groups: [], persons: [] };

export function deleteGroup(event) {

    const groupElement = event.currentTarget.parentElement;

    const groupName = groupElement.querySelector('.content-sidebar-groups__item-group').textContent.trim();

    const groupsContainer = document.getElementById('content-sidebar-groups');

    groupsContainer.removeChild(groupElement);
    data.groups = data.groups.filter(item => item.name !== groupName)
    localStorage.setItem("data", JSON.stringify(data));

    event.stopPropagation()
    renderAllComponents();
}