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

  it('saves a relation between a user & a blogpost', done => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then(user => {
        assert(user.blogPosts[0].title === 'JS YEAH!')
        done();
      })
  });

  it('saves a full relation graph', done => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then(user => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'JS YEAH!');
        assert(
          user.blogPosts[0].comments[0]
            .content === 'yooo comment you motherfucker');
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');
        done();
      })
  });
});
