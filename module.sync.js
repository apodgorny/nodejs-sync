module.exports = function(ff) {
	var oG   = ff(),
		next = function(oError, oData) {            // This is the async loop pattern
			if (typeof oData == 'undefined') {
				oData = oError;
				oError = null;
			}
			
			if (oError) {
				return oG.throw(oError);            // if oError, throw it into the wormhole
			} else {
				var oResult = oG.send(oData);       // if good value, send it
				if (!oResult.done) {                // if we are not at the end we have an async request to
					oResult.value(next);            // fulfill, we do this by calling `value` as a function
				}                                   // and passing it a callback that receives oError, oAnswer for which we'll just use `next()`
			}
		}
		
	next();                                         // Kick off the async loop
}

Function.prototype.sync = function() {
	var o = this,
		a = arguments;
		
	return function(fCallback) {
		a[a.length ++] = fCallback;
		return o.apply(o, a);
	}
}