const yup = require("yup");
const { generateToken, verifyToken } = require("#U/jwt");

const emailer = require("#S/email");
const userService = require("#S/users.services");

const userSchema = require("#M/user.model");

const loginSchema = yup.object().shape({
  email: yup.string().required("El usuario es requerido"),
  password: yup.string().required("La contraseña es requerida"),
});

exports.registerUser = async (req, res) => {
  try {
    const userData = { 
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      age: req.body.age,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };
    console.log(userData);

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

    res.status(200).json({
      data: {
        message: "Usuario registrado con éxito.",
        user: savedUser,
      },
    });


  } catch (error) {
    res
      .status(500)
      .json({ error: `Error al registrar el usuario: ${error.message}` });
  }
};

exports.loginUsers = async (req, res) => {
  try {
    await loginSchema.validate(req.body); 

    const { email, password } = req.body; 

    const { token, user } = await userService.loginUser(email, password); 

    res.cookie('currentUser', token, { maxAge: 18000000 }); 

    res.status(200).json({
      data: {
        message: 'Inicio exitoso.',
        token,
        user,
      },
    });
  } catch (error) {
    let message = 'Error al iniciar sesión.';
    if (error.message === 'Invalid email or password') { 
      message = 'Correo electrónico o contraseña incorrectos.';
    }
    res.status(401).json({ error: message }); 
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
    const users = await userService.getAllUsers(); 

    res.status(200).json({
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      error: `Error al obtener todos los usuarios: ${error.message}`,
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
