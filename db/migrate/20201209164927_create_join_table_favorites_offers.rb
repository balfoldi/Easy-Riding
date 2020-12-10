class CreateJoinTableFavoritesOffers < ActiveRecord::Migration[6.0]
  def change
    create_table :join_table_favorites_offers do |t|
      t.belongs_to :user, index: true
      t.belongs_to :offer, index: true
      t.timestamps
    end
  end
end