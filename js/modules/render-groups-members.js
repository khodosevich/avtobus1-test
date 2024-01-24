import {openNoteModal} from "./modal.js";


export function renderGroupMembers(groupId) {

    let data = JSON.parse(localStorage.getItem("data")) || { groups: [], persons: [] };

    const groupContent = document.getElementById(`content-group-list-items-${groupId}`);

    if (groupContent) {

        groupContent.innerHTML = '';

        data.persons
            .filter(person => person.groupId === groupId)
            .forEach(person => {
                const listItem = document.createElement('div');
                listItem.classList.add('content-group-list-item');
                listItem.innerHTML = `
                    <h4>${person.name}</h4>
                    <div class="content-group-list-item-right">
                        <p>${person.phone}</p>
                        <div class="content-group-list-item-right-imgs">
                            <img id="change-note" class="change-note" data-id="${person.personId}" src="./assets/Mode edit.svg" alt="mode-edit">
                            <img class="delete-img" data-id="${person.personId}" src="./assets/Delete forever.svg" alt="delete">
                        </div>
                    </div>`;
                groupContent.appendChild(listItem);
            });

        const changeNoteButtons = groupContent.querySelectorAll('.change-note');
        changeNoteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const personId = button.getAttribute('data-id');
                openNoteModal(personId);
            });
        });

        const deleteImgButtons = groupContent.querySelectorAll('.delete-img');
        deleteImgButtons.forEach(button => {
            button.addEventListener('click', () => {
                const personId = button.getAttribute('data-id');
                const person = data.persons.find(person => person.personId === personId);
                const groupId = person.groupId;

                data.persons = data.persons.filter(person => person.personId !== personId);
                localStorage.setItem("data", JSON.stringify(data));
                renderGroupMembers(groupId);

            });
        });
    }
}