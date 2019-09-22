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
		var jsnomeLoja = 'drogariaspacheco';
		var entity = 'NL';
		// Máscaras
		form.find(".qd_news_age").mask('00/00/0000');
		// Inputs esperados pelo plugin
		var emailInput = form.find("[name=email]");

		// Não alterar aqui
		form.validate({rules: {email: {email: true } }, submitHandler: function(form){var $form = $(form); if(!$form.valid()) return; var inputs = $form.find('[name]'); emailInput = emailInput.filter(inputs); $form.addClass("qd-loading"); var saveContact = function(userId) {$.ajax({url: "//api.ipify.org?format=jsonp", dataType: "jsonp", success: function(data) {sendData(data.ip); }, error: function() {$.ajax({url: "//www.telize.com/jsonip", dataType: "jsonp", success: function(data) {sendData(data.ip); }, error: function(data) {sendData(null); } }); } }); var formData = $form.serializeObject(); var sendData = function(ip) {formData['userId'] = userId; formData['ip'] = ip; $.ajax({url: "//mz-smart-newsletter-proxy.herokuapp.com/?jsnomeLoja="+ jsnomeLoja + "&entity=" + entity, type: "PATCH", dataType: "json", headers: {"Accept": "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8"}, data: JSON.stringify(formData), success: function(data) {$form.addClass("qd-form-success"); $form.trigger('QD.crmSuccess', [data]); }, error: function (jqXHR) { if (jqXHR.status == "0" || jqXHR.status == "304") {alert("Este e-mail já está cadastrado na newsletter!"); } else { alert("Desculpe, não foi possível enviar seu formulário!"); } }, complete: function() {$form.removeClass("qd-loading"); } }); } }; $.ajax({url: "//mz-smart-newsletter-proxy.herokuapp.com/?jsnomeLoja="+jsnomeLoja+"&entity=CL&email="+ (emailInput.val() || '---'), type: "GET", dataType: "json", headers: {Accept: "application/vnd.vtex.ds.v10+json"}, success: function(data) {if (data.length) saveContact(data[0].id); else saveContact(null); }, error: function() {saveContact(null); } }); return false; }, errorPlacement: function(error, element) {} });
	});

	// Adicionando o da entidade NL
	var steps = 1;

	$(window).on('QD.crmSuccess', function(e, data) {
		var modal = $('.qd-v1-modal-newsletter');
		modal.find('[class*="qd-v1-modal-newsletter-step"]').hide();
		msg = 'success';

		steps++;
		if(steps == 2)
			modal.find('.qd-v1-modal-newsletter-step-2').show();
		else if(steps == 3)
			modal.find('.qd-v1-modal-newsletter-step-3').show();
		
		var form = $('form');
		form.find('[name=id]').remove();
		form.append('<input type="hidden" name="id" value="' + (data.Id || '').split('-').pop() + '" />');
	});
})();