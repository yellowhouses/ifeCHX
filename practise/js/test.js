function outside(){
	deg1 = 0;
	var $inside = function(){
		var pic = document.getElementsByClassName("rolatePic")[0];
		var $css3Transform = function(element, value){
			var arrPriex = ["O", "Ms", "Moz", "Webkit", ""], length = arrPriex.length;
			for (var i=0; i < length; i+=1) {
				element.style[arrPriex[i] + "Transform"] = value;
			}
		};
		var $caculate = function (deg2){
			var cosVal = Math.cos(deg2 * Math.PI / 180), 
				sinVal = Math.sin(deg2 * Math.PI / 180);
			var valTransform = 'matrix('+ cosVal.toFixed(6) +','+ sinVal.toFixed(6) +','+ (-1 * sinVal).toFixed(6) +','+ cosVal.toFixed(6) +',0,0)';
			return valTransform;
		};
		var val = $caculate(deg1);
		$css3Transform(pic, val);
		deg1 = deg1 + 1;
		return deg1;
	};
	setInterval(function(){$inside($inside())}, 30);
}
outside();