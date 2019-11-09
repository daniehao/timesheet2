defmodule Tsheet.Jobs.Job do
  use Ecto.Schema
  import Ecto.Changeset

  schema "jobs" do
    field :budget, :integer
    field :description, :string
    field :job_code, :string
    field :manager_id, :id

    timestamps()
  end

  @doc false
  def changeset(job, attrs) do
    job
    |> cast(attrs, [:job_code, :budget, :description])
    |> validate_required([:job_code, :budget, :description])
  end
end
