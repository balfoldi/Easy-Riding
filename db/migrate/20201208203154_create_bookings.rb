class CreateBookings < ActiveRecord::Migration[6.0]
  def change
    create_table :bookings do |t|
      t.references :tenant_id
      t.datetime :start_date
      t.datetime :end_date
      t.references :tenant, index: true
      t.belongs_to :offer, index: true
      t.timestamps
    end
  end
end
