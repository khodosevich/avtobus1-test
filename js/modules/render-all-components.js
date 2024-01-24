import {renderGroupItemHeader} from "./render-group-item-header.js";
import {renderListGroups} from "./render-list-groups.js";
import {renderGroups} from "./render-groups.js";

export function renderAllComponents(){
    renderGroups();
    renderListGroups();
    renderGroupItemHeader();
}

