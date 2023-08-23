/*
 * Druk Core Theme Js 
 */ 

(function( $ ) {

	"use strict";
			  
	$( document ).ready(function() {
	
		/* Twitter Widget Slider(newsticker) */
		if( $( ".twitter-slider" ).length ){
			$( ".twitter-slider" ).each(function() {
				var twit_slider = $(this);	
				var slide = twit_slider.attr( "data-show" );
				twit_slider.easyTicker({
					direction: 'up',
					visible: parseInt(slide),
					easing: 'swing',
					interval: 4000
				});
			});
		}
		
		/* Post Like */
		$( document ).on( 'click', ".post-like, .post-dislike", function( event) {
	
			var current = $(this);
			var like_stat = current.data("stat");
			var post_id = current.data("id");
			var parent = current.parents('.post-like-wrap');

			//return false;
			if( like_stat != '' ){
				
				if( like_stat == '1' ){
					parent.find('.post-disliked').removeClass('fa-thumbs-down post-disliked').addClass('fa-thumbs-o-down post-dislike');
					current.removeClass('fa-thumbs-o-up post-like').addClass('fa-thumbs-up post-liked');
				}else{
					parent.find('.post-liked').removeClass('fa-thumbs-up post-liked').addClass('fa-thumbs-o-up post-like');
					current.removeClass('fa-thumbs-o-down post-dislike').addClass('fa-thumbs-down post-disliked');
				}
				
				// Ajax call
				$.ajax({
					type: "post",
					url: druk_ajax_var.admin_ajax_url,
					data: "action=post_like_act&nonce="+druk_ajax_var.like_nonce+"&like_stat="+like_stat+"&post_id="+post_id,
					success: function(res){
						$( parent ).html(res);
						$('body').tooltip({
							container: 'body',
							trigger: 'hover',
							html: true,
							animation: false,
							selector: '[data-toggle="tooltip"]'
						});
					},
					error: function (jqXHR, exception) {
						console.log(jqXHR);
					}
				});
			}
			return false;
		});
		$( document ).on( 'click', ".post-liked, .post-disliked, .post-fav-done", function( event) {
			return false;
		});	
		
		/* Post Favourite */
		$( document ).on( 'click', ".post-favourite", function( event) {
	
			var current = $(this);
			var post_id = current.data("id");
			var parent = current.parents('.post-fav-wrap');

			if( post_id != '' ){
				// Ajax call
				$.ajax({
					type: "post",
					url: druk_ajax_var.admin_ajax_url,
					data: "action=post_fav_act&nonce="+druk_ajax_var.fav_nonce+"&post_id="+post_id,
					success: function(res){
						$( parent ).html(res);
						$('body').tooltip({
							container: 'body',
							trigger: 'hover',
							html: true,
							animation: false,
							selector: '[data-toggle="tooltip"]'
						});
					},
					error: function (jqXHR, exception) {
						console.log(jqXHR);
					}
				});
			}
			return false;
		});
			
	}); // doc ready end

})( jQuery );