import React from 'react'
import { Link } from 'gatsby'
import request from 'superagent'

import Layout from '../components/layout'
import Image from '../components/image'


function getUrlList() {
    request
        .post('https://fcc--alae.herokuapp.com/v1alpha1/graphql')
        .send({"query":"query{photos_urls {id photo_url}}","variables":null}) // sends a JSON post body
        .set('X-API-Key', 'foobar')
        .set('accept', 'json')
        .end((err, res) => {
            // Calling the end function will send the request
            var urls ='';
            var photosUrlsRandom = JSON.parse(res.text).data.photos_urls.sort(function (e) {
                if (Math.random()>.5){
                    return 1
                }
                return -1;
            }).forEach(function (e) {
                urls += '<p>'+e['photo_url']+'</p>'
            });

            console.log(urls)
            var list = document.getElementById('list-urls');
            list.innerHTML = urls;

        });
}


const IndexPage = () => (
    <Layout>
        <h1>Lista urluri</h1>
        <p>Welcome to your new Gatsby application. Press start to begin :)</p>

        <button id="list-urls" onClick={getUrlList}>urls</button>


        <div id="list-urls"></div>

    </Layout>
)


export default IndexPage
