// When the user scrolls down 20px from the top of the document, show the button
document.onreadystatechange = function() {  
  if(document.readyState === 'complete'){  
    window.onscroll = function () {
      scrollFunction()
    };   
  }   
}; 

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("movetop").style.display = "block";
  } else {
    document.getElementById("movetop").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}