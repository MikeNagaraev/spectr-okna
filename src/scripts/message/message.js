export default function(message) {
    // Change to your service ID, or keep using the default service
    var service_id = "default_service";
    var template_id = "spectrokna";

    console.log(message)
    console.log(message.toString())
    emailjs.send('gmail', 'spectrokna', {
        message: message
    }).then(function(msg) {
        console.log(msg)
    }, function(err) {

    });
};
