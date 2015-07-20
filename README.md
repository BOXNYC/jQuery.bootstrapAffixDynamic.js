# jQuery.bootstrapAffixDynamic.js
Using bootstrap's affix js plugin, affix-dynamic works the same but requires jQuery selectors in place of integers for data-offset-top and data-offset-bottom attributes. The selectors are used to retrive a dynamic height.


##CDN

https://cdn.rawgit.com/BOXNYC/jquery-bootstrap-affix-dynamic/master/jQuery.bootstrapAffixDynamic-0.1.js


##USEAGE

###Selector (Incomplete. TO DO: OPTIONS)
  $(function(){
		$('#my-element').affixDynamic({
	    offsetTop: '#navbar',
		  offsetBottom: '#footer'
		});
	});

###Inline Auto init (Bootstrap syntax)
  <div data-spy="affix-dynamic" data-offset-top="#navbar" data-offset-bottom="#footer">
    content...
  </div>
