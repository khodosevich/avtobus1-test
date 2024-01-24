import {deleteGroup} from "./delete-group.js";

export function createGroupElement(groupName) {

    const groupElement = document.createElement('div');
    groupElement.classList.add('content-sidebar-groups__item');

    const groupContent = `
        <div class="content-sidebar-groups__item-group">${groupName}</div>
        <img id="btn-delete" class="delete-img" src="./assets/Delete forever.svg" alt="delete">
    `;

    groupElement.innerHTML = groupContent;

    const deleteGroupButton = groupElement.querySelector('.delete-img');
    deleteGroupButton.addEventListener('click', deleteGroup);

    return groupElement;
}