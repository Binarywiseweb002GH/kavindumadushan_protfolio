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

            var self = this;

            var name = $('#fname').val().trim();
            var email = $('#umail').val().trim();
            var phone = $('#phone').val().trim();
            var message = $('#exampleFormControlTextarea1').val().trim();

            // remove old message
            $('.form-message').remove();

            // validation
            if (!name || !email || !phone || !message) {
                showMessage("Please fill all fields!", "error");
                return;
            }

            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage("Please enter a valid email!", "error");
                return;
            }

            var btn = $(self.form + ' button[type="submit"]');
            btn.prop('disabled', true).text('Sending...');

            emailjs.send(
                self.emailjsConfig.serviceId,
                self.emailjsConfig.templateId,
                {
                    fname: name,
                    umail: email,
                    phone: phone,
                    exampleFormControlTextarea1: message
                },
                self.emailjsConfig.publicKey
            )
            .then(function () {

                // reset form
                $('#fname').val('');
                $('#umail').val('');
                $('#phone').val('');
                $('#exampleFormControlTextarea1').val('');

                showMessage("Message sent successfully!", "success");

            })
            .catch(function (error) {
                console.log("ERROR", error);
                showMessage("Failed to send message!", "error");
            })
            .finally(function () {
                btn.prop('disabled', false).text('Submit');
            });

            // message function
            function showMessage(text, type) {
                var color = (type === "success") ? "green" : "red";

                $(self.form).after(
                    '<div class="form-message" style="margin-top:10px;color:' + color + ';font-weight:600;">'
                    + text +
                    '</div>'
                );
            }
        }
    };

    $(document).ready(function () {
        emailjs.init(contactForm.emailjsConfig.publicKey);
        contactForm.init();
    });

})(jQuery);