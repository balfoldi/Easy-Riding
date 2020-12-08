class CreateBookings < ActiveRecord::Migration[6.0]
  def change
    create_table :bookings do |t|
      t.references :tenant_id, null: false, foreign_key: true
      t.datetime :start_date
      t.datetime :end_date
      t.referebnces :tenantsn, index: true
      t.belongs_to :offers, index: true
      t.timestamps
    end
  end
end
