const express= require('express');
const router=express.Router();
const Categ=require('../models/Categ');
const User=require('../models/User')

router.post('/',async(req,res)=>{
    const newCats=new Categ(req.body);
    try{
        // console.log('cyvghbkjlk');
        const savedCats=await newCats.save();
        return res.status(200).json(savedCats);
    }catch(err){
        console.log(err);
        return res.status(500).json(err)
    }
})

//Get

router.get("/:id",async(req,res)=>{
    try{
        const cats=await Categ.findById(req.params.id);
        res.status(200).json(cats);
    }catch(err){
        return res.status(500).json(err);
    }
})


//UPDATE Categoy

router.put("/:id", async (req,res)=>{
    try{
        const cats=await Categ.findById(req.params.id);
        if (req.body.catsId === req.params.id) {
        // if (post.username===req.body.username){
        try{
            const updatedCats=await Categ.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true});
            return res.status(200).json(updatedCats)
        }catch(err){
            return res.status(500).json(err);        
        }
        } else{
            return res.status(404).json("you can't update Categories!!!")
        }
    }catch(err){
        return res.status(500).json(err);
    }
});
//DELETE category

router.delete("/:id", async (req,res)=>{
    try{
        const cats=await Categ.findById(req.params.id);
        if(!cats)
        return res.status(401).json("category not found");
        if (cats.username===req.body.username){
        try{
            await cats.delete();
            return res.status(200).json("Category have been deleted...")
        }catch(err){
            return res.status(500).json(err);        
        }
        } else{
            return res.status(404).json("Category not found!!!")
        }
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports=router