class CreateOffers < ActiveRecord::Migration[6.0]
  def change
    create_table :offers do |t|
      t.string :title
      t.text :description
      t.integer :daily_price
      t.datetime :start_date
      t.datetime :end_date
      t.string :city
      t.string :zip_code
      t.string :street
      t.string :region
      t.belongs_to :bike, index: true
      t.timestamps
    end
  end
end
