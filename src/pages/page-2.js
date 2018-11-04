import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'


const SecondPage = () => (
    <Layout>

        <div className="container-fluid">



            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-2">
                        <div class="dot"></div>
                        <div class="shadow"></div>
                    </div>

                    <div class="col-md-2">
                        <div class="dot"></div>
                        <div class="shadow"></div>
                    </div>

                    <div class="col-md-2">
                        <div class="dot"></div>
                        <div class="shadow"></div>
                    </div>

                    <div class="col-md-2">
                        <div class="dot"></div>
                        <div class="shadow"></div>
                    </div>

                    <div class="col-md-2">
                        <div class="dot"></div>
                        <div class="shadow"></div>
                    </div>

                    <div class="col-md-2">
                        <div class="dot"></div>
                        <div class="shadow"></div>
                    </div>
                </div>
            </div>




            <div className="row">
                <div className="col-md-4">
                </div>
                <div className="col-md-4">
                    <p><img src="https://3.bp.blogspot.com/-XVkR_Ha9S3E/VVwRk-hG1RI/AAAAAAAAAFA/EgFIqLpHknQ/s1600/Free%2BDownload%2BHd%2BWallpaper%2BRainforest%2Bfor%2Biphone2.jpg" /></p>
                </div>
                <div className="col-md-4">
                </div>
            </div>

            <div className="row">
                <div className="col-md-3">
                    <h3>Category 1</h3>
                    <p><img src="https://3.bp.blogspot.com/-XVkR_Ha9S3E/VVwRk-hG1RI/AAAAAAAAAFA/EgFIqLpHknQ/s1600/Free%2BDownload%2BHd%2BWallpaper%2BRainforest%2Bfor%2Biphone2.jpg" /></p>
                </div>
                <div className="col-md-3">
                    <h3>Category 2</h3>
                    <p><img src="https://images-na.ssl-images-amazon.com/images/I/81QpshLNqeL._SL1500_.jpg" /></p>
                </div>
                <div className="col-md-3">
                    <h3>Category 3</h3>
                    <p><img src="https://3.bp.blogspot.com/-XVkR_Ha9S3E/VVwRk-hG1RI/AAAAAAAAAFA/EgFIqLpHknQ/s1600/Free%2BDownload%2BHd%2BWallpaper%2BRainforest%2Bfor%2Biphone2.jpg" /></p>
                </div>
                <div className="col-md-3">
                    <h3>Category 4</h3>
                    <p><img src="http://beaconalpacas.co.uk/wp-content/uploads/2016/11/Fabio.jpg" /></p>
                </div>
            </div>
        </div>

        <div className="text-center">
            <Link to="/">
                <button type="button" className="btn btn-danger">BACK</button>
            </Link>
        </div>

    </Layout>


)

export default SecondPage
