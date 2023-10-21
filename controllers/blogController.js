const Blog = require("../models/blog");
const blog_index = (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((result) => {
            res.render("index", {title: "All Blogs", blogs: result});
        })
        .catch((err) => {
            console.log(err);
        })
};

const blog_details = (req, res) => {
    const blogID = req.params.id;
    Blog.findById(blogID)
        .then((result) => {
            res.render("details", {title: "Blog Details", blog: result});
        })
        .catch((err) => {
            res.status(404).render("404", {title: "404"})
        })
};

const blog_create_get = (req, res) => {
    res.render("create", {title: "New Blog"});
};

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect("/blogs");
        })
        .catch((err) => {
            console.log(err);
        })
};

const blog_delete = (req, res) => {
    const blogID = req.params.id;
    Blog.findByIdAndDelete(blogID)
        .then((result) => {
            res.json({redirect: "/blogs"});
        })
        .catch((err) => {
            console.log(err);
        })
};

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
}