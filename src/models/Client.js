const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify-mongoose');

const dataTable = require('mongoose-datatables');

const ClientSchema = new Schema(
  {
    clientName: {
      type: String,
      unique: true,
      required: true,
    },
    clientLogo: String,
    slug: { type: String, unique: true, slug: 'clientName' },
  },
  { timestamps: {} }
);
ClientSchema.plugin(slugify);
ClientSchema.plugin(dataTable);

const Client = mongoose.model('Client', ClientSchema);
module.exports = Client;
