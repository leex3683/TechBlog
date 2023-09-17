const router = require("express").Router();
const { Blogpost, User } = require("../models");
// const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogpostData = await Blogpost.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
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
