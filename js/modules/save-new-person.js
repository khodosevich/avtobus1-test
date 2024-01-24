import {generateUniqueId} from "./random-id.js";
import {renderGroupMembers} from "./render-groups-members.js";
import {closeSidebarHandler} from "./sidebar.js";

let data = JSON.parse(localStorage.getItem("data")) || { groups: [], persons: [] };


export function saveNewPerson() {

    const nameInput = document.getElementById("content-sidebar-form-person").value
    const numberInput = document.getElementById("content-sidebar-form-number").value
    const selectInput = document.getElementById("choose-group").value


    if (!nameInput || !numberInput || !selectInput) {
        alert("Пожалуйста, заполните все поля.");
        return;
    }

    const phoneNumberRegex = /^\+\d{7,}$/;
    if (!phoneNumberRegex.test(numberInput)) {
        alert("Пожалуйста, введите корректный номер телефона.");
        return;
    }

    if(selectInput < 0) {
        alert("Пожалуйста, выберите группу.");
        return;
    }

    const newPerson = {
        name: nameInput,
        phone: numberInput,
        groupId: selectInput,
        personId: generateUniqueId()
    }

    data.persons.push(newPerson)

    renderGroupMembers(selectInput)

    localStorage.setItem("data", JSON.stringify(data));

    document.getElementById("content-sidebar-form-person").value = "";
    document.getElementById("content-sidebar-form-number").value = "";
    document.getElementById("choose-group").value = -1;

    closeSidebarHandler()

}