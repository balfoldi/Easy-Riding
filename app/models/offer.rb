require "date"
class Offer < ApplicationRecord
    before_destroy :destroy_childrens

    belongs_to :bike
    has_many :bookings

    has_many :join_table_favorites_offers
    has_many :users, through: :join_table_favorites_offers

    validates :title, length: { in: 10..30 }, presence:true
    validates :description, length: { in: 20..3000}
    validates :daily_price, numericality: { greater_than_or_equal_to: 10, less_than_or_equal_to: 2000 }, presence: true
    
    validates :start_date, presence: true
    validate :start_date_not_past
    validates :end_date, presence: true
    validate :end_date_exceeds_start_date

    validates :city, length: { maximum: 40 }, presence:true
    validates :street, length: { maximum: 40 }, presence:true
    validates :region, presence:true
    validates :zip_code, length: { is: 5 }, presence:true


    def api
        with_relations = self.build("bike","bookings")
        pictures_urls = []
        self.bike.pictures.each do |picture|
            pictures_urls.push(Rails.application.routes.url_helpers.rails_blob_path(picture))
        end

        
        with_relations[:pictures] = pictures_urls

        return with_relations
    end

    def destroy_childrens
        Booking.where(offer: self).delete_all
      end
end