function setupWebViewJavascriptBridge(callback) {
	if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
	if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
	window.WVJBCallbacks = [callback];
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
	WVJBIframe.src = 'https://__bridge_loaded__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}

setupWebViewJavascriptBridge(function(bridge) {
  bridge.registerHandler('testJavascriptHandler', function(data, responseCallback) {
    log('ObjC called testJavascriptHandler with', data)
    var responseData = { 'Javascript Says':'Right back atcha!' }
    log('JS responding with', responseData)
    responseCallback(responseData)
  })
	bridge.callHandler('ObjC Echo', {'key':'value'}, function responseCallback(responseData) {
		console.log("JS received response:", responseData)
	})
})
