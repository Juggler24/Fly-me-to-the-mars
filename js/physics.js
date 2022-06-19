function CollisionCheck(a, b){
	var dx = b.x > a.x ? b.x - (a.x + a.width) : a.x - (b.x + b.width);
	var dy = b.y > a.y ? b.y - (a.y + a.height) : a.y - (b.y + b.height);

	if(dx < 0 && dy < 0)return true;
	else                     return false;
}

function OnGround(b){
	const d = 0.5;
	var flag = false;
	groundlist.forEach((a, i, o)=>{
		var dx = b.x > a.x ? b.x - (a.x + a.width) : a.x - (b.x + b.width);
		var dy = b.y + d > a.y ? b.y + d - (a.y + a.height) : a.y - (b.y + d + b.height);

		if(dx < 0 && dy < 0){
			b.y = a.y - d - b.height;
			flag = true;
			return;
		}
	})
	return flag;
}
function RightWall(b){
	const d = player_speed;
	var flag = false;
	groundlist.forEach((a, i, o)=>{
		var dx = b.x + d> a.x ? b.x + d - (a.x + a.width) : a.x - (b.x + d+ b.width);
		var dy = b.y > a.y ? b.y - (a.y + a.height) : a.y - (b.y + b.height);

		if(dx < 0 && dy < 0){
			flag = true;
			return;
		}
	})
	return flag;
}
function LeftWall(b){
	const d = -1 * player_speed;
	var flag = false;
	groundlist.forEach((a, i, o)=>{
		var dx = b.x + d> a.x ? b.x + d - (a.x + a.width) : a.x - (b.x + d+ b.width);
		var dy = b.y > a.y ? b.y - (a.y + a.height) : a.y - (b.y + b.height);

		if(dx < 0 && dy < 0){
			flag = true;
			return;
		}
	})
	return flag;
}
function UpWall(b){
	const d = b.vy;
	var flag = false;
	groundlist.forEach((a, i, o)=>{
		var dx = b.x > a.x ? b.x - (a.x + a.width) : a.x - (b.x + b.width);
		var dy = b.y + d > a.y ? b.y + d - (a.y + a.height) : a.y - (b.y + d + b.height);

		if(dx < 0 && dy < 0){
			b.vy = 0;
			flag = true;
			return;
		}
	})
	return flag;
}