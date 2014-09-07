var DOT_SIZE = 16;
var X_START_POS = 50;
var Y_START_POS = 50;

// ‥‥‥‥‥‥‥‥‥‥‥‥‥□□□
// ‥‥‥‥‥‥〓〓〓〓〓‥‥□□□
// ‥‥‥‥‥〓〓〓〓〓〓〓〓〓□□
// ‥‥‥‥‥■■■□□■□‥■■■
// ‥‥‥‥■□■□□□■□□■■■
// ‥‥‥‥■□■■□□□■□□□■
// ‥‥‥‥■■□□□□■■■■■‥
// ‥‥‥‥‥‥□□□□□□□■‥‥
// ‥‥■■■■■〓■■■〓■‥‥‥
// ‥■■■■■■■〓■■■〓‥‥■
// □□■■■■■■〓〓〓〓〓‥‥■
// □□□‥〓〓■〓〓□〓〓□〓■■
// ‥□‥■〓〓〓〓〓〓〓〓〓〓■■
// ‥‥■■■〓〓〓〓〓〓〓〓〓■■
// ‥■■■〓〓〓〓〓〓〓‥‥‥‥‥
// ‥■‥‥〓〓〓〓‥‥‥‥‥‥‥‥
var dataSet = [
    "BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BK","BG","BG","BG",
    "BK","BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","BK","BK","BG","BG","BG",
    "BK","BK","BK","BK","BK","RD","RD","RD","RD","RD","RD","RD","RD","RD","BG","BG",
    "BK","BK","BK","BK","BK","BR","BR","BR","BG","BG","BR","BG","BK","RD","RD","RD",
    "BK","BK","BK","BK","BR","BG","BR","BG","BG","BG","BR","BG","BG","RD","RD","RD",
    "BK","BK","BK","BK","BR","BG","BR","BR","BG","BG","BG","BR","BG","BG","BG","RD",
    "BK","BK","BK","BK","BR","BR","BG","BG","BG","BG","BR","BR","BR","BR","RD","BK",
    "BK","BK","BK","BK","BK","BK","BG","BG","BG","BG","BG","BG","BG","RD","BK","BK",
    "BK","BK","RD","RD","RD","RD","RD","BL","RD","RD","RD","BL","RD","BK","BK","BK",
    "BK","RD","RD","RD","RD","RD","RD","RD","BL","RD","RD","RD","BL","BK","BK","BR",
    "BG","BG","RD","RD","RD","RD","RD","RD","BL","BL","BL","BL","BL","BK","BK","BR",
    "BG","BG","BG","BK","BL","BL","RD","BL","BL","YL","BL","BL","YL","BL","BR","BR",
    "BK","BG","BK","BR","BL","BL","BL","BL","BL","BL","BL","BL","BL","BL","BR","BR",
    "BK","BK","BR","BR","BR","BL","BL","BL","BL","BL","BL","BL","BL","BL","BR","BR",
    "BK","BR","BR","BR","BL","BL","BL","BL","BL","BL","BL","BK","BK","BK","BK","BK",
    "BK","BR","BK","BK","BL","BL","BL","BL","BK","BK","BK","BK","BK","BK","BK","BK"
];

function getRgbColor(colorType)
{
    var colorHash = {
        "BK":"#000000", // black
        "WH":"#FFFFFF", // white
        "BG":"#FFCCCC", // beige
        "BR":"#800000", // brown
        "RD":"#FF0000", // red
        "YL":"#FFFF00", // yellow
        "GN":"#00FF00", // green
        "WT":"#00FFFF", // water
        "BL":"#0000FF", // blue
        "PR":"#800080"  // purple
    };
    return colorHash[colorType];
}

function getSingleLightColor(colorType, rgbType) {
    var result = "";
    var rgb = getRgbColor(colorType);
    rgb = rgb.replace("#", "");
    var r = parseInt("0x" + rgb.substr(0, 2), 16);
    var g = parseInt("0x" + rgb.substr(2, 2), 16);
    var b = parseInt("0x" + rgb.substr(4, 2), 16);
    switch (rgbType) {
        case 'r':
            r = r;
            g = 0;
            b = 0;
            break;
        case 'g':
            r = 0;
            g = g;
            b = 0;
            break;
        case 'b':
            r = 0;
            g = 0;
            b = b;
            break;
    }
    result = "rgb( " + r + ", " + g + ", " + b + ")";
    return result;
}

