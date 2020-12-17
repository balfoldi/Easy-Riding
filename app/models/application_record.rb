class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def build(*associations)
    api = self.attributes

    associations.each do |association| 
      if self.send(association).to_s.include?("Associations_CollectionProxy")
        associateds = self.send(association).map { |associated| associated.attributes}
      else
        associateds = self.send(association).attributes if self.send(association)
      end
      api[association] = associateds
    end
    return api
  end


  def end_date_exceeds_start_date
    unless self.end_date.blank?
        errors.add(:end_date, :too_soon) if self.end_date < self.start_date
    end
  end

  def start_date_not_past
    unless self.start_date.blank?
        errors.add(:start_date, :past) if self.start_date < Date.today
    end
  end

  def generate_url(picture)
    return Rails.application.routes.url_helpers.rails_blob_path(picture)
  end
  
end
