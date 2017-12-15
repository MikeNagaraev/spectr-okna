import $ from 'jquery';
import orderPopupInit from './order-popup';
import mainPageInitialization from './main-page';


function initEmailing() {
  emailjs.init("user_MpY9e3kuFF5GAw4dftnoG");
}

function showOrderPopup() {
    $(".order-popup").show();
    orderPopupInit();
}

initEmailing();
mainPageInitialization();
$("#button-order").on("click", showOrderPopup);
