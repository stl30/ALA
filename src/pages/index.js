import React from 'react'
import { Link } from 'gatsby'
import request from 'superagent'

import Layout from '../components/layout'
import Image from '../components/image'

var minusPoints = [];
var plusPoints = [];
var images = [{
    "id" : "1", 
    "name"   : "child",
    "link" : "https://ae01.alicdn.com/kf/HTB1XGhfNXXXXXXDXFXXq6xXFXXX7/Kids-Puzzle-Educational-Toys-Disassembly-Assembly-Classic-Car-Model-Building-Toy-Children-best-gifts.jpg_640x640.jpg"
},
{
    "id" : "2", 
    "name"   : "toy",
    "link" : "https://images-na.ssl-images-amazon.com/images/I/61JI4lEfY-L._SX355_.jpg"
},
{
    "id" : "3", 
    "name"   : "child",
    "link" : "https://www.mouthsofmums.com.au/wp-content/uploads/2016/05/05/xtoys-shutterstock_321375317-mf.jpg.pagespeed.ic.wyiSRKl2DA.jpg"
},
{
    "id" : "4", 
    "name"   : "teddy",
    "link" : "https://images-na.ssl-images-amazon.com/images/I/81QpshLNqeL._SL1500_.jpg"
},
{
    "id" : "5", 
    "name"   : "child",
    "link" : "https://target.scene7.com/is/image/Target/GUEST_2ddd3f39-b150-4a2c-b7f8-7cc1b90c56e5?wid=488&hei=488&fmt=pjpeg"
},
{
    "id" : "6", 
    "name"   : "car",
    "link" : "https://www.jeep-india.com/content/dam/cross-regional/apac/jeep/en_in/vehicle-lineup/jeep-Vehicle-Lineup-Compass.png"
},
{
    "id" : "7", 
    "name"   : "bus",
    "link" : "https://upload.wikimedia.org/wikipedia/commons/6/6b/Transperth_Volgren_Optimus_bodied_Volvo_B8RLEA.jpg"
},
{
    "id" : "8", 
    "name"   : "car",
    "link" : "https://www.sixt.com/fileadmin/files/global/user_upload/fleet/png/350x200/vw-beetle-2d-cabrio-rot-offen-2015.png"
},
{
    "id" : "9", 
    "name"   : "truck",
    "link" : "https://img.grouponcdn.com/deal/cbt6NeGzUfzp5AZ6nNpUgVRGeHD/cb-2048x1229/v1/c700x420.jpg"
},
{
    "id" : "10", 
    "name"   : "car",
    "link" : "https://www.nationwidevehiclecontracts.co.uk/m/1/dacia-logan-access.jpg"
},
{
    "id" : "11", 
    "name"   : "cat",
    "link" : "https://www.bluecross.org.uk/sites/default/files/assets/images/124044lpr.jpg"
},
{
    "id" : "12", 
    "name"   : "cute",
    "link" : "https://cdn.newsapi.com.au/image/v1/67a523605bca40778c6faaad93883a3b"
},
{
    "id" : "13", 
    "name"   : "merino",
    "link" : "http://beaconalpacas.co.uk/wp-content/uploads/2016/11/Fabio.jpg"
},
{
    "id" : "14", 
    "name"   : "wildlife",
    "link" : "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iJDLRm.3o2Iw/v0/800x-1.jpg"
},
{
    "id" : "15", 
    "name"   : "mammal",
    "link" : "https://cdn.securesyte.com/qg5Pk2drzv-991/images/blog/raccoon-in-missouri.png"
},
{
    "id" : "16", 
    "name"   : "panoramic",
    "link" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7-Nd73d_Ii8JMWSufxAynVjyTKWLfCBTWf2DsBGQVCq3o8tN2"
},
{
    "id" : "17", 
    "name"   : "grass",
    "link" : "https://images.pexels.com/photos/60006/spring-tree-flowers-meadow-60006.jpeg?cs=srgb&dl=nature-flowers-sun-60006.jpg"
},
{
    "id" : "18", 
    "name"   : "snow",
    "link" : "https://mountaincountieswater.com/wp-content/uploads/2011/04/2013-Snow-Sierras-2.jpg"
},
{
    "id" : "19", 
    "name"   : "sunset",
    "link" : "http://wall2born.com/data/out/345/image-44351151-wallpapers-view-nature-hd.jpg"
},
{
    "id" : "20", 
    "name"   : "desert",
    "link" : "https://defenders.org/sites/default/files/styles/homepage-feature-2015/public/mojave-desert_mendenhall-glacier_jason-mohap.png"
}];



