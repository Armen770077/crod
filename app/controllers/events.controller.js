    const Event = require('../models/event')
     module.exports= {

         showEvents: showEvents,
         showSingle: showSingle,
         seedEvents: seedEvents,
         showCreate:showCreate,
         processCreate:processCreate,
         showEdit:showEdit,
         processEdit:processEdit
     }
    function showEvents(req,res) {

    Event.find({},(err,events)=>{
        if(err){
            res.status(404);
            res.send('Events not found')
        }

        res.render('pages/events',{events:events});
    });
}

    function  showSingle(req,res){

    Event.findOne({slug: req.params.slug},(err,event) => {
        if(err){
            res.status(404);
            res.send('Events not found')
        }
        res.render('pages/single',{event:event});

    });
    }

       function  seedEvents(req,res) {
        const events = [
            {name: 'Basketball', description: 'Throwing intro a basket'},
            {name: 'Swimming', description: 'Michael Phelps is fish'},
            {name: 'Ping Pong', description: 'Super fast paddles'}
        ];
        Event.remove({}, () => {
            for (event of events) {
                var newEvent = new Event(event);
                newEvent.save();
            }
        });


        res.send('database seeded')


    }

function showCreate(req,res){
    res.render('pages/create');
}

    function processCreate(req,res){
    const event = new Event({
        name:req.body.name,
        description:req.body.description
    });
    event.save((err) =>{
if(err)
    throw err;
res.redirect(`/events/${event.slug}`);

    });
}

function showEdit (req,res){
    Event.findOne({slug:req.params.slug},(err,event) =>{
        res.render('pages/edit',{
            event:event

        });


    });
}
    function processEdit(req,res){
    req.checkBody('name','name is required').notEmpty();
    req.checkBody('description','description is required').notEmpty();

        Event.findOne({slug: req.params.slug},(err,event) =>{
            event.name = req.body.name;
            event.description = req.body.description;
            res.redirect('/events')

        });
}
