function DataCircle(data, options){
	options = options || {};
	this.data = data || this.defaultData;
	this.position = options.position || new Vector();
  this.rotation = options.rotation || 0;
	this.defaultClick = options.defaultClick || function(){};
  this.defaultOver = options.defaultHover || function(){};
}
DataCircle.prototype.draw = function drawDataCircle(context){
	var tau = 2 * Math.PI, i;

	for(i in this.data){
		if( !this.data.hasOwnProperty( i ) ) return;
		seg = this.data[i];
    
		context.beginPath();
		context.arc(0, 0, seg.radius, seg.start * tau, seg.end * tau);
		context.strokeStyle = seg.color;
		context.lineWidth = seg.width;
		context.stroke();
	}
};
DataCircle.prototype.defaultData = [
	{ start: 0, end: 1/3, radius: 20, width: 40, name: 'red',
	  color: {r: 255, g: 0, b: 0} },
	{ start: 1/3, end: 2/3, radius: 20, width: 40, name: 'yellow',
	  color: {r: 255, g: 255, b:0}, over: function(seg){ this.color.r = Math.random() * 255; this.color.g = Math.random() * 255; this.color.b = Math.random() * 255;} },
	{ start: 2/3, end: 1, radius: 20, width: 40, name: 'blue',
	  color: {r: 0, g: 0, b: 255}, click: function(seg){ console.log('seg click: ', seg, this); } }
];
DataCircle.prototype.click = function dataCircleClick(point, e){
	var seg, segments = this.getSegmentByPoint(point);
	console.log('segments to query: ', segments.length ? segments[0] : 'none');
	for(var i in segments){
		seg = segments[i];
		if(seg.click && typeof seg.click == 'function'){
			if(!(seg.click(seg, e) === false) ) this.defaultClick(seg, e);
		}
		else this.defaultClick(seg, e);
	}
};
DataCircle.prototype.click = function dataCircleClick(point, e){
	var seg, segments = this.getSegmentByPoint(point);
	for(var i in segments){
		seg = segments[i];
		if(seg.click && typeof seg.click == 'function'){
			if(!(seg.click(seg, e) === false) ) this.defaultClick(seg, e);
		}
		else this.defaultClick(seg, e);
	}
};
DataCircle.prototype.over = function dataCircleClick(point, e){
	var seg, segments = this.getSegmentByPoint(point, e);
	for(var i in segments){
		seg = segments[i];
		if(seg.over && typeof seg.over == 'function'){
			if(seg.over(seg, e) === false) return;
      this.defaultOver(seg, e);
		}
		this.defaultOver(seg, e);
	}
  if(segments.length) this.generalOver(segments, e);
};
DataCircle.prototype.generalOver = function(segments, e){};
DataCircle.prototype.getSegmentByPoint = function getSegmentByPoint(point){
	var angle = Math.atan2(point.y, point.x),
		tau = angle/(2*Math.PI),
		seg,
		foundSegments = [],
		radius = Math.sqrt( Math.pow(point.x, 2) + Math.pow(point.y, 2) );
  
	tau = tau < 0 ? tau + 1 : tau;
	
	for (var i in this.data) {
		seg = this.data[i];
		
		if (
			seg.start < tau &&
			seg.end > tau &&
			radius < seg.radius + (seg.width / 2) &&
			radius > seg.radius - (seg.width / 2) 
		){
			foundSegments.push(seg);
		}
	}
	return foundSegments;
};
