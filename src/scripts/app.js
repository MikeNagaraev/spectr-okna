import $ from 'jquery';
import orderPopupInit from './order-popup';


function showOrderPopup() {
    $(".order-popup").show();
    orderPopupInit();
}

$("#button-order").on("click", showOrderPopup);
