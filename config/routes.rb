Workspace::Application.routes.draw do
  
  root "linker#index"
  
  get "/show_params", to: "linker#show_params", as: "show_params_get"
  post "/show_params", to: "linker#show_params", as: "show_params_post"
  patch "/show_params", to: "linker#show_params", as: "show_params_patch"
  put "/show_params", to: "linker#show_params", as: "show_params_put"
  delete "/show_params", to: "linker#show_params", as: "show_params_delete"
  
  get "/download", to: "linker#download", ad: "download"
  
end
