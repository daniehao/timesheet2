defmodule Tsheet.Repo.Migrations.CreateJobs do
  use Ecto.Migration

  def change do
    create table(:jobs) do
      add :job_code, :string, null: false
      add :budget, :integer, null: false
      add :description, :text, null: false
      add :manager_id, references(:managers, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:jobs, [:manager_id])
  end
end
