import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { render } from "@testing-library/react";
import MenuItemCard from "./MenuItemCard";
import { MemoryRouter } from "react-router-dom";
import { IMenuItem } from "./IMenuItem";

const menuItem: IMenuItem = {
    id: 1,
    name: "Test Item",
    price: 9.99,
    categoryId: undefined,
    category: undefined
};
it("reveals Edit and Delete when the ⋮ menu is opened", async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <MenuItemCard menuItem={menuItem} onRemove={() => {}} />
    </MemoryRouter>,

  );

  expect(screen.queryByText("Edit")).not.toBeInTheDocument();

  await user.click(screen.getByRole("button"));

  expect(screen.getByText("Edit")).toBeInTheDocument();
  expect(screen.getByText("Delete")).toBeInTheDocument();

});
