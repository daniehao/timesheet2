use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :tsheet, TsheetWeb.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :tsheet, Tsheet.Repo,
  username: "ts",
  password: "eGahkeigh2ek",
  database: "tsheet_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
