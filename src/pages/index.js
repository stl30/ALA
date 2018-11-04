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
var q = 0;
function callLoop() {
  console.log(images.length)
  var obj = images[q]; /*get the link from obj*/

  if (q !== 0) {
    document.getElementById("addIMG").remove();
    document.getElementById("content-default").innerHTML = '<div>Please put this item in a category:</div><div id="addIMG"><img id="currentIMG" src="" width="250" /></div>';
  }


  if (q < images.length) {
    callApi(obj.photo_url, q);/*call Api with the new link*/
    setTimeout(callLoop, 5000);/*call function again after 10 sec*/
  } else {
    if (q === images.length) {
      console.log('add_score')
      addScore(getCookie('username'), getCookie("score"));
      q = 0;
      minusPoints = [];
      plusPoints = [];

      var corrimg = document.getElementById('content-default');
      corrimg.innerHTML = '<img width="245" id="currentIMG" src="https://techflourish.com/images/cross-the-finish-line-clipart-6.png" /><div>Your final score is: ' + getCookie("score") + '</div>';

    }
  }
  // console.log("images.length "+images.length);
  // console.log("q "+q);
  q++; /*increment counter*/
}

function showBtns() {
  var startbtn = document.getElementById("startinterface");
  startbtn.style.display = "none";/*hide start button*/

  var nameval = document.getElementById("username").value;
  setCookie("username", nameval, 1);

  var appcont = document.getElementById("appcontent");
  appcont.style.display = "block";/*show app content*/
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCateg(cetegorySelected) {
  var vehicles = ["car", "bus", "truck"];
  var animals = ["animal", "cat", "cute", "merino", "wildlife", "mammal"];
  var nature = ["panoramic", "grass", "snow", "sunset", "desert"];
  var toys = ["child", "toy", "teddy"];


  var apirsp = document.getElementById('response_val').innerHTML;
  cetegorySelected = eval(cetegorySelected);


  if (cetegorySelected.indexOf(apirsp) == -1) {
    var corrimg = document.getElementById('content-default');
    corrimg.innerHTML = '<img width="245" id="currentIMG" src="https://img.clipartxtras.com/00102a250a131b15f45274fff0956aba_crying-smiley-face-clip-art-sad-face-with-tears-clipart-crying-clipart-sad-face-crying_768-768.png" /><div>The answer is not correct!</div>';
    // console.log("Wrong");
    minusPoints.push(1);
  } else {
    var corrimg = document.getElementById('content-default');
    corrimg.innerHTML = '<img width="245" id="currentIMG" src="https://www.freeiconspng.com/uploads/yellow-star-png-image--yellow-star-png-image-2.png" /><div>The answer is correct!!!</div>';
    // console.log("True");
    plusPoints.push(1);
  }


  updateScore(minusPoints, plusPoints);/*update the score*/
}


function updateScore(minusPoints, plusPoints) {
  var minus = minusPoints.reduce((a, b) => a + b, 0);
  var plus = plusPoints.reduce((a, b) => a + b, 0);

  var totalResponses = parseFloat(minus) + parseFloat(plus);
  var totalScore = totalResponses - parseFloat(minus);

  var score = document.getElementById('score');
  score.innerHTML = "Number of correct answers " + totalScore + " from a total of " + totalResponses;

  setCookie("score", totalScore, 1);
}


/*get response from api*/

function callApi(link) {
  const Clarifai = require('clarifai');
  const app = new Clarifai.App({
    apiKey: 'ed2ddf27fb0c4f94a378c807cef6741f'
  });
  app.models.initModel({ id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40" })
    .then(generalModel => {
      return generalModel.predict(link);
    })
    .then(response => {
      var concepts = response['outputs'][0]['data']['concepts']; /*return api response based on a link*/
      var div = document.getElementById('response'); /*where to put the response*/
      // console.log(concepts[0]['name']);
      div.innerHTML += link + "<br/>"; /*the response and the link used*/
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
    .send({ "query": "query{ photos_urls(limit: " + getNumberOfPictures + ") {id photo_url}}", "variables": null }) // sends a JSON post body
    .set('X-API-Key', 'foobar')
    .set('accept', 'json')
    .end((err, res) => {
      // Calling the end function will send the request
      var photosUrlsRandom = JSON.parse(res.text).data.photos_urls.sort(function (e) {
        if (Math.random() > .5) {
          return 1
        }
        return -1;
      });

      // console.log(photosUrlsRandom)
      images = photosUrlsRandom;
    });

}

function addScore(name, score) {

  request
    .post('https://fcc--alae.herokuapp.com/v1alpha1/graphql')
    .send({ "query": "mutation insert_player {\n  insert_players(\n    objects: [\n      {\n        \n        name: \"" + name + "\",\n        score: \"" + score + "\"\n      }\n    ]\n  ) {\n    returning {\n      id\n      name\n    }\n  }\n}", "variables": null, "operationName": "insert_player" }) // sends a JSON post body
    .set('X-API-Key', 'foobar')
    .set('accept', 'json')
    .end((err, res) => {

      console.log(res)


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
    dragula([drag, dragc1, dragc2, dragc3, dragc4])
      .on('drop', function (el, target, source, sibling) {
        checkCateg(target.id);
      });
  }
  render() {
    return (
      <Layout>

        <div id="startinterface" style={{ textAlign: "center" }}>

          {/* <p>Welcome to your new Gatsby application.<br></br> Press start to begin :)</p> */}

          <input className="form-control" type="text" name="name" id="username" placeholder="Your nickname?" style={{ height: "50px", maxWidth: "240px", margin: "10px auto", display: "block" }}></input>

          <div className="back">
            <div className="button_base b05_3d_roll">
              <button id="startbutton" className="btn btn-primary" onClick={callLoop}>Let's drop it!</button>

            </div>

          </div>

          <div className="container-fluid" style={{ marginTop: '120px' }}>
            <div className="row">
              <div className="col-md-2">
                <div className="dot" style={{ margin: '35px auto', width: '100px' }}></div>
                <div className="shadow" style={{ margin: '35px auto', width: '120px' }}></div>
              </div>

              <div className="col-md-2">
                <div className="dot" style={{ margin: '35px auto', width: '100px' }}></div>
                <div className="shadow" style={{ margin: '35px auto', width: '120px' }}></div>
              </div>

              <div className="col-md-2">
                <div className="dot" style={{ margin: '35px auto', width: '100px' }}></div>
                <div className="shadow" style={{ margin: '35px auto', width: '120px' }}></div>
              </div>

              <div className="col-md-2">
                <div className="dot" style={{ margin: '35px auto', width: '100px' }}></div>
                <div className="shadow" style={{ margin: '35px auto', width: '120px' }}></div>
              </div>

              <div className="col-md-2">
                <div className="dot" style={{ margin: '35px auto', width: '100px' }}></div>
                <div className="shadow" style={{ margin: '35px auto', width: '120px' }}></div>
              </div>

              <div className="col-md-2">
                <div className="dot" style={{ margin: '35px auto', width: '100px' }}></div>
                <div className="shadow" style={{ margin: '35px auto', width: '120px' }}></div>
              </div>
            </div>
          </div>
        </div>
        <div id="appcontent" style={{ display: 'none' }}>
          <div id="score" style={{ marginTop: '20px', textAlign: 'center', color: "#233489" }}></div>

          <div className='container' style={{ textAlign: "center" }}>
            <div className='drag-wrapper' id="content-default" style={{ minHeight: '260px', color: "#233489" }}>
              <div style={{ marginBottom: "20px" }}>Please include the image below in a category :)</div>
              <div id="addIMG" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img style={{ maxHeight: "245px", maxWidth: "245px" }} id="currentIMG" src="" /></div>
            </div>
          </div>
          <div className='container' style={{ padding: "0" }}>
            <div className="row">
              <div className="col-3">
                <h3 className="text-center" style={{ color: "#233489" }}>Animals</h3>
                <div id="animals" className='drag-wrapper circle' style={{ minHeight: '230px', border: '2px solid #319bb6' }}></div>
              </div>
              <div className="col-3">
                <h3 className="text-center" style={{ color: "#233489" }}>Nature</h3>
                <div id="nature" className='drag-wrapper circle' style={{ minHeight: '230px', border: '2px solid #319bb6' }}></div>
              </div>
              <div className="col-3">
                <h3 className="text-center" style={{ color: "#233489" }}>Vehicles</h3>
                <div id="vehicles" className='drag-wrapper circle' style={{ minHeight: '230px', border: '2px solid #319bb6' }}></div>
              </div>
              <div className="col-3">
                <h3 className="text-center" style={{ color: "#233489" }}>Toys</h3>
                <div id="toys" className='drag-wrapper circle' style={{ minHeight: '230px', border: '2px solid #319bb6' }}></div>
              </div>
            </div>

          </div>

          <pre id="response" style={{ visibility: 'hidden' }}></pre>
          <div id="response_val" style={{ visibility: 'hidden' }}></div>
        </div>


      </Layout>
    )
  }
}
