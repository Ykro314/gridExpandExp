var grid = document.querySelector( ".grid" );
var gridElements = document.querySelectorAll( ".grid__el" );

function doSomething( event ) {
  
  function hideContent( contentList ) {
    Array.prototype.forEach.call( contentList, function( el ){
      el.classList.toggle( "fade-out" );
    })
  }
  
  function expandCell( cell ){
    
    function calcTranslateCoords( coords ) {
      var translateX = -coords.left;
      var translateY = -coords.top;
      
      return {
        left: translateX,
        top: translateY
      }
    }
    
    function calcScale( coords ) {
      var scaleX = window.innerWidth / coords.width;
      var scaleY = window.innerHeight / coords.height;
      return {
        scaleX: scaleX.toFixed( 2 ),
        scaleY: scaleY.toFixed( 2 )
      }
    }
    
    var cellCoords = cell.getBoundingClientRect();
    var translCoords = calcTranslateCoords( cellCoords );
    var scaleCoords = calcScale( cellCoords );
    var expandEl = cell.querySelector( ".expand" );
    expandEl.style.transform = "translate3d( " + translCoords.left + "px, " + translCoords.top + "px, 0) scale(" + scaleCoords.scaleX + ", " + scaleCoords.scaleY + ")";
    
//    expandEl.style.width = "70vw";
//    expandEl.style.height = "70vh";
//    expandEl.style.top = "-5px";
//    expandEl.style.left = "-5px";
//    expandEl.style.right = "-5px";
//    expandEl.style.bottom = "-5px";
//    expandEl.style.background = " #e8e8e8";
    expandEl.style.zIndex = "100";
  }
  
  var element = this;
  var animateContent = element.querySelectorAll( ".animate" );
  var coords = element.getBoundingClientRect();
  hideContent( animateContent );
  setTimeout( function(){
    expandCell( element );
  }, 1000 );
};


(function init(){
  for( var i = 0; i < gridElements.length; i++ ) {
    gridElements[i].addEventListener( "click", doSomething );
  }
})();


// example 

 function calculateTranslate( coords ) {
    var width = coords.width;
    var heignt = coords.height;
    var scale = calculateScaleSize( coords );
    var translateX, translateY, gap;
    if( width >= heignt ) {
      var heightAfterScaling = heignt * scale;
      gap = ( window.innerHeight - heightAfterScaling ) / 2;
      translateY = ( -coords.top + gap );
      translateX = ( -coords.left + 50 );
    }
    else {
      var widthAfterScaling = width * scale;
      gap = ( ( window.innerWidth / 2 ) - widthAfterScaling ) / 2;
      translateX = ( -coords.left + gap + 50 );
      translateY = ( -coords.top + 50 );
    }
    return {
      left: translateX,
      top: translateY
    }
  }

function calculateScaleSize( coords ) {
    var width = coords.width;
    var heignt = coords.height;
    var scaleNumber;
    if( width >= heignt ) {
      var preferedWidth =( window.innerWidth / 2 ) - 50;
      scaleNumber = preferedWidth / width;
    }
    else {
      var preferedHeight = window.innerHeight - 100;
      scaleNumber = preferedHeight / heignt;
    }
    return scaleNumber;
  }