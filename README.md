# jQuery.bootstrapAffixDynamic.js
Using bootstrap's affix js plugin, affix-dynamic works the same but requires jQuery selectors in place of integers for data-offset-top and data-offset-bottom attributes. The selectors are used to retrive a dynamic height.


##CDN

https://cdn.rawgit.com/BOXNYC/jquery-bootstrap-affix-dynamic/master/jQuery.bootstrapAffixDynamic-0.2.js


##USEAGE

###Selector *(TO DO: OPTIONS)*
```
$(function(){
	$('#my-element').affixDynamic({
		offsetTop: '#navbar', // Selectors only
		offsetBottom: '#footer', // Selectors only
		deviceSizes: 'sm md lg' // Doesn't do anything if changed
	});
});
```
###Inline-auto-init (Bootstrap syntax) *(TO DO: data-device-sizes)*
```
<div data-spy="affix-dynamic" data-offset-top="#navbar" data-offset-bottom="#footer" data-device-sizes="sm md lg (Doesn't do anything)">
	content...
</div>
```

#### Versions
* **0.1**
  * Manual usage {options} not complete.
  * Device size not complete. Defaults to 'sm md lg' which is everything but 'xs'
  * Doesn't Handle integer values like affix uses by default.
  * Doesn't handle inline attr device size option.


