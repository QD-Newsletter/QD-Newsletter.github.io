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
		var dateInput = form.find("[name=qd_age]");

		// Não alterar aqui
		form.validate({rules:{email:{email:!0},qd_age:{minlength:10}},submitHandler:function(a){var b=$(a);if(b.valid()){a=b.find("[name]");phoneInput=phoneInput.filter(a);emailInput=emailInput.filter(a);a=(phoneInput.val()||"").replace(/[^0-9]+/gi,"");phoneInput.val(a.length?"+55"+a:null);b.addClass("qd-loading");a=(dateInput.val()||"").replace(/(\d+)\/(\d+)\/(\d+)/g,"$3-$2-$1");dateInput.val(a);var e=function(a){$.ajax({url:"//api.ipify.org?format=jsonp",dataType:"jsonp",success:function(a){c(a.ip)},error:function(){$.ajax({url:"//www.telize.com/jsonip", dataType:"jsonp",success:function(a){c(a.ip)},error:function(a){c(null)}})}});var d=b.serializeObject(),c=function(c){d.userId=a;d.ip=c;$.ajax({url:"//api.vtexcrm.com.br/"+jsnomeLoja+"/dataentities/"+entity+"/documents",type:"PATCH",dataType:"json",headers:{Accept:"application/vnd.vtex.ds.v10+json","Content-Type":"application/json; charset=utf-8"},data:JSON.stringify(d),success:function(a){b.addClass("qd-form-success");b.trigger("QD.crmSuccess",[a])},error:function(){alert("Desculpe, n\u00e3o foi poss\u00edvel enviar seu formul\u00e1rio!")}, complete:function(){b.removeClass("qd-loading")}})}};return $.ajax({url:"//api.vtexcrm.com.br/"+jsnomeLoja+"/dataentities/CL/search?_fields=id&email="+(emailInput.val()||"---"),type:"GET",dataType:"json",headers:{Accept:"application/vnd.vtex.ds.v10+json"},success:function(a){e(a.length?a[0].id:null)},error:function(){e(null)},complete:function(){b[0].reset()}}),!1}},errorPlacement:function(a,b){}}); });
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