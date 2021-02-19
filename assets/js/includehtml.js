function includeHTML() {
  var z, i, elmnt, file, xhttp, owlname;  
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    owlname = elmnt.getAttribute("owlname")
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest(); 
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;              
            if(owlname == 'owl-service') {
              var owl = $("."+owlname);
              owl.owlCarousel({
                loop: true,margin: 0,nav: true,dots: false,responsiveClass: true,autoplay: true,autoplayTimeout: 5000,autoplaySpeed: 1000,autoplayHoverPause: true,
                responsive: {
                  0: { items: 1 },
                  480: { items: 1 },
                  667: { items: 2 },
                  1000: { items: 4 }
                }
              });
            }else if(owlname == 'owl-testimonial') {
              var owltestimonial = $("."+owlname);
              owltestimonial.owlCarousel({
                loop: true,
                margin: 0,
                nav: false,
                responsiveClass: true,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplaySpeed: 1000,
                autoplayHoverPause: true,
                responsive: {
                  0: { items: 1 },
                  480: { items: 1 },
                  667: { items: 1 },
                  1000: { items: 1 }
                }
              });
            }
          }
          if (this.status == 404) {
            
            //elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}