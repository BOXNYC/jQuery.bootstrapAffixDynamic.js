(function($, UND){
	
	$.fn.totalOuterHeight = function(){
		var total = 0;
		$(this).each(function(){
			total += $(this).outerHeight();
		});
		return total;
	};
	
	$.fn.affixDynamic = function(options){
		return $(this).each(function(index){
			// Vars
			var $this = $(this).addClass('affix-'+index),
					$window = $(window),
					dataOffsetTop = $this.attr('data-offset-top'),
					dataOffsetBottom = $this.attr('data-offset-bottom'),
					$dataOffsetTop = isNaN(dataOffsetTop) ? $(dataOffsetTop) : [],
					$dataOffsetBottom = isNaN(dataOffsetBottom) ? $(dataOffsetBottom) : [],
			    top = 0, bottom = 0, offset = {}, previousTop = 0,
			    initTop = Math.round($this.offset().top),
			    $CSS = $('<style type="text/css">').appendTo('head');
			// On window resize, update our dynamic values
			$window.bind('resize.affixDynamic'+index, function(){
				top = UND(dataOffsetTop) || !$dataOffsetTop.length ?
					0 : $dataOffsetTop.outerHeight();
		    bottom = UND(dataOffsetBottom) || !$dataOffsetBottom.length ?
			    0 : $dataOffsetBottom.totalOuterHeight() - initTop;
		    if(top && top != previousTop) {
			    var css = 'position:fixed !important;top:'+top+'px;';
			    css = '[data-spy="affix-dynamic"].affix.affix-'+index+':not(.affix-bottom){' + css + '}';
			    css = '@media (min-width:768px) {' + css + '}';
			    $CSS.html(css);
			    previousTop = top;
			  };
			}).trigger('resize.affixDynamic'+index);
			// Apply bootstrap affix
			if(top) offset.top = function(){ return initTop > top ? initTop - top : top; };
			if(bottom) offset.bottom = function(){ return bottom; };
			$this.affix({
			  offset: offset
			});
			// Save creations for removal
			$this.data('affixDynamic', {
				$CSS: $CSS,
				update: function(){
					$window.trigger('resize.affixDynamic'+index);
				}
			});
		});
	};
	
	$.fn.affixDynamicRemove = function(){
		return $(this).each(function(index){
			var $this = $(this),
					data = $this.data('affixDynamic');
			if(!UND(data)) {
				data.$CSS.remove();
				$(window).unbind('resize.affixDynamic'+index);
			};
		});
	};
	
	$.affixDynamicUpdate = function(){
		$('[data-spy="affix-dynamic"]').each(function(){
			var $this = $(this),
					data = $this.data('affixDynamic');
			if(!UND(data)) data.update();
		});
	};
	
	$(function(){
		$('[data-spy="affix-dynamic"]').affixDynamic();
	});
	
})(jQuery, function(v){return typeof v==='undefined';});
