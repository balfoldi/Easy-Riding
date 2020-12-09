class JoinTableBikesTag < ApplicationRecord
    belongs_to :tags
    belongs_to :bike
end
