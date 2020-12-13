Rails.application.routes.default_url_options[:host] = 'localhost:3001'

Rails.application.routes.draw do

  root 'front_app#react'

  
  scope '/api', defaults: { format: :json } do
    resources :bookings
    resources :offers
    resources :tags
    resources :specs
    resources :bikes
  end
  
  get '*path' => "front_app#react"

  namespace :api, defaults: { format: :json } do
    resources :users, only: %w[show]
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
