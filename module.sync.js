module.exports = function(ff) {
	var oGenerator = ff();
	
	function fNext(oError, oData) {            // This is the async loop pattern
		if (typeof oData == 'undefined') {
			oData = oError;
			oError = null;
		}
		
		if (oError) {
			return oGenerator.throw(oError);            // if oError, throw it into the wormhole
		} else {
			var oResult = oGenerator.send(oData);       // if good value, send it
			var yielded = oResult.value;
			if (!oResult.done) {
				switch (typeof yielded) {
					case 'function':
						yielded(fNext);
						break;
					default:
						fNext(null, yielded);
						break;
				}
			}
		}
	}
		
	fNext();                                         // Kick off the async loop
}

Function.prototype.sync = function() {
	var f = this,
		a = arguments;
		
	function yielded(fNext) {
		a[a.length ++] = fNext;
		return f.apply(f, a);
	}
	
	return yielded;
}
