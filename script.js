(function() {
    'use strict';

    function sendToWhatsApp() {
        const firstName = document.getElementById('wa_fname').value.trim();
        const lastName = document.getElementById('wa_lname').value.trim();
        const subject = document.getElementById('wa_subject').value.trim();
        const email = document.getElementById('wa_email').value.trim();
        const message = document.getElementById('wa_message').value.trim();

        if (firstName === '' || lastName === '' || message === '') {
            alert('Please fill in your name and message so we can help you!');
            return;
        }

        const myPhoneNumber = '919509612559';
        const formattedMessage =
            '%F0%9F%92%AA *New Fitness Inquiry* %F0%9F%92%AA%0A%0A' +
            '*Name:* ' + encodeURIComponent(firstName + ' ' + lastName) + '%0A' +
            '*Subject:* ' + encodeURIComponent(subject) + '%0A' +
            '*Email:* ' + encodeURIComponent(email) + '%0A%0A' +
            '*Message:* %0A' + encodeURIComponent(message) + '%0A%0A' +
            '%E2%9C%A8 _Sent from Gym Website_ %E2%9C%A8';

        const waUrl = 'https://api.whatsapp.com/send?phone=' + myPhoneNumber + '&text=' + formattedMessage;

        try {
            window.open(waUrl, '_blank');

            const modalEl = document.getElementById('thankYouModal');
            if (modalEl && typeof bootstrap !== 'undefined') {
                const modal = new bootstrap.Modal(modalEl);
                modal.show();
            }

            const form = document.getElementById('gymContactForm');
            if (form) form.reset();
        } catch (error) {
            console.error('WhatsApp redirect error:', error);
            alert('Something went wrong. Please try again or contact us directly at 9509612559.');
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        const waMessage = document.getElementById('wa_message');
        if (waMessage) {
            waMessage.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendToWhatsApp();
                }
            });
        }

        const submitBtn = document.querySelector('.btn-royal-blue');
        if (submitBtn) {
            submitBtn.addEventListener('click', sendToWhatsApp);
        }
    });
})();
