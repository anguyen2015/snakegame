<!DOCTYPE html>

<!--
 This page processes the scoring results from the snake game.
 In this page it displays the username that the user was prompted to enter previously
 and the score that was earned by the user. 

If the user scored a score that was one of the 10 highest scores played of all time.
Their score will be displayed ordered by scoring.
 ------>
<html>
    <head>
         <meta charset ="UTF-8">
         <link rel="stylesheet" href="scoreProcess.css">
         <title>Score Confirmation</title>
    </head>
    <body>       
Welcome <?php echo $_POST['dbUsername']; ?><br>
Your game score is: <?php echo $_POST['dbScore']; ?>
<hr>
<h1>High Scores</h1>
<img src="images/Trophy.png" align="middle" alt="Trophy">
<hr>
<?php 
       $username = $_POST['dbUsername'];
       $score = $_POST['dbScore'];
       $entryQuery = "INSERT INTO gamescore(name,score) VALUES('$username','$score')"; 
       
       $link = mysqli_connect('brain.it.fit.edu','anguyen2015','S@geofsnow711','udb_anguyen2015');
        
        if(!$link)
        {
          echo "Failed to connect to MySQL" . mysqli_connect_error();
        }
        
        $entryResult =  mysqli_query($link,$entryQuery);
       
        if(!$entryResult){
            die("Could not execute query") . mysqli_error();
        }  
        mysqli_close($link);
        ?>

    <?php 
        $scoreQuery = "SELECT name,score FROM gamescore ORDER BY score DESC LIMIT 10";
        
        $link = mysqli_connect('brain.it.fit.edu','anguyen2015','S@geofsnow711','udb_anguyen2015');
        
        if(!$link)
        {
          echo "Failed to connect to MySQL" . mysqli_connect_error();
        }
        // echo 'Connected successfully';
        
        //------------------------------------------------------------------//
       $result = mysqli_query($link,$scoreQuery);
        
        if(!$result){
            die("Could not execute query") . mysqli_error();
        }
        
       $field_num = mysqli_num_fields($results);

        
        echo "<table><tr>";
        
        for($i = 0; $i <$fields_num; $i++){
            $field = mysqli_fetch_field($result);
            echo "<td>{$field->name}</td>";
        }
        
        echo "</tr>\n";
        while($row = mysqli_fetch_row($result)){
            echo "<tr>";
            
            foreach($row as $cell){
                echo "<td>$cell</td>";
            }
            
            echo "</tr>\n";
        }
        echo "</table>";
        echo "<hr>";
        
        mysqli_close($link);
         ?>

<div class="return"><a href="index.php">Click Here to Return</a></div>
    </body>
</html> 