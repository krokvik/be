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
    db.createTable('users', {
        id: {
            type: 'string',
            length: 32,
            notNull: true,
            primaryKey: true
        },
        name: {
            type: 'string',
            length: 255,
            notNull: true
        },
        wallet: {
            type: 'string',
            length: 42
        },
        lastTimestamp: {
            type: 'int',
            notNull: true
        }
    }, callback);
};

exports.down = function(db, callback) {
    db.dropTable('users', callback);
};

exports._meta = {
    "version": 1
};
