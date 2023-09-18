const router = require("express").Router();
const { Blogpost, User, Comment } = require("../models");
// const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
  try {
    // Get all users and comments and JOIN with blogpost
    const blogpostData = await Blogpost.findAll({
      include: { all: true, nested: true },
    });
    const commentData = await Comment.findAll({
      include: { all: true, nested: true },
    });

    // Serialize data so the template can read it
    const blogposts = blogpostData.map((post) => post.get({ plain: true }));
    const comments = commentData.map((post)=> post.get({plain: true}));
    // Pass serialized data and session flag into template
    res.render("homepage", {
      blogposts,
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogpostData = await Blogpost.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
      where: [
        {
          user_id: req.session.user_id,
        },
      ],
    });

    // Serialize data so the template can read it
    const blogposts = blogpostData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("dashboard", {
      blogposts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//update by id path
router.get("/update/:id", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogpostData = await Blogpost.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
      where: [
        {
          id: req.params.id,
        },
      ],
    });

    // Serialize data so the template can read it
    const blogposts = blogpostData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("update", {
      blogposts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//update your own post
router.put("/update/:id", async (req, res) => {
  // update a blogpost by its `id` value
  try {
    const blogpostData = await Blogpost.update(
      {
        name: req.body.name,
        post: req.body.post,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!blogpostData) {
      res.status(404).json({ message: "No blogpost found with that id!" });
      return;
    }

    res.status(200).json(blogpostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update your own post
router.post("/comment", async (req, res) => {
  // add a comment. Save the user id and blogpost_id
  try {
    const commentData = await Comment.create(
      {
        posted_comment: req.body.post,
        user_id: req.session.user_id,
        blogpost_id: req.body.blogpost_id,
      },
    );

    if (!commentData) {
      res.status(404).json({ message: "No blogpost found with that id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
      console.log(req.body.post)
      console.log("my user id is" + req.session.user_id)
      console.log(req.body.blogpost_id)
    res.status(500).json(err);
  }
});

//Render a reply to leave a comment
router.get("/comment/:id", async (req, res) => {
  try {
    // Get all blogposts and JOIN with user data
    const blogpostData = await Blogpost.findAll({
      include: { all: true, nested: true },
      where: [
        {
          id: req.params.id,
        },
      ],
    });

    const commentData = await Comment.findAll({
      include: { all: true, nested: true },
      where: [
        {
          blogpost_id: req.params.id,
        },
      ],
    });

    // Serialize data so the template can read it
    const blogposts = blogpostData.map((post) => post.get({ plain: true }));
    const blogpostcomments = commentData.map((bpcomment) => bpcomment.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("leavecomment", {
      blogposts,
      blogpostcomments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", (req, res) => {
  // If the user clicks "sign up" they will route to the sign up handlebars page
  res.render("signup");
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
