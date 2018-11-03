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
    showBtns();

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

    var cat1btn = document.getElementById("cat1button");
    cat1btn.style.display = "block";/*show cat1 button*/
    var cat2btn = document.getElementById("cat2button");
    cat2btn.style.display = "block";/*show cat2 button*/
    var cat3btn = document.getElementById("cat3button");
    cat3btn.style.display = "block";/*show cat3 button*/
    var cat4btn = document.getElementById("cat4button");
    cat4btn.style.display = "block";/*show cat4 button*/
}

function checkCateg(cetegorySelected){
    var vehicles=["vehicle", "car"];
    var animals=["animal"];
    var nature=["nature"];
    var toys=["toy", "child"];

    console.log(cetegorySelected);
    console.log(apirsp);
    console.log(cetegorySelected.indexOf(apirsp));

    var apirsp = document.getElementById('response_val').innerHTML;

    if(cetegorySelected.indexOf(apirsp) > 0){
        alert("True");
    }else{
        alert("Wrong");
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
        })
}







const IndexPage = () => (
  <Layout>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby application. Press start to begin :)</p>

    <div>This is the item</div>
    <img id="currentIMG" src="" width="250" />

    <button id="startbutton" onClick={callLoop}>Start</button>

    <button id="cat1button" style={{display: 'none'}} onClick={() => checkCateg("animals")}>Animals</button>
    <button id="cat2button" style={{display: 'none'}} onClick={() => checkCateg("nature")}>Nature</button>
    <button id="cat3button" style={{display: 'none'}} onClick={() => checkCateg("vehicles")}>Vehicles</button>
    <button id="cat4button" style={{display: 'none'}} onClick={() => checkCateg("toys")}>Toys</button>


    <pre id="response"></pre>
    <div id="response_val"></div>
    <Link to="/page-2/">Go to page 2</Link>
    
  </Layout>

)


export default IndexPage
