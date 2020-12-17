class Spec < ApplicationRecord
    has_many :bikes

    

    def api
        self.build("bikes")
    end

    def self.search_attributes
        result = {company_names: [], body_types: []}
        Spec.all.each do |spec|
            result[:company_names].push(spec.company_name)
            result[:body_types].push(spec.body_type)
        end
        result[:company_names] = result[:company_names].uniq
        result[:body_types] = result[:body_types].uniq
        return result
    end
end
