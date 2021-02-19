const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
   
$(function (){    
    if (currentTheme != null) {
        document.documentElement.setAttribute('data-theme', currentTheme);      
        if (currentTheme === 'dark') {
            $('.theme-switch input[type="checkbox"]').prop('checked', true);
        }
    } 
    $(document).on('change','.theme-switch input[type="checkbox"]',function(e) {
        if($(this).is(':checked') == true)  {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
        else {        
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }    
    });

    
        /* ACTIVE PAGE LINK */
        var arrPage = $.makeArray();
        arrPage = ['index', 'about', 'services', 'blog', 'blog-single', 'testimonial', 'testimonial2', 'contact']
        var activePage = "";
            
        var windowPath = window.location.pathname.split('/').pop();
        var winlength = windowPath.indexOf('.');    
        var filename=""; 
        for(i=0;i<winlength;i++){ filename+=windowPath[i]} 
        filename = filename.toLowerCase();
        if (filename === "blog-single") { filename = "blog"}         
        if (filename != "" && filename != null) {
            setCookie("userpage", filename, 365);
        } else {
            setCookie("userpage", "index", 365);
        }  
        /* ACTIVE PAGE LINK */    
        $(".on-page-search").on("keyup", function () {
            var v = $(this).val();
            $(".results").removeClass("results");
            $("body").each(function () {
                if (v != "" && $(this).text().search(new RegExp(v,'gi')) != -1) {
                    $(this).addClass("results");
                }
            });
        }); 
});

document.onreadystatechange = function() { 
    if(document.readyState === 'interactive'){
        var setactive;
        setactive = setInterval(function () { 
            var activepage = getCookie("userpage");
            $(".navbar-nav .nav-item[nav-rel='"+activepage+"']").addClass('active');
         }, 100);

        var loader = '<div class="pageloader" id="pageloader"><div class="loading"><span class="dot"></span><div class="dots"><span></span><span></span><span></span></div></div></div>';        
        $('body').prepend(loader);
        document.querySelector("#pageloader").style.visibility = "visible";   
    }
    if(document.readyState === 'complete'){  
        $(".pageloader").fadeOut("slow",function(){
            $(this).remove();
            $('body').css("visibility","visible");
            clearTimeout(setactive);
        }); 
    }   
}; 