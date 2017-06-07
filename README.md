# battleshipAI
Battleship AI using applied Bayesian Search Theory.


Intuition
1. Start with a 10x10 grid
2. All squares will be initialized with the % chance of a hit. In the beginning, all squares will have an even chance of concealing a battleship*. 
3. As the player makes moves, the program will update relevant squares' % chances based on whether or not it was a hit or miss (new information
4. Each turn, the program will make the most optimal move (hit the square with the highest % chance)
