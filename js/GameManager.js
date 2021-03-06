var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 1080;
canvas.height = 720;

var player_image = new Image();
var player_bullet_image = new Image();
var player_heart = new Image();
var player_heart_empty = new Image();
var player_mhp = 8;
var player_hp = player_mhp;
var player_speed = 5;
var player_jumppower = 13;
var player_isDirectionRight = true;
var rightPressed = false;
var leftPressed = false;
var upPressed =false;
var attackPressed =false;
const ATTACKDELAY = 18;
var attackdelay =0;
var player_bulletlist = [];

var music_stage1 = new Audio();
const TILESIZE = 54;
var ground_dirt0 = new Image();
var ground_sand0 = new Image();
var ground_sand1 = new Image();
var groundtypelist = [null, [ground_sand0, ground_sand1], [ground_dirt0]];
var effect_volume = 1;
var master_volume = 1;
var music_volume = 1;

var timer = 0;
var animation;
const GRAVITY = 0.8;
const MAPHEIGHT = 10000;
const MAPWIDTH = 10000;
var gravity = GRAVITY;

var spaceship = {
	x:1646,
	y:784,
	draw(){
		console.log(123);
		var ship = new Image();
		ship.src = 'img/spaceship.png';
		ctx.drawImage(ship, 1246, 320, 250, 500);
	}
}
var graphiclist = [spaceship];
var cactuslist = [];
var groundlist = [];
var map =	[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
		[0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
		[0,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]

function Start(){
	// Image Setting
	player_heart.src = 'img/heart.png';
	player_heart_empty.src = 'img/heart_empty.png';
	player_bullet_image.src = 'img/player_bullet.png';
	ground_dirt0.src = 'img/ground_dirt_0.png';
	ground_sand0.src = 'img/ground_sand_0.png';
	ground_sand1.src = 'img/ground_sand_1.png';

	ctx.imageSmoothingEnabled = false;  // Antialiasing Disabled

	// level generating 
	LevelGenerating();
	camera.x = player.x;
	camera.y = player.y;		

	// Audio Setting
	music_stage1.src = 'sound/Music/Into_the_Mars.mp3';
	music_stage1.loop = true;
}
function LevelGenerating(){
	for(var i = 0; i < map.length; i++){
		for(var j = 0; j < map[i].length; j++){
			if(map[i][j] && map[i][j] != 0){
				var ground = new Ground(j* TILESIZE, i* TILESIZE, 0, 0, TILESIZE, TILESIZE, map[i][j]);
				groundlist.push(ground);
			}
		}
	}
}
function MapoutCheck(a){
	if(a.x < 0 || a.x > MAPWIDTH || a.y < 0 || a.y > MAPHEIGHT)return true;
	return false;s
}
function drawUI(){
	for(var i = 0; i < player_hp; i++){
		ctx.drawImage(player_heart,i*46, 5, 70, 56);
	}
	x = i;	
	for(i = x ; i < player_mhp; i++){
		ctx.drawImage(player_heart_empty,i*46, 5, 70, 56);
	}
}

function Update(){
	//console.log(player.x + ", " + player.y);
	animation = requestAnimationFrame(Update);
	if(attackdelay > 0)attackdelay--; 
	timer++;

	
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.save();
	ctx.translate(-1*camera.x + canvas.width/2, -1*camera.y + canvas.height/2);
	camera.move();
	ctx.fillStyle = "rgb(189, 156, 95)";
	ctx.fillRect(-3000,-3000,MAPWIDTH,MAPHEIGHT);
	if(timer%120 == 0){
		var cactus = new Cactus();
		cactuslist.push(cactus);
	}
	cactuslist.forEach((a, i, o)=>{
		if(CollisionCheck(a, player)){
			player_hp -= 1;
			o.splice(i,1);
		}
		if(MapoutCheck(a))o.splice(i,1);
		a.draw();
		a.x--;
	})
	groundlist.forEach((a, i, o)=>{
		a.update();
	})
	graphiclist.forEach((a, i, o)=>{
		a.draw();
	})
	player_bulletlist.forEach((a, i, o)=>{
		if(MapoutCheck(a))o.splice(i,1);
		groundlist.forEach((b)=>{
			if(CollisionCheck(a, b))o.splice(i,1);
		})
		a.update();
	})
	player.update();
	ctx.restore();
	drawUI();
	if(player_hp <= 0){
		cancelAnimationFrame(animation);
		alert("You Died");
	}
}
class Rigidbody{
	constructor(x, y , vx, vy, width, height){
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.width = width;
		this.height = height;
	}
	draw(){
	}
	update(){
		this.x += this.vx;
		this.y += this.vy;
		this.draw();
	}
}
class Bullet extends Rigidbody{
	constructor(x, y, vx, vy, width, height){
		super(x, y, vx, vy, width, height);
		var player_shootingsound = new Audio('sound/player_shoot.wav');
		player_shootingsound.play();
	}
	draw(){
		ctx.drawImage(player_bullet_image,this.x, this.y, this.width, this.height);
	}
	update(){
		super.update();
	}
}
class Ground extends Rigidbody{
	constructor(x, y , vx, vy, width, height,type){
		super(x,y,vx,vy,width,height);
		this.type = type;
	}
	draw(){
		//console.log(this.x/TILESIZE);
		if(map[(this.y/TILESIZE)-1][this.x/TILESIZE] == 0)ctx.drawImage(groundtypelist[this.type][0],this.x, this.y, this.width, this.height);
		else ctx.drawImage(groundtypelist[this.type][1],this.x, this.y, this.width, this.height);
	}
	update(){
		super.update();
	}
}
var player = {
	x:1646,
	y:784,
	vx:0,
	vy:0,
	width:16,
	height:25,
	move(){
		if(rightPressed && !RightWall(player)){
			player.x += player_speed;
			player_isDirectionRight = true;
		}
		else if(leftPressed && !LeftWall(player)){
			player.x -= player_speed;
			player_isDirectionRight = false;
		}
	},
	jump(){
		if(upPressed)player.vy -= player_jumppower;
	},
	attack(){
		if(player_isDirectionRight) var bullet = new Bullet(player.x+23, player.y+8, 12, 0, 10, 10);
		else                            var bullet = new Bullet(player.x-17, player.y+8, -12, 0, 10, 10);
		player_bulletlist.push(bullet);
		attackdelay = ATTACKDELAY;
	},
	auto_attack(){
		if(attackPressed && attackdelay <= 0){
			this.attack();	
		}
	},
	draw(){
		ctx.fillStyle = 'green';
		//ctx.fillRect(this.x, this.y, this.width, this.height);
		if(player_isDirectionRight){
			player_image.src = 'img/player.png';
			ctx.drawImage(player_image,this.x-11, this.y-12, 50, 50);	
		}
		else{
			player_image.src = 'img/player_r.png';
			ctx.drawImage(player_image,this.x-22, this.y-12, 50, 50);	
		}
	},
	update(){
		if(OnGround(player)){
			gravity = 0;
			this.vy = 0;
			this.jump();
		}
		else{
			gravity = GRAVITY;
			this.vy += gravity;
		}
		this.move();
		this.auto_attack();
		this.x += this.vx;
		if(this.vy < 0){
			if(!UpWall(player))this.y += this.vy;
		}
		else this.y += this.vy;
		this.draw();
	}
}
var camera = {
	x:0,
	y:0,
	move(){
		camera.x += (player.x - camera.x) * 0.08;
		camera.y += (player.y - camera.y) * 0.08;
	}
}
class Cactus{
	constructor(){
		this.x = 500;
		this.y = 650;
		this.width = 36;
		this.height = 36;
	}
	draw(){
		ctx.fillStyle = 'red';
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}
window.addEventListener('keydown', (e)=> {
	if(e.code == "ArrowRight")rightPressed = true;
	else if(e.code == "ArrowLeft")leftPressed = true;
	else if(e.code == "ArrowUp")upPressed = true;
	else if(e.code == "KeyZ"){
		if(!attackPressed)player.attack();
		attackPressed = true;
	}
	music_stage1.play();
})
window.addEventListener('keyup', (e)=> {
	if(e.code == "ArrowRight")rightPressed = false;
	else if(e.code == "ArrowLeft")leftPressed = false;
	else if(e.code == "ArrowUp")upPressed = false;
	else if(e.code == "KeyZ")attackPressed = false;
})

Start();
Update();
