const userModel = require("#M/user.model");
const { verifyToken } = require("#U/jwt");

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.currentUser;
    if (!token) {
      return res.status(401).json({ error: "Sin sesion" });
    }
    const decoded = verifyToken(token);

    const user = await userModel.findOne({
      email: decoded.email,
    });

    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    req.user = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: decoded.email,
      role: decoded.role,
    };

    next(); 
  } catch (error) {
    res.status(400).send({
      error: `No autorizado ${error}` ,
    });
  }
};


exports.autorisations = (req, res, next) => {


    const { role } = req.user;
    if (role === "admin") {
      next();
    }else{
        return res.status(401).json({
            message: "No Autorizado"
        });
    }

};