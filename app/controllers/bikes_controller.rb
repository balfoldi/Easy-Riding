class BikesController < ApplicationController
  before_action :set_bike, only: [:show, :update, :destroy]
  before_action :authenticate_user!, only: [:update, :create, :destroy]

  # GET /bikes
  def index
    bikes = Bike.all

    render json: bikes
  end

  # GET /bikes/1
  def show
    render_jsonapi_response(@bike)
  end

  # POST /bikes
  def create
    @bike = Bike.new(bike_params)
    @bike[:owner_id] = current_user.id
    @bike.save
    render_jsonapi_response(@bike)
  end

  # PATCH/PUT /bikes/1
  def update
    if @bike.update(bike_params)
      render json: @bike
    else
      render json: @bike.errors, status: :unprocessable_entity
    end
  end

  # DELETE /bikes/1
  def destroy
    @bike.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_bike
      @bike = Bike.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def bike_params
      params.permit(
        :description,
        :kilometrage,
        :model,
        :company_name,
        :body_type,
        :maximum_power,
        :maximum_torque,
        :zero_to_100,
        :displacement,
        pictures: []
      )
    end
end
