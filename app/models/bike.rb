class Bike < ApplicationRecord
  belongs_to :owner, class_name: "User"
  has_one :offer
  has_many :join_table_bikes_tags
  has_many :tags, through: :join_table_bikes_tags

  validates :description, length: { in: 3..3000 }, presence: true

  validates :model, length: {maximum: 20 }
  validates :company_name, length: {maximum: 20 }
  validates :body_type, length: {maximum: 20 }
  validates :maximum_power, length: {maximum: 20 }
  validates :maximum_torque, length: {maximum: 20 }
  validates :zero_to_100, length: {maximum: 20 }
  def api
    self.build("owner", "spec", "tags")
  end
end
