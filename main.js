video = "";
objects = [];
status = "";
function preload()
{
}


function setup(){

    canvas = createCanvas(480,300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480,300);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function draw (){
    image(video,0,0,280,200);
    if(status !=  ""){
        objectDetector.detect(video,gotResult);
        for(i = 0; i < objects.length; i++)
        {
      

           document.getElementById("status").innerHTML = "Status: object detected";
           document.getElementById("number_of_objects").innerHTML ="Number Of objects Detected:" + objects.length;
           fill  ("#FF0000");
           percent = floor(objects[i].confidence*100);
           text (objects[i].label + "  "  + percent + "% " , objects[i].x , objects[i].y );
           stroke("#FF0000");
           noFill();
           rect(objects[i].x  , objects[i].y , objects[i].width , objects[i].height);
           



    }
}
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}


function modelLoaded(){
    console.log("Modal Loaded !");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}




function gotResult(error, results){
    if (error){
        console.error(error);
    }
else {
    console.log(results);
    objects = results;
}
}

