import {renderAllComponents} from "./render-all-components.js";


export function deleteGroup(event) {

    const groupElement = event.currentTarget.parentElement;

    const groupName = groupElement.querySelector('.content-sidebar-groups__item-group').textContent.trim();

    const groupsContainer = document.getElementById('content-sidebar-groups');

    groupsContainer.removeChild(groupElement);
    let data = JSON.parse(localStorage.getItem("data")) || { groups: [], persons: [] };

    data.groups = data.groups.filter(item => item.name !== groupName)
    localStorage.setItem("data", JSON.stringify(data));

    event.stopPropagation()
    renderAllComponents();
}