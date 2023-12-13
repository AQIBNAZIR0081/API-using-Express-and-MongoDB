var mongoose = require('mongoose');
const joi = require('@hapi/joi');

var productSchema = new mongoose.Schema({
    Product: String,
    Price: Number,
});

var Product = mongoose.model("Product", productSchema);

function validateProduct(data) {
    const schema = joi.object({
        name: joi.string().min(3).max(10).required(),
        price: joi.number().min(0).required(),
    });
    return schema.validate(data, { abortEarly: false });
}

module.exports.Product = Product;
module.exports.validate = validateProduct;