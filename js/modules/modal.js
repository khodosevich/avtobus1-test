import {renderGroupMembers} from "./render-groups-members.js";


let data = JSON.parse(localStorage.getItem("data")) || { groups: [], persons: [] };


export function openNoteModal(currentPersonId) {

    const openModal = document.getElementById('modal-window')
    const closeModal = document.getElementById('close-modal')

    const person = data.persons.filter(personId => personId.personId === currentPersonId)
    const nameInput = document.getElementById("new-name")
    const numberInput = document.getElementById("new-number")

    const savePerson = document.getElementById('save-new-person')

    nameInput.value = person[0].name
    numberInput.value = person[0].phone

    document.addEventListener('click', (event) => {
        if (event.target === openModal) {
            openModal.classList.remove('open');
        }
    });

    openModal.classList.add('open')

    closeModal.addEventListener('click', () => {
        openModal.classList.remove('open')
    })

    savePerson.addEventListener('click', () => {

        const newName = document.getElementById("new-name").value
        const newNumber = document.getElementById("new-number").value


        if(!newName || !newNumber ) {
            alert("Заполните все поля!");
            return
        }

        const phoneNumberRegex = /^\+\d{7,}$/;
        if (!phoneNumberRegex.test(newNumber)) {
            alert("Пожалуйста, введите корректный номер телефона.");
            return;
        }

        const indexToUpdate = data.persons.findIndex(person => person.personId === currentPersonId);

        if (indexToUpdate !== -1) {
            console.log("save")
            data.persons[indexToUpdate].name = newName;
            data.persons[indexToUpdate].phone = newNumber;

            localStorage.setItem("data", JSON.stringify(data));
            openModal.classList.remove('open');

            data = JSON.parse(localStorage.getItem("data"));
            renderGroupMembers(data.persons[indexToUpdate].groupId);
        }

    })

}