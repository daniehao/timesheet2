defmodule Tsheet.Repo.Migrations.CreateManagers do
  use Ecto.Migration

  def change do
    create table(:managers) do
      add :name, :string, null: false
      add :email, :string, null: false

      timestamps()
    end

  end
end
