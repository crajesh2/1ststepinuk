const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

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