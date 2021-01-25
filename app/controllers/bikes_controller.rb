class BikesController < ApplicationController
  before_action :set_bike, only: [:show, :update, :destroy]
  before_action :authenticate_user!, only: [:authenticate_user!, :create]
  before_action :authenticate_owner!, only: [:update, :destroy]
  # GET /bikes.0
  def index
    puts current_user
    puts params
    if params[:format] === "0"
      bikes = Bike.where(owner: current_user)
    else
      bikes = Bike.all
    end
    array = []
    bikes.each do |bike|
      image = bike.attributes
      image[:picture] = rails_blob_path(bike.pictures[0])
      array.push(image)
    end
    render json: array
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
    @bike.update(params.permit(
      :description,
      :brand,
      :model,
      :displacement,
      :mileage,
      :year,
      :category,
    ))

    puts params[:new_pictures]
    @bike.pictures.attach(params[:new_pictures]) if params[:new_pictures]

    print params[:current_pictures]
    puts ""

    params[:current_pictures].map{|current_picture|current_picture.split(",")}.each do |current_picture|
      puts current_picture
      if current_picture[1] == "true"
        puts "killing"
        @bike.pictures.find(current_picture[0]).purge
      else
        puts "keeping"
      end
    end

    render_jsonapi_response(@bike)
  end

  # DELETE /bikes/1
  def destroy
    @bike.destroy
  end

  private

    def authenticate_owner!
      @bike = Bike.find(params[:id])
      return @bike.owner === current_user
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_bike
      @bike = Bike.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def bike_params
      params.permit(
        :description,
        :brand,
        :model,
        :displacement,
        :mileage,
        :year,
        :category,
        pictures: []
      )
    end
end
