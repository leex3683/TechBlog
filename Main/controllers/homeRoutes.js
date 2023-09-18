const router = require("express").Router();
const { Blogpost, User, Comment } = require("../models");
const withAuth = require('../utils/auth');

//Redner homepage
router.get("/", async (req, res) => {
  try {
    const blogpostData = await Blogpost.findAll({
      include: { all: true, nested: true },
    });

    // Serialize data so the template can read it
    const blogposts = blogpostData.map((post) => post.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render("homepage", {
      blogposts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//render dashboard
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Get all logged in user's posts
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

//router to new blog post
router.get("/newpost", withAuth, async (req, res) => {
  try {
    const blogpostData = await Blogpost.findAll({
      include: { all: true, nested: true },
    });

    // Serialize data so the template can read it
    const blogposts = blogpostData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("newpost", {
      blogposts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//post new blog
router.post("/newpost",withAuth, async (req, res) => {
  // create a new blogpost
  try {
    const blogpostData = await Blogpost.create(
      {
        name: req.body.name,
        post: req.body.post,
        user_id: req.session.user_id,
      },
    );
    if (!blogpostData) {
      res.status(404).json({ message: "Couldn't create blogpost" });
      return;
    }
    res.status(200).json(blogpostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update by id path
router.get("/update/:id", withAuth, async (req, res) => {
  try {
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
router.put("/update/:id",withAuth, async (req, res) => {
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

//Comment on a blogpost
router.post("/comment",withAuth, async (req, res) => {
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
    res.status(500).json(err);
  }
});

//Renders blogpost, comments and a form to enter a comment
router.get("/comment/:id",withAuth, async (req, res) => {
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
