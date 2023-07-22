img=""
status=""
objects= []


function setup(){
    canvas=createCanvas(918,589)
    canvas.center()
    img=createCapture(VIDEO)
    img.size(918,589)
    img.hide()
}

function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML="Status: Detecting Objects."
}

function modelLoaded(){
    console.log("Model Loaded!")
    status=true
    
}

function gotResults(error, results){
    if(error){
        console.error(error)
    }else{
        console.log(results)
        objects=results
    }
}

function draw(){
    image(img,0,0,918,589)

    r=random(255)
    g=random(255)
    b=random(255)

if(status != ""){
    objectDetector.detect(img,gotResults)
    for ( i=0; i<objects.length; i++){

        document.getElementById("babyfound").innerHTML="Status: Detected Objects!"

        fill(r,g,b)
        percent=floor(objects[i].confidence*100)
        text(objects[i].label+" "+percent+"% ",objects[i].x+15,objects[i].y+15)
        noFill()
        stroke(r,g,b)
        rect(objects[i].x ,objects[i].y ,objects[i].width ,objects[i].height)
        
        if(objects[i].label == "person"){
            img.stop()
            document.getElementById("babyfound").innerHTML="Baby Found!!!"
        }else{
            document.getElementById("babyfound").innerHTML="No baby found. ;("
        }
    }
}

    /*fill("red")
    text("Dog",45,75)
    noFill()
    stroke("red")
    rect(30,60,450,350)

    fill("blue")
    text("Cat",320,120)
    noFill()
    stroke("blue")
    rect(300,90,270,320)*/
}