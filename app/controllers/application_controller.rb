class ApplicationController < ActionController::API

  rescue_from ActiveRecord::RecordNotUnique, with: :record_not_unique

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

  def not_found
    raise ActionController::RoutingError.new('Not Found')
  rescue
    render_404
  end

  def render_404
    render file: "#{Rails.root}/app/views/front_app/react", status: :not_found
  end

end
