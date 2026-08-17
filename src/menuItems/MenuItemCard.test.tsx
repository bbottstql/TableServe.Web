/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MenuItemCard from "./MenuItemCard";
import { IMenuItem } from "./IMenuItem";
import userEvent from "@testing-library/user-event";

const menuItem: IMenuItem = {
  id: 1,
  name: "Loaded Fries",
  price: 8.5,
  categoryId: 2,
  category: undefined,
};

describe("MenuItemCard", () => {
  it("shows the menu item's name and price", () => {
    render(
      <MemoryRouter>
        <MenuItemCard menuItem={menuItem} onRemove={() => {}} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Loaded Fries")).toBeInTheDocument();
    expect(screen.getByText("$8.5")).toBeInTheDocument();
  });
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
});
