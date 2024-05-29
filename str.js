(function(){
'use strict';

window.Str = Object.freeze({
	random(length=6){
		return Math.random().toString(36).substr(2, length);
	}
});
})();