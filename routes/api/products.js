const express = require('express');
let router = express.Router();
const validateProduct = require('../../middlewares/validateProduct')
var { Product } = require('../../models/product')

// Get all products
router.get('/', async (req, res) => {
    let page = Number(req.query.page ? req.query.page : 1);
    let perPage = Number(req.query.perPage ? req.query.perPage : 10);
    let skipRecords = (perPage * (page - 1));
    let products = await Product.find().skip(skipRecords).limit(perPage);
    return res.send(products);
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(400).send("Product with given ID is not present");
        }
        return res.send(product);
    } catch (error) {
        return res.status(400).send("Invalid ID");
    }
});

// Updated Record
router.put('/:id', validateProduct, async (req, res) => {
    let product = await Product.findById(req.params.id);
    product.name = req.body.name;
    product.price = req.body.price;
    await product.save();
    return res.send(product);
})

// Delete Record
router.delete('/:id', async (req, res) => {
    let product = await Product.findByIdAndDelete(req.params.id);
    return res.send(product);
})

// Insert new Record
router.post('/', validateProduct, async (req, res) => {
    let product = new Product();
    product.name = req.body.name;
    product.price = req.body.price;
    await product.save();
    return res.send(product);
})

module.exports = router;
