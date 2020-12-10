class Offer < ApplicationRecord
    belongs_to :bike
    has_many :bookings

    has_many :join_table_favorites_offers
    has_many :users, through: :join_table_favorites_offers

    def api
        self.build("users", "bookings")
    end
end