class Booking < ApplicationRecord
  belongs_to :tenant, class_name: "User"
  belongs_to :offer

  def api
  end
end
