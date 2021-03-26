const KEY_LEFT = 37
const KEY_A = 65
const KEY_RIGHT = 39
const KEY_D = 68
const KEY_SPACE = 32
const KEY_P = 80
const KEY_S = 83
const KEY_R = 82
const KEY_1 = 49
const KEY_F = 70

const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

const keyboardImage = document.getElementById('keyboard')

const mobileBrowser = isItMobileBrowser(navigator.userAgent || navigator.vendor || window.opera)

let requestID, canvasWidth, canvasHeight, startGame, pause, score, lives, livesLimitCounter, beaten, gameIsOver, rightPressed, leftPressed
let shooter, bonus
let bullets, bulletRadius, bulletCounter, bulletLimitCounter, bulletLimitCounterInverse, finalBulletCounter
let enemyColumnCount, enemyRowCount, enemyPadding, enemyOffsetLeft, enemyOffsetTop, enemies, enemyDirection, enemyIncreasedXSpeed, enemyIncreasedYSpeed, enemyIncreasedXSpeedBy, enemyIncreasedYSpeedBy, enemyCounter, enemyLeftCounter, enemiesProtected
let enemyBulletCounter, enemyBullets, shoot, enemiesShootDelayCounter, enemyBulletImageWidth, enemyBulletImageHeight
let totalBulletsShotText, totalBulletsHitText, totalEnemyBulletsShotText, bulletsLimitReachedText, runOutOfLivesText
let shooterImage, shieldImage, enemyBulletImage, winningImage, losingImage, bonusImage, enemyImageOne1, enemyImageOne2, enemyImageOne3, enemyImageOne4, enemyImageOne5, enemyImageOne6, enemyImageTwo1, enemyImageTwo2, enemyImageTwo3, enemyImageTwo4, enemyImageTwo5, enemyImageTwo6, enemyImageThree1, enemyImageThree2, enemyImageThree3, enemyImageThree4, enemyImageThree5, enemyImageThree6

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

window.onload = function () {
    initCanvas()
    requestID = requestAnimationFrame(drawInstructions)
}

function isItMobileBrowser(a) {
    return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4)))
}

function initCanvas() {
    ctx.canvas.width = window.innerWidth
    ctx.canvas.height = window.innerHeight
    canvasWidth = ctx.canvas.width
    canvasHeight = ctx.canvas.height
}

function initGameThemeImages(theme) {
    shooterImage = document.getElementById('shooter-' + theme)
    shieldImage = document.getElementById('shield-' + theme)
    enemyBulletImage = document.getElementById('enemy-bullet-' + theme)
    winningImage = document.getElementById('winning-' + theme)
    losingImage = document.getElementById('losing-' + theme)
    bonusImage = document.getElementById('bonus-' + theme)

    enemyImageOne1 = document.getElementById('enemy-one-1-' + theme)
    enemyImageOne2 = document.getElementById('enemy-one-2-' + theme)
    enemyImageOne3 = document.getElementById('enemy-one-3-' + theme)
    enemyImageOne4 = document.getElementById('enemy-one-4-' + theme)
    enemyImageOne5 = document.getElementById('enemy-one-5-' + theme)
    enemyImageOne6 = document.getElementById('enemy-one-6-' + theme)

    enemyImageTwo1 = document.getElementById('enemy-two-1-' + theme)
    enemyImageTwo2 = document.getElementById('enemy-two-2-' + theme)
    enemyImageTwo3 = document.getElementById('enemy-two-3-' + theme)
    enemyImageTwo4 = document.getElementById('enemy-two-4-' + theme)
    enemyImageTwo5 = document.getElementById('enemy-two-5-' + theme)
    enemyImageTwo6 = document.getElementById('enemy-two-6-' + theme)

    enemyImageThree1 = document.getElementById('enemy-three-1-' + theme)
    enemyImageThree2 = document.getElementById('enemy-three-2-' + theme)
    enemyImageThree3 = document.getElementById('enemy-three-3-' + theme)
    enemyImageThree4 = document.getElementById('enemy-three-4-' + theme)
    enemyImageThree5 = document.getElementById('enemy-three-5-' + theme)
    enemyImageThree6 = document.getElementById('enemy-three-6-' + theme)
}

