
            /*Global Variables*/
            var clearBtn=document.querySelector('#clear-button');
            var backBtn=document.querySelector('#back-button')
    
            var ulElement=document.querySelector("#initial");

            //This will copy the scores from local storage if not null(not cleared) else will set as empty array
            var scoreArray=localStorage.getItem('scores')!==null?JSON.parse(localStorage.getItem('scores')):[];
        
            //Iterate through each item in array and display the scores as list
            for(var i=0;i<scoreArray.length;i++){
                 for(var [key,value] of Object.entries(scoreArray[i])){

                    var listItem=document.createElement('li');
                    listItem.innerHTML=key+" - "+value;
                    ulElement.append(listItem);
                }
            }


            //Function will set the href/URL to index file,hence navigating user to the game Intro

            function backToGameIntro(){

                window.location.href="./index.html";
            }

            /*Event Listener on Go Back button will navigate use to the game intro -index file*/

            backBtn.addEventListener('click',backToGameIntro);


            //Function will clear the local storage and set the list as empty
            function clearScore(){
                localStorage.clear();
                ulElement.innerHTML="";

            }

            /*Event Listener on Clear Score button will clear the score saved in local storage and display blank list*/
            clearBtn.addEventListener('click',clearScore);
