import $ from "jquery";

import whatWeOfferJson from "./jsons/whatWeOffer.json";
import lidersJson from "./jsons/liders.json";
import karnizyJson from "./jsons/karnizy.json";
import catalogJson from "./jsons/catalog.json";
import installationJson from "./jsons/installation.json";
import aboutUsJson from "./jsons/aboutUs.json";

import {getDomTreeELement} from "../common";

function initAboutUs() {
    let h2 = $("<h2></h2>").html(aboutUsJson.header);
    $(".about-us .banner").append(h2);

    let contentElements = [];
    let content = aboutUsJson.content;

    content.forEach((item, i) => {
        let element = getDomTreeELement(item);
        contentElements.push(element);
    });

    contentElements.forEach((item, i) => {
        $(".about-us .about-us-features").append($(item));
    });
}

function initInstallation() {
    let h2 = $("<h2></h2>").html(installationJson.header);
    $(".installation .header-section").append(h2);

    let contentElements = [];
    let content = installationJson.content;

    content.forEach((item, i) => {
        let element = getDomTreeELement(item);
        contentElements.push(element);
    });

    contentElements.forEach((item, i) => {
        $(".installation .section-container").append($(item));
    });
}

function initCatalog() {
    let h2 = $("<h2></h2>").html(catalogJson.header);
    $(".catalog .header-section").append(h2);

    let contentElements = [];
    let content = catalogJson.content;

    content.forEach((item, i) => {
        let element = getDomTreeELement(item);
        contentElements.push(element);
    });

    contentElements.forEach((item, i) => {
        $(".catalog .section-container-cards").append($(item));
    });
}

function initKarnizy() {
    let h2 = $("<h2></h2>").html(karnizyJson.header);
    $(".karnizy .header-section").append(h2);

    let contentElements = [];
    let content = karnizyJson.content;

    content.forEach((item, i) => {
        let element = getDomTreeELement(item);
        contentElements.push(element);
    });

    contentElements.forEach((item, i) => {
        $(".karnizy .section-container-cards").append($(item));
    });
}

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
    initInstallation();
    initLiders();
    initWhatWeOffer();
};