function initGameText(theme) {
    if (theme === 'covid') {
        totalBulletsShotText = 'Total number of vaccines used: '
        totalBulletsHitText = 'Number of vaccines administered: '
        totalEnemyBulletsShotText = 'Rate of transmission was: '
        bulletsLimitReachedText = 'You reached your vaccine limit!'
        runOutOfLivesText = "You've had too many close contacts, mandatory quarantine!"
    }
}

function drawInstructions() {
    ctx.font = 'bold 15px Arial'
    ctx.fillStyle = '#FFFFFF'
    ctx.textAlign = 'center'
    if (canvasWidth > keyboardImage.width && canvasHeight > keyboardImage.height * 2) {
        drawPreInstructions(20)
        ctx.drawImage(keyboardImage, canvasWidth / 2 - keyboardImage.width / 2, canvasHeight / 2 - keyboardImage.height / 2)
        drawPostInstructions(40)
    } else {
        drawPreInstructions(200)
        drawPostInstructions(-100)
    }
    ctx.textAlign = 'start'
}

function drawPreInstructions(y) {
    ctx.fillText('Little Space Invaders style game just for fun, developed by me ;-)', canvasWidth / 2, canvasHeight / 2 - keyboardImage.height + y)
    ctx.fillText('Instructions', canvasWidth / 2, canvasHeight / 2 - keyboardImage.height + 40 + y)
    ctx.fillText('D or right arrow to move right', canvasWidth / 2, canvasHeight / 2 - keyboardImage.height + 60 + y)
    ctx.fillText('A or left arrow to move left', canvasWidth / 2, canvasHeight / 2 - keyboardImage.height + 80 + y)
    ctx.fillText('Space bar to shoot', canvasWidth / 2, canvasHeight / 2 - keyboardImage.height + 100 + y)
    ctx.fillText('S to activate the shield', canvasWidth / 2, canvasHeight / 2 - keyboardImage.height + 120 + y)
    ctx.fillText('F to activate moving fast', canvasWidth / 2, canvasHeight / 2 - keyboardImage.height + 140 + y)
    ctx.fillText('P to pause and R to retry', canvasWidth / 2, canvasHeight / 2 - keyboardImage.height + 160 + y)
}

function drawPostInstructions(y) {
    if (mobileBrowser) {
        ctx.fillStyle = '#FF0000'
        ctx.fillText("Sorry this game doen't support mobile phones!", canvasWidth / 2, canvasHeight / 2 + keyboardImage.height - 140 + y)
        ctx.fillStyle = '#FFFFFF'
        ctx.fillText('Try it on your laptop', canvasWidth / 2, canvasHeight / 2 + keyboardImage.height - 100 + y)
    } else {
        ctx.fillText('To start the game pick your theme', canvasWidth / 2, canvasHeight / 2 + keyboardImage.height - 140 + y)
        ctx.fillText('↪ Press 1 for Operation Vaccination Theme', canvasWidth / 2, canvasHeight / 2 + keyboardImage.height - 100 + y)
    }
}

