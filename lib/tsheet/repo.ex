defmodule Tsheet.Repo do
  use Ecto.Repo,
    otp_app: :tsheet,
    adapter: Ecto.Adapters.Postgres
end
