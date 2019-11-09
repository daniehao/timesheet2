defmodule TsheetWeb.ManagerController do
  use TsheetWeb, :controller

  alias Tsheet.Managers
  alias Tsheet.Managers.Manager

  action_fallback TsheetWeb.FallbackController

  plug TsheetWeb.Plugs.RequireAuth when action in [:create, :update, :delete]

  def index(conn, _params) do
    managers = Managers.list_managers()
    render(conn, "index.json", managers: managers)
  end

  def create(conn, %{"manager" => manager_params}) do
    with {:ok, %Manager{} = manager} <- Managers.create_manager(manager_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.manager_path(conn, :show, manager))
      |> render("show.json", manager: manager)
    end
  end

  def show(conn, %{"id" => id}) do
    manager = Managers.get_manager!(id)
    render(conn, "show.json", manager: manager)
  end

  def update(conn, %{"id" => id, "manager" => manager_params}) do
    manager = Managers.get_manager!(id)

    with {:ok, %Manager{} = manager} <- Managers.update_manager(manager, manager_params) do
      render(conn, "show.json", manager: manager)
    end
  end

  def delete(conn, %{"id" => id}) do
    manager = Managers.get_manager!(id)

    with {:ok, %Manager{}} <- Managers.delete_manager(manager) do
      send_resp(conn, :no_content, "")
    end
  end
 
  def workers(conn, %{"email" => email}) do
    IO.puts("workers getting")
    manager = Managers.get_manager_with_workers!(email)
    IO.puts("manager with workers")
    IO.inspect(manager)
    render(conn, "workers.json", manager: manager)
  end
end
