'use strict';

(function(root){
	let dpoint, tsep;
	
	root.Format = {
		init(decimal_point, thousands_sep){
			dpoint = decimal_point;
			tsep = thousands_sep;
		},
		
		datasize(num){
			/*let units = {
				Gb : 1024 * 1024 * 1024,
				Mb : 1024 * 1024,
				Kb : 1024,
				Byte : 1
			}, scale;
			
			for(let k in units){
				scale = num / units[k];
				if(scale >= 1){
					return Format.num(scale, 2)+' '+k;
				}
			}
			
			return 0;*/
		},
		
		num(num, dec, no_thousands_sep, no_force_dec){
			/*if(isNaN(num)){
				num = 0;
			}
			else if(typeof num != 'number'){
				num = parseFloat(num);
			}
			
			var scale = '', i;
			for(i=0; i<dec; i++){
				scale += '0';
			}
			
			var number = (Math.round(num * ('1'+scale)) / ('1'+scale)).toString().split('.');
			
			if(!no_force_dec){
				if(!number[1]){
					number[1] = scale;
				}
				else{
					var dec_diff = dec - number[1].length;
					if(dec_diff > 0){
						for(i=0; i<dec_diff; i++){
							number[1] += '0';
						}
					}
				}
			}
			
			var str = no_thousands_sep ? number[0] : number[0].replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&'+THOUSANDS_SEP);
			str += number[1] ? DECIMAL_POINT+number[1] : '';
			
			return str;*/
		},
		
		zerofill(num, width, append){
			let n = Math.abs(num), zeros = Math.max(0, width - Math.floor(n).toString().length), fill = Math.pow(10, zeros).toString().substr(1);
			return append ? parseInt(n+fill) : fill+n;
		}
	};
})(this);