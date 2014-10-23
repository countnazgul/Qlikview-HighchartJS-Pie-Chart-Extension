var colorErr = [];

placeTics = function(vh, vhnum, tnum, c){
    var ticLong = "5px";
    var ticShort = "2px";
    var unit = vhnum/(tnum - 1);
    var cSpan = 0;
    for(var i=0;i<tnum;i++){
        var newTic = document.createElement("div");
        newTic.className = "tic";
	
        newTic.style.backgroundColor = "#d8d8d8";
        if(cSpan != 0){
            if(vh == "h"){
		newTic.style.left  = (cSpan-2) + 'px';
	    }else{
		newTic.style.top  = (cSpan-2) + 'px';
	    }
        }else{
	    if(vh == "h"){
		newTic.style.left  = cSpan + 'px';
	    }else{
		newTic.style.top  = cSpan + 'px';
	    }
        }
        if(vh == "h"){
		newTic.style.width = ticShort;
		newTic.style.height = ticLong;
		newTic.style.top  =  (c.offsetHeight - 5) + 'px';
	}else{
		newTic.style.width = ticLong;
		newTic.style.height = ticShort;
		newTic.style.left  =  (c.offsetWidth - 5) + 'px';
	}
        
        c.appendChild(newTic);
        cSpan = cSpan + unit;
    }
}

