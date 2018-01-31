
//Import Gift Schema
var Article = require('../models/Article');
var Promise = require('bluebird');

module.exports = {
  find: function(params) {
    return new Promise(function(resolve, reject){
      Article.find(params, function(err, articles){
        if (err){
          reject(err)
          return
        }
        resolve(articles)
      })
    })
  },

  findById: function(id) {
    return new Promise(function(resolve, reject){
      Article.findById(id, function(err, article){
        if(err){
          reject(err)
          return
        }
        resolve(article)
      })
    })
  },

  create: function(params) {
    return new Promise(function(resolve, reject){
      Article.create(params, function(err, article){
        if (err){
          reject(err)
          return
        }
        resolve(article)
      })
    })
  },

  update: function(id, params) {
    return new Promise(function(resolve, reject){
      Article.findByIdAndUpdate(id, params, {new:true}, function(err, article){
        if (err){
          reject(err);
          return
        }
        resolve(article)
      })
    })
  },
  delete: function(id) {
    return new Promise(function(resolve, reject){
      Article.deleteOne(id, function(err, article){
        if(err){
          reject(err)
          return
        }
        resolve(article)
      })
    })
  }
}
