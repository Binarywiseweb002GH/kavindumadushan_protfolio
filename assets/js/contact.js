(function ($) {
    'use strict';

    var contactForm = {
        form: '.ajax-contact',

        emailjsConfig: {
            serviceId: 'service_68w687m',
            templateId: 'template_0z20pqm',
            publicKey: 'hXut8TQkHS4nlkxZe'
        },

        init: function () {
            this.bindEvents();
        },

        bindEvents: function () {
            var self = this;

            $(this.form).on('submit', function (e) {
                e.preventDefault();
                self.sendForm();
            });
        },

        sendForm: function () {

            var name = $('#fname').val().trim();
            var email = $('#umail').val().trim();
            var phone = $('#phone').val().trim();
            var message = $('#exampleFormControlTextarea1').val().trim();

            // Basic validation
            if (!name || !email || !phone || !message) {
                alert("Please fill all fields!");
                return;
            }

            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email!");
                return;
            }

            // Show loading state
            var btn = $(this.form + ' button[type="submit"]');
            btn.prop('disabled', true).text('Sending...');

            var self = this;

            emailjs.send(
                this.emailjsConfig.serviceId,
                this.emailjsConfig.templateId,
                {
                    name: name,
                    email: email,
                    number: phone,
                    message: message
                },
                this.emailjsConfig.publicKey
            )
            .then(function (response) {

                alert("Message sent successfully!");
                console.log("SUCCESS", response);

                // reset form
                $('#fname').val('');
                $('#umail').val('');
                $('#phone').val('');
                $('#exampleFormControlTextarea1').val('');

                btn.prop('disabled', false).text('Submit');

            }, function (error) {

                alert("Failed to send message!");
                console.log("ERROR", error);

                btn.prop('disabled', false).text('Submit');
            });
        }
    };

    $(document).ready(function () {
        emailjs.init(contactForm.emailjsConfig.publicKey);
        contactForm.init();
    });

})(jQuery);