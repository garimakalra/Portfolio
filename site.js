/* Shared behaviour for every page: reveal sections on scroll.
   Written defensively — content must ALWAYS end up visible, even if the
   IntersectionObserver is unavailable, throws, or misses an element. */
(function(){
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revs = [].slice.call(document.querySelectorAll(".reveal"));
  function show(el){ el.classList.add("in"); }
  function showAll(){ revs.forEach(show); }

  // No animation environment -> just show everything.
  if(reduce || !("IntersectionObserver" in window)){ showAll(); return; }

  var ro;
  try{
    // threshold 0: fire the moment any part scrolls into view. Works for
    // sections much taller than the viewport. No rootMargin (percentages
    // can throw in some browsers and take the whole script down with them).
    ro = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ show(e.target); ro.unobserve(e.target); } });
    }, { threshold: 0 });
    revs.forEach(function(el){ ro.observe(el); });
  } catch(err){
    // If anything above fails, never leave the page blank.
    showAll();
    return;
  }

  // Safety net: after load, reveal anything already in or above the viewport,
  // so nothing that's on screen can be stuck hidden. Below-fold blocks keep
  // their scroll-in animation via the observer.
  function sweep(){
    setTimeout(function(){
      var vh = window.innerHeight || document.documentElement.clientHeight;
      revs.forEach(function(el){
        if(el.classList.contains("in")) return;
        if(el.getBoundingClientRect().top < vh) show(el);
      });
    }, 800);
  }
  if(document.readyState === "complete") sweep();
  else window.addEventListener("load", sweep);
})();
