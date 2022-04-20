const express = require('express');
const sendMail = require('./mail');
const log = console.log
const app = express();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 8080;

// Replace these keys of mine with yours, for that purpose read the strip documentation, signup there and go to dashboard/stripe.com, there you'll se your secret and publishable keys grab them and replace them here and then you can track your payments and orders in payment section of stripe.com
var Publishable_Key = 'pk_live_51KbMYsFtAUuXSA6RJSeZvkbychLlwTIVaBMWir96uR5Ch6LJC3DLGohnQUI4l8inGVo9bg6hqc9vk5xzUpsGiSCy00lK4afrrB'
var Secret_Key = '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'
const stripe = require('stripe')(Secret_Key)

// Chunk 2
//DATA parsing
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

// here just replace the mongourl with yours, by signip to mongodb and then create a cluster and there you'll have a connect button click on it and then go to connect with application, then there will be a uri similar to which I have putted blow, grab your own uri and replace with mine
mongoose.connect("mongodb+srv://Bartosz:Baritone2021o!@cluster0.zcddq.mongodb.net/Awningsdirect?retryWrites=true&w=majority", { useNewUrlParser: true , useUnifiedTopology: true});
var Order = require("./models/order")
var Sample = require("./models/sample")

app.get('/', (req, res) => {
    res.render('index.ejs');
});
app.get('/index', (req, res) => {
    res.render('index.ejs');
});

app.get('/about', (req, res) => {
    res.render('about.ejs');
});

app.get('/accessories', (req, res) => {
    res.render('accessories.ejs');
});
app.get('/awnings', (req, res) => {
    res.render('awnings.ejs');
});
app.get('/bora', (req, res) => {
    res.render('bora.ejs');
});
app.get('/boxitalia', (req, res) => {
    res.render('boxitalia.ejs');
});
app.get('/contact-us', (req, res) => {
    res.render('contact-us.ejs');
});

app.get('/cookiepolicy', (req, res) => {
    res.render('cookiepolicy.ejs');
});

app.get('/casablanca', (req, res) => {
    res.render('casablanca.ejs');
});
app.get('/Choose-color-fabric-drop', (req, res) => {
    res.render('Choose-color-fabric-drop.ejs');
});
app.get('/color-pallet', (req, res) => {
    res.render('color-pallet.ejs');
});
app.get('/corsica', (req, res) => {
    res.render('corsica.ejs');
});
app.get('/crank', (req, res) => {
    res.render('crank.ejs');
});
app.get('/eolis', (req, res) => {
    res.render('eolis.ejs');
});
app.get('/formsele', (req, res) => {
    res.render('formsele.ejs');
});
app.get('/fabric1x1', (req, res) => {
    res.render('fabric1x1.ejs');
});
app.get('/instalationform', (req, res) => {
    res.render('instalationform.ejs');
});
app.get('/nemored', (req, res) => {
    res.render('nemored.ejs');
});
app.get('/nemoyellow', (req, res) => {
    res.render('nemoyellow.ejs');
});
app.get('/palladio', (req, res) => {
    res.render('palladio.ejs');
});
app.get('/shock', (req, res) => {
    res.render('shock.ejs');
});
app.get('/silverplus', (req, res) => {
    res.render('silverplus.ejs');
});
app.get('/soliris', (req, res) => {
    res.render('soliris.ejs');
});
app.get('/somfycontroller', (req, res) => {
    res.render('somfycontroller.ejs');
});
app.get('/terms&conditions', (req, res) => {
    res.render('terms&conditions.ejs');
});
app.get('/test', (req, res) => {
    res.render('test.ejs');
});

app.get('/ultimateguide', (req, res) => {
    res.render('ultimateguide.ejs');
});

app.get('/brackets', (req, res) => {
    res.render('brackets.ejs');
});

app.get('/bestsells', (req, res) => {
    res.render('bestsells.ejs');
});


// email, subject, text
app.post('/email', (req, res) => {
    const { subject, email, text, cb} = req.body;
    console.log('Data: ', req.body);

    sendMail(email, subject, text, function(err, data) {
        if (err) {
            res.status(500).json({ message: 'Internal Error'});
        } else {
            res.json({ message: 'Email sent!'});
        }
    });
    res.json({ message: 'Message received'})
});

// to render stripe payment page
var store_price;
app.get('/payment', (req, res) => {
    store_price=req.query.price;
    res.render('payment.ejs', {
        key: Publishable_Key,
        payment: req.query.price
    })
});

// that's how you can get the values for a customized order in the database
app.post('/sample', (req, res) => {
    console.log(req.body)
    Sample.create({
        number : req.body.price,
        email: req.body.price,
    } , function(err , createSample){
        if(err){
            console.log(err)
        }else{
            var objs = req.body.samples;
            console.log(objs);
            if (objs != null){
                objs.forEach(function(obj) {
                    createSample.samples.push(obj);
                });
            }  
            createSample.save();
            res.send("samples is ordered");
        }
    })

});

app.post('/customizedorder', (req, res) => {
    var order = {
        projection: req.body.projection,
        width: req.body.width,
        wallmount: req.body.wallmount,
        sample: req.body.sample,
        framecolor: req.body.framecolor,
        handingoption: req.body.handingoption,
        valanceoption: req.body.valanceoption,
        motorchoice: req.body.motorchoice,
        addwarranty: req.body.addwarranty,
        status: req.body.status,
        sensorchoice: req.body.sensorchoice,
        firstAddress: req.body.firstAddress,
        secondAddress: req.body.secondAddress,
        postcode: req.body.postcode,
        email: req.body.email,
        number: req.body.number,
    }
    Order.create(order , function(err , createdorder){
        if(err){
            console.log(err)
        }else{
            res.send("Order is place");
            console.log(createdorder);
        }
    })

});

app.post('/payment', function(req, res){ 
    //console.log(Number(store_price));
    // Moreover you can take more details from user 
    // like Address, Name, etc from form 
    stripe.customers.create({ 
        email: req.body.stripeEmail, 
        source: req.body.stripeToken,
    }) 
    .then((customer) => { 
        return stripe.charges.create({ 
            amount: Number(store_price)*100,    // Charing Rs 25 
            currency: 'GBP', 
            customer: customer.id 
        }); 
    }) 
    .then((charge) => { 
        console.log(charge);
        res.send("Success") // If no error occurs 
    }) 
    .catch((err) => { 
        res.send(err)    // If some error occurs 
    }); 
}) 


app.listen(PORT, () =>log('Server is starting on PORT,' , 8080));