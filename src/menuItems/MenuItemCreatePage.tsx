import MenuItemForm from "./MenuItemForm";

function MenuItemCreatePage() {
  return (
    <section className="content container-fluid mx-5 my-2 py-4">
      <div className="d-flex justify-content-between pb-4 mb-5 border-bottom border-2">
        <h2>New Menu Item</h2>
      </div>
      <MenuItemForm />
    </section>
  );
}

export default MenuItemCreatePage;