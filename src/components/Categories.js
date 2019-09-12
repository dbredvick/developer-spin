import React from 'react';
import _ from 'lodash';

import {markdownify, Link, safePrefix} from '../utils';

export default class Categories extends React.Component {
    render() {
        return (
            <div id={_.get(this.props, 'section.section_id')}>
              <h2>Posts by Topic</h2>
              <div className="intro-text">
                <div className="grid-container">
                    <Link className="grid-item button" to={safePrefix('/categories/books-and-podcasts')}>
                        Book & Podcast Deep Dives <span className="button-emoji">📕🎧</span>
                    </Link>
                    <Link className="grid-item button" to={safePrefix('/categories/software-exploration')}>
                        Software Exploration <span className="button-emoji">🧠🖥</span>
                    </Link>
                    <Link className="grid-item button" to={safePrefix('/categories/tech-reviews')}>
                        Tech Reviews <span className="button-emoji">🎮📱</span>
                    </Link>
                    <Link className="grid-item button" to={safePrefix('/categories/side-projects')}>
                        Side Projects <span className="button-emoji">💯💪</span>
                    </Link>
                </div>
              </div>
              {_.get(this.props, 'section.actions') && 
              <p className="intro-cta">
                {_.map(_.get(this.props, 'section.actions'), (action, action_idx) => (
                <Link key={action_idx} to={safePrefix(_.get(action, 'url'))} className="button">{_.get(action, 'label')}</Link>
                ))}
              </p>
              }
            </div>
        );
    }
}