window.requestAnimationFrame = ( function(){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function( callback ){
                window.setTimeout( callback, 1000.0 / 60.0 );
            };
} )();

var width, height;
var canvas;
var ctx;
var pos = 0;
function init() {
    width = 465;
    height = 465;
    canvas = document.getElementById("canvas");
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");
    pos = 0;
}

function animate() {
    setInterval( render, 200 );
}

function render() {
    var i, x, y;
    var colorType;
    var color;
    var colorR;
    var colorG;
    var colorB;
    for (i = 0; i < dataSet.length; i++) {
        x = X_START_POS + ((i + pos) % 16) * DOT_SIZE;
        y = Y_START_POS + Math.floor(i / 16) * DOT_SIZE;
        colorType = dataSet[i];
        colorR = getSingleLightColor(colorType, "r");
        colorG = getSingleLightColor(colorType, "g");
        colorB = getSingleLightColor(colorType, "b");
        ctx.fillStyle = colorR;
        ctx.fillRect(x + DOT_SIZE / 3 * 1, y, DOT_SIZE / 3 - 2, DOT_SIZE - 2);
        ctx.fillStyle = colorG;
        ctx.fillRect(x + DOT_SIZE / 3 * 2, y, DOT_SIZE / 3 - 2, DOT_SIZE - 2);
        ctx.fillStyle = colorB;
        ctx.fillRect(x + DOT_SIZE / 3 * 3, y, DOT_SIZE / 3 - 2, DOT_SIZE - 2);
    }
    pos++;
}
//https://twitter.com/One_div
//http://one-div.com <-- CSS3 single element database

jQuery(document).ready(function($){
	$('.fake-placeholder input').each(function(){
		if($(this).val()==""){
			$(this).addClass('empty');	
		}
	})
	$('.fake-placeholder input').on('change',function(){
		if($(this).val()==""){
			$(this).addClass('empty');	
		}else{
			$(this).removeClass('empty');	
		}
	})
	  $('.fake-select-objects').on('click',function(e){
	    if( $(event.target).hasClass('fake-select-objects')){
	    	$(this).find('input[type=radio]').prop('checked',false);
	    }
  })
  /*---------- Used for the example-------*/
  $('.ui-kit .row:first-child button').on('click',function(){
    $('.ui-kit').removeClass($('button.current').attr('data-color'));
    $('.ui-kit .row:first-child button').removeClass('current');
    $('.ui-kit').addClass($(this).attr('data-color'));
    $(this).addClass('current');
  })
})

