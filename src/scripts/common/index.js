import $ from "jquery";

function getDomTreeELement(item, parentElement) {
    let element = document.createElement(item.tag);
    if (item.text) {
        $(element).html(item.text);
    }
    if (item.children) {
        item.children.forEach((child) => {
            $(element).append(getDomTreeELement(child, element))
        });
    }
    if (item.className) {
        $(element).addClass(item.className);
    }
    if (item.src) {
        $(element).attr("src", item.src);
    }
    if (item.href) {
        $(element).attr("href", item.href);
    }

    return element;
}

export {getDomTreeELement};
