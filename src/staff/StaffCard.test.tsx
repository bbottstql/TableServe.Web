import { MemoryRouter } from "react-router-dom";
import { IStaff } from "./IStaff";
import StaffCard from "./StaffCard";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { it, expect } from "vitest";

function makeStaff(overrides: Partial<IStaff> = {}): IStaff {
  return {
    id: 1,
    username: "ada.lovelace",
    password: "",
    firstName: "Ada",
    lastName: "Lovelace",
    phone: "8005551234",
    email: "ada@tableserve.test",
    isManager: false,
    isAdmin: false,
    ...overrides,
  };
}

it("shows controls and contact info for an admin staff card", async () => {
  const staff = makeStaff({ isAdmin: true });
  render(
    <MemoryRouter>
      <StaffCard staff={staff} onRemove={() => {}} />
    </MemoryRouter>,
  );

  const user = userEvent.setup();
  await user.click(screen.getByRole("button"));

  expect(screen.getByText("Edit")).toBeInTheDocument();
  expect(screen.getByText("Delete")).toBeInTheDocument();

  expect(screen.getByText(/ada\.lovelace/i)).toBeInTheDocument();

  expect(screen.getByText(/ada@tableserve.test/i)).toBeInTheDocument();

  expect(screen.getByText(/\(800\) 555-1234/)).toBeInTheDocument();

  expect(screen.getByText("Admin")).toBeInTheDocument();
  expect(screen.queryByText("Manager")).not.toBeInTheDocument();
});
