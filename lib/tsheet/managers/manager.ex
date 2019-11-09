defmodule Tsheet.Managers.Manager do
  use Ecto.Schema
  import Ecto.Changeset

  schema "managers" do
    field :email, :string
    field :name, :string
    has_many :workers, Tsheet.Workers.Worker    
    
    timestamps()
  end

  @doc false
  def changeset(manager, attrs) do
    manager
    |> cast(attrs, [:name, :email])
    |> validate_required([:name, :email])
  end
end
