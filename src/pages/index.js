import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'


var images = [{
    "id" : "1", 
    "name"   : "toy_1",
    "link" : "https://www.mouthsofmums.com.au/wp-content/uploads/2016/05/05/xtoys-shutterstock_321375317-mf.jpg.pagespeed.ic.wyiSRKl2DA.jpg"
},
{
    "id" : "2", 
    "name"   : "toy_2",
    "link" : "https://images-na.ssl-images-amazon.com/images/I/61JI4lEfY-L._SX355_.jpg"
}];



/*on start press will follow the next lines to load*/
var i = 0;
var howManyTimes = images.length;
function callLoop() {

    var obj = images[i]; /*get the link from obj*/
    callApi(obj.link);/*call Api with the new link*/

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
    var vehicles=["vehicle", "car"];
    var animals=["animal"];
    var nature=["nature"];
    var toys=["child","toy"];

    var apirsp = document.getElementById('response_val').innerHTML;
    cetegorySelected = eval(cetegorySelected)

    if(cetegorySelected.indexOf(apirsp) == -1){
        alert("Wrong");
    }else{
        alert("True");
    }
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
            var div = document.getElementById('response_val');
            div.innerHTML = concepts[0]['name'];
            var img = document.getElementById('currentIMG');
            img.src = link;
            showBtns();
        })
}







const IndexPage = () => (
  <Layout>
    <h1>Hi people</h1> 
    <p>Welcome to your new Gatsby application. Press start to begin :)</p>

    <button id="startbutton" onClick={callLoop}>Start</button>

    <div id="appcontent"  style={{display: 'none'}}>
        <div>This is the item</div>
        <div><img id="currentIMG" src="" width="250" /></div>

        <button id="cat1button" onClick={() => checkCateg("animals")}>Animals</button>
        <button id="cat2button" onClick={() => checkCateg("nature")}>Nature</button>
        <button id="cat3button" onClick={() => checkCateg("vehicles")}>Vehicles</button>
        <button id="cat4button" onClick={() => checkCateg("toys")}>Toys</button>

        <pre id="response"></pre>
    </div>
    

    <div id="response_val" style={{visibility: 'hidden'}}></div>

  </Layout>

)


export default IndexPage
