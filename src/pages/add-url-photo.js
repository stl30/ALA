import React from 'react'
import { Link } from 'gatsby'
import request from 'superagent'

import Layout from '../components/layout'
import Image from '../components/image'

function addPhotoLink(photoUrl) {
    var imgUrl = document.getElementById('url_photo_input');
    console.log(imgUrl.value)

    request
        .post('https://fcc--alae.herokuapp.com/v1alpha1/graphql')
        .send({
            "query": "mutation insert_photo_url {insert_photos_urls(objects: [{photo_url: \"" + imgUrl.value + "\",}]) {returning {id photo_url}}}",
            "variables": null,
            "operationName": "insert_photo_url"
        }) // sends a JSON post body
        .set('X-API-Key', 'foobar')
        .set('accept', 'json')
        .end((err, res) => {
            // Calling the end function will send the request
            // var photosUrlsRandom = JSON.parse(res.text).data.photos_urls.sort(function (e) {
            //     if (Math.random() > .5) {
            //         return 1
            //     }
            //     return -1;
            // });
            // var photosUrlsRandom = JSON.parse(res.text).data.photos_urls.sort(function (e) {
            //     if (Math.random() > .5) {
            //         return 1
            //     }
            //     return -1;
            // });

            console.log(res)


        });
    imgUrl.value = '';
    }




const IndexPage = () => (
    <Layout>
        <h1 className="text-center">Admin interface</h1>
        <h3>Add URL for a new photo</h3>

        <input id='url_photo_input' type="text" name='url_photo'/>
        <button id="add-urls" onClick={addPhotoLink}>add url</button>



        <div id="response_val" style={{visibility: 'hidden'}}></div>

    </Layout>
)


export default IndexPage
