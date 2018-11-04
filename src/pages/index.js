import React from 'react'
import ReactDOM from 'react-dom'
import dragula from 'react-dragula'
import 'bootstrap/dist/css/bootstrap.min.css';

// import { Link } from 'gatsby'
import request from 'superagent'

import Layout from '../components/layout'
// import Image from '../components/image'

var minusPoints = [];
var plusPoints = [];

var images = [];

// images=getUrlList()

/*on start press will follow the next lines to load*/
var i = 0;
function callLoop() {
    var obj = images[i]; /*get the link from obj*/

    if(i !== 0){
        document.getElementById("addIMG").remove();
        document.getElementById("content-default").innerHTML = '<div>Please put this item in a category:</div><div id="addIMG"><img id="currentIMG" src="" width="250" /></div>';
    }

    callApi(obj.photo_url);/*call Api with the new link*/
    i++; /*increment counter*/
    if( i < images.length ){
        setTimeout( callLoop, 10000 );/*call function again after 10 sec*/
    }
}

function showBtns(){
    var startbtn = document.getElementById("startinterface");
    startbtn.style.display = "none";/*hide start button*/

    var nameval = document.getElementById("username").value;
    setCookie("username", nameval, 1);

    var appcont = document.getElementById("appcontent");
    appcont.style.display = "block";/*show app content*/
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function checkCateg(cetegorySelected){
    var vehicles=["car", "bus", "truck"];
    var animals=["animal", "cat", "cute", "merino", "wildlife", "mammal"];
    var nature=["panoramic", "grass", "snow", "sunset", "desert"];
    var toys=["child","toy","teddy"];

    var apirsp = document.getElementById('response_val').innerHTML;
    cetegorySelected = eval(cetegorySelected);

    if(cetegorySelected.indexOf(apirsp) == -1){
        // console.log("Wrong");
        minusPoints.push(1);
    }else{
        // console.log("True");
        plusPoints.push(1) ;
    }

    updateScore(minusPoints, plusPoints);/*update the score*/
}


function updateScore(minusPoints, plusPoints){
    var minus = minusPoints.reduce((a, b) => a + b, 0);
    var plus = plusPoints.reduce((a, b) => a + b, 0);

    var totalResponses = parseFloat(minus)+parseFloat(plus);
    var totalScore = totalResponses - parseFloat(minus);

    var score = document.getElementById('score');
    score.innerHTML = "Number of correct answers "+totalResponses+" from a total of "+totalScore;
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
            console.log(concepts[0]['name']);
            div.innerHTML += link+"<br/>"; /*the response and the link used*/
            var div2 = document.getElementById('response_val');
            div2.innerHTML = concepts[0]['name'];
            var img = document.getElementById('currentIMG');
            img.src = link;
            showBtns();
        })
}


function getUrlList(getNumberOfPictures) {

    request
        .post('https://fcc--alae.herokuapp.com/v1alpha1/graphql')
        .send({"query":"query{ photos_urls(limit: "+getNumberOfPictures+") {id photo_url}}","variables":null}) // sends a JSON post body
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
            images=photosUrlsRandom;
        });
}
getUrlList(5)

function onChange(event) {
    // this.setState({typed: event.target.value});
    console.log(event);
}


export default class IndexPage extends React.Component {
    componentDidMount() {
        var drag = document.getElementsByClassName('drag-wrapper')[0];
        var dragc1 = document.getElementsByClassName('drag-wrapper')[1];
        var dragc2 = document.getElementsByClassName('drag-wrapper')[2];
        var dragc3 = document.getElementsByClassName('drag-wrapper')[3];
        var dragc4 = document.getElementsByClassName('drag-wrapper')[4];
        dragula([drag, dragc1,dragc2,dragc3,dragc4])
            .on('drop', function(el, target, source, sibling) {
            checkCateg(target.id);
        });
    }
    render(){
        return (
            <Layout>
                <div id="startinterface" style={{textAlign:"center"}}>
                    <h1>Hi people</h1>
                    <p>Welcome to "Drop it like is hot" new Gatsby application. Press Start to begin :)</p>

                    <input className="form-control" type="text" name="name" id="username" placeholder="Username" style={{maxWidth: "300px", margin: "10px auto", display: "block"}}></input>
                    <button id="startbutton" className="btn btn-primary" onClick={callLoop}>Start</button>
                </div>

                <div id="appcontent"  style={{display: 'none'}}>
                    <div id="score" style={{marginTop: '20px', textAlign: 'center'}}></div>
                    <div className='container' style={{textAlign:"center"}}>
                        <div className='drag-wrapper' id="content-default" style={{minHeight: '260px'}}>
                            <div style={{marginBottom:"20px"}}>Please put this item in a category:</div>
                            <div id="addIMG" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                <img style={{maxHeight: "245px", maxWidth: "245px"}} id="currentIMG" src="" /></div>
                        </div>
                    </div>
                    <div className='container'>
                        <div className="row">
                            <div className="col-3">
                                <h3 className="text-center">animals</h3>
                                <div id="animals" className='drag-wrapper' style={{minHeight: '245px', border: '1px solid black'}}></div>
                            </div>
                            <div className="col-3">
                                <h3 className="text-center">nature</h3>
                                <div id="nature" className='drag-wrapper' style={{minHeight: '245px', border: '1px solid black'}}></div>
                            </div>
                            <div className="col-3">
                                <h3 className="text-center">vehicles</h3>
                                <div id="vehicles" className='drag-wrapper' style={{minHeight: '245px', border: '1px solid black'}}></div>
                            </div>
                            <div className="col-3">
                                <h3 className="text-center">toys</h3>
                                <div id="toys" className='drag-wrapper' style={{minHeight: '245px', border: '1px solid black'}}></div>
                            </div>
                        </div>

                    </div>

                    <pre id="response"  style={{visibility: 'hidden'}}></pre>
                    <div id="response_val" style={{visibility: 'hidden'}}></div>
                </div>
              </Layout>
        )
    }
}
