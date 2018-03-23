// Enemies our player must avoid
var Enemy = function(speed, y, x) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
};
// Player
var Player = function(){
    this.x = 2;
    this.y = 3.75;
    this.sprite = 'images/char-pink-girl.png';
    this.block = false;
};

Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;
Player.prototype.handleInput = function(key){
    if(!Player.block){
        
        if(key === "right"){
            if(this.x < 4 ){
                this.x += 1;
            }
        }
        if(key === "left"){
            if(this.x > 0){
                this.x -= 1;
            }
        }
        if(key === "up"){
            if(this.y > 0){
                this.y -= 1;
            }
        }
        if(key === "down"){
            if( this.y < 4.75){
                this.y += 1;
            }
        }
        checkCollisionsGems();
        checkWin();
        checkCollisions();
    }
    
};
Player.prototype.update = function(){
    
};


// Gem
var Gem = function(x, y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/GemBlue.png';
};

Gem.prototype = Object.create(Enemy.prototype);
Gem.prototype.constructor = Gem;
Gem.prototype.update = function(){
    
};
// Heart
var Heart = function(x, y){
    this.x = x;
    this.y = y;
    this.sprite = 'images/Heart.png';
};

Heart.prototype = Object.create(Enemy.prototype);
Heart.prototype.constructor = Heart;

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// var allEnemies = [new Enemy(.1, 1.75, 0)];
var allEnemies = [new Enemy(1, 0.75, -2), new Enemy(2, 1.75, -1), new Enemy(1.5, 2.75, -1)];
var player = new Player();
var gems = [];
var hearts = [];
var level = 1;
var wins = 0;
var loses = 3;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function addBug(index){
        var yOptions = [0.75, 1.75, 2.75];
        let speed = Math.random() + 1;
        return new Enemy(speed, yOptions[index], -1);
}
function checkCollisionsGems(){
        gems.forEach(function(gem) {
            if(gem.y == player.y && gem.x == player.x){
                gems = [];
                wins += 500;
                var win = document.querySelector(".succes");
                win.innerHTML = wins; 
            }
        });
    }
function checkWin(){
        if(player.y < 0){
            player.x = 2;
            player.y = 3.75;
            wins += 500;
            var win = document.querySelector(".succes");
            win.innerHTML = wins;
            level += 1;
            document.querySelector(".level").innerHTML = level;
            checkLevel();
        }
    }
function checkLevel(){
        if(level === 2){
            if(gems.length === 0){
                gems.push(new Gem(3, 0.75));
            }
        }
    }
    
function checkCollisions(){
    allEnemies.forEach(function(enemy) {
        if(enemy.y == player.y){
            var xPosition = player.x;
            if(Math.round(enemy.x * 100) / 100 >= xPosition - 0.7 && Math.round(enemy.x * 100) / 100 <= xPosition + 0.7){
                player.x = 2;
                player.y = 3.75;
                loses -= 1;
                var lose = document.querySelector(".miss");
                lose.innerHTML = loses;
                if(loses === 0){
                   document.querySelector(".gameover").style.opacity = 1;
                   Player.block = true;
                }
            }
        }
    });
}