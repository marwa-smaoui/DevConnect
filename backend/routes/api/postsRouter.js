const express = require("express");
const auth = require("../../middleware/auth");
const Posts = require("../../models/Posts");
const Profile = require("../../models/Profile");
const Contact = require("../../models/Contact");
const { check, validationResult } = require("express-validator");
const router = express.Router();

//@route     POST api/posts
//@desc        Create a post
//@access      Private
router.post(
  "/",
  auth,
  [check("text", "Text is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const contact = await Contact.findById(req.contact.id).select(
        "-password"
      );

      const newPost = new Posts({
        text: req.body.text,
        name: contact.name,
        avatar: contact.avatar,
        contact: req.contact.id,
      });
      const post = await newPost.save();

      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route     GET api/posts
//@desc        Get all posts
//@access      Private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Posts.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
//@route     GET api/posts/:id
//@desc        Get post by id
//@access      Private

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found !!" });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found !! " });
    }
    res.status(500).send("Server Error");
  }
});
//@route     DELETE api/posts/:id
//@desc        Delete post by id
//@access      Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found !!" });
    }

    // check the user
    if (post.contact.toString() !== req.contact.id) {
      return res.status(401).json({ msg: "User not authorized !! " });
    }

    await post.remove();
    console.log(post);
    res.json({ msg: "Post deleted !!" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found !! " });
    }
    res.status(500).send("Server Error");
  }
});

//@route    PUT api/posts/like/:id
//@desc        like a post
//@access      Private

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);

    // check if the post has already been liked

    if (
      post.likes.filter((like) => like.contact.toString() === req.contact.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: "Post already liked !!" });
    }
    post.likes.unshift({ contact: req.contact.id });
    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found !! " });
    }
    res.status(500).send("Server Error");
  }
});
//@route    PUT api/posts/unlike/:id
//@desc        unlike a post
//@access      Private

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);

    // check if the post has already been liked

    if (
      post.likes.filter((like) => like.contact.toString() === req.contact.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked !!" });
    }

    // remove the like (get remove index)
    const removeIndex = post.likes
      .map((like) => like.contact.toString())
      .indexOf(req.contact.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found !! " });
    }
    res.status(500).send("Server Error");
  }
});

//@route     POST api/posts/comment/:id
//@desc        Comment a post
//@access      Private
router.post(
  "/comment/:id",
  auth,
  [check("text", "Text is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const contact = await Contact.findById(req.contact.id).select(
        "-password"
      );
      const post = await Posts.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: contact.name,
        avatar: contact.avatar,
        contact: req.contact.id,
      };
      post.comments.unshift(newComment);
      await post.save();

      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route     DELETE api/posts/comment/:id/:comment_id
//@desc        Delete a comment
//@access      Private

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
   // Make sure comment exist
    if(!comment){
    return res.status(404).json({msg:'Comment does not exist !!'})
    }

    // check the user 
   if(comment.contact.toString()!== req.contact.id){
    return res.status(401).json({msg:'User not authorized !!'})   
   }
   // get remove index

const removeIndex = post.comments
      .map((comment) => comment.contact.toString())
      .indexOf(req.contact.id);

    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
