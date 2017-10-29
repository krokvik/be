'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('claims', {
      id: {
          type: 'string',
          length: 32,
          notNull: true,
          primaryKey: true
      },
      user_id: {
          type: 'string',
          length: 32,
          notNull: true,
          primaryKey: true
      },
      amount: {
          type: 'int',
          notNull: true
      },
      completed_timestamp: {
          type: 'int',
          notNull: true
      }
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('claims', callback);
};

exports._meta = {
  "version": 1
};
