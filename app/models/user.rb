class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
    :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist
    has_many :bookings, foreign_key: :tenant
    has_many :bikes, foreign_key: :owner
end
