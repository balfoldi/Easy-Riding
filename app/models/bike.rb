class Bike < ApplicationRecord
  before_destroy :destroy_childrens


  belongs_to :owner, class_name: "User"
  has_one :offer
  has_many_attached :pictures

  validates :description, length: { in: 3..3000 }, presence: true

  validates :model, length: {maximum: 40 }, presence: true
  validates :brand, length: {maximum: 40 }
  validates :displacement, length: {maximum: 40 }
  validates :category, length: {maximum: 40 }

  validate :one_picture

  def api
    with_relations = self.build("owner","offer")
    pictures_urls = []
    self.pictures.each do |picture|
      pictures_urls.push({url: generate_url(picture), id: picture.id})
    end

    with_relations[:pictures] = pictures_urls

    return with_relations
  end

  def destroy_childrens
    Offer.where(bike: self).delete_all
  end

  def one_picture
    unless self.pictures.attached?
      errors.add(:pictures, :is_missing)
    end
  end
end
