require 'date'
class OffersController < ApplicationController
  before_action :set_offer, only: [:show, :update, :destroy]
  before_action :authenticate_user!, only: [:authenticate_user!, :create]
  before_action :authenticate_owner!, only: [:update, :destroy]
  before_action :update_dates

  def index    
    if params[:format] === "0"
      offers = Offer.joins(:bike).where(bikes: {owner: current_user})
    else
      offers = Offer.all
    end
    puts offers
    render json: offers.map{|offer|offer.api}
  end

  def show
    render_jsonapi_response(@offer)
  end

  def create
    @offer = Offer.new(offer_params)
    @offer.save
    render_jsonapi_response(@offer)
  end

  def update
    @offer.update(offer_params)
    render_jsonapi_response(@offer)

  end

  def destroy
    @offer.destroy
  end

  private
    def update_dates
      Offer.all.each do |offer|
        if offer.start_date < Date.today
          new_date = Date.today + rand(1..15)
          offer.update(start_date: new_date, end_date: new_date + rand(1..20))
        end
      end
    end

    def authenticate_owner!
      @offer = Offer.find(params[:id])
      return @offer.bike.owner === current_user
    end
    
    def set_offer
      @offer = Offer.find(params[:id])
    end

    def offer_params
      params.require(:offer).permit(:bike_id, :title, :description, :daily_price, :start_date, :end_date, :city, :zip_code, :street, :region)
    end
end
