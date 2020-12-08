class CreateSpecs < ActiveRecord::Migration[6.0]
  def change
    create_table :specs do |t|
      t.string :company_name
      t.string :model
      t.integer :price
      t.string :status
      t.string :body_type
      t.string :fuel_type
      t.integer :displacement
      t.string :maximum_power
      t.string :maximum_torque
      t.string :fuel_tank_capacity
      t.string :number_of_gears
      t.integer :zero_to_100

      t.timestamps
    end
  end
end
