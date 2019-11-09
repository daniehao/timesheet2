defmodule Tsheet.Repo.Migrations.CreateTimesheets do
  use Ecto.Migration

  def change do
    create table(:timesheets) do
      add :date, :date, null: false
      add :tasks, {:array, :string}, default: []
      add :status, :string, default: "Waiting"
      add :worker_id, references(:workers, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:timesheets, [:worker_id])
  end
end
