function randomNumbers(length){
    let numbers = [];
    let total = 0;

    for(let i = 0; ; i++){
        let counter = 0;
        let random = Math.floor(Math.random() * (length / 2));
        
        for(let j = 0; j < i; j++){
            if(numbers[j] == random){
                counter++;
            }
        }
        if(counter < 2){
            numbers[total++] = random;
        }
        if(total == length){
            break;
        }
    }
    return numbers;
}
function level1(){
    let text = '<div id="container-1" class="text-center" style="margin-top:100px;"><i><small>Level 1</small></i><p id="status">blank</p>';
    let length = 8;
    let numbers = randomNumbers(length);
    console.log(numbers);

    localStorage.clear();
    localStorage.setItem("count", "0");
    localStorage.setItem("matches", "0");
    
    for(let i = 0; i < length; i++){
        text += '<button onclick="showPicture(' + i + ', ' + numbers[i] + ', ' + length + ')"><img id="' + i + '" style="width:100px;" src="images/question-mark.jpg"></button>';
        
        if(i + 1 == length / 2){
            text += "<br>";
        }        
    }
    text += "</div>";
    document.getElementById("container").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("game").innerHTML = text;
    document.getElementById("status").style.opacity = "0";
}
function level2(){
    let text = '<div id="container-2" class="text-center" style="margin-top:75px;"><i><small>Level 2</small></i><p id="status">blank</p>';
    let length = 16;
    let numbers = randomNumbers(length);
    console.log(numbers);

    localStorage.clear();
    localStorage.setItem("count", "0");
    localStorage.setItem("matches", "0");
    
    for(let i = 0; i < length; i++){
        text += '<button class="button-block" onclick="showPicture(' + i + ', ' + numbers[i] + ', ' + length + ')"><img id="' + i + '" style="width:100px;" src="images/question-mark.jpg"></button>';
        
        if((i + 1) % 4 == 0){
            text += "<br>";
        }        
    }
    text += "</div>";
    document.getElementById("game").innerHTML = text;
    document.getElementById("status").style.opacity = "0";
}
function showPicture(i, number, length){
    let imageSource = document.getElementById(i).getAttribute('src');
    if(imageSource != "images/question-mark.jpg"){
        console.log("Wrong Image");
        return 0;
    }

    let count = localStorage.getItem("count");

    if(count == "1"){
        let firstPic = localStorage.getItem("firstPic");
        let secondPic = number;
        let firstId = localStorage.getItem("firstId");
        let secondId = i;

        document.getElementById(secondId).src = "images/" + number + ".jpg";
        if(firstPic == secondPic){
            let matches = localStorage.getItem("matches");
            matches = (matches * 1) + 1;

            if(matches == length / 2){
                document.getElementById("status").style.opacity = "1";
                document.getElementById("status").style.backgroundColor = "blue";
                document.getElementById("status").innerHTML = "Finished";
                localStorage.clear();
                
                if(length == 16){
                    setTimeout(function(){
                        document.getElementById("status").style.opacity = "0";            
                        location.reload();
                    }, 2000);                
                }
                
                if(length == 8){
                    setTimeout(function(){            
                        document.getElementById("status").style.opacity = "0";
                        level2();
                    }, 1500);
                }
            }
            else{
                localStorage.setItem("matches", Number(matches));
                document.getElementById("status").style.opacity = "1";
                document.getElementById("status").innerHTML = "Match";
                document.getElementById("status").style.backgroundColor = "green";

                setTimeout(function(){            
                    document.getElementById("status").style.opacity = "0";
                }, 1000);
            }
        }
        else{
            document.getElementById("status").style.opacity = "1";
            document.getElementById("status").innerHTML = "Incorrect";
            document.getElementById("status").style.backgroundColor = "red";

            setTimeout(function(){            
                document.getElementById(firstId).src = "images/" + "question-mark.jpg";
                document.getElementById(secondId).src = "images/" + "question-mark.jpg";
            }, 250);
            setTimeout(function(){            
                document.getElementById("status").style.opacity = "0";
            }, 1000);
        }
        localStorage.setItem("count", "0");
    }
    else if(count == "0"){
        document.getElementById(i).src = "images/" + number + ".jpg";
        localStorage.setItem("firstPic", number);
        localStorage.setItem("firstId", i)
        localStorage.setItem("count", "1");
    }
}