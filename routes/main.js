const express = require('express')
const router = express.Router()
const controollers = require("../controllers");

router.get('/', async(req,res,next) => {
 const data = req.context

 const itemCtr = controollers.item.instance();
 data.coffee = await itemCtr.get({category: 'coffee'})
 data.tea = await itemCtr.get({ category: "tea" });
 data.pastries = await itemCtr.get({ category: "pastries" });

 res.render('home', data)
})

router.get("/blog", (req, res, next) => {
  
  res.render("blog", req.context);
});
router.get("/items", async(req, res, next) => {
  const filters = req.query
 const itemCtr = controollers.item.instance() 
 const items = await itemCtr.get(filters);
 
 res.json({
   items
 })
  
});

router.post('/order', async(req,res, next) => {
  const orderData = req.body
   

  const orderCtr = controollers.order.instance()
  const order = await orderCtr.post(orderData)
  res.json(order)
})

module.exports = router