var path = require('path')
var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',
 
  // SQLite only
  storage: path.join(__dirname,'../database/database.sqlite')
});


// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });


var Note = sequelize.define('note', {
  text: {
    type: Sequelize.STRING
  },
  uid:{
  	type:Sequelize.STRING
  }
});
//Note.sync({force: true})
// force: true will drop the table if it already exists
// Note.sync().then(() => {
//   // Table created
//   return Note.create({
//     text:'hello world'
//   });
// });

// Note.findAll({raw:true,where:{id:2}}).then(notes => {
//   console.log(notes)
// })

module.exports = Note;