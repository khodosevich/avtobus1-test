const addContact = document.getElementById("btn-add-contact");
const groupContact = document.getElementById("btn-groups");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("close-sidebar");
const addContactSidebar = document.getElementById("btn-adding")
const btnSaveGroup = document.getElementById("btn-save-group")
const sidebarNewGroup = document.getElementById("sidebar-new-group");
let data = JSON.parse(localStorage.getItem("data")) || { groups: [], persons: [] };
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



function openSidebar(title,adding) {
    
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


function closeSidebarHandler() {
    sidebar.classList.remove('open');
    document.body.classList.remove("open")
    sidebarNewGroup.classList.remove("open")
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

        const newGroup = {
            id: generateUniqueId(),
            name: groupInputValue,
        }
        data.groups.push(newGroup);
        
        localStorage.setItem("data", JSON.stringify(data));

        renderAllComponents();
        document.getElementById("groupInput").value = "";
    }

}

function generateUniqueId() {
    return Date.now().toString(36);
}

function deleteGroup(event) {
    const groupElement = event.currentTarget.parentElement;

    const groupName = groupElement.querySelector('.content-sidebar-groups__item-group').textContent.trim();

    const groupsContainer = document.getElementById('content-sidebar-groups');

    groupsContainer.removeChild(groupElement);
    data.groups = data.groups.filter(item => item.name !== groupName)
    localStorage.setItem("data", JSON.stringify(data));

    event.stopPropagation()
    renderAllComponents();
}

function createGroupElement(groupName) {

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

function renderGroups() {
 
    const groupsContainer = document.getElementById('content-sidebar-groups');

    groupsContainer.innerHTML = '';


    if (data.groups && Array.isArray(data.groups)) {
        data.groups.forEach(group => {
            const groupElement = createGroupElement(group.name);
            groupsContainer.appendChild(groupElement);
        });
    } else {
        console.error("Ошибка: data.groups не является массивом или отсутствует.");
    }
}

function saveNewPerson() {

    console.log("render")

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

function renderListGroups() {


    const content = document.getElementById('content-list-items');

    if (data.groups && data.groups .length > 0) {
        let groupsHTML = '';

        for (const key in data.groups) {
            groupsHTML += `
                     <div class="content-list-item" >
                            <div class="content-list-item-header" id="${data.groups[key].id}">
                                <h3 id="content-list-item-title-${data.groups[key].id}" class="content-list-item-title">
                                    ${data.groups[key].name}
                                </h3>
                                <img class="keyboard-arrow-right" data-id="${data.groups[key].id}" id="keyboard-arrow-right" src="./assets/Keyboard arrow right.svg" alt="Keyboard arrow right">         
                            </div>
                              <div class="content-group-list">
                                <div id="content-group-list-items-${data.groups[key].id}" class="content-group-list-items">
                                    <div class="content-group-list-item">
                                        <h4>
                                            Фамилия Имя Отчество
                                        </h4>
                                        <div class="content-group-list-item-right">
                                            <p >
                                                +7 (ХХХ) ХХХ - ХХ - ХХ
                                            </p>
                                            <div class="content-group-list-item-right-imgs" >
                                                <img class="change-note" src="./assets/Mode edit.svg" alt="mode-edit">
                                                <img class="delete-img" src="./assets/Delete forever.svg" alt="delete">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>`;
        }

        content.innerHTML = groupsHTML;

        const clickOnItemGroup = document.querySelectorAll(".content-list-item-header");
        clickOnItemGroup.forEach(item => {
            item.addEventListener('click', (event) => {
                const groupId = item.querySelector('.keyboard-arrow-right').getAttribute('data-id');

                if (item.contains(event.target) && groupId === item.getAttribute('id')) {

                    const groupContent = document.getElementById(`content-group-list-items-${groupId}`);
                    const groupTitle = document.getElementById(`content-list-item-title-${groupId}`);

                    groupContent.classList.toggle('open');
                    item.querySelector('.keyboard-arrow-right').classList.toggle('open');
                    groupTitle.classList.toggle("open")

                    if (groupContent.classList.contains('open')) {
                        renderGroupMembers(groupId);
                    }
                }
            })
        });


    } else {
        content.innerHTML = `<h1 class="title-content">Список контактов пуст</h1>`;
    }
}


function renderGroupMembers(groupId) {

    console.log(groupId)

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
                const groupTitle = document.getElementById(`content-list-item-title-${groupId}`);
                groupTitle.classList.remove("open")
            });
        });
    }
}


function openNoteModal(currentPersonId) {

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

        console.log('click')

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

        console.log("current: " , currentPersonId)
        const indexToUpdate = data.persons.findIndex(person => person.personId === currentPersonId);


        if (indexToUpdate !== -1) {
            console.log(data.persons[indexToUpdate].name, newName)
            data.persons[indexToUpdate].name = newName;
            data.persons[indexToUpdate].phone = newNumber;
        }


        localStorage.setItem("data", JSON.stringify(data));
        openModal.classList.remove('open');

        data = JSON.parse(localStorage.getItem("data"));
        renderGroupMembers(data.persons[indexToUpdate].groupId);
    })

}

function renderGroupsSidebar () {
    const content = document.getElementById('choose-group');

    let groupsHTML = `<option value="-1">Выберите группу:</option>`;
    if (data.groups  && data.groups.length > 0) {
        

        for (const key in data.groups) {
            groupsHTML += `
            <option value="${data.groups[key].id}">${data.groups[key].name}</option>`;
        }

        content.innerHTML = groupsHTML;
    } else {
        content.innerHTML = `<h1 class="title-content">Список групп пуст</h1>`;
    }
}

function renderAllComponents(){
    renderGroups();
    renderListGroups();
    renderGroupsSidebar();
}

renderAllComponents()