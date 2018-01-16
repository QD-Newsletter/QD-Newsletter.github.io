(function() {
	var msg = 'close';

	$(document).ready(function() {
		var modal = $('.qd-v1-modal-newsletter');

		modal.find('.qd-v1-modal-newsletter-step-1').show();
		modal.modal();

		modal.on("hidden.bs.modal", function(){
			window.parent.postMessage("QdSn1Msg|" + msg, "*");
		});

		$('.qd-content-coupon').html((location.search.match(/code=([^&]+)/i) || ['']).pop());
	});

	///Envio do form
	$(function() {
		// Fomulário
		var form = $('form');

		// Não alterar aqui
		form.validate({
            rules: {
                email: {
                    email: true
                }
            },
            submitHandler: function(form) {
                var $form = $(form);
                if (!$form.valid()) return;
                $form.addClass("qd-loading");
                
                var $url = 'https://docs.google.com/forms/d/e/1FAIpQLSeMYEvVBciEFWyWlAxab32m4Xs2RLPPAjwvStvb9stTR0MqiQ/formResponse';
				var $params = '?entry.727237671='+($form.find('[name="qd_name"]').val() || '')+'&entry.616361496='+$form.find('[name="qd_email"]').val();
				
				var iframe = $('<iframe src="' + $url + $params + '" style="display:none">');
				
				iframe.load(function() {
                    $form.addClass("qd-form-success");
                    $form.trigger('QD.crmSuccess', '');
                    $form.removeClass("qd-loading");
                });
                
				iframe.appendTo($('body'));
                return false;
            },
            errorPlacement: function(error, element) {}
        });
    });

	// Adicionando o da entidade NL
	$(window).on('QD.crmSuccess', function(e, data) {
		var modal = $('.qd-v1-modal-newsletter');
		msg = 'success';
	});
})();