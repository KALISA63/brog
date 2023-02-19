const express=require('express');
const router=express.Router();
const Post=require('../models/Post');
const User=require('../models/User')

//register

router.post('/',async(req,res)=>
{
    const newPost= new Post(req.body);
    try{
        const savedPost=await newPost.save();
        return res.status(200).json(savedPost);
    }catch(err){
        console.log(err)
        return res.status(500).json(err);
    }
})

//Updating post

router.put('/:id',async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(req.body.postId===req.params.id)
        {
            try{
                const updatedPost=await Post.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                },
                {new:true});
                return res.status(200).json(updatedPost)
            }catch(err){
                return res.status(500).json(err);
            }
        }else{
            req.status(400).json('you are not allowed to updade!')
        }
    }catch(err){
        return res.status(500).json(err)
    }
});

//Get

router.get('/:id',async(req,res)=>{
    try{
        const post= await Post.findById(req.params.id)
        return res.status(200).json(post)
    }catch(err){
        return res.status(500).json(err);
    }
})

//Delete

router.delete('/:id',async(req,res)=>{
    try{
        const post= await Post.findById(req.params.id);
        if(!post){
            return res.status(401).json("Post not found!")
        }
        // else{
        //     return res.status(404).json("wrong post")
        // }
        if (post.username===req.body.username){
            try{
                await post.delete();
                return res.status(200).json('Post deleted...');
            }catch(err){
                return res.status(500).json(err)
            }
        }else{
            return res.status(404).json('you can not delete this post')
        }

    }catch(err){
        return res.status(500).json(err);
    }
})

//GET ALL POSTS


router.get("/",async(req, res)=>
{
    const username=req.query.user;
    const catName=req.query.cat;
    try{
        let posts;
        if(username){
            posts=await Post.find({username})
        }else if(catName){
            posts=await Post.find({categories:{
                $in:[catName]
            }})
        }else{posts=await Post.find()
        }
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports=router