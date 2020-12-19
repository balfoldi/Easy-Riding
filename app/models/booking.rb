class Booking < ApplicationRecord
  belongs_to :tenant, class_name: "User"
  belongs_to :offer
  validates :start_date, presence: true
  validate :start_date_not_past
  validates :end_date, presence: true
  validate :end_date_exceeds_start_date

  def api
    booking = self.build("offer", "tenant")
    booking[:bike] = self.offer.bike.attributes
    booking[:owner] = self.offer.bike.owner

    pictures_urls = []
    self.offer.bike.pictures.each do |picture|
      pictures_urls.push(generate_url(picture))
    end
    booking[:pictures] = pictures_urls

    return booking
  end
  
end
