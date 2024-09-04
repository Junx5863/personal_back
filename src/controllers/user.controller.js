const yup = require("yup");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { generateToken, verifyToken } = require("#U/jwt");

const emailer = require("#S/email");
const { userService, authService } = require("#S/users.services");

const userSchema = require("#M/user.model");

const loginSchema = yup.object().shape({
  email: yup.string().required("El usuario es requerido"),
  password: yup.string().required("La contraseña es requerida"),
});

exports.registerUser = async (req, res) => {
  try {
    const userData = { // Create a user data object
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };

    const savedUser = await userService.registerUser(userData);

    res.status(201).json({
      data: savedUser,
    });

    const inforesponse = await emailer.sendEmail({
      to: savedUser.email,
      userName: `${savedUser.first_name} ${savedUser.last_name}`,
    }).catch(() => {
      res
        .status(500)
        .json({ error: `Error al enviar el correo de verificación` });
    });


  } catch (error) {
    res
      .status(500)
      .json({ error: `Error al registrar el usuario: ${error.message}` });
  }
};

exports.loginUsers = async (req, res) => {
  try {
    await loginSchema.validate(req.body); // Assuming validation is still needed

    const { email, password } = req.body; // Destructuring for cleaner code

    const { token, user } = await authService.loginUser(email, password); // Call the service

    res.cookie('currentUser', token, { maxAge: 18000000 }); // Set cookie

    res.status(200).json({
      data: {
        message: 'Inicio exitoso.',
        token,
        user, // You can choose whether to return the user object or not based on your security requirements
      },
    });
  } catch (error) {
    let message = 'Error al iniciar sesión.';
    if (error.message === 'Invalid email or password') { // Handle specific error
      message = 'Correo electrónico o contraseña incorrectos.';
    }
    res.status(401).json({ error: message }); // Use 401 (Unauthorized) for login errors
  }
};

exports.currentData = async (req, res) => {
  try {
    const token = req.cookies.currentUser;
    if (!token) {
      return res.status(401).json({ error: "Sin sesion - No autorizado" });
    }

    const decoded = verifyToken(token);

    userSchema
      .findOne({
        email: decoded.email,
      })
      .then((data) => {
        res.status(200).send({
          data: data,
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

exports.allData = async (req, res) => {
  try {
    userSchema
      .find()
      .then((data) => {
        res.status(200).send({
          data: data,
        });
      })
      .catch((error) => {
        res.status(500).send({
          error: `Error al buscar usuarios: ${error}`,
        });
      });
  } catch (error) {
    res.status(400).send({
      error: `Error getting users ${error}`,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("currentUser");
    res.status(200).send({
      message: "Logout",
    });
  } catch (error) {
    res.status(400).send({
      error: `Error getting users ${error}`,
    });
  }
};
