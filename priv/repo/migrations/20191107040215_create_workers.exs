defmodule Tsheet.Repo.Migrations.CreateWorkers do
  use Ecto.Migration

  def change do
    create table(:workers) do
      add :name, :string, null: false
      add :email, :string, null: false
      add :manager_id, references(:managers, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:workers, [:manager_id])
  end
end
