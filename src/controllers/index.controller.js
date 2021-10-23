const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
    req.flash("success_msg", "You are logged out now.");
    res.render('index');
};

indexCtrl.renderAbout = (req, res) => {
    res.render('about');
};

module.exports = indexCtrl;