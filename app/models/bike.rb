class Bike < ApplicationRecord
  belongs_to :owner, class_name: "User"
  belongs_to :spec
  has_one :offer
  has_many :join_table_bikes_tags
  has_many :tags, through: :join_table_bikes_tags

  validates :description, length: { in: 3..3000 }, presence: true

  def api
    self.build("owner", "spec", "tags")
  end
end
