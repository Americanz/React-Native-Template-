import { CartModel } from "./Cart"

test("can be created", () => {
  const instance = CartModel.create({})

  expect(instance).toBeTruthy()
})

