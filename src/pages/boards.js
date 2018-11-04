import React from 'react'
import { Link } from 'gatsby'
import request from 'superagent'

import Layout from '../components/layout'
import Image from '../components/image'

function getScoreList() {
    request
        .post('https://fcc--alae.herokuapp.com/v1alpha1/graphql')
        .send({"query":"query {\n  players(\n    order_by: {score: desc}\n  ) {\n    id\n    name\n    score\n    email\n  }\n}","variables":null}) // sends a JSON post body
        .set('X-API-Key', 'foobar')
        .set('accept', 'json')
        .end((err, res) => {
            // Calling the end function will send the request
            var urls ='';
            console.log(JSON.parse(res.text).data.players)
            var photosUrlsRandom = JSON.parse(res.text).data.players.forEach(function (e) {

                urls += '<tr>' +
                    '       <td>'+e['name']+'</td>' +
                    '       <td>'+e['score']+'</td>' +
                    '</tr>'
            });

            // console.log(urls)
            var list = document.getElementById('urls_table_body');
            list.innerHTML = urls;

        });
}


//init




const IndexPage = () => (
    <Layout>
        <h1 className="text-center">LEADERBOARD</h1>

        <div className="container">
            <table className="table table-striped table-dark">
                <thead className="thead-dark">
                <tr>

                    <th>
                        <button id="list-urls" onClick={getScoreList} className={'btn btn-info'} style={{display: "inline-block"}}>Get leaderboard</button>
                    </th>
                </tr>
                <tr>
                    <th>nume</th>
                    <th>scor</th>
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
