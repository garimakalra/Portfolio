/* Shared behaviour for every page. Currently: reveal sections on scroll. */
(function(){
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revs = document.querySelectorAll(".reveal");
  if("IntersectionObserver" in window && !reduce){
    var ro = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); ro.unobserve(e.target); } });
    },{threshold:.14});
    revs.forEach(function(el){ ro.observe(el); });
  } else {
    revs.forEach(function(el){ el.classList.add("in"); });
  }
})();
