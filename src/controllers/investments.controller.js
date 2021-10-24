const investmentsCtrl = {};

// Helpers
const { ShowedOnboarding } = require("../helpers/onboardings");

// Models
const Note = require("../models/Note");
const Investment = require("../models/Investment");

investmentsCtrl.renderWelcomeInvestments = async(req, res) => {
    var isShowedOnboarding = await ShowedOnboarding(req.user.id, "onboardingwelcomeshowed");
    if (isShowedOnboarding) {
        res.redirect("/investments")
    } else {
        res.render("investments/welcome-investments");
    }
};

investmentsCtrl.renderWizardInvestments = (req, res) => {
    res.render("investments/wizard-investments");
};

investmentsCtrl.Recommendations = (req, res) => {
    res.render("investments/recommendations");
};

investmentsCtrl.renderInsights = (req, res) => {
    res.render("investments/insights");
};

investmentsCtrl.AllProducts = (req, res) => {
    res.render("investments/products/all-products");
};

investmentsCtrl.RecommendedProducts = (req, res) => {
    res.render("investments/products/recommended-products");
};

investmentsCtrl.RecommendedProductsProcessing = (req, res) => {
    res.render("investments/wizard-investments-loading");
};

investmentsCtrl.renderNoteForm = (req, res) => {
    res.render("investments/new-investment");
};

investmentsCtrl.landingNewInvestment = (req, res) => {
    res.render("investments/landing-new-investment");
};

investmentsCtrl.createNewNote = async(req, res) => {
    const { title, description } = req.body;
    const errors = [];
    if (!title) {
        errors.push({ text: "Please Write a Title." });
    }
    if (!description) {
        errors.push({ text: "Please Write a Description" });
    }
    if (errors.length > 0) {
        res.render("investments/new-investment", {
            errors,
            title,
            description,
        });
    } else {
        const newNote = new Note({ title, description });
        newNote.user = req.user.id;
        await newNote.save();
        req.flash("success_msg", "Note Added Successfully");
        res.redirect("/investments");
    }
};

investmentsCtrl.renderInvestments = async(req, res) => {

    var isShowedOnboarding = await ShowedOnboarding(req.user.id, "onboardinginvestmentsshowed");
    const investments = await Investment.find({ user: req.user.id })
        .sort({ date: "desc" })
        .lean();
    const data = {
        investments: investments,
        isShowedOnboarding: isShowedOnboarding
    }
    res.render("investments/all-investments", { data });
};

investmentsCtrl.renderEditForm = async(req, res) => {
    const note = await Note.findById(req.params.id).lean();
    if (note.user != req.user.id) {
        req.flash("error_msg", "Not Authorized");
        return res.redirect("/notes");
    }
    res.render("notes/edit-note", { note });
};

investmentsCtrl.updateNote = async(req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash("success_msg", "Note Updated Successfully");
    res.redirect("/notes");
};

investmentsCtrl.deleteInvestment = async(req, res) => {
    await Investment.findByIdAndUpdate(req.params.id, { active: false });
    req.flash("success_msg", "Investment Suspended Successfully");
    res.redirect("/investments");
};


// Products
investmentsCtrl.productOne = (req, res) => {
    res.render("investments/products/contracts/product_one");
};
investmentsCtrl.contractProductOne = async(req, res) => {
    const { monto, plazo } = req.body;
    const user_id = req.user.id;
    const errors = [];
    if (!monto) {
        errors.push({ text: "Por favor agrega un monto." });
    }
    if (!plazo) {
        errors.push({ text: "Por favor especifica un plazo." });
    }
    if (!user_id) {
        errors.push({ text: "Error en la sesión." });
    }
    if (errors.length > 0) {
        res.render("investments/products/contracts/product_one", {
            errors,
            title,
            description,
        });
    } else {
        try {
            await createContract(0, "Producto de inversión Pagaré", "Con un pagaré inviertes tu dinero y no pierde valor con el tiempo.", "fixed", 1.85, monto, plazo, user_id)
            req.flash("success_msg", "Inversión creada correctamente");
            res.redirect("/investments/landing-new-investment");
        } catch (error) {
            req.flash("error_msg", "No se pudo crear la inversión, contacta a BBVA. ERROR_CODE: 01");
            res.redirect("/investments");
        }
    }
    //res.render("investments/products/contracts/product_one");
};


investmentsCtrl.productTwo = (req, res) => {
    res.render("investments/products/contracts/product_two");
};
investmentsCtrl.contractProductTwo = async(req, res) => {
    const { monto, plazo } = req.body;
    const user_id = req.user.id;
    const errors = [];
    if (!monto) {
        errors.push({ text: "Por favor agrega un monto." });
    }
    if (!plazo) {
        errors.push({ text: "Por favor especifica un plazo." });
    }
    if (!user_id) {
        errors.push({ text: "Error en la sesión." });
    }
    if (errors.length > 0) {
        res.render("investments/products/contracts/product_two", {
            errors,
            title,
            description,
        });
    } else {
        try {
            await createContract(1, "Producto de inversión Cedes", "Los Certificados de Depósito o Cedes son una inversión a plazo en moneda nacional.", "fixed", 2.04, monto, plazo, user_id)
            req.flash("success_msg", "Inversión creada correctamente");
            res.redirect("/investments/landing-new-investment");
        } catch (error) {
            req.flash("error_msg", "No se pudo crear la inversión, contacta a BBVA. ERROR_CODE: 01");
            res.redirect("/investments");
        }
    }
    //res.render("investments/products/contracts/product_two");
};


