'use strict';

(function(root){
	root.Format = {
		zerofill(num, width, append){
			let n = Math.abs(num), zeros = Math.max(0, width - Math.floor(n).toString().length), fill = Math.pow(10, zeros).toString().substr(1);
			return append ? parseInt(n+fill) : fill+n;
		}
	};
})(this);