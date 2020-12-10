class RegistrationsController < Devise::RegistrationsController

  def create
    puts "$"*30
    puts I18n.t "hello"
    puts "$"*30
    build_resource(sign_up_params)
    resource.save
    sign_up(resource_name, resource) if resource.persisted?
    render_jsonapi_response(resource)
  end

end
