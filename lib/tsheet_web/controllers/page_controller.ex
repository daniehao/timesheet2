defmodule TsheetWeb.PageController do
  use TsheetWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
