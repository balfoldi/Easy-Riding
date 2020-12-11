class Spec < ApplicationRecord
    has_many :bikes

    

    def api
        self.build("bikes")
    end
end