function initGame() {
    // Game
    startGame = true
    pause = false
    score = 0
    lives = 4
    livesLimitCounter = lives
    beaten = false
    gameIsOver = false
    rightPressed = false
    leftPressed = false

    // Shooter
    const shooterHeight = canvasHeight / 10
    const shooterWidth = canvasWidth / 25
    const shooterX = (canvasWidth - shooterWidth) / 2
    const shooterY = canvasHeight - shooterHeight
    const shooterSpeed = 7
    const shooterExtraSpeed = shooterSpeed * 2
    const bulletSpeed = canvasHeight / 250
    const protectionFramesNumber = 600
    const moveFastFramesNumber = 700
    shooter = new Shooter(shooterX, shooterY, shooterImage, shooterWidth, shooterHeight, shooterSpeed, shooterExtraSpeed, bulletSpeed, protectionFramesNumber, moveFastFramesNumber)

    // Bonus
    const bonusYSpeed = canvasHeight / 500
    const bonusExtraBulletCount = 14
    const bonusWidth = canvasWidth / 25
    const bonusHeight = canvasHeight / 20
    const bonusDelay = 100
    bonus = new Bonus(bonusYSpeed, bonusExtraBulletCount, bonusDelay, bonusWidth, bonusHeight, shooterWidth)

    // Bullet
    bullets = {}
    bulletRadius = 2
    bulletCounter = 0
    bulletLimitCounter = 36
    bulletLimitCounterInverse = bulletLimitCounter
    finalBulletCounter = 0

    // Enemy
    enemyColumnCount = 6
    enemyRowCount = 3
    enemyPadding = 50
    enemyOffsetLeft = 30
    enemyOffsetTop = 30
    enemyDirection = 1
    enemyIncreasedXSpeed = 1
    enemyIncreasedYSpeed = 1
    enemyIncreasedXSpeedBy = 0.3
    enemyIncreasedYSpeedBy = 0.1
    enemyCounter = enemyColumnCount * enemyRowCount
    enemyLeftCounter = enemyCounter
    enemiesProtected = false
    enemies = createEnemies()

    // Enemy Bullets
    enemyBulletCounter = 0
    enemyBullets = {}
    shoot = true
    enemiesShootDelayCounter = 0
    enemyBulletImageWidth = canvasWidth / 60
    enemyBulletImageHeight = canvasHeight / 50
}

function createEnemies() {
    const enemyCharecterOne1 = { image: enemyImageOne1, score: 1, special: false }
    const enemyCharecterOne2 = { image: enemyImageOne2, score: 1, special: false }
    const enemyCharecterOne3 = { image: enemyImageOne6, score: 10, special: true }
    const enemyCharecterOne4 = { image: enemyImageOne3, score: 1, special: false }
    const enemyCharecterOne5 = { image: enemyImageOne4, score: 1, special: false }
    const enemyCharecterOne6 = { image: enemyImageOne5, score: 1, special: false }
    const enemyCharectersCategoryOne = [enemyCharecterOne1, enemyCharecterOne2, enemyCharecterOne3, enemyCharecterOne4, enemyCharecterOne5, enemyCharecterOne6]
    const enemyCharecterTwo1 = { image: enemyImageTwo1, score: 2, special: false }
    const enemyCharecterTwo2 = { image: enemyImageTwo2, score: 2, special: false }
    const enemyCharecterTwo3 = { image: enemyImageTwo3, score: 2, special: false }
    const enemyCharecterTwo4 = { image: enemyImageTwo4, score: 2, special: false }
    const enemyCharecterTwo5 = { image: enemyImageTwo5, score: 2, special: false }
    const enemyCharecterTwo6 = { image: enemyImageTwo6, score: 2, special: false }
    const enemyCharectersCategoryTwo = [enemyCharecterTwo1, enemyCharecterTwo2, enemyCharecterTwo3, enemyCharecterTwo4, enemyCharecterTwo5, enemyCharecterTwo6]
    const enemyCharecterThree1 = { image: enemyImageThree1, score: 3, special: false }
    const enemyCharecterThree2 = { image: enemyImageThree2, score: 3, special: false }
    const enemyCharecterThree3 = { image: enemyImageThree3, score: 3, special: false }
    const enemyCharecterThree4 = { image: enemyImageThree4, score: 3, special: false }
    const enemyCharecterThree5 = { image: enemyImageThree5, score: 3, special: false }
    const enemyCharecterThree6 = { image: enemyImageThree6, score: 3, special: false }
    const enemyCharectersCategoryThree = [enemyCharecterThree1, enemyCharecterThree2, enemyCharecterThree3, enemyCharecterThree4, enemyCharecterThree5, enemyCharecterThree6]
    const enemyCategories = [enemyCharectersCategoryOne, enemyCharectersCategoryTwo, enemyCharectersCategoryThree]
    // const mereged = [].concat.apply([], enemyCategories)

    const enemies = {}
    const enemyWidth = canvasWidth / 33
    const enemyHeight = canvasHeight / 10
    const enemyXSpeed = canvasWidth / 1000
    const enemyYSpeed = canvasHeight / 10000
    const enemyBulletSpeed = canvasHeight / 300
    let i = 0
    for (let c = 0; c < enemyColumnCount; c++) {
        for (let r = 0; r < enemyRowCount; r++) {
            // const e = mereged[Math.floor(Math.random() * mereged.length)]
            const eCharacters = enemyCategories[r]
            // const e = eCharacters[Math.floor(Math.random() * eCharacters.length)]
            const e = eCharacters[c]
            const initMiddlePosition = canvasWidth / 2 - (enemyColumnCount * enemyWidth) / 2 - enemyWidth / 2 + enemyOffsetLeft
            const x = (c * (enemyWidth + enemyPadding)) + enemyOffsetLeft + initMiddlePosition
            const y = (r * (enemyHeight + enemyPadding)) + enemyOffsetTop
            enemies[i++] = new Enemy(x, y, e.image, enemyWidth, enemyHeight, e.score, enemyXSpeed, enemyYSpeed, enemyBulletSpeed, e.special)
        }
    }

    return enemies
}