(function ($) {
	"use strict";
	window.coverBrowser = window.coverBrowser || {};
	
	var self = window.coverBrowser;
	
	self.utils = (function () {

		var getDir = function (of){

			var id = of,
				start = id.indexOf("cbcontrol") + 10,
				dir = id.substring(start,id.length);

			return dir;	

        };

		return {
			getDir : getDir
		};

	})();

	self.state = (function (){
		
		var classes = [],
			activeIndex = 0,
			stageDim = {},
			coverDim = {};
		
		return {
			classes : classes,
			activeIndex : activeIndex
		};
		
	})();
	
	self.actions = (function (){
		
		var doMove = function (){
				
				var activeIndex = self.state.activeIndex,
					$covers = $(".cbImage"),
					newActive,oldActive = $(".cbImage .active");
				
				$covers.each(function (i, e){
					
					if( i < activeIndex ){
						
						this.className = "cbImage inactiveLeft inactiveLeft" + (activeIndex - i) ;
						
					}
					else if( i === activeIndex ){
						this.className = "cbImage active";
						newActive = this;
					}
					else if( i > activeIndex ){
					
						this.className = "cbImage inactiveRight inactiveRight" + ((activeIndex - i)*-1) ;
					
					}
				
				});
				
				$(document).trigger("endmove.cvr", [{"newActive":newActive,"oldActive":oldActive}]);
			
			},
        
            moveRight = function (){
				
				if( $(document).trigger("startmoveright") !== false ){

					self.state.activeIndex = self.state.activeIndex-1;

                    doMove();

				}
			},
		
			moveLeft = function (){

				if( $(document).trigger("startmoveleft") !== false ){

					self.state.activeIndex = self.state.activeIndex + 1;

					doMove();

				}
			};
			
		return {
			moveRight : moveRight,
			moveLeft : moveLeft,
			doMove : doMove
		};
		
	})();
	
	self.imgs = (function (){
		
		var attachEvents = function (){
			
			$(".cbImage").on("click",function (event){
				//move[dir] the number of times difference 
				//between index of active and index of clicked
				var dir = this.className.search(/left/gi) !==-1 ? "Right" : "Left",
                    $coll = $(".cbImage"),
					diff = dir === "Right" ? ($coll.index($(".cbImage.active")) - $coll.index(this)) :
							($coll.index($(".cbImage.active")) - $coll.index(this)) * -1,
					x;

				for( x=0; x<diff; x++ ){
					self.actions["move"+dir]();
				}
			});
		
		};

		return{
			attachEvents : attachEvents
		};

	})();

	self.controls = (function (){
		
		var attachEvents = function (){
			
			$(".cbcontrol").on("click", function (event){

				var dir = self.utils.getDir(this.id),
					active = $(".cbImage.active"),
					makeActive = dir === "Right" ? active.prev(".cbImage") : active.next(".cbImage");
					
				if( makeActive.length > 0 ){	
					self.actions["move"+dir]();
				}
			});
		
		};
		
		return {
			attachEvents : attachEvents
		};
	})();
	
	self.init = (function (){
		
        
        
        var $covers = $(".cbImage"),
            setStageDims = function(){
                self.state.stageDim = {x:$(".stage").outerWidth(),y:$(".stage").outerHeight()};
            },
            setCoverDims = function($active){
                self.state.coverDim = {x:$active.outerWidth(),y:$active.outerHeight()};
            },
            getSheet = function(){
                var l = $("#cbGeneratedClasses").length;
                if( l === 0 ){
                    var $newsheet = $("<style type='text/css' id='cbGeneratedClasses'></style>"),
                        ss = $newsheet.appendTo("head")[0].sheet;
                }
                else{
                    $("#cbGeneratedClasses").text('');
                    var ss = $("#cbGeneratedClasses")[0].sheet;
                }
                return ss;
            },
            generateClasses = function(){
                
                var leftfac,
                    rightfac,
                    x,
                    z = 100,//TODO figure equation for zindex, increase closer to activeIndex, decrease after
                    cvrLength = $covers.length,
                    l = cvrLength*2,
                    ss = getSheet(),
                    al;
                    
                al = (self.state.stageDim.x / 2) - (self.state.coverDim.x / 2);
                    
                ss.insertRule(".stage .active{left:"+al+"px;}",0);
                
                for(x=0; x<l; x++){
                    
                    //create an inactive class for each direction
                    //for every element in the set
                    leftfac = al - ((self.state.coverDim.x * x)/2) -  (self.state.coverDim.x/2);
                    rightfac = al + ((self.state.coverDim.x * x)/2) + (self.state.coverDim.x/2);
                    ss.insertRule(".inactiveLeft"+x+"{left:"+leftfac+"px;z-index:"+z+";}",0);
                    ss.insertRule(".inactiveRight"+x+"{left:"+rightfac+"px;z-index:"+z+";}",0);
                    
                }
                
            },
            doInit = function(){
        
                var $active = $covers.filter(".active"),
                    activeIndex = $covers.index($active) !== -1 ? $covers.index($active) : 0;
                
                setStageDims();
                setCoverDims($active);
                
                generateClasses();
                
                self.controls.attachEvents();

                self.imgs.attachEvents();
                
                self.state.activeIndex = activeIndex;
                
                self.actions.doMove();
                
            }(),
            reInit = function(){
            
                var $active = $covers.filter(".active");
            
                setStageDims();
                setCoverDims($active);
                
                generateClasses();
            
            };
        
        $(window).on("resize",function(event){
            self.init.reInit();
        });
        
        return {
            reInit : reInit
        };
        
	})();
    
})(jQuery);	