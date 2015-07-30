var express = require('express');
var router = express.Router();
var Contact = require('../models/contact');

//middleware to check is user is logged in
router.use(function(req, res, next){
    if (!req.user){
        res.redirect('/');
    }
    next();
})

/* GET contacts listing. */
router.get('/', function(req, res, next) {
  Contact.find(function(err, contacts){
      
      if (err){ res.send('Error: '+err); }
      
      res.render('list', {contacts: contacts, user: req.user}); 
  });
});

/* GET add page. */
router.get('/add', function(req, res, next){
    res.render('add', {contact: {} });
});

/* POST add a new contact */
router.post('/', function(req, res, next){
    new Contact({
        name: req.body.fullname,
        nickname: req.body.nickname,
        job: req.body.job,
        email: req.body.email
    }).save(function(err){
        if (err){
            res.send('Saving user error: '+err);
        }
        res.redirect('/contacts/');
    });
});

/* various specific user operations*/
router.route('/:contact_id')
    .all(function(req, res, next){
        contact_id = req.params.contact_id;
        contact = {};
        Contact.findById(contact_id, function(err, c){
            if (err) { res.send('Error: '+err); }
            contact = c;
            next();
        })
    })
    .get(function(req, res){
        res.render('edit', {contact: contact});
    })
    .put(function(req, res, next){
        contact.name = req.body.fullname;
        contact.job = req.body.job;
        contact.email = req.body.email;
        contact.nickname = req.body.nickname;
        
        contact.save(function(err, data){
            if (err) { res.send(err); }
            else { res.redirect('/contacts/'); }
        });
    })
    .post(function(req, res, next){
        contact.notes.push({ note: req.body.notes });
        
        contact.save(function(err, data){
            if (err){ res.send('Error: '+err); }
            else res.redirect('/contacts/'+contact_id)
        })
    })
    .delete(function(req, res, next){
        contact.remove(function(err, data){
            console.log("User with ID: "+data._id+" removed.");
            res.send(data);//must send data back, or else qualifies as a fail to clientside ajax request
        })
    })


module.exports = router;
