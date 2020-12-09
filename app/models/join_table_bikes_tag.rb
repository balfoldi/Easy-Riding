class JoinTableBikesTag < ApplicationRecord
    belongs_to :tag
    belongs_to :bike
end
