class CreateBikes < ActiveRecord::Migration[6.0]
  def change
    create_table :bikes do |t|
      t.text :description
      t.references :owner, index: true
      t.belongs_to :spec, index: true
      t.timestamps
    end
  end
end
