import {generateUniqueId} from "./random-id.js";
import {renderAllComponents} from "./render-all-components.js";

let data = JSON.parse(localStorage.getItem("data")) || { groups: [], persons: [] };
const sidebar = document.getElementById("sidebar");
const sidebarNewGroup = document.getElementById("sidebar-new-group");
const addContact = document.getElementById("btn-add-contact");
const groupContact = document.getElementById("btn-groups");

export function openSidebar(title,adding) {

    let titleElement = sidebar.querySelector('.title-sidebar');

    document.body.classList.add("open")

    if(!adding) {
        document.getElementById("btn-adding").classList.add("open")
        document.getElementById("content-sidebar-form").classList.remove("open")
        document.getElementById("content-sidebar-groups").classList.add("open")
        document.getElementById("btn-save-group").classList.add("open")
        document.getElementById("btn-save-person").classList.remove("open")
    }else {
        document.getElementById("btn-adding").classList.remove("open")
        document.getElementById("content-sidebar-form").classList.add("open")
        document.getElementById("content-sidebar-groups").classList.remove("open")
        document.getElementById("btn-save-group").classList.remove("open")
        document.getElementById("btn-save-person").classList.add("open")
    }

    titleElement.textContent = title;
    sidebar.classList.add('open');
    document.addEventListener("click" , outsideClickHandler)
}

export function closeSidebarHandler() {
    sidebar.classList.remove('open');
    document.body.classList.remove("open")
    sidebarNewGroup.classList.remove("open")
}


export function createGroup() {
    sidebarNewGroup.classList.add("open");
}

export function saveNewGroup() {


    const groupInputValue = document.getElementById("groupInput").value;

    if(groupInputValue === null || groupInputValue === ""){
        alert("check your input!")
        return;
    }

    if (groupInputValue !== null && groupInputValue.trim() !== "") {

        console.log("new")

        sidebarNewGroup.classList.remove("open");

        const newGroup = {
            id: generateUniqueId(),
            name: groupInputValue,
        }
        data.groups.push(newGroup);

        localStorage.setItem("data", JSON.stringify(data));

        document.getElementById("groupInput").value = "";
    }

    renderAllComponents();
}

function outsideClickHandler(event) {

    if (!sidebar.contains(event.target) && !addContact.contains(event.target) && !groupContact.contains(event.target) ) {
        closeSidebarHandler()
    }
}