<!DOCTYPE html>
<!--
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 ------>

 <html>
     <head>
         <meta charset ="UTF-8">
         <link rel="stylesheet" href="snakeCSS.css">
         <title>Game of Snake</title>
     </head>
     <body>
         <h1 id="pageTitle">Game of Snake</h1>
         <hr>
         <form action="scoreProcess.php" method="post">
            <input type="hidden" id="dbScore" name="dbScore"/>
            <input type="hidden" id="dbUsername" name="dbUsername"/>
            <input type="submit">
         </form>  
         
         <script src="snake.js"></script>
         <h1 id="score">Score: </h1>
         <h1 id="username">Username: </h1>
         
     </body>
 </html>