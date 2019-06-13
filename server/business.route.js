const express = require('express');
const businessRoutes = express.Router();

const Business = require('./business.model');

// POST DATA
businessRoutes.route('/add').post(function(req, res){
	const business = new Business(req.body);
	business.save()
		.then(business => {
			res.status(200).json({ 'business': 'business in added successfully'  });
		})
		.catch(err => {
			res.status(400).send("unable to save to database");
		});
});

// GET DATA
businessRoutes.route('/').get(function(req, res) {
	Business.find(function(err, businesses) {
		if(err) {
			console.log(err);
		} else {
			res.json(businesses);
		}
	});
});

// DETAIL DATA
businessRoutes.route('/edit/:id').get(function (req, res) {
	const id = req.params.id;
	Business.findById(id, function (err, business) {
		res.json(business);
	});
});

// UPDATE DATA
businessRoutes.route('/update/:id').post(function(req, res) {
	Business.findById(req.params.id, function(err, business) {
		if(!business) {
			res.status(404).send('data is not found'); 
		} else {
			business.person_name = req.body.person_name;
			business.business_name = req.body.business_name;
			business.business_gst_number = req.body.business_gst_number;

			business.save().then(business => {
				res.json('update complete');
			})
			.catch(err => {
				res.status(400).send('unable to update the database');
			});
		}
	}); 
});

// // Delete Data
businessRoutes.delete('/:id', (req, res) => {
	Business.findById(req.params.id)
    .then(Business => Business.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});


// Defined delete | remove | destroy route
// businessRoutes.route('/:id').get(function (req, res) {
//     Business.findByIdAndRemove({_id: req.params.id}, function(err, business){
//         if(err) res.json(err);
//         else res.json('Successfully removed');
//     });
// });

module.exports = businessRoutes;
	