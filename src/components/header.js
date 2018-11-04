import React from 'react'
import { Link } from 'gatsby'

const Header = ({ siteTitle }) => (
  <div style={{ background: '#d8aeae', marginBottom: '1.45rem'}}>
      <div style={{ margin: '0 auto', maxWidth: 960, padding: '1.45rem 1.0875rem'}}>
          <div className="row">
              <div className="col-md-8">
                  <h1 style={{margin: '0', marginBottom: '10px'}}>
                      <Link to="/" style={{ color: 'white', textDecoration: 'none'}}>
                          {siteTitle}
                      </Link>
                  </h1>
              </div>
              <div className="col-md-4 d-flex justify-content-center">
                  {/*<div className="dropdown">*/}
                      {/*<button className="btn btn-default dropdown-toggle" type="button" id="menu1"*/}
                              {/*data-toggle="dropdown">Tutorials*/}
                          {/*<span className="caret"></span></button>*/}
                      {/*<ul className="dropdown-menu" role="menu" aria-labelledby="menu1">*/}
                          {/*<li role="presentation"><a role="menuitem" href="#">HTML</a></li>*/}
                          {/*<li role="presentation"><a role="menuitem" href="#">CSS</a></li>*/}
                          {/*<li role="presentation"><a role="menuitem" href="#">JavaScript</a></li>*/}
                          {/*<li role="presentation" className="divider"></li>*/}
                          {/*<li role="presentation"><a role="menuitem" href="#">About Us</a></li>*/}
                      {/*</ul>*/}
                  {/*</div>*/}
                  <Link className="align-items-center align-self-center" style={{color:"white"}} to={"/"}>Home</Link>
                  &nbsp;&nbsp;&nbsp;
                  <Link className="align-items-center align-self-center"  style={{color:"white"}} to={"/list-urls"}>Admin</Link>
                  &nbsp;&nbsp;&nbsp;
                  <Link className="align-items-center align-self-center"  style={{color:"white"}} to={"/boards"}>LeaderBoard</Link>

              </div>
          </div>
      </div>
  </div>
)

export default Header
