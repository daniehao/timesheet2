defmodule TsheetWeb.TimesheetController do
  use TsheetWeb, :controller

  alias Tsheet.Timesheets
  alias Tsheet.Timesheets.Timesheet

  action_fallback TsheetWeb.FallbackController

  plug TsheetWeb.Plugs.RequireAuth when action in [:create, :update, :delete]

  def index(conn, _params) do
    timesheets = Timesheets.list_timesheets()
    render(conn, "index.json", timesheets: timesheets)
  end

  def create(conn, %{"timesheet" => timesheet_params}) do
    with {:ok, %Timesheet{} = timesheet} <- Timesheets.create_timesheet(timesheet_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.timesheet_path(conn, :show, timesheet))
      |> render("show.json", timesheet: timesheet)
    end
  end

  def show(conn, %{"id" => id}) do
    timesheet = Timesheets.get_timesheet!(id)
    render(conn, "show.json", timesheet: timesheet)
  end

  def update(conn, %{"id" => id, "timesheet" => timesheet_params}) do
    timesheet = Timesheets.get_timesheet!(id)

    with {:ok, %Timesheet{} = timesheet} <- Timesheets.update_timesheet(timesheet, timesheet_params) do
      render(conn, "show.json", timesheet: timesheet)
    end
  end

  def delete(conn, %{"id" => id}) do
    timesheet = Timesheets.get_timesheet!(id)

    with {:ok, %Timesheet{}} <- Timesheets.delete_timesheet(timesheet) do
      send_resp(conn, :no_content, "")
    end
  end

  def approve(conn, %{"id" => id}) do
    timesheet = Timesheets.get_timesheet!(id)
    timesheet_params = %{"status" => "Approved"}
    with {:ok, %Timesheet{} = timesheet} <- Timesheets.update_timesheet(timesheet, timesheet_params) do
      render(conn, "show.json", timesheet: timesheet)
    end
  end

end
