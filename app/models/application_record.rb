class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def build(*associations)
    api = self.attributes

    associations.each do |association| 
      puts "$"*100
      puts self.send(association).to_s.split("::")[1]
      puts "$"*100
      if self.send(association).to_s.include?("Associations_CollectionProxy")
        associateds = self.send(association).map { |associated| associated.attributes}
      else
        associateds = self.send(association).attributes
      end
      api[association] = associateds
    end
    return api
  end
  
end
