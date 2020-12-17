Rails.application.routes.default_url_options[:host] = 'localhost:3001'

Rails.application.routes.draw do

  root 'front_app#react'

  get "/mon-compte" => "front_app#react"
  get "/annonces" => "front_app#react"
  get "/annonce/:id" => "front_app#react"
  get "/connexion" => "front_app#react"
  get "/inscription" => "front_app#react"
  get "/mon-compte" => "front_app#react"
  get "/mon-compte/mon-garage" => "front_app#react"
  get "/mon-compte/mes-annonces" => "front_app#react"
  get "/mon-compte/reservations-recues" => "front_app#react"
  get "/mon-compte/reservations-envoyees" => "front_app#react"

  scope '/api', defaults: { format: :json } do
    resources :bookings
    resources :offers
    resources :tags
    resources :specs
    resources :bikes
  end

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :update]
  end

  devise_for :users,
    defaults: { format: :json },
    path: '',
    path_names: {
      sign_in: 'api/login',
      sign_out: 'api/logout',
      registration: 'api/signup'
    },
    controllers: {
      sessions: 'sessions',
      registrations: 'registrations'
    }

end
