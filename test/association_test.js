'use strict'
const mongoose = require('mongoose');
const assert   = require('assert');
const User     = require('../src/user');
const Comment  = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let joe, blogPost, comment;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({
      title: 'JS YEAH!',
      content: 'JS MUITA TRETA'
    });
    comment = new Comment({ content: 'yooo comment you motherfucker' });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;

    // joe.save()
    //   .then(() => blogPost.save())
    //   .then(() => comment.save())
    //   .then(() => done());

    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done());
  });

  it.only('saves a relation between a user & a blogpost', done => {
    User.findOne({ name: 'Joe' })
      .then(user => {
        console.log(user);
        done();
      })
  });
});
