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
  get "/mon-compte/mon-profile" => "front_app#react"
  get "/annonces/grand-est" => "front_app#react"
  get "/annonces/nouvelle-aquitaine" => "front_app#react"
  get "/annonces/auvergne-rhone-alpes" => "front_app#react"
  get "/annonces/bourgogne-franche-comte" => "front_app#react"
  get "/annonces/bretagne" => "front_app#react"
  get "/annonces/centre-val-de-loire" => "front_app#react"
  get "/annonces/corse" => "front_app#react"
  get "/annonces/ile-de-france" => "front_app#react"
  get "/annonces/occitanie" => "front_app#react"
  get "/annonces/hauts-de-france" => "front_app#react"
  get "/annonces/normandie" => "front_app#react"
  get "/annonces/pays-de-la-loire" => "front_app#react"
  get "/annonces/provence-alpes-cote-dazur" => "front_app#react"
  scope '/api', defaults: { format: :json } do
    resources :bookings
    resources :offers
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
