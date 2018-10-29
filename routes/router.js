var express = require('express');
var router = express.Router();
var User = require('../models/user');
const path = require('path');
var Table = require('../models/tabledata');
var dept2,user2;



// GET route for reading data
router.get('/', function (req, res, next) {
  
  return res.send(path.join(__dirname + '/templateLogReg/index.html'));
});

//POST route for updating data
router.post('/', function (req, res, next) {
   

  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf &&
    req.body.dept) {
    
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
      dept: req.body.dept
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
         req.session.userId = user._id;
         user2 = user;
         dept2 = user.dept;
          return res.redirect('/profile');
      }
    });

  } else if (req.body.logemail && req.body.logpassword) {
    
    User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
         user2 = user;
         dept2 = user.dept;
         console.log(dept2);   
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})


//GET route for selecting time tables
router.get('/selectDates',(req,res)=>{
  console.log(req.session.userId);
  res.render(path.join(__dirname + '/../pages/Dates.ejs'));

})


//GET route for displaying timetable data
router.get('/gettimetable',(req,res,next)=>{
  if(req.query.startdate &&
    req.query.enddate){
      var mysort= {Date : 1};
  Table.find({
     dept: req.body.dept1,
    Date: { 
      $gte:req.query.startdate,
      $lte:req.query.enddate  
    }
    // Date: { $lte:req.query.enddate}
  }).sort(mysort).then((tables) => {
    // console.log(table.D1P1);
  res.render(path.join(__dirname + '/../pages/generatett.ejs'),{
    tables: tables
  });
  });
}else{
  console.log("Enter date");
}
})



//Route to direct user to a department table.
router.get('/department',(req,res,next)=>{
  console.log(dept2);
  if(dept2 === 'bb'){
    console.log("hello from bb");
    return res.sendfile(path.join(__dirname+'/../pages/departments/Bloodbank.html'));
  }else if(dept2 === 'plgy'){
    return res.sendfile(path.join(__dirname + '/../pages/departments/Pathology.html'));
  }else if(dept2 === 'mblgy'){
    return res.sendfile(path.join(__dirname + '/../pages/departments/Microbiology.html'));
  }else if(dept2 === 'bchem'){
    return res.sendfile(path.join(__dirname + '/../pages/departments/Biochemistry.html'));
  }else if(dept2 === 'cslty'){
    return res.sendfile(path.join(__dirname + '/../pages/departments/Casualty.html'));
  }else if(dept2 === 'pstry'){
     return res.sendfile(path.join(__dirname + '/../pages/departments/Psychiatry.html'));
  }else if(dept2 === 'dntry'){
    return res.sendfile(path.join(__dirname + '/../pages/departments/Dentistry.html'));
  }else if(dept2 === 'rddiag'){
    return res.sendfile(path.join(__dirname + '/../pages/departments/Radiology.html'));
  }else if(dept2 === 'anstia'){
    return res.sendfile(path.join(__dirname + '/../pages/departments/Anaesthesiology.html'));
  }else if(dept2 === 'optmlgy'){
    return res.sendfile(path.join(__dirname + '/../pages/departments/Ophthalmology.html'));
  }else if(dept2 === 'ent'){
    return res.sendfile(path.join(__dirname + '/../pages/departments/Ent.html'));
  }else if(dept2 === 'dmtlgy'){
    return res.sendfile(path.join(__dirname + '/../pages/departments/Dermatology.html'));
  }else if(dept2 === 'pdtrc'){
    return res.sendfile(path.join(__dirname + '/../pages/departments/Paediatrics.html'));
  }else if(dept2 === 'opdcs'){
    return res.sendfile(path.join(__dirname + '/../pages/departments/Orthopaedics.html'));
  }else if(dept2 === 'obagn'){
    console.log("something");
    return res.sendfile(path.join(__dirname + '/../pages/departments/ObstetricsaAndGynecology.html'));
  }else if(dept2 === 'gs'){
    return res.sendfile(path.join(__dirname + '/../pages/departments/Generalsurgery.html'));
  }else if(dept2 === 'gm'){
    return res.sendfile(path.join(__dirname + '/../pages/departments/GeneralMedicine.html'));
  }else if(dept2 === 'antmy'){
    return res.sendfile(path.join(__dirname + '/../pages/departments/Anatomy.html'));
  }else if(dept2 === 'commed'){
    return res.sendfile(path.join(__dirname + '/../pages/departments/Communitymedicine.html'));
  }else if(dept2 === 'formed'){
    console.log("formed1");
    return res.sendfile(path.join(__dirname + '/../pages/departments/Forensicmedicine.html'));
  }else if(dept2 === 'pmcgy'){
    return res.sendfile(path.join(__dirname + '/../pages/departments/Pharmacology.html'));
  }else if(dept2 === 'pslg'){
    return res.sendfile(path.join(__dirname + '/../pages/departments/Physiology.html'));
  }
  else{
    return res.redirect('/profile');
   }

   
  // return res.sendfile(path.join(__dirname + '/../pages/departments/Bloodbank.html'));
})





