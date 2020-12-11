class ApplicationController < ActionController::API
  before_action :configure_devise_parameters, if: :devise_controller?

  rescue_from ActiveRecord::RecordNotUnique, with: :record_not_unique

  def configure_devise_parameters
    devise_parameter_sanitizer.permit(:sign_up) {|u| u.permit(:username, :email, :password, :password_confirmation, :current_password)}
    devise_parameter_sanitizer.permit(:account_update) {|u| u.permit(:first_name, :last_name, :username, :description, :email, :password, :password_confirmation, :current_password)}
  end

  def render_jsonapi_response(resource)
    if resource.errors.empty?
      render json: resource.api
    else
      render jsonapi_errors: resource.errors, status: 400
    end
  end

  def record_not_unique(message)
    render json: {
      'errors': [
        {
          'status': '400',
          'title': message
        }
      ]
    }, status: 400
  end

end
