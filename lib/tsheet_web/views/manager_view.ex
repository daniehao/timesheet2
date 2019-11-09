defmodule TsheetWeb.ManagerView do
  use TsheetWeb, :view
  alias TsheetWeb.ManagerView

  def render("index.json", %{managers: managers}) do
    %{data: render_many(managers, ManagerView, "manager.json")}
  end

  def render("show.json", %{manager: manager}) do
    %{data: render_one(manager, ManagerView, "manager.json")}
  end

  def render("manager.json", %{manager: manager}) do
    %{id: manager.id,
      name: manager.name,
      email: manager.email}
  end
  def render("workers.json", %{manager: manager}) do
    %{name: manager.name,
      email: manager.email,
      workers: Enum.map(manager.workers, fn worker -> 
        %{id: worker.name,
          timesheets: Enum.map(worker.timesheets, fn timesheet ->
            %{id: timesheet.id,
              date: timesheet.date,
              tasks: timesheet.tasks,
              status: timesheet.status,} 
          end)} end)}
  end
end
