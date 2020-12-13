class CreateSpecs < ActiveRecord::Migration[6.0]
  def change
    create_table :specs do |t|
      t.string :model
      t.string :company_name
      t.string :body_type
      t.string :maximum_power
      t.string :maximum_torque
      t.string :zero_to_100
      t.timestamps
    end
  end
end