function startTheGame() {
    if (requestID) cancelAnimationFrame(requestID)
    initCanvas()
    initGame()
    runMainLoop()
}

// Key Handlers
function keyDownHandler(e) {
    if (!mobileBrowser) {
        if (e.keyCode === KEY_RIGHT || e.keyCode === KEY_D) {
            rightPressed = true
        } else if (e.keyCode === KEY_LEFT || e.keyCode === KEY_A) {
            leftPressed = true
        } else if (e.keyCode === KEY_P) {
            pause = !pause
            if (!pause) runMainLoop()
        } else if (e.keyCode === KEY_1) {
            const theme = 'covid'
            initGameThemeImages(theme)
            initGameText(theme)
            startTheGame()
        } else if (e.keyCode === KEY_R) {
            if (startGame) {
                startTheGame()
            }
        } else if (e.keyCode === KEY_S) {
            if (shooter.protectionCounter !== 0 && !pause) {
                shooter.protected = true
            }
        } else if (e.keyCode === KEY_F) {
            if (shooter.moveFastCounter !== 0 && !pause) {
                shooter.moveFast = true
            }
        }
    }
}

function keyUpHandler(e) {
    if (e.keyCode === KEY_RIGHT || e.keyCode === KEY_D) {
        rightPressed = false
    } else if (e.keyCode === KEY_LEFT || e.keyCode === KEY_A) {
        leftPressed = false
    } else if (e.keyCode === KEY_SPACE) {
        if (bulletLimitCounter !== bulletCounter || gameIsOver) {
            bullets[bulletCounter++] = shooter.shoot()
            if (!gameIsOver) bulletLimitCounterInverse--
        }
    }
}

// function mouseMoveHandler (e) {
//   const relativeX = e.clientX - canvas.offsetLeft
//   if (relativeX > 0 && relativeX < canvasWidth) {
//     shooter.x = relativeX - shooter.width / 2
//   }
// }

