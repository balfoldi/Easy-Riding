require "date"
class Offer < ApplicationRecord
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
        self.build("users", "bookings")
    end
end