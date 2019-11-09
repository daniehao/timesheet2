defmodule TsheetWeb.WorkerView do
  use TsheetWeb, :view
  alias TsheetWeb.WorkerView

  def render("index.json", %{workers: workers}) do
    %{data: render_many(workers, WorkerView, "worker.json")}
  end

  def render("show.json", %{worker: worker}) do
    %{data: render_one(worker, WorkerView, "worker.json")}
  end

  def render("worker.json", %{worker: worker}) do
    %{id: worker.id,
      name: worker.name,
      email: worker.email}
  end

  def render("timesheets.json", %{worker: worker}) do
    %{id: worker.id,
      name: worker.name,
      email: worker.email,
      timesheets: Enum.map(worker.timesheets, fn timesheet -> %{id: timesheet.id,
                                                                date: timesheet.date,
                                                                tasks: timesheet.tasks,
                                                                status: timesheet.status} end)}
  end
end
