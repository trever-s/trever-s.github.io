/*
 * $ Custom Scripts Slide Wrapper Demo
 * Version 1 (06-02-2015)
 * designed by b.whitney 
 */
 
 /**
 * @author Benjamin Whitney
 */


//View Previous Slide
$(function() {
	$('#previous_slide').bind('click',function(event){
		var anchor = $(this)
		, next_anchor = $("#next_slide")
		, inview = $(".slide.active")
		, comment =$(".comment.active")
		, previous = $(".slide.active").prev()
		, name = previous.attr('id')
		, previous_comment = $("#comment_"+name);

		next_anchor.show();
	
		if (previous.length ) {
 		inview.removeClass("active");
 		comment.removeClass("active");
 		previous.addClass("active");
 		previous_comment.addClass("active");
 		}
 		
		if(previous.is(':first-of-type')) {
		anchor.hide();
		}
		

		event.preventDefault();
	});
});


//View Next Slide
$(function() {
	$('#next_slide').bind('click',function(event){
		var anchor = $(this)
		, previous_anchor = $("a#previous_slide")
		, inview = $(".slide.active")
		, comment = $(".comment.active")
		, next = $(".slide.active").next()
		, name = next.attr('id')
		, next_comment = $("#comment_"+name);

		previous_anchor.show();
	
		if (next.length ) {
 		inview.removeClass("active");
 		comment.removeClass("active");
 		next.addClass("active");
 		next_comment.addClass("active");
 		}
 		
		if(next.is(':last-of-type')) {
		anchor.hide();
		}

		event.preventDefault();
	});
});


