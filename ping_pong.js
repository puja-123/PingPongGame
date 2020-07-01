var ball = document.getElementById('ball');
var player1 = document.getElementById('player1');
var player2 = document.getElementById('player2');
var header = document.getElementsByTagName("HEADER");
let ballSpeedX = 3;
let ballSpeedY = 3;
let score = 0 ;
let maxScore = 0;
function winnerData(Name , Score)
{
    console.log(score);
    if(Score > maxScore)
    {
        maxScore = Score;
        localStorage.setItem("playerName" ,  Name);
        localStorage.setItem("maxScore" ,  maxScore);
    }
    clearInterval(motion); 
    restartGame(Name);
    alert(`${Name} won the match with score ${Score*10} , highest score till now is ${maxScore*10}`);

}
function moveBars(event) 
{
    let playerRect = player1.getBoundingClientRect();
    if(event.key == 'a' &&  playerRect.x > 0)
    {
        player1.style.left = playerRect.x - 35 + "px" ;
        player2.style.left = playerRect.x - 35 + "px" ;
    }
    else if(event.key == 'd' && ( playerRect.x + playerRect.width ) < window.innerWidth )
    {
        player1.style.left = playerRect.x + 35 + "px" ;
        player2.style.left = playerRect.x + 35 + "px" ;
    }
}
function restartGame(player) {

    player1.style.left = (window.innerWidth - player1.offsetWidth) / 2 + 'px';
    player2.style.left = (window.innerWidth - player2.offsetWidth) / 2 + 'px';
    ball.style.left = (window.innerWidth - ball.offsetWidth) / 2 + 'px';


    // Lossing player gets the ball
    if (player === 'player2') {
        ball.style.top = (player1.offsetTop + player1.offsetHeight) + 'px';
        ballSpeedY = 2;
    } else if (player === 'player1') {
        ball.style.top = (player2.offsetTop - player2.offsetHeight) + 'px';
        ballSpeedY = -2;
    }
    score = 0;
    console.log(score);
}
(function() {
    let player = localStorage.getItem("playerName");
    maxScore = localStorage.getItem("maxScore");
    console.log(maxScore);
    console.log(player);
    if(player == null || maxScore == null)
    {
        player = "player1";
        maxScore = 0;
        alert(`It's your first time ... Press enter to start the game`);
        
    }
    else
    {
        alert(`${player} has maxScore which is ${maxScore}`);
    }
    restartGame(player);
})();
function startGame()
{   
    if(event.key === 'Enter')
    {
        console.log(header);
        console.log(player1);
        console.log(player2);
        console.log(header);
        let ballRect = ball.getBoundingClientRect();
        let ballX = ballRect.x;
        let ballY = ballRect.y;
        let ballDiameter = ballRect.width;

        let player1Height = player1.offsetHeight;
        let player2Height = player2.offsetHeight;
        let player1Width = player1.offsetWidth;
        let player2Width = player2.offsetWidth;
        

        motion = setInterval(function () {
                // Move ball 
                ballX += ballSpeedX;
                ballY += ballSpeedY;

                player1X = player1.getBoundingClientRect().x;
                player2X = player2.getBoundingClientRect().x;

                ball.style.left = ballX + 'px';
                ball.style.top = ballY + 'px';
                

                if ((ballX + ballDiameter) > window.innerWidth || ballX < 0) {
                    ballSpeedX = -ballSpeedX;
                }

                let ballPos = ballX + ballDiameter / 2;
                console.log(header[0].offsetHeight+"  header.offsetHeight");
                // Check for player 1
                if (ballY <= player1Height + header[0].offsetHeight ) {
                    ballSpeedY = -ballSpeedY;
                    score++;

                    // Check if the game ends
                    if ((ballPos < player1X) || (ballPos > (player1X + player1Width))) {
                        winnerData("player2", score);
                    }
                }

                // Check for player 2
                else if ((ballY + ballDiameter) >= (window.innerHeight - player2Height )) {
                    ballSpeedY = -ballSpeedY; 
                    score++;

                    // Check if the game ends
                    if ((ballPos < player2X) || (ballPos > (player2X + player2Width))) {
                        winnerData("player1", score);
                    }
                }

            }, 10);


    }
}

window.addEventListener('keydown' , moveBars)
window.addEventListener('keypress' , startGame);











