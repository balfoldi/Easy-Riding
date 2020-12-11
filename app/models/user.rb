class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :validatable,
    :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist
    has_many :bookings, foreign_key: :tenant
    has_many :bikes, foreign_key: :owner

    has_many :join_table_favorites_offers
    has_many :offers, through: :join_table_favorites_offers

    def api
      self.build("bikes", "offers")
  end
end