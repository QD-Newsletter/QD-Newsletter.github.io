(function() {
	var msg = 'close';

	$(document).ready(function() {
		var modal = $('.qd-v1-modal-newsletter');

		modal.find('.qd-v1-modal-newsletter-step-1').show();
		modal.modal();

		modal.on("hidden.bs.modal", function(){
			window.parent.postMessage("QdSn1Msg|" + msg, "*");
		});
	});

	///Envio do form
	$(function() {
		// Fomulário
		var form = $('form');
		var jsnomeLoja = 'santuarionacional';
		var entity = 'NL';
		// Máscaras
		form.find(".qd_news_phone").mask('(00) 0000-00009');
		form.find(".qd_news_age").mask('00/00/0000');
		// Inputs esperados pelo plugin
		var phoneInput = form.find("[name=qd_phone]");
		var emailInput = form.find("[name=qd_email]");

		// Não alterar aqui
		form.validate({rules:{email:{email:!0}},submitHandler:function(e){var n=$(e);if(n.valid()){var a=n.find("[name]");phoneInput=phoneInput.filter(a),emailInput=emailInput.filter(a);var t=(phoneInput.val()||"").replace(/[^0-9]+/gi,"");phoneInput.val(t.length?"+55"+t:null),n.addClass("qd-loading");var i=function(e){$.ajax({url:"//api.ipify.org?format=jsonp",dataType:"jsonp",success:function(e){t(e.ip)},error:function(){$.ajax({url:"//www.telize.com/jsonip",dataType:"jsonp",success:function(e){t(e.ip)},error:function(e){t(null)}})}});var a=n.serializeObject(),t=function(t){a.userId=e,a.ip=t,$.ajax({url:"//api.vtexcrm.com.br/"+jsnomeLoja+"/dataentities/"+entity+"/documents",type:"PATCH",dataType:"json",headers:{Accept:"application/vnd.vtex.ds.v10+json","Content-Type":"application/json; charset=utf-8"},data:JSON.stringify(a),success:function(e){n.addClass("qd-form-success"),n.trigger("QD.crmSuccess",[e])},error:function(){alert("Desculpe, não foi possível enviar seu formulário!")},complete:function(){n.removeClass("qd-loading")}})}};return $.ajax({url:"//api.vtexcrm.com.br/"+jsnomeLoja+"/dataentities/CL/search?_fields=id&email="+(emailInput.val()||"---"),type:"GET",dataType:"json",headers:{Accept:"application/vnd.vtex.ds.v10+json"},success:function(e){i(e.length?e[0].id:null)},error:function(){i(null)}}),!1}},errorPlacement:function(e,n){}});
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

		if (data)
			form.append('<input type="hidden" name="id" value="' + (data.Id || '').split('-').pop() + '" />');
	});
})();