/* Shared behaviour for every page. Currently: reveal sections on scroll. */
(function(){
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revs = document.querySelectorAll(".reveal");
  function show(el){ el.classList.add("in"); }
  function showAll(){ revs.forEach(show); }

  if(!("IntersectionObserver" in window) || reduce){ showAll(); return; }

  // threshold 0 => fire as soon as any part of the element scrolls into view,
  // so this works even for sections far taller than the viewport.
  var ro = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ show(e.target); ro.unobserve(e.target); } });
  }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
  revs.forEach(function(el){ ro.observe(el); });

  // Safety net: content must never stay hidden. After load, reveal anything
  // already in or above the viewport regardless of the observer.
  window.addEventListener("load", function(){
    setTimeout(function(){
      revs.forEach(function(el){
        if(el.classList.contains("in")) return;
        var r = el.getBoundingClientRect();
        if(r.top < window.innerHeight) show(el);
      });
    }, 1000);
  });
})();
