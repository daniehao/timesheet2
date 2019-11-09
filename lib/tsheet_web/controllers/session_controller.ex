defmodule TsheetWeb.SessionController do
  use TsheetWeb, :controller

  action_fallback TsheetWeb.FallbackController

  alias Tsheet.Users

  def create(conn, %{"email" => email, "password" => password}) do
    IO.puts("session creating")
    IO.puts(email)
    IO.puts(password)
    user = Users.authenticate_user(email, password)
    if user do
      IO.puts("Logged in")
      token = Phoenix.Token.sign(conn, "session", user.id)
      resp = %{token: token, user_id: user.id, user_name: user.name, is_manager: user.is_manager, email: user.email}
      conn
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:created, Jason.encode!(resp))
    else
      IO.puts("login failed")
      resp = %{errors: ["Authentication Failed"]}
      conn
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:unauthorized, Jason.encode!(resp))
    end
  end
end
