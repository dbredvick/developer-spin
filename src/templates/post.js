import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import { Helmet } from 'react-helmet';


import {Layout} from '../components/index';
import {getPagesByTags, htmlToReact, safePrefix, Link} from '../utils';

export default class Post extends React.Component {
    render() {
      let posts = _.orderBy(getPagesByTags(this.props.pageContext.pages, '/posts', this.props.pageContext.frontmatter.tags), 'frontmatter.date', 'desc');
      const recPosts = posts.filter(x => x.name !== this.props.pageContext.name).slice(0,2);
      return (
            <Layout {...this.props}>
              {_.get(this.props, 'pageContext.frontmatter.excerpt') && 
              <Helmet>
                  <meta property="og:title" content={_.get(this.props, 'pageContext.frontmatter.title')}></meta>
                  <meta name="description" content={_.get(this.props, 'pageContext.frontmatter.excerpt')}></meta>
                  <meta property="og:description" content={_.get(this.props, 'pageContext.frontmatter.excerpt')}></meta>
              </Helmet>
              }
              <article className="post post-full">
                <header className="post-header">
                  <div className="post-meta">
                    <time className="published"
                      dateTime={moment(_.get(this.props, 'pageContext.frontmatter.date')).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(this.props, 'pageContext.frontmatter.date')).strftime('%A, %B %e, %Y')}</time>
                  </div>
                  <h1 className="post-title">{_.get(this.props, 'pageContext.frontmatter.title')}</h1>
                </header>
                {_.get(this.props, 'pageContext.frontmatter.subtitle') && 
                <div className="post-subtitle">
                  {htmlToReact(_.get(this.props, 'pageContext.frontmatter.subtitle'))}
                </div>
                }
                {_.get(this.props, 'pageContext.frontmatter.content_img_path') && 
                <div className="post-thumbnail">
                  <img className="thumbnail" src={safePrefix(_.get(this.props, 'pageContext.frontmatter.content_img_path'))} alt={_.get(this.props, 'pageContext.frontmatter.title')} />
                </div>
                }
                <div className="post-content">
                  {htmlToReact(_.get(this.props, 'pageContext.html'))}
                </div>
              </article>
              <div className="post-feed">
              {recPosts.map(((post, post_idx) =>(
                <article key={post_idx} className="post post-card">
                <div className="post-card-inside">
                  {_.get(post, 'frontmatter.thumb_img_path') && 
                  <Link className="post-card-thumbnail" to={safePrefix(_.get(post, 'url'))}>
                    <img className="thumbnail" src={safePrefix(_.get(post, 'frontmatter.thumb_img_path'))} alt={_.get(post, 'frontmatter.title')} />
                  </Link>
                  }
                  <div className="post-card-content">
                    <header className="post-header">
                      <div className="post-meta">
                        <time className="published"
                        dateTime={moment(_.get(post, 'frontmatter.date')).strftime('%Y-%m-%d %H:%M')}>{moment(_.get(post, 'frontmatter.date')).strftime('%B %d, %Y')}</time>
                      </div>
                      <h2 className="post-title"><Link to={safePrefix(_.get(post, 'url'))} rel="bookmark">{_.get(post, 'frontmatter.title')}</Link></h2>
                    </header>
                    <div className="post-excerpt">
                      <p>{_.get(post, 'frontmatter.excerpt')}</p>
                      <p className="read-more">
                        <Link className="button inverse" to={safePrefix(_.get(post, 'url'))}>Read more</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </article>
              )))
              }
              </div>
            </Layout>
        );
    }
}