function handleGameFinished() {
    if (!gameIsOver) {
        finalBulletCounter = bulletCounter
    }
    ctx.font = 'bold 25px Arial'
    ctx.fillStyle = '#FFFFFF'
    ctx.textAlign = 'center'
    if (!enemyLeftCounter) {
        if ((score * enemyCounter) / finalBulletCounter === score) {
            ctx.fillStyle = '#FF0000'
            ctx.fillText('Perfect Score!!! 🎉', canvasWidth / 2, canvasHeight / 2 - winningImage.height / 2 - 100)
            ctx.fillStyle = '#FFFFFF'
        }
        ctx.fillText('Well Done', canvasWidth / 2, canvasHeight / 2 - winningImage.height / 2 - 60)
        ctx.fillText('Press R to Play again', canvasWidth / 2, canvasHeight / 2 - winningImage.height / 2 - 20)
        ctx.drawImage(winningImage, canvasWidth / 2 - winningImage.width / 2, canvasHeight / 2 - winningImage.height / 2)
        ctx.fillText(totalBulletsShotText + finalBulletCounter, canvasWidth / 2, canvasHeight / 2 + winningImage.height - 120)
        ctx.fillText(totalBulletsHitText + enemyCounter, canvasWidth / 2, canvasHeight / 2 + winningImage.height - 80)
        ctx.fillText('Your score is: ' + Math.ceil((score * enemyCounter) / finalBulletCounter) + ' out of ' + score, canvasWidth / 2, canvasHeight / 2 + winningImage.height - 40)
        ctx.fillText(totalEnemyBulletsShotText + enemyBulletCounter, canvasWidth / 2, canvasHeight / 2 + winningImage.height)

        gameIsOver = true
    } else if (!lives || beaten || (bulletLimitCounterInverse === 0 && Object.keys(bullets).length === 0) || gameIsOver) {
        ctx.fillText('Game Over', canvasWidth / 2, canvasHeight / 2 - losingImage.height / 2 - 60)
        ctx.fillText('Press R to Retry', canvasWidth / 2, canvasHeight / 2 - losingImage.height / 2 - 20)
        ctx.drawImage(losingImage, canvasWidth / 2 - losingImage.width / 2, canvasHeight / 2 - losingImage.height / 2)
        if (bulletLimitCounterInverse === 0) {
            ctx.fillText(bulletsLimitReachedText, canvasWidth / 2, canvasHeight / 2 + losingImage.height - 180)
        } else if (!lives) {
            ctx.fillText(runOutOfLivesText, canvasWidth / 2, canvasHeight / 2 + losingImage.height - 180)
        } else if (beaten) {
            ctx.fillText('Times up!', canvasWidth / 2, canvasHeight / 2 + losingImage.height - 180)
        }

        enemiesProtected = true
        gameIsOver = true
    }
    ctx.textAlign = 'start'
}

