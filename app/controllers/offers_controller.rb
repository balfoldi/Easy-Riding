class OffersController < ApplicationController
  before_action :set_offer, only: [:show, :update, :destroy]

  # GET /offers
  def index    
    if params[:format] === "0"
      offers = Offer.joins(:bike).where(bikes: {owner: User.last})
    else
      offers = Offer.all
    end
    puts offers
    render json: offers.map{|offer|offer.api}
  end

  # GET /offers/1
  def show
    render json: @offer
  end

  # POST /offers
  def create
    @offer = Offer.new(offer_params)
    @offer.save
    render_jsonapi_response(@offer)
  end

  # PATCH/PUT /offers/1
  def update
    @offer.update(offer_params)
    render_jsonapi_response(@offer)

  end

  # DELETE /offers/1
  def destroy
    @offer.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_offer
      @offer = Offer.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def offer_params
      params.require(:offer).permit(:bike_id, :title, :description, :daily_price, :start_date, :end_date, :city, :zip_code, :street, :region)
    end
end
