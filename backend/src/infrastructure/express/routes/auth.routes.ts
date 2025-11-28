import { Router } from "express";
import { 
  loginController, 
  registerController, 
  forgotPasswordController, 
  meController 
} from "../../../services/internal/auth.service";
import { jwtAuth } from "../../../shared/middlewares/auth.middleware";

const router = Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const response = await loginController(email, password);
    return res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const response = await registerController(req.body);
    return res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/forgot-password", async (req, res, next) => {
  try {
    const response = await forgotPasswordController(req.body.email);
    return res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/me", jwtAuth, meController);

export default router;
