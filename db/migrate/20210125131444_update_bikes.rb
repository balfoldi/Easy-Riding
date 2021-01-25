class UpdateBikes < ActiveRecord::Migration[6.0]
  def change
    remove_column :bikes, :kilometrage, :integer
    add_column :bikes, :mileage, :integer
    remove_column :bikes, :company_name, :string
    add_column :bikes, :brand, :string
    remove_column :bikes, :body_type, :string
    add_column :bikes, :category, :string
    remove_column :bikes, :maximum_power, :string
    remove_column :bikes, :maximum_torque, :string
    remove_column :bikes, :zero_to_100, :string
    add_column :bikes, :year, :integer
  end
end
