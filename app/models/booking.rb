class Booking < ApplicationRecord
  belongs_to :tenant, class_name: "User"
  belongs_to :offer

  validates :start_date, presence: true
  validate :start_date_not_past
  validates :end_date, presence: true
  validate :end_date_exceeds_start_date

  def api
  end
  
end
