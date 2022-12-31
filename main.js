function documentLoaded() {
    const canvas = document.getElementById('cvs')
    let game_width = canvas.width = innerWidth
    let game_height = canvas.height = innerHeight
    const ctx = canvas.getContext('2d')
   
    let level = {
      x: 20,
      y: 55,
      level: 1,
      draw: function() {
       ctx.fillStyle = 'white' 
       ctx.font = '20px Georga'
       ctx.fillText('Level: ' + this.level, this.x, this.y, 100)
      },
      update: function() {
        this.draw()
      }
    }
    
    const mouse_position = {
      x: game_width / 2 ,
      y: game_height - 100
    }

    
  const particlesArray = []
  let hue = 0
  const mouse = {
       x: undefined, 
       y: undefined
  }
  ctx.fillStyle = '000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  class Particle {
    constructor() {
      this.x = mouse.x
      this.y = mouse.y
      this.speedX = Math.random() * 3 - 1.5
      this.speedY = Math.random() * 3 - 1.5
      this.size = Math.random() * 10
      this.color = `hsl(${hue}, 100%, 50%)`
    }
    update() {
      this.x += this.speedX
      this.y += this.speedY
      if(this.size > 0.2) this.size -= 0.1 
    }
    draw() {
      ctx.beginPath()
      ctx.fillStyle = this.color
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fill()
      ctx.closePath()
    }
  }

  function addParticles() {
    for (let i = 0; i < 2; i++) {
      particlesArray.push(new Particle())
    }
  }
  
 function handleParticles() {
   for(let i = 0; i < particlesArray.length; i++) {
     particlesArray[i].draw()
     particlesArray[i].update()
     
     
     if(particlesArray[i].size <= 0.3) {
       particlesArray.splice(i, 1)
       i--
     }
   }
 }

    const enemy_position = {
      x: Math.floor(Math.random() * (game_width - 170)),
      y: 20
    }
    class Player {
      constructor() {
        this.width = 80
        this.height = 80
        this.x = mouse_position.x
        this.y = mouse_position.y 
      }
      update() {
        this.x = mouse_position.x - (this.width / 2)
        this.y = mouse_position.y - (this.height / 2)
      }
      draw() {
        const image = new Image()
        image.src = './player.png'
        ctx.drawImage(image, this.x, this.y, this.width, this.height)
      }
    }
    const obstacles_left = [], obstacles_right = [], obstacles_center = []
    const enemy_obstacle = [], enemy_obstacle_left = [], enemy_obstacle_right = []
    
    class Obstacle_left {
      constructor() {
        this.width = 3
        this.height = 7
        this.x = mouse_position.x - (this.width / 2) - 30
        this.y = mouse_position.y - (this.height * 4)
        this.color = 'white'
      }
      update() {
        this.y -= 6
        if(this.y < 0) {
          obstacles_left.splice(0, 1)
          
        }
      }
      draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
      }
    }
    
    class Obstacle_right {
      constructor() {
        this.width = 3
        this.height = 7
        this.x = mouse_position.x - (this.width / 2) + 30
        this.y = mouse_position.y - (this.height * 4)
        this.color = 'white'
      }
      update() {
        this.y -= 6
        if(this.y < 0) {
          obstacles_right.splice(0, 1)
          
        }
      }
      draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
      }
    }
    
    class Obstacle_center {
      constructor() {
        this.width = 3
        this.height = 8
        this.x = mouse_position.x - (this.width / 2)
        this.y = mouse_position.y - (this.height * 4)
        this.color = 'white'
      }
      update() {
        this.y -= 6
        if(this.y < 0) {
          obstacles_center.splice(0, 1)
          
        }
      }
      draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
      }
    }
    
    class Enemy {
      constructor() {
        this.width = 170
        this.height = 200
        this.x = enemy_position.x
        this.y = enemy_position.y
        this.moveY = false
        this.moveX = false
      }
      update() {
       if(this.y < (game_height - this.height) && !this.moveY) {
         this.y++
       } else {
         this.moveY = true
         this.y--
         if(this.y < 0) this.moveY = false
       }
       
       if(this.x < (game_width - this.width) && !this.moveX) {
         this.x += 2
         
       } else {
         this.moveX = true
         this.x -= 2
         if(this.x <= 0) this.moveX = false
       }
       enemy_position.x = this.x
       enemy_position.y = this.y
       mouse.x = this.x + this.width / 2
       mouse.y = this.y + 30
       addParticles()
      }
      draw() {
       const enemySprite = new Image()
       enemySprite.src = './enemy1.png'
       ctx.drawImage(enemySprite, this.x, this.y, this.width, this.height)
      }
    }
    let enemyLive = 100, playerLive = 150
    let gameLive = true, isWin = false
    
    function drawGameOver() {
      if(playerLive <= 0) {
        gameLive = false
        isWin = false
      }
      if(!gameLive && !isWin) {
        let gOverBg = new Image()
        gOverBg.src = './gOver.png'
          ctx.drawImage(gOverBg, 0, 0, game_width, game_height)
          ctx.fillStyle = 'white'
          ctx.font = '30px Georgia'
          ctx.fillText('\' Tap to play again \'', game_width/2 - 200 / 2, game_height/2 + 100, 200)
      }
    }
    
    function drawWinner() {
      if(gameLive && enemyLive <= 0) {
        isWin = true
        let winBg = new Image()
        winBg.src = './win.jpeg'
          ctx.drawImage(winBg, 0, 0, game_width, game_height)
          ctx.fillStyle = 'white'
          ctx.font = '30px Georgia'
          ctx.fillText('\' Tap to play again \'', game_width/2 - 200 / 2, game_height - 100, 200)
      }
    }
    

    class EnemyLifeBar {
      constructor() {
        this.x = enemy_position.x + 50
        this.y = enemy_position.y - 10
        this.width = enemyLive
        this.height = 10 
      }
      
      update() {
       this.x = enemy_position.x + 50
       this.y = enemy_position.y - 10
       this.width = enemyLive
      }
      
      draw() {
        ctx.fillStyle = 'red'
        ctx.lineWidth = 2
        ctx.strokeRect(this.x, this.y, 70, this.height)
        ctx.fillRect(this.x, this.y, this.width, this.height)
      }
    }
    let lifeBar = {
      x: 20,
      y: 20,
      width: playerLive,
      height: 20,
      draw: function() {
        ctx.fillStyle = 'green'
        ctx.lineWidth = 2.5
        ctx.font = "20px Georgia"
        ctx.strokeRect(this.x * 4, this.y - (this.height / 2), 150, this.height)
        ctx.fillRect(this.x * 4, this.y - (this.height / 2), this.width, this.height)
        ctx.fillStyle = 'white'
        ctx.fillText("Lives: ", this.x, this.y + 5)
      },
      update: function() {
        this.width = playerLive
      }
    }
    
    let player = new Player()
    let enemy = new Enemy()
    let enemy_life_bar = new EnemyLifeBar()
    
    
    class EnemyObstacle {
      constructor() {
        this.width = 5
        this.height = 10
        this.x = enemy.x + (enemy.width / 2)
        this.y = enemy.y + (enemy.height / 2)
      }
      update() {
        this.y += 5
      }
      draw() {
        const circle = new Image()
        circle.src = './circle.png'
        ctx.drawImage(circle,this.x, this.y, this.width, this.height)
      }
    }
    
   class Power {
     constructor() {
       this.width = 70
       this.height = 13
       this.x = Math.random() * (game_width - this.width)
       this.y = -20
     }
     draw() {
       ctx.fillStyle = 'green'
       ctx.fillRect(this.x, this.y, this.width, this.height)
       ctx.font = '11px Georgia'
       ctx.fillStyle = 'white'
       ctx.fillText('Life', this.x + 25, this.y + 10)
     }
     update() {
       this.draw()
       this.y += Math.random() * 5 + 1
     }
   } 
   
   let power = [] 
    setInterval(() => {
     power.push(new Power()) 
    }, 10000)
    
    setInterval(() => {
     obstacles_left.push(new Obstacle_left())
     obstacles_right.push(new Obstacle_right())
     obstacles_center.push(new Obstacle_center())
    }, 400)
    
    
    
    setInterval(() => {
     enemy_obstacle.push(new EnemyObstacle())
     enemy_obstacle_left.push(new EnemyObstacle())
     enemy_obstacle_right.push(new EnemyObstacle())  
    }, 300)
    
    
    
    
    function handleEnemy() {
     [...power].forEach((pow, i) => {
       if(pow.y > 700) {
         power.splice(pow, 1)
       }
       if(collision_detection(pow, player)) {
         if(playerLive < 150) {
           playerLive += 20
           power.splice(pow, 1)
         }
         if(playerLive > 150) playerLive = 150
       }
       pow.update()
     }) 
     enemy.update()
     enemy.draw()
     enemy_life_bar.update()
     enemy_life_bar.draw()
    }
    
    function handleObstacles() {
      [...obstacles_left].forEach((obj,i) => {
        obj.draw()
        obj.update()
        if(collision_detection(obj, enemy)) {
          if(enemyLive > 0) enemyLive -= 0.09
          obj.color = 'red'
          obstacles_left.splice(obstacles_left.indexOf(i), 1)
        }
      });
      
      [...obstacles_right].forEach((obj,i) => {
        obj.draw()
        obj.update()
        if(collision_detection(obj, enemy)) {
          if(enemyLive > 0) enemyLive -= 0.09
          obj.color = 'red'
          obstacles_right.splice(obstacles_right.indexOf(i), 1)
        }
      });
      
      [...obstacles_center].forEach((obj, i) => {
        obj.draw()
        obj.update()
        if (collision_detection(obj, enemy)) {
          if (enemyLive > 0) enemyLive -= 0.09
          obj.color = 'red'
          obstacles_center.splice(obstacles_center.indexOf(i), 1)
        }
      })

     
     
     for(let i = 0; i < enemy_obstacle.length; i++) {
       enemy_obstacle[i].update()
       enemy_obstacle[i].draw()
       if(collision_detection(enemy_obstacle[i], player)) {
         if(playerLive > 0) {
           playerLive -= 1
         }
         setTimeout(() => {
           enemy_obstacle.splice(enemy_obstacle[i], 1)
         }, 100)
       }
       
       if(enemy_obstacle[i].y > 700) {
         enemy_obstacle.splice(enemy_obstacle[i], 1)
       }
     }
     
     
     
     for(let i = 0; i < enemy_obstacle_left.length; i++) {
       enemy_obstacle_left[i].x -= 5
       enemy_obstacle_left[i].update()
       enemy_obstacle_left[i].draw()
       if(collision_detection(enemy_obstacle_left[i], player)) {
         if(playerLive > 0) {
           playerLive -= 1
         }
         setTimeout(() => {
           enemy_obstacle_left.splice(enemy_obstacle_left[i], 1)
         }, 100)
       }
       if(enemy_obstacle_left[i].y > 700) {
         enemy_obstacle_left.splice(enemy_obstacle_left[i], 1)
       }
     }
     
     
     for(let i = 0; i < enemy_obstacle_right.length; i++) {
       enemy_obstacle_right[i].x += 5
       enemy_obstacle_right[i].update()
       enemy_obstacle_right[i].draw()
       if (collision_detection(enemy_obstacle_right[i], player)) {
         if (playerLive > 0) {
           playerLive -= 1
         }
         setTimeout(() => {
           enemy_obstacle_right.splice(enemy_obstacle_right[i], 1)
         }, 100)
       }
       if(enemy_obstacle_right[i].y > 700) {
         enemy_obstacle_right.splice(enemy_obstacle_right[i], 1)
       }
     }
     if(collision_detection(enemy, player)) {
       if(playerLive > 0) playerLive -= 0.3
     }
    }
    
    function collision_detection(a, b) {
      return !(((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width)));
      }
    
    function animate() {
     ctx.clearRect(0, 0, game_width, game_height)
    
     const bg = new Image()
      bg.src = './bg.jpeg'
      ctx.drawImage(bg, 0, 0, game_width, game_height)
      handleParticles()
      hue += 1
      if(hue > 360) hue = 0
      level.update()
      handleObstacles()
      player.draw()
      player.update()
      lifeBar.draw()
      lifeBar.update()
      handleEnemy()
      drawGameOver()
      drawWinner()
      requestAnimationFrame(animate)
    }
    animate()
    canvas.addEventListener('touchmove', function(ev) {
      mouse_position.x = Math.floor(ev.touches[0].clientX)
      mouse_position.y = Math.floor(ev.touches[0].clientY)
    })
    canvas.addEventListener('mousemove', function(ev) {
      mouse_position.x = Math.floor(ev.touches[0].clientX)
      mouse_position.y = Math.floor(ev.touches[0].clientY)
    })
    canvas.addEventListener('click', function() {
      if(!gameLive || isWin) {
        location.reload()
      } else {
        if(!document.fullscreenElement) {
            document.documentElement.requestFullscreen() 
        }
      }
    })
   onresize = function() {
    game_width = canvas.width = window.innerWidth
    game_height = canvas.height = window.innerHeight
   } 
  }
  
  onload = documentLoaded
