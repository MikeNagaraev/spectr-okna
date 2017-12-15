import $ from "jquery";
import whatWeOffer from "./whatWeOffer.json";

function initAboutUs() {}

function initCatalog() {}

function initKarnizy() {}

function initLiders() {}

function initWhatWeOffer() {
    let h2 = $("<h2></h2>").html(whatWeOffer.header);
    $(".what-we-offer .header-section").append(h2);

    let content = whatWeOffer.content;
    let contentElements = [];

    content.forEach((item, i) => {
        let element = createElement(item);
        contentElements.push(element);
    });

    console.log(contentElements)

    contentElements.forEach((item, i) => {
      $(".what-we-offer .section-container").append($(item));
    });
}

function createElement(item, parent) {
    if (item.children) {
        item.children.forEach((child, i) => {
            parent = createElement(child, parent);
        });
    }

    let element = document.createElement(item.tag);
    if (item.text) {
        $(element).html(item.text);
    }
    if (parent) {
        $(parent).append(element);
    }

    return element;
}

export default() => {
    initAboutUs();
    initCatalog();
    initKarnizy();
    initLiders();
    initWhatWeOffer();
};
