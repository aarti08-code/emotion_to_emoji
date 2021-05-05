prediction_1="";
prediction_2="";
Webcam.set({
    width:350,height:300,image_format:'png',png_quality:90
})
camera=document.getElementById("camera");
Webcam.attach("#camera");

function snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="pic" src='+data_uri+'>';
    });
}

console.log("ml5 version:",ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/-pioUPLVi/model.json',modelLoaded);

function modelLoaded()
{
    console.log("model loaded");
}

function speak()
{
    var synth=window.speechSynthesis;
    var speak_data1="The first prediction is"+prediction_1;
    var speak_data2="The second prediction is"+prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis);
}

function predict()
{
    captured_img=document.getElementById("pic");
    classifier.classify(captured_img,got_result);
}

function got_result(error,results)
{
    if (error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();

        if (prediction_1=="happy")
        {
            document.getElementById("update_emoji").innerHTML="😊";
        }

        if (prediction_1=="sad")
        {
            document.getElementById("update_emoji").innerHTML="🙁";
        }

        if (prediction_1=="angry")
        {
            document.getElementById("update_emoji").innerHTML="😠";
        }

        if (prediction_2=="happy")
        {
            document.getElementById("update_emoji2").innerHTML="😊";
        }

        if (prediction_2=="sad")
        {
            document.getElementById("update_emoji2").innerHTML="🙁";
        }

        if (prediction_2=="angry")
        {
            document.getElementById("update_emoji2").innerHTML="😠";
        }
    }
}