// Shooter
function handleShooter() {
    if (rightPressed && shooter.x < canvasWidth - shooter.width) {
        if (shooter.isMoveFast()) {
            shooter.x += shooter.xExtraSpeed
        } else {
            shooter.x += shooter.xSpeed
        }
    } else if (leftPressed && shooter.x > 0) {
        if (shooter.isMoveFast()) {
            shooter.x -= shooter.xExtraSpeed
        } else {
            shooter.x -= shooter.xSpeed
        }
    }
    ctx.drawImage(shooterImage, shooter.x, shooter.y, shooter.width, shooter.height)

    // bullets
    ctx.font = '30px Arial'
    ctx.fillStyle = '#FFFF00'
    ctx.fillText('۵', shooter.x + shooter.width + 10, shooter.y + (shooter.height / 2))
    ctx.font = 'bold 19px Arial'
    ctx.fillStyle = '#008000'
    if (bulletLimitCounterInverse < bulletLimitCounter / 2) {
        ctx.fillStyle = '#FFA500'
    }
    if (bulletLimitCounterInverse < bulletLimitCounter / 5) {
        ctx.fillStyle = '#FF0000'
    }
    ctx.fillText(bulletLimitCounterInverse, shooter.x + shooter.width + 30, shooter.y + (shooter.height / 2))

    // live
    ctx.font = '30px Arial'
    ctx.fillStyle = '#FF0000'
    ctx.fillText('♥', shooter.x + shooter.width + 10, shooter.y + (shooter.height / 2) + 30)
    ctx.font = 'bold 19px Arial'
    ctx.fillStyle = '#008000'
    if (lives < livesLimitCounter / 2) {
        ctx.fillStyle = '#FFA500'
    }
    if (lives < livesLimitCounter / 5) {
        ctx.fillStyle = '#FF0000'
    }
    ctx.fillText(lives, shooter.x + shooter.width + 30, shooter.y + (shooter.height / 2) + 30)

    // shield
    if (shooter.protected) {
        ctx.drawImage(shieldImage, shooter.x, shooter.y, shooter.width, shooter.height)
        ctx.fillStyle = '#008000'
        if (shooter.protectionCounter < shooter.protectionFramesNumber / 2) {
            ctx.fillStyle = '#FFA500'
        }
        if (shooter.protectionCounter < shooter.protectionFramesNumber / 4) {
            ctx.fillStyle = '#FF0000'
        }
        ctx.font = 'bold 19px Arial'
        ctx.fillText(Math.floor(shooter.protectionCounter * 100 / shooter.protectionFramesNumber) + '%', shooter.x - 45, shooter.y + shooter.height / 2)
        shooter.protectionCounter--
        if (shooter.protectionCounter === 0) {
            shooter.protected = false
        }
    } else {
        if (shooter.protectionCounter !== 0) {
            ctx.font = '25px Arial'
            ctx.fillText('🛡', shooter.x - 40, shooter.y + shooter.height / 2)
            ctx.font = 'bold 19px Arial'
            ctx.fillStyle = '#000000'
            ctx.fillText('S', shooter.x - 30, shooter.y + shooter.height / 2 - 2)
        }
    }

    // move faster
    if (shooter.moveFast) {
        ctx.fillStyle = '#008000'
        if (shooter.moveFastCounter < shooter.moveFastFramesNumber / 2) {
            ctx.fillStyle = '#FFA500'
        }
        if (shooter.moveFastCounter < shooter.moveFastFramesNumber / 4) {
            ctx.fillStyle = '#FF0000'
        }
        // ctx.font = 'bold 5px Arial'
        // ctx.textAlign = "center"
        // ctx.fillText("'".repeat(shooter.moveFastCounter), shooter.x, shooter.y + shooter.height)
        // ctx.textAlign = "start"
        ctx.font = 'bold 19px Arial'
        ctx.fillText(Math.floor(shooter.moveFastCounter * 100 / shooter.moveFastFramesNumber) + '%', shooter.x - 45, shooter.y + shooter.height / 2 + 40)
        shooter.moveFastCounter--
        if (shooter.moveFastCounter === 0) {
            shooter.moveFast = false
        }
    } else {
        if (shooter.moveFastCounter !== 0) {
            ctx.font = '25px Arial'
            ctx.fillText('💨', shooter.x - 40, shooter.y + shooter.height / 2 + 40)
            ctx.font = 'bold 19px Arial'
            ctx.fillStyle = '#000000'
            ctx.fillText('F', shooter.x - 30, shooter.y + shooter.height / 2 + 38)
        }
    }
}

