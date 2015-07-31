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
			options = $.extend({
				offsetTop: 0,
				offsetBottom: 0,
				deviceSizes: 'sm md lg',
				paddingTop: 0,
				paddingBottom: 30
			}, options);
			var $this = $(this),
					dataOffsetTop = $this.attr('data-offset-top'),
					dataOffsetBottom = $this.attr('data-offset-bottom'),
					dataDeviceSizes = $this.attr('data-device-sizes'),
					dataPaddingTop = $this.attr('data-padding-top'),
					dataPaddingBottom = $this.attr('data-padding-bottom');
			if($this.hasClass('affix-'+index)) return true;
			$this.addClass('affix-'+index);
			// Handle data attributes, apply em to options
			if(isNaN(options.offsetTop)) options.offsetTop = $(options.offsetTop);
			if(isNaN(options.offsetBottom)) options.offsetBottom = $(options.offsetBottom);
			if(!UND(dataOffsetTop))
				options.offsetTop = isNaN(dataOffsetTop) ? $(dataOffsetTop) : parseInt(dataOffsetTop);
			if(!UND(dataOffsetBottom))
				options.offsetBottom = isNaN(dataOffsetBottom) ? $(dataOffsetBottom) : parseInt(dataOffsetBottom);
			if(!UND(dataPaddingTop)) options.paddingTop = parseInt(dataPaddingTop);
			if(!UND(dataPaddingBottom)) options.paddingBottom = parseInt(dataPaddingBottom);
			// Handle devide sizes
			if(!UND(dataDeviceSizes)) options.deviceSizes = dataDeviceSizes;
			var $window = $(window),
					medias = {
						xs: '(min-width:1px) and (max-width:767px)',
						sm: '(min-width:768px) and (max-width:992px)',
						md: '(min-width:993px) and (max-width:1199px)',
						lg: '(min-width:1200px)'
					},
					media = [],
					top = 0,
					bottom = 0,
					previousTop = 0,
					initTop = Math.round($this.offset().top),
					$CSS = $('<style type="text/css">').appendTo('head');
			$.each(options.deviceSizes.split(' '), function(i, size){
				if(!size.length) return true;
				if(!UND(medias[size])) media.push(medias[size]);
			});
			media = media.join(' , ');
			// On window resize, update our dynamic values
			$window.bind('resize.affixDynamic'+index, function(){
				top = isNaN(options.offsetTop) ? options.offsetTop.totalOuterHeight() : options.offsetTop;
		    bottom = isNaN(options.offsetBottom) ? options.offsetBottom.totalOuterHeight() : options.offsetBottom;
		    if(options.paddingTop) top += options.paddingTop;
		    if(options.paddingBottom) bottom += options.paddingBottom;
		    if(top && top != previousTop) {
			    var css = 'position:fixed !important; top:'+top+'px;';
			    css = '[data-spy="affix-dynamic"].affix.affix-'+index+':not(.affix-bottom){' + css + '}';
			    css = '@media ' + media + ' {' + css + '}';
			    css = '.affix { position: relative; } ' + css;
			    $CSS.html(css);
			    previousTop = top;
			  };
			}).trigger('resize.affixDynamic'+index);
			// Apply bootstrap affix
			var offset = {};
			if(top) offset.top = function(){ return initTop > top ? initTop - top : top; };
			if(bottom) offset.bottom = function(){ return bottom - initTop; };
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
