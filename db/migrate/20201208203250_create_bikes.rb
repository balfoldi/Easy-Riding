class CreateBikes < ActiveRecord::Migration[6.0]
  def change
    create_table :bikes do |t|
      t.text :description
      t.references :owners, index: true
      t.belongs_to :specs, index: true
      t.timestamps
    end
  end
end
