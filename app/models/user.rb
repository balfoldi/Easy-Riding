class User < ApplicationRecord
  before_destroy :destroy_childrens
  after_create :welcome_send
  devise :database_authenticatable, :registerable, :validatable,
  :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  has_many :bookings, foreign_key: :tenant
  has_many :bikes, foreign_key: :owner
  has_many :join_table_favorites_offers
  has_many :offers, through: :join_table_favorites_offers

  validates :last_name, length: { maximum: 20 }
  validates :first_name, length: { maximum: 20 }
  validates :username, length: { maximum: 20 }
  validates :description, length: { in: 20..3000}, allow_blank: true

  def api
      self.build("bikes", "offers")
  end

  def destroy_childrens
    Bike.where(owner: self).delete_all
  end

  def welcome_send
    UserMailer.welcome_email(self).deliver_now
  end
end