router.post('/makeTimeTable',(req,res)=>{
    
 
  var tabl1 = new Table({
    Date: req.body.D1P0,
    P1: req.body.D1P1,
    P2: req.body.D1P2,
    P3: req.body.D1P3,
    P4: req.body.D1P4,
    P5: req.body.D1P5,
    P6: req.body.D1P6,
    dept: dept2
  })
  var tabl2 = new Table({
    Date: req.body.D2P0,
    P1: req.body.D2P1,
    P2: req.body.D2P2,
    P3: req.body.D2P3,
    P4: req.body.D2P4,
    P5: req.body.D2P5,
    P6: req.body.D2P6,
    dept: dept2
  })
  var tabl3 = new Table({
    Date: req.body.D3P0,
    P1: req.body.D3P1,
    P2: req.body.D3P2,
    P3: req.body.D3P3,
    P4: req.body.D3P4,
    P5: req.body.D3P5,
    P6: req.body.D3P6,
    dept: dept2
  })
  var tabl4 = new Table({
    
    Date: req.body.D4P0,
    P1: req.body.D4P1,
    P2: req.body.D4P2,
    P3: req.body.D4P3,
    P4: req.body.D4P4,
    P5: req.body.D4P5,
    P6: req.body.D4P6,
    dept: dept2
  })

  var tabl5 = new Table({
  
    Date: req.body.D5P0,
    P1: req.body.D5P1,
    P2: req.body.D5P2,
    P3: req.body.D5P3,
    P4: req.body.D5P4,
    P5: req.body.D5P5,
    P6: req.body.D5P6, 
    dept: dept2
  })
  var tabl6 = new Table({
   
    Date: req.body.D6P0,
    P1: req.body.D6P1,
    P2: req.body.D6P2,
    P3: req.body.D6P3,
    P4: req.body.D6P4,
    P5: req.body.D6P5,
    P6: req.body.D6P6, 
    dept: dept2
  })
  var tabl7 = new Table({
    
  Date: req.body.D7P0,
    P1: req.body.D7P1,
    P2: req.body.D7P2,
    P3: req.body.D7P3,
    P4: req.body.D7P4,
    P5: req.body.D7P5,
    P6: req.body.D7P6,
    dept: dept2
  })
  tabl1.save();
  tabl2.save();
  tabl3.save();
  tabl4.save();
  tabl5.save();
  tabl6.save();
  tabl7.save();

  res.redirect('/profile');

})

// GET route after registering
router.get('/profile', function (req, res, next) {
 
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
        //  return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
        //  return res.send("/pages/profile.html");
        // return res.send(path.join('/templateLogReg/profile.html'));
       //return res.redirect('/routetoprofile');
       
        dept2 = user.dept;
       return res.sendFile(path.join(__dirname + '/../pages/profile.html'));
     
      }
      }
    });
});

//
// GET for logout logout
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;