class BookingsController < ApplicationController
  before_action :set_booking, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  # GET /bookings
  def index
    b = Booking.create( offer: Bike.find_by(owner: User.last).offer, start_date: Date.today, end_date: Date.today+1, tenant: User.first)
    if params[:format] === "received"
      bookings = Booking.all.select do | booking|
        booking.offer.bike.owner_id === current_user.id
      end
    elsif params[:format] === "sent"
      bookings = Booking.where(tenant_id: current_user.id)
    else
      bookings = Booking.all
    end
    
    render json: bookings.map{|booking|booking.build("offer")}
  end

  # GET /bookings/1
  def show
    render_jsonapi_response(@booking)
  end

  # POST /bookings
  def create
    puts current_user
    @booking = Booking.new(booking_params)
    @booking.tenant_id = current_user.id
    @booking.save
    render_jsonapi_response(@booking)
  end

  # PATCH/PUT /bookings/1
  def update
    if @booking.update(booking_params)
      render json: @booking
    else
      render json: @booking.errors, status: :unprocessable_entity
    end
  end

  # DELETE /bookings/1
  def destroy
    @booking.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_booking
      @booking = Booking.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def booking_params
      params.require(:booking).permit(:tenant_id_id, :start_date, :end_date, :offer_id)
    end
end
