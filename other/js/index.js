'use strict'

class ActiveTabs {

    constructor(parent_node, action_node) {
        this.parent_node = parent_node;
        this.action_node = action_node;
    }

    findElem(parent_node) {
        return document.querySelector(`.${parent_node}`);
    }

    findElemntsEvent(parent, child_class) {
        let list_nodes = this.findElem(parent).querySelectorAll(`.${child_class}`);
        return list_nodes;
    }

    eventTargetNoneActive(list, class_name) {
        for (let item of list) {
            item.classList.remove(class_name);
        }
    }

    eventTargetSetActive(node, class_name) {
        node.classList.add(class_name);
    }

    dataValue(atr, elem) {
        return elem.getAttribute(`${atr}`);
    }

    findElemByAtr(parent_node_class, atr, value_atr) {
        return this.findElem(parent_node_class).querySelector(`div[${atr}="${value_atr}"]`);
    }

    changeInOtherBlocksData(parent_node_class, child_node_class, atr, value_atr) {
        let nodes = this.findElemntsEvent(parent_node_class, child_node_class);
        this.eventTargetNoneActive(nodes, 'active');
        this.findElemByAtr(parent_node_class, atr,value_atr).classList.add('active');
    }

    addEvent() {
        this.findElem(this.parent_node).addEventListener('click', (event) => {
            let node = event.target;
            if (node.className == this.action_node) {
                let nodes = this.findElemntsEvent(this.parent_node, this.action_node);
                this.eventTargetNoneActive(nodes, 'active');
                this.eventTargetSetActive(node, 'active');
                let data_atr = this.dataValue('data-item', node);
                this.changeInOtherBlocksData('tabs-content', 'tabs-content-item', 'data-item', data_atr);
            }
        })
    }
}


class ToggleClass {

    findParentNode(parent_node) {
        return document.querySelector(`.${parent_node}`);
    }

    findNodes(parent_node, child_class) {
        let list_nodes = this.findParentNode(parent_node).querySelectorAll(`.${child_class}`);
        return list_nodes;
    }

    addEvent(parent_node) {
        this.findParentNode(parent_node).addEventListener('click', (event) => {
            let node = event.target;
            if (node.className == 'tab-mobile-header') {
                node.parentNode.classList.toggle('active');
            }
        })
    }

}

const tabs = new ActiveTabs('tabs-headers', 'tab-item');
tabs.addEvent();

const mobile_tabs = new ToggleClass();
mobile_tabs.addEvent('mobile-tabs-content', 'tab-mobile-header');