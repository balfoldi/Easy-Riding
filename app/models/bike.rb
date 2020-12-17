class Bike < ApplicationRecord
  before_destroy :destroy_childrens


  belongs_to :owner, class_name: "User"
  has_one :offer
  has_many :join_table_bikes_tags
  has_many :tags, through: :join_table_bikes_tags
  has_many_attached :pictures

  validates :description, length: { in: 3..3000 }, presence: true

  validates :model, length: {maximum: 20 }, presence: true
  validates :company_name, length: {maximum: 20 }
  validates :body_type, length: {maximum: 20 }
  validates :maximum_power, length: {maximum: 20 }
  validates :maximum_torque, length: {maximum: 20 }
  validates :zero_to_100, length: {maximum: 20 }
  validates :displacement, length: {maximum: 20 }

  def api
    with_relations = self.build("owner","offer")
    pictures_urls = []
    self.pictures.each do |picture|
      pictures_urls.push({url: Rails.application.routes.url_helpers.rails_blob_path(picture), id: picture.id})
    end
    
    with_relations[:pictures] = pictures_urls

    return with_relations
  end

  def destroy_childrens
    Offer.where(bike: self).delete_all
  end
end
