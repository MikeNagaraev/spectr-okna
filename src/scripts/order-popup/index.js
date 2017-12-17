import $ from "jquery";
import content from "./content.json";
import sendEmail from "../message/message";
import maskIt from "./maskit.js";

maskIt();

function initClose() {
    $("#order-popup-close").on("click", () => {
        $(".order-popup").hide();
    });
}

function initTitle() {
    $(".order-popup-content-title h2").html(content.title);
}

function disableSendingOrder() {}

function enableWarningInput(element) {
    if (!$(element).hasClass("input-warning")) {
        $(element).removeClass("input-valid");
        $(element).addClass("input-warning");
    }
}

function disableWarningInput(element) {
    if ($(element).hasClass("input-warning")) {
        $(element).removeClass("input-warning");
        $(element).addClass("input-valid");
    }
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
    let infoNumberElementInput = $('<input id="number" type="number" min="1" value="1"></input>');

    let infoPhoneElementLabel = $('<label for="phone"></label>');
    let infoPhoneElementInput = document.createElement("input");
    $(infoPhoneElementInput).attr({"id": "phone", "type": "tel", "placeholder": "+375 (44) 111-11-11"});
    infoPhoneElementInput.maskItWith('+NNN (NN) NNN-NN-NN');

    $(infoPhoneElementInput).focusout(function(e) {
        if (infoPhoneElementInput.masked()) {
            disableWarningInput(infoPhoneElementInput);
        } else {
            enableWarningInput(infoPhoneElementInput);
        }
    });

    let infoContactElementLabel = $('<label for="contact"></label>');
    let infoContactElementInput = $('<input id="contact" placeholder="Иванов Иван Иванович"></input>');

    $(infoContactElementInput).focusout(function(e) {
        if ($.trim(infoContactElementInput.val()) != "") {
            disableWarningInput(infoContactElementInput);
        } else {
            enableWarningInput(infoContactElementInput);
        }
    });

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

function initBottom() {
    $("#order-popup-button").on("click", onSendEmail);
}

function getProductInfo() {
    let lines = $(".order-popup-content-body-line");
    let productInfo = {
        data: []
    };

    $.each(lines, (index, item) => {
        let nameLine = $(item).find(".order-popup-content-body-line-name").html();
        let valueLine = $(item).find(".order-popup-content-body-line-value");

        let valueLineOptions = $(valueLine).find(".order-popup-content-body-line-value-item");

        let chosenOptions;

        $.each(valueLineOptions, (i, val) => {
            let selectedOption = $(val).find("input:checked");
            if (selectedOption.length) {
                chosenOptions = $(val).find("label").html();
            }
        });

        productInfo.data.push({name: nameLine, value: chosenOptions});
    });

    return productInfo;
}

function getClientInfo() {
    return {"number": $("#number").val(), "phone": $("#phone").val(), "contact": $("#contact").val()};
}

function isFormValid() {
    if ($("#phone").hasClass("input-warning") || $.trim($("#phone").val()) == "") {
        return false;
    }
    if ($("#contact").hasClass("input-warning") || $.trim($("#contact").val()) == "") {
        return false;
    }

    return true;
}

function onSendEmail() {
    if (isFormValid()) {
        let message = {
            "product": getProductInfo(),
            "client": getClientInfo()
        };

        sendEmail(message);
    } else {
        alert("Форма заполнена некорректно");
    }
}

function initOrder() {
    initClose();
    initTitle();
    initContent();
    initBottom();
}

export default() => {
    initOrder();
};
