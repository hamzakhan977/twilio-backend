const { Model } = require('objection');
class model extends Model {
    static get tableName() {
        return 'task';
    }
}
module.exports = model;