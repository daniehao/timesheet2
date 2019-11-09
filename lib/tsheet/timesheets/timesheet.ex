defmodule Tsheet.Timesheets.Timesheet do
  use Ecto.Schema
  import Ecto.Changeset

  schema "timesheets" do
    field :date, :date
    field :status, :string
    field :tasks, {:array, :string}
    field :worker_id, :id

    timestamps()
  end

  @doc false
  def changeset(timesheet, attrs) do
    timesheet
    |> cast(attrs, [:date, :tasks, :status, :worker_id])
    |> validate_required([:date, :tasks, :status, :worker_id])
  end
end
