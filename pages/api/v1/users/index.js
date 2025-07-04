import { createRouter } from "next-connect";
import controller from "infra/controller";
import user from "models/user";

const router = createRouter();

router.post(postHandler);

export async function postHandler(req, res) {
  const userInputValues = req.body;

  const newUser = await user.create(userInputValues);

  res.status(201).json(newUser);
}

export default router.handler(controller.errorHandlers);