// Collisions
function handleCollisions() {
    if (!enemiesProtected) {
        for (const [, bullet] of Object.entries(bullets)) {
            for (const [, enemy] of Object.entries(enemies)) {
                if (enemy.status) {
                    if (bullet.x > enemy.x && bullet.x < enemy.x + enemy.width && bullet.y > enemy.y && bullet.y < enemy.y + enemy.height) {
                        bullet.status = false
                        enemy.status = false
                        enemyLeftCounter--
                        score += enemy.score
                        ctx.font = 'bolder 30px Arial'
                        ctx.fillStyle = '#0BF6EF'
                        ctx.fillText('+' + enemy.score, enemy.x + (enemy.width / 2), enemy.y + (enemy.height / 2))
                    }
                }
            }
        }
    }

    if (!gameIsOver) {
        for (const [, bullet] of Object.entries(enemyBullets)) {
            if (bullet.x > shooter.x && bullet.x < shooter.x + shooter.width && bullet.y > shooter.y && bullet.y < shooter.y + shooter.height) {
                bullet.status = false
                if (!shooter.isProtected()) {
                    ctx.drawImage(enemyBulletImage, shooter.x, shooter.y, shooter.width, shooter.height)
                    lives--
                }
            }
        }

        if (bonus.isLive() && bonus.isActivated()) {
            if (bonus.x + bonusImage.width >= shooter.x &&
                bonus.x <= shooter.x + shooter.width &&
                (bonus.y - bonusImage.height >= shooter.y || bonus.y >= shooter.y) &&
                (bonus.y - bonusImage.height <= shooter.y + shooter.height || bonus.y <= shooter.y + shooter.height)) {
                bonus.status = false
                bulletLimitCounterInverse += bonus.count
                bulletLimitCounter += bonus.count
                ctx.font = 'bolder 30px Arial'
                ctx.fillStyle = '#0BF6EF'
                ctx.fillText('+' + bonus.count + ' ۵', shooter.x, shooter.y - 10)
            }
        }
    }
}

// Enemies
function handleEnemies() {
    for (const [, enemy] of Object.entries(enemies)) {
        if (!enemy.isSpecial() || Object.keys(enemies).length === 1) {
            if (enemy.x < 0) {
                enemyDirection = 1
                enemyIncreasedXSpeed += enemyIncreasedXSpeedBy
                enemyIncreasedYSpeed += enemyIncreasedYSpeedBy
                break
            } else if (enemy.x > canvasWidth - enemy.width) {
                enemyDirection = -1
                enemyIncreasedXSpeed += enemyIncreasedXSpeedBy
                enemyIncreasedYSpeed += enemyIncreasedYSpeedBy
                break
            }
        }
    }

    for (const [enemyKey, enemy] of Object.entries(enemies)) {
        if (enemy.isActive()) {
            if (enemy.isSpecial()) {
                enemy.x += enemyDirection * enemy.xSpeed * enemyIncreasedXSpeed * 2
                enemy.y += enemy.ySpeed * enemyIncreasedYSpeed * 2
            } else {
                enemy.x += enemyDirection * enemy.xSpeed * enemyIncreasedXSpeed
                enemy.y += enemy.ySpeed * enemyIncreasedYSpeed
            }
            ctx.drawImage(enemy.image, enemy.x, enemy.y, enemy.width, enemy.height)
            if (enemy.y > canvasHeight && !gameIsOver) {
                beaten = true
            }
        } else {
            delete enemies[enemyKey]
        }
    }
}

// Bullets
function handleBulets() {
    for (const [bulletKey, bullet] of Object.entries(bullets)) {
        if (bullet.isActive()) {
            bullet.y -= bullet.speed
            drawBullet(bullet.x, bullet.y)
        } else {
            delete bullets[bulletKey]
        }
    }

    if (Object.keys(enemies).length !== 0) {
        enemiesShootDelayCounter++
        if (enemiesShootDelayCounter === 100) {
            shoot = true
            enemiesShootDelayCounter = 0
        }

        while (shoot) {
            const randomEnemy = enemies[Math.floor(Math.random() * enemyCounter)]
            if (randomEnemy) {
                enemyBullets[enemyBulletCounter++] = randomEnemy.shoot(1)
                if (randomEnemy.isSpecial()) {
                    enemyBullets[enemyBulletCounter++] = randomEnemy.shoot(-70)
                    enemyBullets[enemyBulletCounter++] = randomEnemy.shoot(70)
                }
                shoot = false
            }
        }
    }

    for (const [bulletKey, bullet] of Object.entries(enemyBullets)) {
        if (bullet.isActive()) {
            bullet.y += bullet.speed
            ctx.drawImage(enemyBulletImage, bullet.x, bullet.y, enemyBulletImageWidth, enemyBulletImageHeight)
        } else {
            delete enemyBullets[bulletKey]
        }
    }
}

