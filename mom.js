var momObj = function()
{
	this.x;
	this.y;
	this.angle;
	// this.bigEye = new Image();
	// this.bigBody = new Image();
	// this.bigTail = new Image();

	this.momTailTimer = 0;
	this.momTailCount = 0;

	this.momEyeTimer = 0;
	this.momEyeCount = 0;
	this.momEyeInterval = 1000;

	this.momBodyCount = 0;
}
momObj.prototype.init = function()
{
	this.x = canWidth * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
	// this.bigEye.src = 'src/bigEye0.png';
	// this.bigBody.src = 'src/bigSwim0.png';
	// this.bigTail.src = 'src/bigTail0.png';
}
momObj.prototype.draw = function()
{
	//Lerp x,y
	this.x = lerpDistance(mx, this.x, 0.98); //跟随鼠标
	this.y = lerpDistance(my, this.y, 0.98);

	//delta angle
	//Math.atan2(y,x)
	var deltaY = my - this.y;
	var deltaX = mx - this.x; 
	var beta = Math.atan2(deltaY,deltaX) + Math.PI; //角度趋近与beta

	//Lerp angle
	this.angle = lerpAngle(beta, this.angle, 0.6);//封装好函数

	//tail
	this.momTailTimer += deltaTime;
	if(this.momTailTimer > 50)
	{
		this.momTailCount = (this.momTailCount + 1) % 8;
		this.momTailTimer %= 50;
	}

	//eye
	this.momEyeTimer += deltaTime;
	
	if(this.momEyeTimer > this.momEyeInterval)
	{
		this.momEyeCount = (this.momEyeCount + 1) % 2;
		this.momEyeTimer %= this.momEyeInterval;

		if(this.momEyeCount == 0)
		{
			this.momEyeInterval = Math.random() * 1500 + 2000; //[,)
		}else
		{
			this.momEyeInterval = 200;
		}
	}

	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);
    //前后顺序代表层的顺序

    var momTailCount = this.momTailCount;
    var momEyeCount = this.momEyeCount;
    var momBodyCount = this.momBodyCount;
    if(data.double == 1)//ora or blue
    {
    	ctx1.drawImage(momBodyOra[momBodyCount], -momBodyOra[momBodyCount].width*0.5, -momBodyOra[momBodyCount].height*0.5);
    }else
    {
    	ctx1.drawImage(momBodyBlue[momBodyCount], -momBodyOra[momBodyCount].width*0.5, -momBodyOra[momBodyCount].height*0.5);
    }

	ctx1.drawImage(momTail[momTailCount], -momTail[momTailCount].width*0.5+30, -momTail[momTailCount].height*0.5);
	
	ctx1.drawImage(momEye[momEyeCount], -momEye[momEyeCount].width*0.5, -momEye[momEyeCount].height*0.5);//以图片资源中心为原点

	ctx1.restore();
}