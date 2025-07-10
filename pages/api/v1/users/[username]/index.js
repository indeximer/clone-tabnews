import { createRouter } from "next-connect";
import controller from "infra/controller";
import user from "models/user";

const router = createRouter();

router.get(getHandler);
router.patch(patchHandler);

export async function getHandler(req, res) {
  const username = req.query.username;
  const userFound = await user.findOneByUsername(username);

  res.status(200).json(userFound);
}

export async function patchHandler(req, res) {
  const username = req.query.username;
  const userInputValues = req.body;

  const updateUser = await user.update(username, userInputValues);

  res.status(200).json(updateUser);
}

export default router.handler(controller.errorHandlers);
