import $ from "jquery";
import content from './content.json';

function initClose() {
    $("#order-popup-close").on("click", () => {
        $(".order-popup").hide();
    });
}

function initTitle() {
    $(".order-popup-content-title h2").html(content.title);
}

function initBody() {
    let bodyData = content.body;

    let container = $(".order-popup-content-body .container");

    container.html("");

    bodyData.forEach((item, index) => {
        let line = $('<div class="order-popup-content-body-line"></div>');
        let lineNameElement = $('<div class="order-popup-content-body-line-name"></div>');
        let lineValueElement = $('<div class="order-popup-content-body-line-value"></div>');

        let lineNameElementData = item.name;
        let lineValueElementData = item.value;

        lineValueElementData.forEach((value, valueIndex) => {
            let singleValueElement = $('<div class="order-popup-content-body-line-value-item"></div>');
            let id = index + '' + valueIndex;
            let radioInput = $('<input type="radio" id="' + id + '" name="' + lineNameElementData + '"></input>');
            let radioLabel = $('<label for="' + id + '"></label>');
            radioLabel.html(value);

            singleValueElement.append(radioInput, radioLabel);
            lineValueElement.append(singleValueElement);
        });

        lineNameElement.html(lineNameElementData);
        line.append(lineNameElement, lineValueElement);

        container.append(line);
    });
}

function initInfo() {
    let infoData = content.info;

    let container = $(".order-popup-content-body .container");

    let info = $('<div class="order-popup-content-body-info"></div>');
    let infoNumberElement = $('<div class="order-popup-content-body-info-number"></div>');
    let infoPhoneElement = $('<div class="order-popup-content-body-info-phone"></div>');
    let infoContactElement = $('<div class="order-popup-content-body-info-contact"></div>');

    let infoNumberElementLabel = $('<label for="number"></label>');
    let infoNumberElementInput = $('<input id="number" type="number" min="1"></input>');

    let infoPhoneElementLabel = $('<label for="phone"></label>');
    let infoPhoneElementInput = $('<input id="phone"></input>');

    let infoContactElementLabel = $('<label for="contact"></label>');
    let infoContactElementInput = $('<input id="contact"></input>');

    infoNumberElementLabel.html(infoData.number.name);
    infoPhoneElementLabel.html(infoData.phone.name);
    infoContactElementLabel.html(infoData.contact.name);

    infoNumberElement.append(infoNumberElementLabel, infoNumberElementInput);
    infoPhoneElement.append(infoPhoneElementLabel, infoPhoneElementInput);
    infoContactElement.append(infoContactElementLabel, infoContactElementInput);

    info.append(infoNumberElement, infoPhoneElement, infoContactElement);

    container.append(info);
}

function initContent() {
    initBody();
    initInfo();
}

function initBottom() {}

function initOrder() {
    initClose();
    initTitle();
    initContent();
    initBottom();
}

export default() => {
    initOrder();
};