function drawBullet(bulletX, bulletY) {
    ctx.beginPath()
    ctx.arc(bulletX, bulletY, bulletRadius, 0, Math.PI * 2)
    ctx.fillStyle = '#FFFF00'
    ctx.fill()
    ctx.closePath()
}

function handleBonus() {
    if (bonus.isLive()) {
        if (bonus.delayCounter === bonus.delay) {
            bonus.activated = true
        } else {
            bonus.delayCounter++
        }
        if (bonus.isActivated()) {
            bonus.y += bonus.ySpeed
            ctx.drawImage(bonusImage, bonus.x, bonus.y, bonus.width, bonus.height)
        }
    }
}

function drawPause() {
    if (pause) {
        ctx.font = '25px Arial'
        ctx.fillStyle = '#0095DD'
        ctx.fillText('Game is Paused', 8, 60)
    }
}

function runMainLoop() {
    if (canvasWidth !== innerWidth || canvasHeight !== innerHeight) {
        // resize canvas, also clears the canvas
        setTimeout(function () {
            startTheGame()
        }, 50)
    } else {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    }

    handleGameFinished()
    handleShooter()
    handleCollisions()
    handleEnemies()
    handleBulets()
    handleBonus()
    drawPause()

    if (!pause) requestID = requestAnimationFrame(runMainLoop)
}

class Shooter {
    constructor(x, y, image, width, height, xSpeed, xExtraSpeed, bulletSpeed, protectionFramesNumber, moveFastFramesNumber) {
        this.x = x
        this.y = y
        this.image = image
        this.width = width
        this.height = height
        this.xSpeed = xSpeed
        this.xExtraSpeed = xExtraSpeed
        this.bulletSpeed = bulletSpeed
        this.protectionFramesNumber = protectionFramesNumber
        this.protectionCounter = protectionFramesNumber
        this.protected = false
        this.moveFastFramesNumber = moveFastFramesNumber
        this.moveFastCounter = moveFastFramesNumber
        this.moveFast = false
    }

    shoot() {
        return new Bullet(this.x + (this.width / 2), this.y, this.bulletSpeed)
    }

    isProtected() {
        return this.protected
    }

    isMoveFast() {
        return this.moveFast
    }
}

class Bullet {
    constructor(x, y, speed) {
        this.x = x
        this.y = y
        this.speed = speed
        this.status = true
    }

    isActive() {
        return this.status && (this.y > 0 && canvasHeight > this.y)
    }
}

class Enemy {
    constructor(x, y, image, width, height, score, xSpeed, ySpeed, bulletSpeed, special) {
        this.x = x
        this.y = y
        this.image = image
        this.width = width
        this.height = height
        this.score = score
        this.xSpeed = xSpeed
        this.ySpeed = ySpeed
        this.bulletSpeed = bulletSpeed
        this.special = special
        this.status = true
    }

    isActive() {
        return this.status && canvasHeight > this.y
    }

    isSpecial() {
        return this.special
    }

    shoot(extraX) {
        if (extraX !== 1) {
            return new Bullet(this.x + extraX + (this.width / 2), this.y, this.bulletSpeed)
        }
        return new Bullet(this.x + (this.width / 2), this.y, this.bulletSpeed)
    }
}

class Bonus {
    constructor(ySpeed, count, delay, width, height, shooterWidth) {
        this.ySpeed = ySpeed
        this.count = count
        this.delay = delay
        this.width = width
        this.height = height
        this.shooterWidth = shooterWidth
        this.status = true
        this.activated = false
        this.x = this._generateRandomX()
        this.y = 0
        this.delayCounter = 0
    }

    isLive() {
        return this.status && canvasHeight > this.y
    }

    isActivated() {
        return this.activated
    }

    _generateRandomX() {
        return Math.floor(Math.random() * (canvasWidth - this.shooterWidth)) + this.shooterWidth
    }
}