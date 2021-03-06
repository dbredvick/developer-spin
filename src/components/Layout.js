import React from 'react';
import { Helmet } from 'react-helmet';
import _ from 'lodash';

import { safePrefix } from '../utils';
import Header from './Header';
import Subscribe from './Subscribe';
import Footer from './Footer';

export default class Body extends React.Component {
  render() {
    const desc = `Welcome to The Developer Spin, where I <b>review</b> software, <b>build and grow</b> side projects, and <b>share</b> what I learn along the way.`;
    return (
      <React.Fragment>
        <Helmet>
          <title>{_.get(this.props, 'pageContext.frontmatter.title') && _.get(this.props, 'pageContext.frontmatter.title') + ' - '}{_.get(this.props, 'pageContext.site.siteMetadata.title')}</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initialScale=1.0" />
          <meta name="google" content="notranslate" />
          <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700,700i%7CPT+Serif:400,700" rel="stylesheet" />
          <link rel="stylesheet" href={safePrefix('assets/css/main.css')} />
          <meta http-equiv="content-language" content="en-us" />
          <meta property="og:image" content={safePrefix(_.get(this.props, 'pageContext.frontmatter.content_img_path'))}></meta>
          <meta property="og:title" content="The Developer Spin" />
          <meta property="og:description" content={desc} />
          <meta name="description" content={desc} />
          <meta property="og:type" content="article" />
          <meta name="twitter:creator" content="@dbredvick"></meta>
          <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        </Helmet>
        <div id="page" className={'site layout-' + _.get(this.props, 'pageContext.site.siteMetadata.layout_style') + ' palette-' + _.get(this.props, 'pageContext.site.siteMetadata.palette')}>
          <Header {...this.props} />
          <div id="content" className="site-content">
            <main id="main" className="site-main inner">
              {this.props.children}
            </main>
          </div>
          {_.get(this.props, 'pageContext.site.data.subscribe.enabled') &&
            <Subscribe {...this.props} />
          }
          <Footer {...this.props} />
        </div>
      </React.Fragment>
    );
  }
}
