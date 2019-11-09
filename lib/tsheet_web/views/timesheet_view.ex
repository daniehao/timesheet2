defmodule TsheetWeb.TimesheetView do
  use TsheetWeb, :view
  alias TsheetWeb.TimesheetView
  alias Tsheet.Workers

  def render("index.json", %{timesheets: timesheets}) do
    %{data: render_many(timesheets, TimesheetView, "timesheet.json")}
  end

  def render("show.json", %{timesheet: timesheet}) do
    %{data: render_one(timesheet, TimesheetView, "timesheet.json")}
  end

  def render("timesheet.json", %{timesheet: timesheet}) do
    %{id: timesheet.id,
      worker_name: Workers.get_worker!(timesheet.worker_id).name,
      date: timesheet.date,
      tasks: timesheet.tasks,
      status: timesheet.status}
  end
end
