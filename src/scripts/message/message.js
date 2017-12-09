import $ from "jquery";

function showLoader() {
    $("#icon-order-loader").css({"display": "inline-block"});
}

function hideLoader() {
    $("#icon-order-loader").hide();
}

function showOkayMessage() {
    
}

export default function(message) {
    const service_id = "default_service";
    const template_id = "spectrokna";

    showLoader();

    emailjs.send('gmail', 'spectrokna', {message: message})
    .then((response) => {
        if (response.status == 200) {
            hideLoader();
            $(".order-popup").hide();
        }
    }, (err) => {
      console.log(err)
    });
};
