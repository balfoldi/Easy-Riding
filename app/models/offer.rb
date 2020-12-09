class Offer < ApplicationRecord
    belongs_to :bike
    has_many :bookings
end
