class Tag < ApplicationRecord
    has_many :join_table_bikes_tags
    has_many :bikes, through: :join_table_bikes_tags

    def api
        self.build("bikes")
    end
end
