'use strict';

(function(root){
	let dpoint, tsep;
	
	root.Format = {
		init(decimal_point, thousands_sep){
			if(!is_dpoint_tsep(decimal_point)){
				throw new Error('Invalid decimal point: '+decimal_point);
			}
			
			if(!is_dpoint_tsep(thousands_sep)){
				throw new Error('Invalid thousands separator: '+thousands_sep);
			}
			
			if(decimal_point == thousands_sep){
				throw new Error('Decimal point and thousands separator can not be the same character');
			}
			
			dpoint = decimal_point;
			tsep = thousands_sep;
		},
		
		datasize(num){
			let units = {
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
			
			return 0;
		},
		
		float(str){
			let d = str.lastIndexOf(dpoint), t = str.lastIndexOf(tsep);
			if(d > -1 && t > -1){
				str = str.replace(new RegExp('\\'+(Math.max(d, t) == d ? tsep : dpoint), 'g'), '');
			}
			
			return parseFloat(str.replace(/,/g, '.')) || 0;
		},
		
		num(num, dec, no_tsep, no_force_dpoint){
			if(isNaN(num)){
				return 0;
			}
			
			if(typeof num != 'number'){
				num = parseFloat(num);
			}
			
			let number = round_dec(num, dec).toString().split('.');
			
			if(!no_force_dpoint){
				if(!number[1]){
					if(dec){
						number[1] = Format.zerofill(0, dec);
					}
				}
				else if(number[1].length < dec){
					number[1] = Format.zerofill(number[1], dec, true);
				}
			}
			
			let str = no_tsep ? number[0] : number[0].replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&'+tsep);
			if(number[1]){
				str += dpoint+number[1];
			}
			
			return str;
		},
		
		zerofill(num, width, append){
			let n = Math.abs(num), zeros = Math.max(0, width - Math.floor(n).toString().length), fill = Math.pow(10, zeros).toString().substr(1);
			return append ? parseInt(n+fill) : fill+n;
		}
	};
	
	function round_dec(num, dec){
		if(!dec){
			return Math.round(num);
		}
		
		let scale = '';
		for(let i=0; i<dec; i++){
			scale += '0';
		}
		
		return Math.round(num * ('1'+scale)) / ('1'+scale);
	}
	
	function is_dpoint_tsep(str){
		return str == '.' || str == ',';
	}
})(this);