import $ from "jquery";
import whatWeOfferJson from "./whatWeOffer.json";
import lidersJson from "./liders.json";
import { getDomTreeELement } from "../common";

function initAboutUs() {}

function initCatalog() {}

function initKarnizy() {}

function initLiders() {
    let h2 = $("<h2></h2>").html(lidersJson.header);
    $(".liders .header-section").append(h2);

    let contentElements = [];
    let content = lidersJson.content;

    content.forEach((item, i) => {
        let element = getDomTreeELement(item);
        contentElements.push(element);
    });

    contentElements.forEach((item, i) => {
        $(".liders .section-container-cards").append($(item));
    });
}

function initWhatWeOffer() {
    let h2 = $("<h2></h2>").html(whatWeOfferJson.header);
    $(".what-we-offer .header-section").append(h2);

    let contentElements = [];
    let content = whatWeOfferJson.content;

    content.forEach((item, i) => {
        let element = getDomTreeELement(item);
        contentElements.push(element);
    });

    contentElements.forEach((item, i) => {
        $(".what-we-offer .section-container").append($(item));
    });
}

export default() => {
    initAboutUs();
    initCatalog();
    initKarnizy();
    initLiders();
    initWhatWeOffer();
};
