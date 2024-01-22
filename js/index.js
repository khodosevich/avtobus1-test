const addContact = document.getElementById("btn-add-contact");
const groupContact = document.getElementById("btn-groups");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("close-sidebar");
const deleteContactSidebar = document.getElementById("btn-delete")

const addContactSidebar = document.getElementById("btn-adding")
const btnSaveGroup = document.getElementById("btn-save")

const sidebarNewGroup = document.getElementById("sidebar-new-group");
let groups = JSON.parse(localStorage.getItem("groups")) || [];


addContact.addEventListener('click', ()=> {
    openSidebar("Добавление контакта", true)
})

groupContact.addEventListener('click', ()=> {
    openSidebar("Группы контактов", false)
})

closeSidebar.addEventListener('click', ()=> {
    sidebar.classList.remove("open")
})

addContactSidebar.addEventListener('click', () => {
    createGroup()
})


btnSaveGroup.addEventListener('click', () => {
    saveNewGroup()
})


function openSidebar(title,adding) {
    
    let titleElement = sidebar.querySelector('.title-sidebar');
    
    if(!adding) {
        document.getElementById("btn-adding").classList.add("display-block")
        document.getElementById("content-sidebar-form").classList.remove("open")
        document.getElementById("content-sidebar-groups").classList.add("open")
    }else {
        document.getElementById("btn-adding").classList.remove("display-block")
        document.getElementById("content-sidebar-form").classList.add("open")
        document.getElementById("content-sidebar-groups").classList.remove("open")
    }
    
    titleElement.textContent = title;
    sidebar.classList.add('open');
    document.addEventListener("click" , outsideClickHandler)
}


function closeSidebarHandler() {
    sidebar.classList.remove('open');
}


function outsideClickHandler(event) {

    if (!sidebar.contains(event.target) && !addContact.contains(event.target) && !groupContact.contains(event.target) ) {
        closeSidebarHandler()
    }
}

function createGroup() {
    sidebarNewGroup.classList.add("open");
}

function saveNewGroup() {

    const groupInputValue = document.getElementById("groupInput").value;
 
    if(groupInputValue === null || groupInputValue === ""){
        alert("check your input!")
        return;
    }

    if (groupInputValue !== null && groupInputValue.trim() !== "") {
        sidebarNewGroup.classList.remove("open");

        groups.push(groupInputValue.trim());
        
        localStorage.setItem("groups", JSON.stringify(groups));

        renderAllComponents();
        document.getElementById("groupInput").value = "";
    }

}

function deleteGroup(event) {
    const groupElement = event.currentTarget.parentElement;

    const groupName = groupElement.querySelector('.content-sidebar-groups__item-group').textContent.trim();

    const groupsContainer = document.getElementById('content-sidebar-groups');
    groupsContainer.removeChild(groupElement);

    groups = groups.filter(item => item.trim() !== groupName.trim())
        
    localStorage.setItem("groups", JSON.stringify(groups));

    event.stopPropagation()
    
    renderAllComponents();
}

function createGroupElement(groupName) {

    const groupElement = document.createElement('div');
    groupElement.classList.add('content-sidebar-groups__item');

    const groupContent = `
        <div class="content-sidebar-groups__item-group">${groupName}</div>
        <img id="btn-delete" class="content-sidebar-groups__item-img delete-group" src="./assets/Delete forever.svg" alt="delete">
    `;

    groupElement.innerHTML = groupContent;

    const deleteGroupButton = groupElement.querySelector('.delete-group');
    deleteGroupButton.addEventListener('click', deleteGroup);

    return groupElement;
}

function renderGroups() {
 
    const groupsContainer = document.getElementById('content-sidebar-groups');

    groupsContainer.innerHTML = '';

    console.log(groups);
    groups.forEach(groupName => {
        const groupElement = createGroupElement(groupName);
        groupsContainer.appendChild(groupElement);
    });
}




function renderListGroups() {

    const content = document.getElementById('content-list-items');

    console.log(groups);
    if (groups && groups.length > 0) {
        let groupsHTML = '';

        for (const key in groups) {
            groupsHTML += `
                <div class="content-list-item">
                    <h3 class="content-list-item-title">
                        ${groups[key]}
                    </h3>
                    <img src="./assets/Keyboard arrow right.svg" alt="Keyboard arrow right">
                </div>`;
        }

        content.innerHTML = groupsHTML;
    } else {
        content.innerHTML = `<h1 class="title-content">Список контактов пуст</h1>`;
    }
}

function renderAllComponents(){
    renderGroups();
    renderListGroups();
}

renderAllComponents()