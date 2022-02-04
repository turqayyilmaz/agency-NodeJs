const dataTables = require('mongoose-datatables');
const Client = require('../../models/Client');
const { dirname, resolve } = require('path');
const { reject } = require('lodash');
  
const appDir = dirname(require.main.filename);
const uploadedUrl = '/uploads/clients';

exports.getClientPage = async (req, res) => {
  res.locals.pageName = 'client';
  res.locals.pageTitle = 'Client';
  res.render('admin/client');
};

exports.getClient = async (req, res) => {
  const client = await Client.findById(req.params._id);
  res.json(client);
};

exports.deleteClient = async (req, res) => {

  
  let id = req.params._id;
   Client.findOneAndRemove({_id:id},(err,doc)=>{
    console.log("doc",doc);
    if(err){
      console.log(error);
      res.status(400).json({status:"error",error:err});
    }
    else{
      res.status(200).json({status:"success",client:doc});
      
    }
  });
};

exports.saveClient = async (req, res) => {
  let logoCheck = new Promise((resolve, reject) => {
    if (req.files) {
      const uploadImage = req.files.clientLogo;
      const imagePath =
        appDir + '\\public\\uploads\\clients\\' + uploadImage.name;
      const imageUrl = uploadedUrl + '\\' + uploadImage.name;

      uploadImage.mv(imagePath.toString(), async (err) => {
        if (err) {
          console.log('image Path: ', imagePath);
          console.log(err);
          reject('');
        } else {
          resolve(imageUrl);
        }
      });
    } else {
      reject('');
    }
  });

  if (req.body._id) {
    let client = await Client.findById(req.body._id);
    let logo ="";
    await logoCheck.then((val)=>{
      logo=val;
    });
    client.clientName = req.body.clientName;
    console.log('logo: ', logo, ' client: ', client);
    if (logo != '') client.clientLogo = logo;
    client.save((err, client) => {
      if (err) {
        res.status(400).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'success',client:client });
      }
    });
  } else {
    let client = new Client();
    client.clientName = req.body.clientName;
    let logo = "";
    await logoCheck.then((val)=>{
      logo=val;
    });
    console.log('logo: ', logo, ' client: ', client);
    if (logo != '') client.clientLogo = logo;
    await Client.create(client, (err, client) => {
      if (err) {
        console.log(err);
        res.status(400).json({ status: 'error' });
      } else {
        res.status(200).json({ status: 'success' });
      }
    });
  }
};

exports.getAllClients = async (req,res)=>{
  const clients = await Client.find({},"_id clientName").sort('clientName');
  res.json(clients);
};

exports.getClientsJson = (req, res) => {
  Client.dataTables({
    total: 'recordsTotal',
    limit: req.query.length,
    formatter: function (client) {
      return {
        _id: client._id,
        clientName: client.clientName,
        clientLogo: `<img src='${client.clientLogo}' width='100px'>`,
        slug: client.slug,
        actions: `<a class="btn btn-success" href="javascript:clientEdit('${client._id}');">Edit</a>
        <a class="btn btn-danger" href="javascript:clientDelete('${client._id}');">Delete</a>`,
      };
    },
    skip: req.query.start,
    search: {
      value: req.query.search.value,
      fields: ['clientName', 'clientLogo', 'slug'],
    },
    sort: {
      clientName: 1,
    },
  }).then(function (table) {
    res.json({
      data: table.data,
      recordsFiltered: table.total,
      recordsTotal: table.total,
    });
  });
};