colorFormatter = function(c, type){
	var cc = c.toLowerCase();
	if((cc.length === 0) && (colorErr != 1)){
		colorErr.push(type);
		//alert("Please enter a hex or rgb color value in the " + type + " box");
	}else if((cc.indexOf("rgb") === -1) && (cc.indexOf("#") === -1)){
		if(cc.length < 6){
			var addIt = "#";
			for(var i=cc.length; i < 6;i++){
				addIt += "0";
			}
			cc = addIt + cc
		}else{
			cc = "#" + cc;
		}
		return cc;
	}else{
		return cc;
	}
}
Qva.AddExtension('QlikView/Examples/bullet', function() { 
    colorErr = [];
    Qva.LoadCSS("/QvAjaxZfc/QvsViewClient.aspx?public=only&name=Extensions/QlikView/Examples/bullet/bullet.css");
	var r=Math.floor(Math.random()*10001);
	var divName = "bulletContainer" + r;
    this.Element.innerHTML = "<div id='" + divName + "'></div>";
    var tot = this.Data.Rows[0][0].text;
	var ticFlag = this.Layout.Text4.text;
	var maxColor = colorFormatter(this.Layout.Text0.text.toString(), "Max Range Bar color");
	var m1 = this.Data.Rows[0][2].text/tot;
	var m1Color = "";
	if((m1 != 0) && !(isNaN(m1))){
		m1Color = colorFormatter(this.Layout.Text2.text.toString(), "Medium Range Bar color");
	}
	var m2 = this.Data.Rows[0][1].text/tot;
	var m2Color = "";
	if((m2 != 0) && !(isNaN(m2))){
		m2Color = colorFormatter(this.Layout.Text1.text.toString(), "Short Range Bar color");
	}
	var per = this.Data.Rows[0][3].text/tot;
	var perColor = colorFormatter(this.Layout.Text3.text.toString(), "Fill Bar Color");
	var bench = this.Data.Rows[0][4].text/tot;
	var orient = "";
	var ticScale = "";
	var thisHeight = this.GetHeight();
	var thisWidth = this.GetWidth();
	if(thisHeight > thisWidth){
	    orient = "v";
	    ticScale = thisHeight;
	}else{
	    orient = "h";
	    ticScale = thisWidth;
	}
	var bul = document.getElementById(divName);
	bul.style.height = this.GetHeight() + "px";
	bul.style.width = this.GetWidth() + "px";
	if((ticFlag == 1) && (orient == "h")){
		var scaleH = bul.offsetHeight - 5; 
	}else{
		var scaleH = bul.offsetHeight; 
	}
	if((ticFlag == 1) && (orient == "v")){
		var scaleW = bul.offsetWidth - 5;
	}else{
		var scaleW = bul.offsetWidth;
	}
	var scaleBar = document.createElement("div");
	scaleBar.style.height = scaleH + 'px';
	scaleBar.style.width = scaleW + 'px';
	scaleBar.style.backgroundColor = maxColor;
	scaleBar.style.zIndex = "1";
	scaleBar.className = 'largeBar';
	bul.appendChild(scaleBar);
	var m1Bar = document.createElement("div");
	if(orient == "v"){
		m1Bar.style.width = scaleW + 'px';
		m1Bar.style.height = (scaleH * m1) + 'px';
		m1Bar.style.bottom = 0 + 'px';
	}else{
		m1Bar.style.height = scaleH + 'px';
		m1Bar.style.width = (scaleW * m1) + 'px';
	}
	m1Bar.style.backgroundColor = m1Color;
	m1Bar.style.zIndex = "2";
	m1Bar.className = 'largeBar';
	bul.appendChild(m1Bar);
	var m2Bar = document.createElement("div");
	if(orient == "v"){
		m2Bar.style.width = scaleW + 'px';
		m2Bar.style.height = (scaleH * m2) + 'px';
		m2Bar.style.bottom = 0 + 'px';
	}else{
		m2Bar.style.height = scaleH + 'px';
		m2Bar.style.width = (scaleW * m2) + 'px';
	}
	m2Bar.style.backgroundColor = m2Color;
	m2Bar.style.zIndex = "3";
	m2Bar.className = 'largeBar';
	bul.appendChild(m2Bar);
	var perBar = document.createElement("div");
	if(orient == "v"){
		perBar.style.width = (scaleW/3) + 'px';
		perBar.style.height = (scaleH * per) + 'px';
		perBar.style.bottom = 0 + 'px';
	} else{
		perBar.style.height = (scaleH/3) + 'px';
		perBar.style.width = (scaleW * per) + 'px';
	}
	perBar.style.backgroundColor = perColor;
	perBar.style.zIndex = "4";
	perBar.className = 'perBar';
	bul.appendChild(perBar);
	if(orient == "v"){
		perBar.style.left = (scaleW/3) + 'px';
	}else{
		perBar.style.top = (scaleH/3) + 'px';
	}
	var benBar = document.createElement("div");
	if(orient == "v"){
		benBar.style.width = (scaleW - (scaleW/4)) + 'px';
		benBar.style.height = (scaleH/60) + 'px';
	}else{
		benBar.style.height = (scaleH - (scaleH/4)) + 'px';
		benBar.style.width = (scaleW/60) + 'px';
	}
	benBar.style.backgroundColor = perColor;
	benBar.style.zIndex = "5";
	benBar.className = 'benBar';
	bul.appendChild(benBar);
	if(orient == "v"){
		benBar.style.left = ((scaleW/4)/2) + 'px';
		benBar.style.bottom = (scaleH * bench) + 'px';	
	}else{
		benBar.style.top = ((scaleH/4)/2) + 'px';
		benBar.style.left = (scaleW * bench) + 'px';
	}
	/*
	number of tic marks include the tic for zero.  So if you want tics for 1-5, the value in placeTics 
	should be 6 in order to include the 0 tic
	*/
	if(ticFlag == 1){
		placeTics(orient, ticScale, 6, bul);
	}
	if(colorErr.length > 0){
		if(colorErr.length === 1){
			this.Element.innerHTML = "Please enter a hex or rgb color value in the " + colorErr[0] + " box";
		}else{
			this.Element.innerHTML = "Please enter a hex or rgb color value in the ";
			for(var i=0;i < colorErr.length; i++){
				if(i != 0){
					this.Element.innerHTML += ", ";
				}
				if((i + 1) === colorErr.length){
					this.Element.innerHTML += "and ";
				}
				this.Element.innerHTML += colorErr[i];
			}
			this.Element.innerHTML += " boxes";
		}
		this.Element.style.font = "11px arial,sans-serif";
		this.Element.style.color = "red";
	}
});