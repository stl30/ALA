import React from 'react'
import { Link } from 'gatsby'

const Header = ({ siteTitle }) => (
  <div
    style={{
      background: '#d8aeae',
      marginBottom: '1.45rem',
    }}
  >
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: '0', marginBottom: '10px' }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </h1>
        <Link className="btn btn-primary" to={"/list-urls"}>List of URLs</Link>
        &nbsp;&nbsp;&nbsp;
        <a className="btn btn-primary" href="/add-url-photo"> Add an URL</a>
        &nbsp;&nbsp;&nbsp;
        <a className="btn btn-primary" href="/"> Go back</a>
    </div>
  </div>
)

export default Header
