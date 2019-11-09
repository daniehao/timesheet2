defmodule TsheetWeb.Router do
  use TsheetWeb, :router

  pipeline :ajax do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  scope "/ajax", TsheetWeb do
    pipe_through :ajax

    get "/workers/:email", WorkerController, :timesheets
    get "/managers/:email", ManagerController, :workers
    get "/timesheets/:id", TimesheetController, :show
    get "/timesheets/delete/:id", TimesheetController, :delete
    get "/timesheets/approve/:id", TimesheetController, :approve
    post "/timesheets/update", TimesheetController, :update
    resources "/users", UserController, except: [:new, :edit]
    resources "/managers", ManagerController, except: [:new, :edit]
    resources "/workers", WorkerController, except: [:new, :edit]
    resources "/jobs", JobController, except: [:new, :edit]
    resources "/timesheets", TimesheetController, except: [:new, :edit]
    resources "/sessions", SessionController, only: [:create], singleton: true
  end

  scope "/", TsheetWeb do
    pipe_through :browser # Use the default browser stack

    get "/*path", PageController, :index
    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", TsheetWeb do
  #   pipe_through :api
  # end
end
