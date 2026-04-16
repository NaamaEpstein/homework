

// פונקציות ב JS 

function alertMessage(){
    alert("הודעה בעת לחיצה");
}

//כדי לגשת מהJS לHTML
//נצטרך להשתמש בפונקציות של DOM

//שינוי טקסט קבוע
function changeHeaderText(){

    //  אוביקט המצביע למלל הכותרת הנמצא בדף ה HTML 
    const h= document.getElementById("header");
    h.innerText="כיתוב חדש"
}

//שינוי טקסט לפי בחירת המשתמש
function changeHeaderText2(){

    let newText=prompt("הכנס טקסט רצוי לכותרת");
    //  אוביקט המצביע למלל הכותרת הנמצא בדף ה HTML 
    const h= document.getElementById("header");
    h.innerText=newText;
}

// שינוי צבע כותרת לכחול
function changeHeaderColor(){
// מציאת האלמנט ושינוי הצבע בתוך הSTYLE שלו
    document.getElementById("top").style.backgroundColor="blue";
}

//שינוי צבע אקראי
function changeHeaderColor2(){
    let r=Math.floor( Math.random()*255);
    let g=Math.floor( Math.random()*255);
    let b=Math.floor( Math.random()*255);
// מציאת האלמנט ושינוי הצבע בתוך הSTYLE שלו
    document.getElementById("top").style.backgroundColor=`rgb(${r}, ${g} , ${b})`;
}


//שינוי צבע אקראי
function changeHeaderColor3(){
    // Value- הערך הנבחר /הנכנס בפקדי אינפוט
 let c=document.getElementById("chosenColor").value;  
// מציאת האלמנט ושינוי הצבע בתוך הSTYLE שלו
    document.getElementById("top").style.backgroundColor=c;
}

// תרגיל כיתה:
// צרי דפי HTML-JS-CSS
//דף הHTML יכלול כותרת (ריקה) , אינפוט של טקסט וכפתור
//המשתמש מכניס את שמו באינפוט ובעת הלחיצה רשום בכותרת שלום ל+שמו





//////////////////////////////////////////////////////

 let count=0
function click2(){
    
//   let count= parseInt(document.getElementById("numSpan").innerText);
    count++;
    document.getElementById("numSpan").innerText=count;
}
function click0(){

    count=0;
    document.getElementById("numSpan").innerText=count;
}

function changePic(){
    document.getElementById("pic").src="pic/Flowers 202.jpg";
}






