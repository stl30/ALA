import React from 'react'
import { Link } from 'gatsby'
import request from 'superagent'

import Layout from '../components/layout'
import Image from '../components/image'


function addDeleteListeners() {
    var deleteButtons = document.getElementsByClassName('delete-url');
    for (var i = 0; i < deleteButtons.length; i++) {
        // console.log(deleteButtons[i]);
        // deleteButtons[i].addEventListener("click", deleteUrl(deleteButtons[i]));
        deleteButtons[i].addEventListener("click", function (e) {
            // console.log(this.dataset['id'])
            deleteUrl(this.dataset['id']);
        });
    }
}



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

                urls += '<tr>' +
                    '       <td>'+e['id']+'</td>' +
                    '       <td>'+e['photo_url']+'</td>' +
                    '       <td><button  class="delete-url btn btn-danger"  data-id="'+e['id']+'">delete</button></td>' +
                    '</tr>'
            });

            // console.log(urls)
            var list = document.getElementById('urls_table_body');
            list.innerHTML = urls;

            addDeleteListeners();

        });
}

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
    getUrlList();
}

function deleteUrl(urlId) {
    request
        .post('https://fcc--alae.herokuapp.com/v1alpha1/graphql')
        .send({"query":"mutation delete_url_with_id {delete_photos_urls(where: {id: {_eq: "+urlId+"}}) {affected_rows}}","variables":null,"operationName":"delete_url_with_id"}) // sends a JSON post body
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
            getUrlList();

        });
}

    //init
    getUrlList();



const IndexPage = () => (
    <Layout>
        <h1 className="text-center">Admin interface</h1>
        <h3>View application URLs</h3>

        <div className="container">
            <table className="table table-striped table-dark">
                <thead className="thead-dark">
                <tr>
                    <th colSpan={2}>
                        <input id='url_photo_input' type="text" name='url_photo' className={'form-control'} />
                    </th>
                    <th>
                        <button id="add-urls" onClick={addPhotoLink} className={'btn btn-info'} style={{marginRight:"10px", display: "inline-block"}}>Add a new URL</button>
                        <button id="list-urls" onClick={getUrlList} className={'btn btn-info'} style={{display: "inline-block"}}>Get URL list</button>
                    </th>
                </tr>
                <tr>
                    <th>id</th>
                    <th>url</th>
                    <th>delete</th>
                </tr>
                </thead>

                <tbody id="urls_table_body">

                </tbody>
            </table>
        </div>



        <div id="list-urls">

        </div>

    </Layout>
)


export default IndexPage
