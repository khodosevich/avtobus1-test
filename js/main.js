import {createGroup, openSidebar, saveNewGroup} from "./modules/sidebar.js";
import {renderAllComponents} from "./modules/render-all-components.js";
import {saveNewPerson} from "./modules/save-new-person.js";


const addContact = document.getElementById("btn-add-contact");
const groupContact = document.getElementById("btn-groups");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("close-sidebar");
const addContactSidebar = document.getElementById("btn-adding")
const btnSaveGroup = document.getElementById("btn-save-group")
const sidebarNewGroup = document.getElementById("sidebar-new-group");
const openGroupsSidebar = document.getElementById("choose-group")
const cancelNewGroup = document.querySelector(".btn-cancel")
const savePersonInGroup = document.getElementById("btn-save-person")



addContact.addEventListener('click', ()=> {
    openSidebar("Добавление контакта", true)
})

groupContact.addEventListener('click', ()=> {
    openSidebar("Группы контактов", false)
})

closeSidebar.addEventListener('click', ()=> {
    sidebar.classList.remove("open")
    document.body.classList.remove("open")
})

addContactSidebar.addEventListener('click', () => {
    createGroup()
})


btnSaveGroup.addEventListener('click', () => {
    saveNewGroup()
})

openGroupsSidebar.addEventListener('click',()=> {
    openGroupsSidebar.classList.toggle("open")
})

cancelNewGroup.addEventListener('click',() => {
    sidebarNewGroup.classList.remove("open")
})

savePersonInGroup.addEventListener('click', () => {
    saveNewPerson()
})

renderAllComponents()