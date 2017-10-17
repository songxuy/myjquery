var rttophtml5mobi={
	website:'http://localhost'
}
rttophtml5mobi.utils={
	setParam:function(name,value){
		localStorage.setItem(name,value)
	},
	getParam:function(name){
		return localStorage.getItem(name)
	}
}