investmentsCtrl.productThree = (req, res) => {
    res.render("investments/products/contracts/product_three");
};
investmentsCtrl.contractProductThree = async(req, res) => {
    const { monto, plazo } = req.body;
    const user_id = req.user.id;
    const errors = [];
    if (!monto) {
        errors.push({ text: "Por favor agrega un monto." });
    }
    if (!plazo) {
        errors.push({ text: "Por favor especifica un plazo." });
    }
    if (!user_id) {
        errors.push({ text: "Error en la sesión." });
    }
    if (errors.length > 0) {
        res.render("investments/products/contracts/product_three", {
            errors,
            title,
            description,
        });
    } else {
        try {
            await createContract(2, "Producto de inversión Fondo Líquido en Pesos", "Estrategia de corto plazo que invierte en instrumentos de deuda.", "fixed", 3.08, monto, plazo, user_id)
            req.flash("success_msg", "Inversión creada correctamente");
            res.redirect("/investments/landing-new-investment");
        } catch (error) {
            req.flash("error_msg", "No se pudo crear la inversión, contacta a BBVA. ERROR_CODE: 01");
            res.redirect("/investments");
        }
    }
    //res.render("investments/products/contracts/product_three");
};


investmentsCtrl.productFour = (req, res) => {
    res.render("investments/products/contracts/product_four");
};
investmentsCtrl.contractProductFour = async(req, res) => {
    const { monto, plazo } = req.body;
    const user_id = req.user.id;
    const errors = [];
    if (!monto) {
        errors.push({ text: "Por favor agrega un monto." });
    }
    if (!plazo) {
        errors.push({ text: "Por favor especifica un plazo." });
    }
    if (!user_id) {
        errors.push({ text: "Error en la sesión." });
    }
    if (errors.length > 0) {
        res.render("investments/products/contracts/product_four", {
            errors,
            title,
            description,
        });
    } else {
        try {
            await createContract(2, "Producto de inversión Fondo Acciones México", "Estrategia de largo plazo que invierte en acciones de empresas nacionales.", "variable", 10.00, monto, plazo, user_id)
            req.flash("success_msg", "Inversión creada correctamente");
            res.redirect("/investments/landing-new-investment");
        } catch (error) {
            req.flash("error_msg", "No se pudo crear la inversión, contacta a BBVA. ERROR_CODE: 01");
            res.redirect("/investments");
        }
    }
    //res.render("investments/products/contracts/product_four");
};


investmentsCtrl.productFive = (req, res) => {
    res.render("investments/products/contracts/product_five");
};
investmentsCtrl.contractProductFive = async(req, res) => {
    const { monto, plazo } = req.body;
    const user_id = req.user.id;
    const errors = [];
    if (!monto) {
        errors.push({ text: "Por favor agrega un monto." });
    }
    if (!plazo) {
        errors.push({ text: "Por favor especifica un plazo." });
    }
    if (!user_id) {
        errors.push({ text: "Error en la sesión." });
    }
    if (errors.length > 0) {
        res.render("investments/products/contracts/product_five", {
            errors,
            title,
            description,
        });
    } else {
        try {
            await createContract(2, "Producto de inversión Fondo de Inversión Sostenible", "El Fondo busca principalmente la inversión en instrumentos de renta variable internacional que consideren alguno de los criterios de inversión sostenibles; compañías con una elevada calificación medioambiental, social y de gobierno corporativo.", "variable", 10.00, monto, plazo, user_id)
            req.flash("success_msg", "Inversión creada correctamente");
            res.redirect("/investments/landing-new-investment");
        } catch (error) {
            req.flash("error_msg", "No se pudo crear la inversión, contacta a BBVA. ERROR_CODE: 01");
            res.redirect("/investments");
        }
    }
    //res.render("investments/products/contracts/product_five");
};


investmentsCtrl.productSix = (req, res) => {
    res.render("investments/products/contracts/product_six");
};
investmentsCtrl.contractProductSix = async(req, res) => {
    const { monto, plazo } = req.body;
    const user_id = req.user.id;
    const errors = [];
    if (!monto) {
        errors.push({ text: "Por favor agrega un monto." });
    }
    if (!plazo) {
        errors.push({ text: "Por favor especifica un plazo." });
    }
    if (!user_id) {
        errors.push({ text: "Error en la sesión." });
    }
    if (errors.length > 0) {
        res.render("investments/products/contracts/product_six", {
            errors,
            title,
            description,
        });
    } else {
        try {
            await createContract(2, "Producto de inversión Portafolio Multiestrategia Moderado", "Estrategia de largo plazo moderada que invierte a través de un proceso inversor disciplinado que enfatiza en la preservación de capital, la consistencia de resultados y un rendimiento positivo desafiando las condiciones del mercado.", "variable", 10.00, monto, plazo, user_id)
            req.flash("success_msg", "Inversión creada correctamente");
            res.redirect("/investments/landing-new-investment");
        } catch (error) {
            req.flash("error_msg", "No se pudo crear la inversión, contacta a BBVA. ERROR_CODE: 01");
            res.redirect("/investments");
        }
    }
    //res.render("investments/products/contracts/product_six");
};

async function createContract(idCatalogInvestment, title, description, type_rent, interest, monto, periodicity, user) {
    //todo get actual balance
    var init_balance = 0;
    let now = new Date();
    console.log('---Creating Contract---');
    try {
        const newInvestment = new Investment({
            idCatalogInvestment: idCatalogInvestment,
            title: title,
            description: description,
            type_rent: type_rent,
            init_balance: monto,
            investment_balance: monto,
            interest: interest,
            periodicity: periodicity,
            init_date: now,
            active: true,
            user: user
        });
        await newInvestment.save();
    } catch (error) {
        console.log("erro: ", error);
    }
    console.log('---Creating Contract END---');
}

module.exports = investmentsCtrl;