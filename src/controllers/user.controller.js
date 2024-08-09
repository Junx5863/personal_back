const yup = require('yup');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const userSchema = require("#M/user.model");

const loginSchema = yup.object().shape({
  email: yup.string().required('El usuario es requerido'),
  password: yup.string().required('La contraseña es requerida')
});



exports.registerUser = async (req, res) => {
  try {
    await req.body;
    let hashedpass = crypto
      .createHash("sha512")
      .update(req.body.password)
      .digest("hex");

    let newUser = new userSchema({
      firt_name: req.body.firt_name,
      last_name: req.body.last_name,
      age: req.body.age,
      email: req.body.email,
      password: hashedpass,
    });

    newUser
      .save()
      .then((data) => {
        res.status(201).json({ data: data });
      })
      .catch((error) => {
        res
          .status(500)
          .json({ error: `Error al registrar el usuario: ${error}` });
        return;
      });
  } catch (error) {
    res.status(400).send({
      error: `Error creating user ${error}`,
    });
  }
};

exports.loginUsers = async (req, res) => {
  try {
    await loginSchema.validate(req.body);

    let hashedpass = crypto
      .createHash("sha512")
      .update(req.body.password)
      .digest("hex");

    userSchema
      .findOne({
        email: req.body.email,
        password: hashedpass,
      })
      .then((data) => {
        let response = {
          token: null,
          msg: "",
        };

        if (data !== null) {
          response.token = jwt.sign(
            {
              id: data._id,
              email: data.email,
            },
            "__recret__",
            { expiresIn: "12h" }
          );
        }
        res.status(200).send({
          data: response,
        });
      })
      .catch((error) => {
        res.status(500).send({
          error: `Error al buscar usuario: ${error}`,
        });
      });
  } catch (error) {
    res.status(400).send({
      error: `Error getting users ${error}`,
    });
  }
};
