var mongoose = require('mongoose');

var TableSchema = new mongoose.Schema({
    Date: Date,
    P1:String,
    P2:String,
    P3:String,
    P4:String,
    P5:String,
    P6:String,
    dept:String
// D2:{
//     P0:String,
//     P1:String,
//     P2:String,
//     P3:String,
//     P4:String,
//     P5:String,
//     P6:String,
// },
// D3:{
//     P0:String,
//     P1:String,
//     P2:String,
//     P3:String,
//     P4:String,
//     P5:String,
//     P6:String,
// },
// D4:{
//     P0:String,
//     P1:String,
//     P2:String,
//     P3:String,
//     P4:String,
//     P5:String,
//     P6:String,
// },
// D5:{
//     P0:String,
//     P1:String,
//     P2:String,
//     P3:String,
//     P4:String,
//     P5:String,
//     P6:String,
// },
// D6:{
//     P0:String,
//     P1:String,
//     P2:String,
//     P3:String,
//     P4:String,
//     P5:String,
//     P6:String,
// },
// D7:{
//     P0:String,
//     P1:String,
//     P2:String,
//     P3:String,
//     P4:String,
//     P5:String,
//     P6:String,
// }  
});

var Table = mongoose.model('Table', TableSchema);
module.exports = Table;