/*on start press will follow the next lines to load*/
var i = 0;
var howManyTimes = images.length;
function callLoop() {

    var obj = images[i]; /*get the link from obj*/
    callApi(obj.link);/*call Api with the new link*/
    toggleButtons(false);/*enable buttons for click*/
    i++; /*increment counter*/
    if( i < howManyTimes ){
        setTimeout( callLoop, 10000 );/*call function again after 10 sec*/
    }
}

function showBtns(){
    var startbtn = document.getElementById("startbutton");
    startbtn.style.display = "none";/*hide start button*/

    var appcont = document.getElementById("appcontent");
    appcont.style.display = "block";/*show app content*/
}

function checkCateg(cetegorySelected){
    var vehicles=["car", "bus", "truck"];
    var animals=["animal", "cat", "cute", "merino", "wildlife", "mammal"];
    var nature=["panoramic", "grass", "snow", "sunset", "desert"];
    var toys=["child","toy","teddy"];

    var apirsp = document.getElementById('response_val').innerHTML;
    cetegorySelected = eval(cetegorySelected)

    if(cetegorySelected.indexOf(apirsp) == -1){
        alert("Wrong");
        minusPoints.push(1);
    }else{
        alert("True");
        plusPoints.push(1) ;
    }

    toggleButtons(true);/*disable buttons for click*/
    updateScore(minusPoints, plusPoints);/*update the score*/
}

function toggleButtons(option){
    document.getElementById("cat1button").disabled = option;
    document.getElementById("cat2button").disabled = option; 
    document.getElementById("cat3button").disabled = option; 
    document.getElementById("cat4button").disabled = option; 
}


function updateScore(minusPoints, plusPoints){
    var minus = minusPoints.reduce((a, b) => a + b, 0);
    var plus = plusPoints.reduce((a, b) => a + b, 0);

    var totalResponses = parseFloat(minus)+parseFloat(plus);
    var totalScore = totalResponses - parseFloat(minus);

    var score = document.getElementById('score');
    score.innerHTML = "Correct/Total: "+totalScore+"/"+totalResponses;
}


/*get response from api*/
function callApi(link){
    const Clarifai = require('clarifai');
    const app = new Clarifai.App({
        apiKey: 'ed2ddf27fb0c4f94a378c807cef6741f'
    });
    app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
        .then(generalModel => {
            return generalModel.predict(link);
        })
        .then(response => {
            var concepts = response['outputs'][0]['data']['concepts']; /*return api response based on a link*/
            var div = document.getElementById('response'); /*where to put the response*/
            div.innerHTML += concepts[0]['name']+" - "+link+"<br/>"; /*the response and the link used*/
            var div2 = document.getElementById('response_val');
            div2.innerHTML = concepts[0]['name'];
            var img = document.getElementById('currentIMG');
            img.src = link;
            showBtns();
        })
}

function getUrlList() {
    request
        .post('https://fcc--alae.herokuapp.com/v1alpha1/graphql')
        .send({"query":"query{photos_urls {id photo_url}}","variables":null}) // sends a JSON post body
        .set('X-API-Key', 'foobar')
        .set('accept', 'json')
        .end((err, res) => {
            // Calling the end function will send the request
            var photosUrlsRandom = JSON.parse(res.text).data.photos_urls.sort(function (e) {
                if (Math.random()>.5){
                    return 1
                }
                return -1;
            });

            console.log(photosUrlsRandom)

        });
}


const IndexPage = () => (
  <Layout>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby application. Press start to begin :)</p>
    <div id="score"></div>

    <button id="startbutton" onClick={callLoop}>Start</button>
    <button id="list-urls" onClick={getUrlList}>urls</button>

    <div id="appcontent"  style={{display: 'none'}}>
        <div style={{width: '48%', float: 'left'}}>
            <div>This is the item</div>
            <div><img id="currentIMG" src="" width="250" /></div>

            <button id="cat1button" onClick={() => checkCateg("animals")}>Animals</button>
            <button id="cat2button" onClick={() => checkCateg("nature")}>Nature</button>
            <button id="cat3button" onClick={() => checkCateg("vehicles")}>Vehicles</button>
            <button id="cat4button" onClick={() => checkCateg("toys")}>Toys</button>
        </div>
        <div style={{width: '48%', float: 'right'}}>
            <pre id="response"></pre>
        </div>
    </div>
    

    <div id="response_val" style={{visibility: 'hidden'}}></div>

  </Layout>
)


export default IndexPage
