# jQuery.bootstrapAffixDynamic.js
Using bootstrap's affix js plugin, affix-dynamic works the same but supports jQuery selectors for data-offset-top and data-offset-bottom attributes. These selectors will be used to retrive the outer height of the element to be used as the affix top or bottom options. If multiple selectors are returned for an option, there total summed outer height is used for the scroll offsets. Integers are still suported if a fixed options is still needed. 


##CDN

https://cdn.rawgit.com/BOXNYC/jquery-bootstrap-affix-dynamic/master/jQuery.bootstrapAffixDynamic-0.4.js


##USEAGE

###Selector
```
$(function(){
	$('#my-element').affixDynamic({
		offsetTop: '#navbar', // Selectors or integer
		offsetBottom: '#footer', // Selectors or integer
		deviceSizes: 'sm md lg' // xs sm md lg
	});
});
```
###Inline-auto-init (Bootstrap syntax)
```
<div data-spy="affix-dynamic" data-offset-top="#navbar" data-offset-bottom="#footer" data-device-sizes="sm md lg (Doesn't do anything)">
	content...
</div>
```

###Drupal 7: add this behavior so AJAX events trigger updates
```
/**
  * AffixDynamic behavior
  */ 
(function($, UND){
	Drupal.behaviors.affixDynamic = {
		attach: function(context, settings){
			if(typeof $.affixDynamicUpdate === UND) return;
			$.affixDynamicUpdate();
		}
	};
})(jQuery, 'undefined');
```
