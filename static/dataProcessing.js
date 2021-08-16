/*

• Here you will find the codes for:
    1.Initialization
        1.1 Canvas Initialization
    2.Canvas Setup
    3.ROI Setting 
    4.Data Processing

*/ 

/* 
======================================================
====================1.Initialization==================
======================================================
*/
var interval=1000; //interval between datapoints
let canvas,contextOut,cOut,context,cTemp,contextTemp;
let fftR=[];
let unprocessedDataTimed=[];
let processedDataTimed=[];
let unprocessedDataRtest=[];
let processedDataRtest=[];
let averageGreen=[0,0];
let r,g,b;
var pythontest=[]
var time0= [];
let time= [];

// Easy access for changing variables to index.html
function data(msg) { 
        let result = averageGreen;

        // if (msg==1){
            return result;
        // }
        // else{
        //     return result[0];
        // } 
    };


$(document).ready(function(){

/* 
======================================================
=============1.1 Canvas Initialization================
======================================================
*/
    cOut= document.getElementById("outcanvas");
    contextOut = cOut.getContext("2d");

    // //setup video
    //  let video = document.getElementById("video"),
    //     videoObj = { "video": true },
    //     errBack = function(error) {
    //         console.log("Video capture error: ", error.code); 
    //     };

    // // Put video listeners into place
    // function loadvideo() { 
    //     navigator.getUserMedia(videoObj, function(stream) {
    //         video.srcObject = stream;
    //         video.play();
    //         console.log("There")
    //     }, errBack);
    // }

    let videoHeight, videoWidth;

    function updateCavnasImage()
    {

/* 
======================================================
===================2.Canvas Setup=====================
======================================================
*/
    videoHeight= $(video).height();
    videoWidth=$(video).width();
    cOut.width=videoWidth;
    cOut.height=videoHeight;
    contextOut.drawImage(video, 0, 0, videoWidth, videoHeight);

/* 
======================================================
====================3.ROI Setting=====================
======================================================
*/
        let rectW=cOut.width/2-25; // horizontal coordinates
        let rectH=(cOut.height/2-15)-50; // vertical coordinates
        let rRect=[rectW, rectH, 50, 50];// size of the box
        averageGreen=0;

        //Pixels from ROI
        for (let i=rRect[0];i<rRect[0]+rRect[2];i++)
        {
            for (let j=rRect[1];j<rRect[1]+rRect[3];j++)
            {
                averageGreen+=contextOut.getImageData(i, j, 50, 50).data[1]; //getImageData(top, left, width, height) ,data=[R,G,B,a]
            }
        }
        averageGreen/=rRect[2]*rRect[3];
           
        //Draw on canvas
        contextOut.beginPath();
        contextOut.rect(rRect[0],rRect[1],rRect[2],rRect[3]);
        contextOut.fillStyle = 'rgb('+parseInt(averageGreen)+','+parseInt(averageGreen)+','+parseInt(averageGreen)+')';
        contextOut.fill();
        contextOut.lineWidth = 2;
        contextOut.strokeStyle = 'green';
        contextOut.stroke();


/* 
======================================================
====================4.Data Processing=================
======================================================
*/
        //data without time
        unprocessedDataRtest.push(averageGreen);
        processedDataRtest= normalizeArray(unprocessedDataRtest,250);

        //data with time
        unprocessedDataTimed.push([averageGreen,Date.now()]);
        processedDataTimed = normalizeArray(unprocessedDataTimed,250);

        //duration calculation
        let durationR=(processedDataTimed[processedDataTimed.length-1][1])-(processedDataTimed[0][1]);
        fftR=fft(processedDataRtest);
        heartRate= findHeartRate(fftR, durationR);



        // Debugging code
            // if (lock==0){
            //     sample[0] = processedDataRtest;
            //     sample[1] = fftR;
            //     sample[2] = durationR;

            //     sample[3] = heartRate;
            //     sample[4] = fps;
            //     // processedData[0];
            //     // (processedDataR[processedDataR.length-1]);
            // }



// # ------------------------------------------------------------------------------
// # ----------------Server-Side Processing in application.py----------------------
// # ------------------------------------------------------------------------------
        // let fps=(fftR.length*60*10)/(durationR);
        // let heartRate=0;
        // let maxData=0;
        // let av=0;

        // for (let i=0;i<fftR.length;i++)
        // {       
        //     heartRate=i*fps/fftR.length;
        // }

        // time.push((Date.now())-time0 );
        // durationToUse=normalizeArray(time,250);
        // dataStream = unprocessedDataRtest;
        // durationR=(durationToUse[durationToUse.length-1])-(durationToUse[0]);
        // fetch('/compute', {
        //     method: "POST",
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         datapoint: dataStream,
        //         duration: durationR
        //     })
        // }).then(data => {return data.json()})
        // .then(res => {console.log(res)})
        
        // set the interval between each datapoint
        setTimeout(updateCavnasImage,interval);
        
    }

    updateCavnasImage();
    // takeSample(); // Debugging code

});


// Debugging code
// var sample =[];
// var lock =1;

// function takeSample(){
//     setInterval(() => {
//         //lock the system
//         lock =0;
        
//         //take a sample
//         //analyse the sample
//         // console.log(sample);
//         //unlock
//         setTimeout(() => {
//             lock=1;
//         }, 200);

//     }, 5000);
// }
function normalizeArray(data, length)
{
    let res = [];
    if (data.length<length)
        return data;
    for (let i=data.length-length;i<data.length;i++)
        res.push(data[i]);
    return res;        
}

function fft(data)
{
    let k,j;
    let res=[];
    let len =data.length;
    for (k=0;k<len;k++)
    {
        res.push(0);
        for (j=0;j<len;j++)
        {
            res[k]+=data[j]*Math.cos(2*3.1415*k*j/len);
            // console.log(data[j][0]*Math.cos(2*3.1415*i*j/data.length));
            
        }
    }

    return res;
}

function findHeartRate(data, duration)
{
    let fps=(data.length*60*1000)/(duration);
    let heartRate=0;
    let maxData=0;
    let av=0;
    for (let i=0;i<data.length;i++)
    {  
        maxData=data[i];
        heartRate=i*fps/data.length;  
    }
    av[0]+=heartRate;
    av[1]++;
    //return heartRate;
    return av[0]/av[1];
}