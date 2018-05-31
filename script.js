stop = false;
function MarioClicker(){}



MarioClicker.prototype.init = function(container) {

	this.speed = 0.1;
	this.elementSize = 1;

	this.container = $(container);
	this.animateMario();
	this.styler();
	this.animateBackground();
	this.stopButton();
};

MarioClicker.prototype.styler = function() {
	document.getElementById('score').style.color = '#fff';
	document.getElementById('startButton').disabled = true;

};

MarioClicker.prototype.animateBackground = function(){
	var move = 0;
	setInterval(function(){
		if(stop == false)
			move+=1;
		else move=0;
		$('.marioContainer').css('background-position', move + 'px');
	}, 1);
};

MarioClicker.prototype.stopButton = function(){

	$( "#stopButton").click(function(){
  	$( ".marioContainer").stop();
  	stop=true;
	});

};

MarioClicker.prototype.makeNewPosition = function() {
	
	$container = (this.container || $(window))
	var h = $container.height() - 100;
	var w = $container.width() - 100;

	var nh = Math.floor(Math.random() * h);
	var nw = Math.floor(Math.random() * w);

	return [nh, nw];

};

MarioClicker.prototype.animateMario = function($container) {
	if(stop == false){
	var self = this;

	var $target = $('#animate');
	var newq = this.makeNewPosition($target.parent());
	var oldq = $target.offset();
	var speed = this.calcSpeed([oldq.top, oldq.left], newq);

	document.getElementById('animate').onclick = function()
	{	
		self.increaseScore();
		self.increaseSpeed();
		self.decreaseSize();
		
	}

	$('#animate').animate({top: newq[0], left: newq[1]}, speed, function() {
		if(stop == false){
			self.animateMario();
		}
		
	});

}

};

MarioClicker.prototype.calcSpeed = function(prev, next) {
	
	var x = Math.abs(prev[1] - next[1]);
	var y = Math.abs(prev[0] - next[0]);

	var greatest = x > y ? x : y;

	var speedModifier = this.speed;

	var speed = Math.ceil(greatest/speedModifier);

	return speed;

};

MarioClicker.prototype.increaseScore = function() {
	
	var score = parseInt(document.getElementById("score").innerHTML);
	score += 1;
	document.getElementById("score").innerHTML = score;
	
};



MarioClicker.prototype.increaseSpeed = function(first_argument) {
	this.speed += 0.1;
};

MarioClicker.prototype.decreaseSize = function(first_argument) {
	var newSize = this.elementSize -= 0.1;

	$('#animate').css('transform','scale('+newSize+')');
};



let mario = new MarioClicker();