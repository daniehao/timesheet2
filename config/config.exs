# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :tsheet,
  ecto_repos: [Tsheet.Repo]

# Configures the endpoint
config :tsheet, TsheetWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "IAqXQS6sCEA9INbTmbIkU3HpG4VD1Sf2pbgYiTD32tL1wQStm2w2jr1kfNoxEY9e",
  render_errors: [view: TsheetWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Tsheet.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix and Ecto
config :phoenix, :json_library, Jason
config :ecto, :json_library, Jason


# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
