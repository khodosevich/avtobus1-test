import {renderGroupMembers} from "./render-groups-members.js";

export function renderListGroups() {

    let data = JSON.parse(localStorage.getItem("data")) || { groups: [], persons: [] };

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