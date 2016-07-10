(function($){

	"use strict";

	$(document).ready(function() {

		//	FastClick	

	    FastClick.attach(document.body);

		//	Smooth scroll

		try {
	        $.browserSelector();
	          if($("html").hasClass("chrome" || "opera")) {
	            $.smoothScroll();
	          }
	    } catch(err) {}

	    //	Text rotator

	    $(".occupation").Morphext({
		    animation: "fadeIn",
		    separator: ",",
		    speed: 2500
		});

		// Preloader

      	$(window).load(function() {
      		$(".preloader").fadeOut("slow", function(){
      			$("#resume, #blog, #portfolio, #contact").removeClass("absolute");
      			$(".preloader-left").addClass("slide-left");
      			$(".preloader-right").addClass("slide-right");
      			//	Typerjs function - Edit the sentences below
				// $('.tp-hd-wwd').typeTo("We craft websites that bring more clients.");

                $('.tp-hd-offer').typeTo("OFFER");
                $('.tp-offer1').typeTo("We make you a trial website for ");
                $('.tp-offer2').typeTo(" And if you like it you can use our service.");

                $('.tp-hd-benefits').typeTo("YOUR BENEFITS");
                $('.tp-benefit1').typeTo(" Get more clients, earn more ");
                $('.tp-benefit2').typeTo(" Your business – quick online!");
                $('.tp-benefit3').typeTo(" Impressive design, effective marketing ");
                $('.tp-benefit4').typeTo(" Become seen in Google (SEO service) ");
                $('.tp-benefit5').typeTo(" No risk to get a trial website ");

      		});
		});

		// DIALOG   ORDER TRIAL
		/*		buttons:		{
		 text: "SEND FREE ORDER NOW",
		 click: function() {
		 $( this ).dialog( "close" );
		 }
		 },

		 {
		 text: "CANCEL FREE  ORDER",
		 click: function() {
		 $( this ).dialog( "close" );
		 }
		 }

		 */

		$( "#dialog" ).dialog({
			autoOpen: false,
			width: 400,
			title: "Get FREE trial Website",
			buttons: []
		});

		// Link to open the dialog
		$( "#dialog-link" ).click(function( event ) {
			$( "#dialog" ).dialog( "open" );
			event.preventDefault();
		});


	    //	Features animation function

	    $("#profile .expand, #profile .expand-profile").on("click", function() {
			$("#profile").toggleClass("full-height").removeClass("profile");
			$("#profile .expand").hide();
		});

		$("#profile .expand-profile").on("click", function() {
			$("#profile").addClass("profile");
			$("#profile .expand").show();
		});

		$("#resume .expand").on("click", function() {
			$("#resume").toggleClass("full").toggleClass("full-height");
			$("#blog, #portfolio, #contact").toggleClass("zero").toggleClass("zero-height");
			$("#profile").toggleClass("profile-off");
			$(this).hide();
		});

		$("#resume .close-icon").on("click", function() {
			$("#resume .expand").show();
			$(this).hide();
		});

		$("#blog .expand").on("click", function() {
			$("#blog").toggleClass("full").toggleClass("full-height");
			$("#resume, #portfolio, #contact").toggleClass("zero").toggleClass("zero-height");
			$("#profile").toggleClass("profile-off");
			$(this).hide();
		});

		$("#blog .close-icon").on("click", function() {
			$("#blog .expand").show();
			$(this).hide();
		});

		$("#portfolio .expand").on("click", function() {
			$("#portfolio").toggleClass("full").toggleClass("full-height");
			$("#resume, #blog, #contact").toggleClass("zero").toggleClass("zero-height");
			$("#profile").toggleClass("profile-off");
			$(this).hide();
		});

		$("#portfolio .close-icon").on("click", function() {
			$("#portfolio .expand").show();
			$(this).hide();
		});

		$("#contact .expand").on("click", function() {
			$("#contact").toggleClass("full").toggleClass("full-height");
			$("#resume, #blog, #portfolio").toggleClass("zero").toggleClass("zero-height");
			$("#profile").toggleClass("profile-off");
			$(this).hide();
		});

		$("#contact .close-icon").on("click", function() {
			$("#contact .expand").show();
			$(this).hide();
		});

		//	Skill bars function

		function skillBars() {
		$('.skill-bar-bg').each(function() {
			 var skillBarBg = $(this);
			 skillBarBg.find('.skill-bar').css('width', skillBarBg.attr('data-percent') + '%' );
			});
		}

		skillBars();

		// owl carousel function

        $("#carousel-container").owlCarousel({
 
          	autoPlay : 3000,
		    slideSpeed : 300,
		    paginationSpeed : 300,
		    singleItem: true
       
        });

		var masCon = jQuery("#portfolio-container");

		//	Shuffle function

		masCon.shuffle({
			itemSelector: ".portfolio-item" // the selector for the items in the grid
		});

		$('#filter a').click(function (e) {
			e.preventDefault();

			$('#filter a').removeClass('active');
			$(this).addClass('active');

			var groupName = $(this).attr('data-group');

			masCon.shuffle('shuffle', groupName);
		});

		//	CSS Correct

		var dateHeight = $(".date").outerHeight();
		$(".blog-title").css("min-height", dateHeight);

		// Ajax contact function

		$(":input[placeholder]").each (function () {
		    var input = $(this);
		    input.addClass("placeholder");
		    input.val(input.attr("placeholder"));
		 
		    $(this).focus(function() {
		      	var input = $(this);
		      	if (input.val() == input.attr("placeholder")) {
		        	input.val("");
		        	input.removeClass("placeholder");
		      	}
		    });

		    $(this).blur(function() {
		      	var input = $(this);
		      	if (input.val() == "" || input.val() == input.attr("placeholder")) {
			        input.addClass("placeholder");
			        input.val(input.attr("placeholder"));
		      	}
		    })
		});

		// placeholder snippet for older browsers [end]
		  
		// custom validation methods [start]
		
		$.validator.addMethod(
		    "notplaceholder", 
		    function(value, element){
		        return ($(element).attr("placeholder") != value);
			}, 
			"Please enter a value"
		);

		// custom validation methods [end]
		  
		// jquery validate initialisation

		$("#contact-form").validate({
		    rules: {
			    subject : {
			        required    : true,
			        notplaceholder  : true
		      	},
		      	name : {
			        required   : true,
			        notplaceholder  : true
		      	},
		      	email : {
			        required    : true,
			        email       : true,
			        notplaceholder  : true
		      },
		     	message : {
			        required : true,
			        notplaceholder  : true
		      	}
		    },
		    errorPlacement: function(error, element) {
		      	$(element).addClass("error");
		    },
		    submitHandler: function(form){

		    	$("#send").attr("value", "Sending...");
		    	$("#send").addClass("sending");

		        var hasError = false;   
		        if(!hasError) {
		            var formInput = $(form).serialize();
		              	$.post($(form).attr("action"),formInput, function(data){
		              		$("#send").attr("value", "Send Message");
		              		$("#send").removeClass("sending");
		                	$(".contact-notification").addClass("success");
		              	}); 
		          	}
		        else {
		            alert("Sent error!");
		        }
		        return false; 
		    }
		});

	});

})(jQuery);
