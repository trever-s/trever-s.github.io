//Set an active Section and Navigation Link via manual scroll (works with easing script below)

//variables
var sections = $('section')//define the waypoint divisions
  
  , nav = $("nav")//define your navigational menu
  
  , nav_height = nav.outerHeight()
  //define the height of the navigational menu (!important when using a fixed top bar menu)
  //otherwise nav_height (can rename) should be the distance/height from the top of the viewport where you would like stuff
  //to start happening. 
  
  , nav_links = $("a.page_nav");//define the navigational links
 
$(window).on('scroll', function () {
  var cur_pos = $(this).scrollTop();//define scroll position in relation to top of window/viewport
 
  sections.each(function() {
    var top = $(this).offset().top - nav_height
    //define the top off each waypoint/section using the viewport top and nav_height (see above)
    
    , bottom = top + $(this).outerHeight();//define bottom of section/waypoint
      	
 
    if (cur_pos >= top && cur_pos <= bottom) {//conditional for when scroll position is at each waypoint/section
 
      $("a.page_nav").removeClass("active").addClass("greyscale");//remove active state from navigational links
 
      $(this).addClass('active');//set waypoint/section in view as active
		//at this point can set additional conditions/animations based on which section/waypoint is active
 
      $('a.page_nav[href="#'+$(this).attr('id')+'"]').removeClass("greyscale").addClass("active");
      //define active state for navigational element by getting the id# of the active section and matching it to the nav element's href
 
    }
  });
});