class CreateJoinTableBikesTags < ActiveRecord::Migration[6.0]
  def change
    create_table :join_table_bikes_tags do |t|
      t.belongs_to :bike, index: true
      t.belongs_to :tag, index: true
      t.timestamps
    end
  end
end
