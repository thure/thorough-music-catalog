const Datastore = require('nedb'),
      path = require('path'),
      async = require('async'),
      _ = require('lodash');

const DATABASES = {
  tags: 'tags.db',
  tracks: 'tracks.db'
};

function MusicData(app){
  this._app = app;
}

MusicData.prototype.init = function(cb){
  var self = this;

  this.dbs = {};

  async.forEachOf(DATABASES, function(filename, dbname, done){

    self.dbs[dbname] = new Datastore({
      filename: path.join(
        self._app.getPath('userData'),
        filename
      )
    });

    self.dbs[dbname].loadDatabase(done);

  }, cb);

};

MusicData.prototype.addTag = function(simpleName, fullName, parent_id, cb){

  this.dbs.tags.insert({
    name: simpleName,
    text: fullName || null,
    parent: parent_id || null
  }, cb);

};

MusicData.prototype.addTrack = function(opts, cb){

  this.dbs.tracks.insert(_.extend({
    _instruments: [],
    _tags: []
  }, opts), cb);

};

module.exports = MusicData;